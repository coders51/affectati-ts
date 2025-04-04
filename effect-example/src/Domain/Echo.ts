import { HttpApiSchema } from "@effect/platform";
// import { Model } from "@effect/sql"
import { Schema } from "effect";
// import { AccountId } from "./Account.js"

// export const GroupId = Schema.Number.pipe(Schema.brand("GroupId"))
// export type GroupId = typeof GroupId.Type

// export const GroupIdFromString = Schema.NumberFromString.pipe(
//   Schema.compose(GroupId)
// )

// export class Echo

export const Echo = Schema.Struct({
  message: Schema.NonEmptyString,
  number: Schema.optional(Schema.Number),
});

export class EmptyEcho extends Schema.TaggedError<EmptyEcho>()(
  "EmptyEcho",
  { message: Schema.String },
  HttpApiSchema.annotations({ status: 400 })
) {}
