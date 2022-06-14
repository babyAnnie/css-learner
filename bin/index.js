#!/usr/bin/env node

import inquirer from 'inquirer';

import { greeting } from './greeting.js'
import { questions, keysStr } from './questions.js'
import { mdnAnswers } from './lookup.js'
import { logFinalAnswer } from './logFinalAnswer.js'


// say hello
greeting()

const terminalQuery = (questions) => {
  // kick off inquirer with the questions array
  inquirer
    .prompt(questions)
    .then((answers) => {
      // console.log('answers', answers);
      const { input, property } = answers

      // log the final answer
      if (keysStr.indexOf(input) === -1) {
        logFinalAnswer(null, input)
      } else if (property) {
        logFinalAnswer(mdnAnswers[property], property)
      } else if (input) {
        logFinalAnswer(mdnAnswers[input], input)
      }

    }).catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });

}


terminalQuery(questions)