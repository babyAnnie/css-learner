import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let data = fs.readFileSync(`${__dirname}/mdn.json`).toString();
data = JSON.parse(data) || {};
export const mdnAnswers = data;