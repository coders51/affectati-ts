import { BirthDayDate } from "./birthDayDate.js"
import { Email } from "./email.js"

export interface Friend {
  firstName: string
  lastName: string
  dateOfBirth: BirthDayDate
  email: Email
}
