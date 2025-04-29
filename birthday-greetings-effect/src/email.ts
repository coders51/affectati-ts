import { Brand } from "effect"

export type Email = string & Brand.Brand<"Email">
export const Email = Brand.nominal<Email>()
