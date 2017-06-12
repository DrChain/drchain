const fs = require('fs');
const Helpers = require('./../routes/utils')

// config
const config = require('./../env/config.json')

// compile contract
let source = fs.readFileSync('Record.sol', 'utf8')
let utils = new Helpers(config)

// deploy contract
utils.deployContract(source)
