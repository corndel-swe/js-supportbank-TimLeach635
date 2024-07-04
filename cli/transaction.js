import { Command } from 'commander'

const transactionController = new Command('transaction')

transactionController
  .command('log <from> <to> <amount>')
  .description('Log transaction data to the console')
  .action((from, to, amount) => {
    const now = new Date()

    console.log(`At ${now.toDateString()}, ${from} sent ${to} £${amount}`)
  })

export default transactionController
