'use strict'
import chalk from 'chalk'
import boxen from 'boxen'

import { messages } from './messages.js'

const log = console.log

export const greeting = (language) => {
  //create initial message box
  const welcome =
    chalk.hex('#ffec3d')(' ✿ ') +
    chalk.cyanBright.bold(messages[language].hello) +
    chalk.hex('#ffec3d')(' ✿ ')

  const welcomeBox = {
    padding: 1,
    margin: 1,
    borderColor: '#36cfc9',
    backgroundColor: '#000000',
  }
  const msgBox = boxen(welcome, welcomeBox)

  log(msgBox)
}
