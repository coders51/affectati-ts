import { Friend } from "./friend.js"

export interface Sender {
  sendGreetings(friend: Friend): void
}

export class EmailSender implements Sender {
  sendGreetings(friend: Friend): void {
    console.log(
      `Happy birthday ${friend.firstName} ${friend.lastName}!`,
      `We wish you a wonderful day!`,
      `Your email: ${friend.email}`
    )
  }
}
