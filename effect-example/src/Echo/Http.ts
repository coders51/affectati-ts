import { HttpApiBuilder } from "@effect/platform";
import { Effect, Layer, Match, pipe } from "effect";
// import { AuthenticationLive } from "../Accounts/Http.js";
import { Api } from "../Api.js";
// import { policyUse } from "../Domain/Policy.js";
// import { CurrentUser } from "../Domain/User.js";
// import { Groups } from "../Groups.js";
// import { GroupsPolicy } from "./Policy.js";

export const HttpEchoLive = HttpApiBuilder.group(Api, "echo", (handlers) =>
  handlers.handle("send", ({ payload }) =>
    pipe(
      Match.value(payload).pipe(
        Match.when({ number: Match.number }, (payload) => ({
          ...payload,
          number: payload.number + 1,
        })),
        Match.orElse((payload) => payload)
      ),
      (x) => Effect.succeed(x)
    )
  )
);
