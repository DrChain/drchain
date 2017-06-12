// Load Libraries
const solc = require("solc")
const fs = require("fs")
const Web3 = require("web3")
const EthUtil = require("ethereumjs-util")
const EthTx = require("ethereumjs-tx")
const bitcore = require('bitcore-lib')
const ECIES = require('bitcore-ecies')
const Ipfs = require('ipfs-mini')
const Tx = require('ethereumjs-tx')
const bs58 = require('bs58')


const config = require('./../env/config.json')

// web3
const web3Host = config.web3.host
const web3Port = config.web3.port
const web3Protocol = config.web3.protocol
const web3 = new Web3(new Web3.providers.HttpProvider(web3Protocol + '://' + web3Host + ':' + web3Port ));

// IPFS
const ipfsHost = config.ipfs.host
const ipfsPort = config.ipfs.port
const ipfsProtocol = config.ipfs.protocol
const ipfs = new Ipfs({
  host: ipfsHost,
  port: ipfsPort,
  protocol: ipfsProtocol,
})


/**
 * Convert base58 string to hex string
 * @param {string} b58String
 * @return {string} hexString
 */
function base58ToHex(b58String) {
  var hexBuf = new Buffer(bs58.decode(b58String));
  return hexBuf.toString('hex');
}

/**
 * Convert hex string to base58 string
 * @param {string} hexString
 * @return {string} b58String
 */
function hexToBase58(hexString) {
  var buf = new Buffer(hexString, 'hex');
  return bs58.encode(buf);
}


// Helper Functions
class Helpers {
  constructor(config) {
    // Set bitcoin ECIES for IPFS encryption
    this.keypair = ECIES()
    .privateKey(new bitcore.PrivateKey(config.myPrivateKey))
    .publicKey(new bitcore.PublicKey(config.myPublicKey))

    this.privateKey = config.myPrivateKey
    this.account = config.myAccount
  }


