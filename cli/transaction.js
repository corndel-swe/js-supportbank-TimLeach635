import { Command } from 'commander'
import fs from "fs/promises"

const file = await fs.readFile("data/Transactions2014.csv", "utf-8")
const fileLines = file.split("\r\n")

const transactionController = new Command('transaction')

transactionController
  .command('log <from> <to> <amount>')
  .description('Log transaction data to the console')
  .action((from, to, amount) => {
    const now = new Date()

    console.log(`At ${now.toDateString()}, ${from} sent ${to} £${amount}`)
  })

transactionController
  .command("summarise all")
  .description("Summarise all the transactions")
  .action(() => {
    const allButFirstLine = fileLines.slice(1)
    const names = {}

    for (let line of allButFirstLine) {
      const lineSplit = line.split(",")
      const fromName = lineSplit[1]
      const toName = lineSplit[2]
      const amount = parseFloat(lineSplit[4])

      if (fromName in names) {
        names[fromName] -= amount
      } else {
        names[fromName] = -amount
      }

      if (toName in names) {
        names[toName] += amount
      } else {
        names[toName] = amount
      }
    }

    for (let accountName in names) {
      console.log(`${accountName}: £${names[accountName].toFixed(2)}`)
    }
  })

export default transactionController
