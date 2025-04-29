export class BirthDayDate {
  constructor(
    public day: number,
    public month: number,
    public year: number
  ) {}

  static fromDate(date: Date): BirthDayDate {
    return new BirthDayDate(date.getDate(), date.getMonth() + 1, date.getFullYear())
  }

  static fromString(date: string): BirthDayDate {
    const [year, month, day] = date.split("/").map(Number)
    return new BirthDayDate(day, month, year)
  }

  equal(other: BirthDayDate): boolean {
    return this.day === other.day && this.month === other.month
  }
}
