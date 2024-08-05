#!/usr/bin/env node

require('ts-node/register');
const mainTsPath = require.resolve('./dist/main.js');
require(mainTsPath);
