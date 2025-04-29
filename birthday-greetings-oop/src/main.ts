import { BirthDayDate } from "./birthDayDate.js"
import { CSVFriends } from "./friends.js"
import { EmailSender } from "./sender.js"

const friends = await CSVFriends.create("./friends.csv")
const sender = new EmailSender()
const today = BirthDayDate.fromDate(new Date())

friends
  .getAll()
  .filter((f) => f.dateOfBirth.equal(today))
  .forEach((f) => sender.sendGreetings(f))
