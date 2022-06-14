// import fs from 'fs';

// let data = fs.readFileSync('./mdn.json').toString();
// data = JSON.parse(data);

// export const questions = [];


import { mdnAnswers } from './lookup.js'


const keys = Object.keys(mdnAnswers)
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


// test questions
export const questions = [
  {
    type: 'input',
    name: 'input',
    message: '输入要查询的CSS属性：',
    /* Legacy way: with this.async */
    validate: function (input) {
      // Declare function as asynchronous, and save the done callback
      const done = this.async();

      // Do async stuff
      setTimeout(function () {
        if (typeof input !== 'string' || input === '') {
          // Pass the return value in the done callback
          done('You need to enter the css property');
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
    message: "选择你要查询的CSS属性：",
    choices: mdnChoices,
    when(answers) {
      const firstAnswer = answers["input"]
      return !keys.includes(firstAnswer) && keysStr.indexOf(firstAnswer) !== -1
    }
  },
]
