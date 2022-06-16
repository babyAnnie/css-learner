import inquirer from 'inquirer';

import { greeting } from './greeting.js'
import { generateQuestions } from './questions.js'
import { mdnCnAnswers, mdnEnAnswers, cnKeys, enKeys } from './lookup.js'
import { logFinalAnswer } from './logFinalAnswer.js'


export const terminalQuery = (language = 'en') => {
  // say hello
  greeting(language)

  const mdnAnswers = language === 'cn' ? mdnCnAnswers : mdnEnAnswers;
  const questions = generateQuestions(language)
  // kick off inquirer with the questions array
  inquirer
    .prompt(questions)
    .then((answers) => {
      // console.log('answers', answers);
      const { input, property } = answers,
        keysStr = language === 'cn' ? cnKeys.join('') : enKeys.join('');

      // log the final answer
      if (keysStr.indexOf(input) === -1) {
        logFinalAnswer(null, input, language)
      } else if (property) {
        logFinalAnswer(mdnAnswers?.[property], property, language)
      } else if (input) {
        logFinalAnswer(mdnAnswers?.[input], input, language)
      }

    }).catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });

}
