import { cnKeys, enKeys } from './lookup.js'
import { messages } from './messages.js';


// language: cn | en
export const generateQuestions = (language = 'en') => {
  const keys = language === 'cn' ? cnKeys : enKeys,
    mdnChoices = (answers) => {
      const input = answers["input"]
      let result = []
      for (let k of keys) {
        if (k.indexOf(input) !== -1) {
          // if (k.startsWith(input)) {
          result.push(k)
        }
      }
      return result
    }

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
        const firstAnswer = answers["input"],
          result = mdnChoices(answers);
        return !keys.includes(firstAnswer) && result.length > 0
      }
    },
  ]
}
