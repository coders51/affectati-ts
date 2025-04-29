import { Brand, make } from "ts-brand"

export type Email = Brand<string, "email">
export const Email = make<Email>()
