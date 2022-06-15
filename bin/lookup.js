import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));


let cnData = fs.readFileSync(`${__dirname}/mdn_cn.json`).toString();
cnData = JSON.parse(cnData) || {};
export const mdnCnAnswers = cnData;


let enData = fs.readFileSync(`${__dirname}/mdn_en.json`).toString();
enData = JSON.parse(enData) || {};
export const mdnEnAnswers = enData;