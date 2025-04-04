import { HttpApi, OpenApi } from "@effect/platform";
// import { AccountsApi } from "./Accounts/Api.js"
// import { GroupsApi } from "./Groups/Api.js"
// import { PeopleApi } from "./People/Api.js"
import { EchoApi } from "./Echo/Api.js";

export class Api extends HttpApi.empty
  // .add(AccountsApi)
  // .add(GroupsApi)
  // .add(PeopleApi)
  .add(EchoApi)
  .annotate(OpenApi.Title, "Groups API") {}
