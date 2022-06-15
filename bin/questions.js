import { mdnCnAnswers } from './lookup.js'
import { messages } from './messages.js';


const keys = Object.keys(mdnCnAnswers)
export const keysStr = keys.join('');


const mdnChoices = (answers) => {
  const input = answers["input"]
  let result = []
  for (let k of keys) {
    if (k.indexOf(input) !== -1) {
      result.push(k)
    }
  }
  return result
}


// language: cn | en
export const generateQuestions = (language = 'cn') => {
  return [
    {
      type: 'input',
      name: 'input',
      message: messages[language].input,
      /* Legacy way: with this.async */
      validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        const done = this.async();
        // Do async stuff
        setTimeout(function () {
          if (typeof input !== 'string' || input === '') {
            // Pass the return value in the done callback
            done(messages[language].requiresInput);
            return;
          }
          // Pass the return value in the done callback
          done(null, true);
        }, 150);
      }
    },
    {
      type: "list",
      name: "property",
      message: messages[language].property,
      choices: mdnChoices,
      when(answers) {
        const firstAnswer = answers["input"]
        return !keys.includes(firstAnswer) && keysStr.indexOf(firstAnswer) !== -1
      }
    },
  ]
}
