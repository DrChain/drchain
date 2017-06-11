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
const _ = require('lodash');

// connection
global.web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))

const acct = web3.eth.accounts[0]

if (web3.personal.unlockAccount(acct, ''))
    console.log(`Your account ${acct} is unlocked!`);

contractAddr = '0x53c29e930753eec03002316e69565eb6cae707cc'

// compile contract
let r = _compileContract('Record', contractAddr);

// watch requestH1Data event
let event_1 = r.instance.requestH1Data();
event_1.watch(function (error, result) {
    if (!error) {
        var id = _.at(result, 'args.patientId');
        var json = _.at(result, 'args.json');
        var signedHash = _.at(result, 'args.signedHash');

        console.log(id);
        console.log(json);
        console.log(signedHash);
    } else {
        console.log(error);
    }
});

// watch passDataToH2 event
let event_2 = r.instance.passDataToH2();
event_2.watch(function (error, result) {
    if (!error) {
        var signedHash = _.at(result, 'args.signedHash');
        var ipfs_url = _.at(result, 'args.ipfs_url');

        console.log(signedHash);
        console.log(ipfs_url);
    } else {
        console.log(error);
    }
});

function _compileContract(contract_name, contract_address) {

    let source = fs.readFileSync(`./${contract_name}.sol`, 'utf8');
    let compiled = solc.compile(source);

    var bytecode = _.at(compiled, 'contracts.:' + contract_name + '.bytecode');
    var abi = JSON.parse(_.at(compiled, 'contracts.:' + contract_name + '.interface'));

    var contract = web3.eth.contract(abi);
    var instance = contract.at(contract_address);

    return {
        'abi': abi,
        'instance': instance
    };
}
