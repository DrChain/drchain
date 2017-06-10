// Config
global.config = {
  rpc: {
    host: "139.162.75.109",
    port: "8545"
  }
}

// Load Libraries
global.solc = require("solc")
global.fs = require("fs")
global.Web3 = require("web3")
global.EthUtil = require("ethereumjs-util");
global.EthTx = require("ethereumjs-tx")

// Connect Web3 Instance
global.web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))

// Global Account Accessors
global.acct1 = web3.eth.accounts[0]
global.acct2 = web3.eth.accounts[1]
global.acct3 = web3.eth.accounts[2]
global.acct4 = web3.eth.accounts[3]
global.acct5 = web3.eth.accounts[4]

// Helper Functions
class Helpers {

  contractName(source) {
    var re1 = /contract.*{/g
    var re2 = /\s\w+\s/
    return source.match(re1).pop().match(re2)[0].trim()
  }

  createContract(source, options={}) {
    var compiled = solc.compile(source)
    var contractName = ":" + this.contractName(source)
    var bytecode = compiled["contracts"][contractName]["bytecode"]
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

}

// Load Helpers into utils namespace
global.utils = new Helpers()

// Start repl
require('repl').start({})
