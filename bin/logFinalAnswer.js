import chalk from 'chalk'
import boxen from 'boxen'

import { messages } from './messages.js'

const log = console.log

export function logFinalAnswer(finalAnswer = null, searchKeyword = '', language = 'en') {
  if (!finalAnswer) {
    log(chalk.cyanBright(`${messages[language].UnknownProperty}"${searchKeyword}"\n`))
  } else {
    // title and description
    log(`\n ${chalk.white.bold.underline(finalAnswer?.name)}\n`)
    // initial value
    finalAnswer?.["initial value"] && log(' ' + chalk.redBright(`${messages[language].initialValue} ${finalAnswer?.["initial value"]}`))
    // inherit
    if (finalAnswer?.inherit) {
      log(' ' + chalk.cyanBright(`${messages[language].inherit} ${finalAnswer?.inherit}`))
    }
    // applicable elements
    if (finalAnswer?.["applicable elements"]) {
      log(' ' + chalk.greenBright(`${messages[language].applicableElements} ${finalAnswer?.["applicable elements"]}\n`))
    }
    // desc & longDesc
    if (finalAnswer?.desc) {
      log(` ${chalk.magentaBright(finalAnswer?.desc)}`)
    }
    if (finalAnswer?.longDesc) {
      log(` ${chalk.blackBright(finalAnswer?.longDesc)}\n`)
    }
    //create the box with the code example
    if (finalAnswer?.grammar) {
      const codeBox = {
        padding: 1,
        borderColor: 'blackBright',
        backgroundColor: '#333333',
      },
        code = chalk.white(`${messages[language].grammar}\n\n`) + chalk.cyan(finalAnswer?.grammar),
        codeOutput = boxen(code, codeBox);
      log(codeOutput)
    }
  }
}
