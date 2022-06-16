import chalk from 'chalk'
import boxen from 'boxen'

import { messages } from './messages.js'

const log = console.log

export function logFinalAnswer(finalAnswer = null, searchKeyword = '', language = 'en') {
  if (!finalAnswer) {
    log(chalk.gray(`${messages[language].UnknownProperty}"${searchKeyword}"\n`))
  } else {
    // title and description
    log(`\n  ${chalk.bgHex('#096dd9').hex('#ffffff').bold(' ' + finalAnswer?.name + ' ')}\n`)
    // initial value
    if (finalAnswer?.["initial value"]) {
      log('  ' + chalk.hex("#73d13d")(`${messages[language].initialValue} ${finalAnswer?.["initial value"]}`))
    }
    // inherit
    if (finalAnswer?.inherit) {
      log('  ' + chalk.hex('#ffec3d')(`${messages[language].inherit} ${finalAnswer?.inherit}`))
    }
    // applicable elements
    if (finalAnswer?.["applicable elements"]) {
      log('  ' + chalk.hex('#40a9ff')(`${messages[language].applicableElements} ${finalAnswer?.["applicable elements"]}\n`))
    }
    // desc & longDesc
    if (finalAnswer?.desc) {
      log(chalk.hex('#b37feb')(finalAnswer?.desc))
    }
    if (finalAnswer?.longDesc) {
      log(`${chalk.blackBright(finalAnswer?.longDesc)}\n`)
    }
    //create the box with the code example
    if (finalAnswer?.grammar) {
      const codeBox = {
        padding: 1,
        borderColor: 'blackBright',
        backgroundColor: '#000000',
      },
        code = chalk.white(`${messages[language].grammar}\n\n`) + chalk.cyan(finalAnswer?.grammar),
        codeOutput = boxen(code, codeBox);
      log(codeOutput)
    }
  }
}
