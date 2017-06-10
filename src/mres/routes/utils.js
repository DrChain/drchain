// Config
global.config = {
  rpc: {
    host: "localhost",
    port: "8545"
  },
  address: '0x3f7d5b8c219d8aaf6c51d83da5e5630455d5c7a6',
  keys: {
    privateKey: '5KdLA5jBUja5Emb8vzpXeXdk2jGb1gDeN2jPpnAGCVYQNckkoBe',
    publicKey: '045371c4cee7210724d7733650801914abfeabdeb50960ebcb73de43dd7f020534d8adbaee5e78c0f3c5eb08177e6422f87db150d8275be3125791153feac24cf9'
  }
}

// Load Libraries
global.solc = require("solc")
global.fs = require("fs")
global.Web3 = require("web3")
global.EthUtil = require("ethereumjs-util")
global.EthTx = require("ethereumjs-tx")
global.bitcore = require('bitcore-lib')
global.ECIES = require('bitcore-ecies')

// Connect Web3 Instance
global.web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))

global.request = {
  "content": {
    "patientId": "A12345678",
    "applicant": {
      "id": 2,
      "name": "貓大醫院",
      "pubkey": "TODO"
    },
    "records": [
        {
          "hosiptalId": 1,
          "recordId": 1,
          "recordName": "熊大醫院 內科檢查"
        }
    ]
  }
}

global.note = {
  "hosiptals": [
    {
      "id": 1,
      "name": "熊大醫院",
      "pubkey": "TODO"
    },
    {
      "id": 2,
      "name": "貓大醫院",
      "pubkey": "TODO"
    }
  ],
  "records": [
    {
      "hospitalId": 1,
      "recordId": 1,
      "patientId": "A12345678",
      "name": "熊大醫院 內科檢查",
      "date": "2016-01-01",
      "physicianName": "Dr. Chain",
      "data": {
        "department": "",
        "icd": {
          "code": "J11.08",
          "name": "Influenza due to unidentified influenza virus with specified pneumonia 未確認流感病毒所致流行性感冒併明示類型肺炎"
        },
        "docSect": {
          "subjective": "stable now and no complaint, report normal home BP; ever increased BP noted for weeks,no DOE, no chest pain, no syncope, no PND，no orthopnea",
          "objective": "BP:148/70 mmHg, HR:66/min, PE: pale conjunctiva-, icteric sclera-; JVE-, carotid bruits-，goiter-; clear bs, no rales, no wheezing; RHB，soft SM，Peripheral pulses: ++, pitting edema-",
          "assessment": "HCVD"
        },
        "procedure": [
          "腹部超音波，追蹤性" ,
          "全套血液檢查ⅢCBC-III"
        ],
        "prescription": [
          "力停疼錠500公絲"
        ]
      }
    }
  ],
  "patients": [
    {
      "id": "A12345678",
      "name": "Brian Chen",
      "gender": "M",
      "birthDate": "1960-01-01"
    }
  ]
}

// Helper Functions
class Helpers {
  constructor() {
    this.keypair = ECIES()
    .privateKey(new bitcore.PrivateKey(config.keys.privateKey))
    .publicKey(new bitcore.PublicKey(config.keys.publicKey))
  }



  contractName(source) {
    var re1 = /contract.*{/g
    var re2 = /\s\w+\s/
    return source.match(re1).pop().match(re2)[0].trim()
  }

  createContract(source, options={}) {
    var compiled = solc.compile(source)
    var contractName = ":" + this.contractName(source)
    var bytecode = compiled["contracts"][contractName]["bytecode"]
    console.log(bytecode)
    var abi = JSON.parse(compiled["contracts"][contractName]["interface"])
    var contract = global.web3.eth.contract(abi)
    // var gasEstimate = global.web3.eth.estimateGas({ data: '0x' + bytecode })

    var deployed = contract.new(Object.assign({
      from: global.web3.eth.accounts[0],
      data: '0x' + bytecode,
      gas: '4700000'
    //   gas: gasEstimate
    }, options), (error, result) => { })

    return deployed
  }

  loadContract(name) {
    var path = `./${name.toLowerCase()}.sol`
    return fs.readFileSync(path, 'utf8')
  }

  deployContract(name, options={}) {
    var source = this.loadContract(name)
    return this.createContract(source, options)
  }

  etherBalance(contract) {
    switch(typeof(contract)) {
      case "object":
        if(contract.address) {
          return global.web3.fromWei(global.web3.eth.getBalance(contract.address), 'ether').toNumber()
        } else {
          return new Error("cannot call getEtherBalance on an object that does not have a property 'address'")
        }
        break
      case "string":
        return global.web3.fromWei(global.web3.eth.getBalance(contract), 'ether').toNumber()
        break
    }
  }

  signMsg(pKey, msg) {
    // Private Key
    var pKeyx = new Buffer(pKey, "hex")

    // Shared Message
    var message = msg
    var messageHash = web3.sha3(message)
    var messageHashx = new Buffer(messageHash.replace("0x", ""), "hex")

    // Signed Hash
    var signedMessage = EthUtil.ecsign(messageHashx, pKeyx)
    var signedHash = EthUtil.toRpcSig(signedMessage.v, signedMessage.r, signedMessage.s).toString("hex")

    return [messageHashx, signedHash]
  }

  verifySig(messageHashx, signedHash, account) {
    // Recover Address
    var sigDecoded = EthUtil.fromRpcSig(signedHash)
    var recoveredPub = EthUtil.ecrecover(messageHashx, sigDecoded.v, sigDecoded.r, sigDecoded.s)
    var recoveredAddress = '0x' + EthUtil.pubToAddress(recoveredPub).toString("hex")

    if (recoveredAddress !== account) throw new Error("Not match")
    return true
  }

  encrypt(message) {
      /*
       * this key is used as false sample, because bitcore would crash when alice has no privateKey
       */
      var encrypted = this.keypair.encrypt(message);

      return encrypted.toString('hex');
  }

  /**
   * decrypt the message with the privateKey of identity
   * @param  {{privateKey: ?string, publicKey: string}}   identity
   * @param  {string}   encrypted
   * @return {string}   message
   */
  decrypt(encrypted) {
      var decryptMe = new Buffer(encrypted, 'hex');

      var decrypted = this.keypair.decrypt(decryptMe);
      return decrypted.toString('ascii');
  }
}

// Load Helpers into utils namespace
global.utils = new Helpers()

// Start repl
require('repl').start({})

module.exports = Helpers;
