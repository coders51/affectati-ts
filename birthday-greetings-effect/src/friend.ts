import { BirthDayDate } from "./birthDayDate"
import { Email } from "./email"

export interface Friend {
  firstName: string
  lastName: string
  dateOfBirth: BirthDayDate
  email: Email
}
