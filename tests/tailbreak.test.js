const should = require('chai').should()
const resolveConfig = require('tailwindcss/resolveConfig')

const config = require('./test.config')
const testConfig = resolveConfig(config);
