import { HttpApiEndpoint, HttpApiGroup, OpenApi } from "@effect/platform";
import { Echo, EmptyEcho } from "app/Domain/Echo";
// import { Authentication } from "../Accounts/Api.js"
// import { GroupIdFromString, GroupNotFound } from "../Domain/Group.js"
// import { Person, PersonIdFromString, PersonNotFound } from "../Domain/Person.js"

export class EchoApi extends HttpApiGroup.make("echo")
  .add(
    HttpApiEndpoint.post("send", "/")
      .addSuccess(Echo)
      .setPayload(Echo)
      .addError(EmptyEcho)
  )
  .prefix("/echo")
  .annotate(OpenApi.Title, "Echo")
  .annotate(OpenApi.Description, "Echo service") {}
