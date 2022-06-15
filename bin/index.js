#!/usr/bin/env node

import { terminalQuery } from './globalization.js'

const language = process.env.LANG === -1 ? 'en' : 'cn';

terminalQuery(language)