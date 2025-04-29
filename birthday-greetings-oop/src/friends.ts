import { readFile } from "fs/promises"
import { Friend } from "./friend.js"
import { BirthDayDate } from "./birthDayDate.js"
import { Email } from "./email.js"

export interface Friends {
  getAll(): Friend[]
}

export class CSVFriends implements Friends {
  constructor(private readonly friends: Friend[]) {}

  static async create(filePath: string): Promise<CSVFriends> {
    const buffer = await readFile(filePath)
    const friends = buffer
      .toString()
      .split("\n")
      .map((line, index) => (index > 0 ? line.split(", ") : undefined))
      .filter((line) => line !== undefined)
      .map((line) => {
        return {
          firstName: line[0],
          lastName: line[1],
          dateOfBirth: BirthDayDate.fromString(line[2]),
          email: Email(line[3]),
        }
      })

    return new CSVFriends(friends)
  }

  getAll(): Friend[] {
    return this.friends
  }
}
