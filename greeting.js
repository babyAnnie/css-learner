'use strict'
import chalk from 'chalk'
import boxen from 'boxen'
const log = console.log

export const greeting = () => {
  //create initial message box
  const welcome =
    chalk.yellow(' ✿ ') +
    chalk.cyanBright.bold('  Hello CSS tool! ') +
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
