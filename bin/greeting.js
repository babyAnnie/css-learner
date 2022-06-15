'use strict'
import chalk from 'chalk'
import boxen from 'boxen'

import { messages } from './messages.js'

const log = console.log

export const greeting = (language) => {
  //create initial message box
  const welcome =
    chalk.yellow(' ✿ ') +
    chalk.cyanBright.bold(messages[language].hello) +
    chalk.yellow(' ✿ ')

  const welcomeBox = {
    padding: 1,
    margin: 1,
    borderColor: 'yellowBright',
    backgroundColor: '#000000',
  }
  const msgBox = boxen(welcome, welcomeBox)

  log(msgBox)
}
