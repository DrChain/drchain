// Config
global.config = {
  rpc: {
    host: "139.162.75.109",
    port: "8545"
  },
  address: '0x3f7d5b8c219d8aaf6c51d83da5e5630455d5c7a6',
  keys: {
    privateKey: '5KdLA5jBUja5Emb8vzpXeXdk2jGb1gDeN2jPpnAGCVYQNckkoBe',
    publicKey: '045371c4cee7210724d7733650801914abfeabdeb50960ebcb73de43dd7f020534d8adbaee5e78c0f3c5eb08177e6422f87db150d8275be3125791153feac24cf9'
  }
}

const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

// connection
global.web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))

const acct = web3.eth.accounts[0]

if (web3.personal.unlockAccount(acct, ''))
    console.log(`Your account ${acct} is unlocked!`);

// compile contract
let source = fs.readFileSync('Record.sol', 'utf8');
let compiled = solc.compile(source);

for (let contractName in compiled.contracts) {
    var bytecode = '0x' + compiled.contracts[contractName].bytecode;
    var abi = JSON.parse(compiled.contracts[contractName].interface);
}
// console.log(JSON.stringify(bytecode));
console.log(JSON.stringify(abi));

// deploy contract
let gasEstimate = 2 * web3.eth.estimateGas({data: bytecode});

let contract = web3.eth.contract(abi);
let myContract = contract.new({
    from: acct,
    data: bytecode,
    gas: gasEstimate
}, function (err, ret) {
    if (!err) {
        if (!ret.address) {
            console.log(`transactionHash: ${ret.transactionHash}`);
        } else {
            console.log(`Contract Address: ${ret.address}`);
            global.contractAddr = ret.address;
        }
    } else {
        console.log(err);
    }
});
