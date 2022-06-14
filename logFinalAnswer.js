import chalk from 'chalk'
import boxen from 'boxen'

const log = console.log

export function logFinalAnswer(finalAnswer = null, searchKeyword = '') {
  if (!finalAnswer) {
    log(chalk.cyanBright(`Unknown css property: "${searchKeyword}"\n`))
  } else {
    log('\n')
    // title and description
    log(' ' + chalk.white.bold.underline(finalAnswer?.name || ''))
    log('\n')
    // 初始值
    log(' ' + chalk.redBright(`初始值： ${finalAnswer?.["initial value"] || ''}`))
    // 是否继承
    log(' ' + chalk.cyanBright(`继承： ${finalAnswer?.inherit || ''}`))
    // 适用元素
    log(' ' + chalk.greenBright(`适用元素： ${finalAnswer?.["applicable elements"] || ''}`))
    log('\n')
    // 描述
    log(' ' + chalk.magentaBright(finalAnswer?.desc || ''))
    log(' ' + chalk.blackBright(finalAnswer?.longDesc || ''))
    log('\n')

    //create the box with the code example
    const codeBox = {
      padding: 1,
      borderStyle: 'doubleSingle',
      borderColor: 'blackBright',
      backgroundColor: '#000000',
    }
    const code = chalk.white('Grammar:\n\n') + chalk.cyan(finalAnswer?.grammar || '')

    const codeOutput = boxen(code, codeBox)
    log(codeOutput)
  }
}