  /**
   * Get contract name from source code
   * @param {string} source
   * @return {string} contractName
   */
  getContractName(source) {
    var re1 = /contract.*{/g
    var re2 = /\s\w+\s/
    return source.match(re1).pop().match(re2)[0].trim()

  }

  /**
   * Get ether balance of a contract
   * @param {object} contract
   * @return {number} etherBalance
   */
  getEtherBalance(contract) {
    switch(typeof(contract)) {
      case "object":
        if(contract.address) {
          return web3.fromWei(web3.eth.getBalance(contract.address), 'ether').toNumber()
        } else {
          return new Error("cannot call getEtherBalance on an object that does not have a property 'address'")
        }
        break
      case "string":
        return web3.fromWei(web3.eth.getBalance(contract), 'ether').toNumber()
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
    console.log(`messageHashx ${messageHashx}, signedHash ${signedHash}, account ${account}`)

    var sigDecoded = EthUtil.fromRpcSig(signedHash)
    var recoveredPub = EthUtil.ecrecover(messageHashx, sigDecoded.v, sigDecoded.r, sigDecoded.s)
    var recoveredAddress = '0x' + EthUtil.pubToAddress(recoveredPub).toString("hex")
    console.log('recoveredAddress: ', recoveredAddress)
    if (recoveredAddress !== account) {
      return false
    }else {
      return true
    }
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

  /**
   * Get contract via contractAddress and ABI
   * @param {string} contractAddress
   * @param {string} abi
   * @return {object} contract
   */
  getContract(contractAddress, abi) {
    const contract = web3.eth.contract(abi)
    return contract.at(contractAddress)
  }

  /**
   * Call a contract
   * @param {string} contractAddress
   * @param {string} abi
   * @param {string} functionName
   * @param {array} parameters
   * @return {string} txHash
   */
  callContract(contractAddress, abi, functionName, parameters) {
    let contract = web3.eth.contract(abi)
    contract = contract.at(contractAddress)

    const gasPrice = web3.eth.gasPrice
    const gasPriceHex = web3.toHex(gasPrice)
    const gasLimitHex = web3.toHex(4700000)

    const nonce = web3.eth.getTransactionCount(this.account)
    const nonceHex = web3.toHex(nonce)

    const contractData = contract[functionName].getData(...parameters)
    console.log('contractData: ', contractData)
    const serializedTx = this.generateserializedTx(nonceHex, gasPriceHex, gasLimitHex, contractData, this.privateKey, this.account, contractAddress)
    const txHash = this.sendRawTransaction(serializedTx, false)
    return txHash
  }

  /**
   * Deploy a contract
   * @param {string} source
   * @return {string} contractAddress
   */
  deployContract(source) {
    const compiled = solc.compile(source)
    let bytecode = ''
    let abi = ''
    for (let contractName in compiled.contracts) {
       bytecode = '0x' + compiled.contracts[contractName].bytecode
       abi = JSON.parse(compiled.contracts[contractName].interface)
    }

    const gasPrice = web3.eth.gasPrice
    const gasPriceHex = web3.toHex(gasPrice)
    const gasLimitHex = 2 * web3.eth.estimateGas({data: bytecode});

    const nonce = web3.eth.getTransactionCount(this.account)
    const nonceHex = web3.toHex(nonce)
    const contract = web3.eth.contract(abi)
    const contractData = contract.new.getData({
        data: bytecode
    })

    let serializedTx = this.generateserializedTx(nonceHex, gasPriceHex, gasLimitHex, contractData, this.privateKey, this.account, null)
    let contractAddress = this.sendRawTransaction(serializedTx, true)

    return(contractAddress)
  }

  /**
   * Generate serialized transaction
   * @param {string} nonceHex
   * @param {string} gasPriceHex
   * @param {string} gasLimitHex
   * @param {string} data
   * @param {string} privateKey
   * @param {string} from
   * @param {string} to
   * @return {string} serializedTx
   */
  generateserializedTx(nonceHex, gasPriceHex, gasLimitHex, data, privateKey, from, to) {
    const rawTx = {
        nonce: nonceHex,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        data: data,
        from: from,
        to: to
    }

    console.log("rawTx: ", rawTx)

    // Sign
    const privateKeyBuffer = new Buffer(privateKey, 'hex')
    const tx = new Tx(rawTx)
    tx.sign(privateKeyBuffer)
    const serializedTx = tx.serialize()

    return serializedTx
  }

  /**
   * Send Raw Transaction
   * @param {string} serializedTx
   * @param {string} isDeploy
   * @return {string} txHash or contractAddress
   */
  sendRawTransaction(serializedTx, isDeploy) {
    // Send Transaction
    web3.eth.sendRawTransaction( '0x' + serializedTx.toString('hex'), (err, txHash) => {
      if (!err) {
          console.log("txHash:", txHash)
          if (isDeploy) { return(this.waitForMining(txHash)) }
          else { return(txHash) }
      } else {
          console.log(err)
      }
    });
  }

  /**
   * Wait for mining, and return contract address
   * @param {string} txHash
   * @return {string} contractAddress
   */
  waitForMining(txHash) {
    console.log('mining....')
    const receipt = web3.eth.getTransactionReceipt(txHash);
    // polling
    if (receipt == null) {
      setTimeout(() => {
        return(this.waitForMining(txHash))
      }, 2000);
    } else {
      console.log('contract address: ' + receipt.contractAddress)
      return(null)
    }
  }


  /**
   * IPFS - addRecord
   * @param {string} records
   * @return {string} ipfsHashHex
   */
  addRecord (records) {

    return new Promise( function(resolve, reject) {
  		ipfs.add(records, (err, ipfsHash) => {
  			if (err !== null) {
  				console.log("error:", err)
  				reject(err);
  				return; }

  			console.log("[addRecord] ipfsHash:", ipfsHash)
        var hexBuf = new Buffer(bs58.decode(ipfsHash))
        const ipfsHashHex = '0x' + hexBuf.toString('hex').slice(4)
        console.log("[addRecord] ipfsHashHex:", ipfsHashHex)

  			resolve(ipfsHashHex)
  		})
  	})
  }

  /**
   * IPFS - getRecord
   * @param {string} ipfsHashHex
   * @return {string} result
   */
  getRecord(ipfsHashHex) {
    return new Promise( function(resolve, reject) {
      let that = this

      console.log('[getRecord] ipfsHashHex:', ipfsHashHex)
      var buf = new Buffer('1220' + ipfsHashHex.slice(2), 'hex');
      let ipfsHash = bs58.encode(buf);
      console.log('[getRecord] ipfsHash : ', ipfsHash)
      
      ipfs.cat(ipfsHash, function(err, result) {
        console.log(err, result);
        if (err !== null) {
          console.log("error:", err)
          reject(err);
          return;
        }
        console.log("result:", result)
        resolve(result)
      })
    })
  }
}

// Start repl
require('repl').start({})

module.exports = Helpers;
