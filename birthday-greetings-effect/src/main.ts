import { Context, Effect, Layer } from "effect"
import { Friend } from "./friend.js"
import { readFile } from "fs/promises"
import { BirthDayDate } from "./birthDayDate.js"
import { Email } from "./email.js"

class RepositoryError extends Error {
  readonly _tag = "RepositoryError"
}

class SenderError extends Error {
  readonly _tag = "SenderError"
}

class Friends extends Context.Tag("Friends")<Friends, { getAll(): Effect.Effect<Friend[], RepositoryError> }>() {}

const FriendsLive = Layer.succeed(
  Friends,
  Friends.of({
    getAll: () => {
      return Effect.tryPromise({
        try: async () => {
          const buffer = await readFile("friends.csv")
          return buffer
            .toString()
            .split("\n")
            .map((line, index) => (index > 0 ? line.split(", ") : undefined))
            .filter((line) => line !== undefined)
            .map((line) => {
              return {
                firstName: line[0],
                lastName: line[1],
                dateOfBirth: BirthDayDate.fromString(line[2]),
                email: Email(line[3]),
              }
            })
        },
        catch: (error) => new RepositoryError((error as Error).message),
      })
    },
  })
)

class Sender extends Context.Tag("Sender")<
  Sender,
  { sendGreetings(friend: Friend): Effect.Effect<void, SenderError> }
>() {}

const SenderLive = Layer.succeed(
  Sender,
  Sender.of({
    sendGreetings: (friend: Friend) => {
      return Effect.try({
        try: () => {
          // Simulate sending an email
          console.log(`Sending email to ${friend.firstName} ${friend.lastName} (${friend.email})`)
        },
        catch: () => new SenderError(),
      })
    },
  })
)

const AppConfigLive = Layer.merge(FriendsLive, SenderLive)

const program = Effect.gen(function* () {
  const friends = yield* Friends
  const sender = yield* Sender
  const today = BirthDayDate.fromDate(new Date())
  const allFriends = yield* friends.getAll()
  allFriends.filter((f) => f.dateOfBirth.equal(today)).forEach((f) => sender.sendGreetings(f))
})

const runnable = Effect.provide(program, AppConfigLive)
Effect.runPromiseExit(runnable).then(console.log)
