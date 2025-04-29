import { FileSystem } from "@effect/platform"
import { Effect, pipe } from "effect"
import { BirthDayDate } from "./birthDayDate.js"
import { Email } from "./email.js"
import { Friend } from "./friend.js"

class CSVParseError extends Error {
  readonly _tag = "CSVParseError"
}

const getFriends = (fileSystem: FileSystem.FileSystem) => (path: string) => {
  return pipe(
    fileSystem.readFileString(path),
    Effect.tryMap({
      try: (c) => {
        return c
          .toString()
          .split("\n")
          .map((line, index) => (index > 0 ? line.split(", ") : undefined))
          .filter((line) => line !== undefined)
      },
      catch: (error) => new CSVParseError((error as Error).message),
    }),
    Effect.map((rows) =>
      rows.map((r) => ({
        firstName: r[0],
        lastName: r[1],
        dateOfBirth: BirthDayDate.fromString(r[2]),
        email: Email(r[3]),
      }))
    )
  )
}

const getFriendsLive = getFriends(FileSystem.FileSystem.Service)

function isBirthdayOf(dateOfBirth: BirthDayDate, today: BirthDayDate): boolean {
  return dateOfBirth.equal(today)
}

function sendGreetingsTo(friend: Friend): void {
  console.log(`Sending email to ${friend.firstName} ${friend.lastName} (${friend.email})`)
}

const program = pipe(
  "friends.csv",
  (p) => getFriendsLive(p),
  Effect.map((friends) =>
    friends.filter((friend) => isBirthdayOf(friend.dateOfBirth, BirthDayDate.fromDate(new Date())))
  ),
  Effect.map((celebrate) => celebrate.map((c) => sendGreetingsTo(c)))
)

Effect.runPromiseExit(program).then(console.log)
