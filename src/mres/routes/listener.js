let Web3 = require('web3')
let Ipfs = require('ipfs-mini')
let bs58 = require('bs58')
let Helpers = require('./utils')

const config = require('./../env/config.json')
const dbData = require('./dbData.json')

// Set web3
const web3Host = config.web3.host
const web3Port = config.web3.port
const web3Protocol = config.web3.protocol
const web3 = new Web3(new Web3.providers.HttpProvider(web3Protocol + '://' + web3Host + ':' + web3Port ));

// const myContractAddress = config.myContractAddress
// const myAccount = config.myAccount
// const myPrivkey = config.myPrivkey

// simulate first
const myContractAddress = '0xfb1aee651a39b2091b9bcbb47d08ce072321a60c'
const myAccount = '0xfd54bccece385e59ca9549cea0322d133ea1e640'
const myPrivkey = 'dc335d1563244f9ff4babf57dd797b5b1ba3fa74ba42bd41133ed94d7f4f9f1d'


const myAbi = [{"constant":false,"inputs":[{"name":"signedHash","type":"bytes32"},{"name":"ipfs_url","type":"bytes32"}],"name":"doMyBest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"patientId","type":"string"},{"name":"json","type":"string"},{"name":"signedHash","type":"bytes32"}],"name":"showMeYourRecord","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"patientId","type":"string"},{"indexed":false,"name":"json","type":"string"},{"indexed":false,"name":"signedHash","type":"bytes32"}],"name":"requestH1Data","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"signedHash","type":"bytes32"},{"indexed":false,"name":"ipfs_url","type":"bytes32"}],"name":"passDataToH2","type":"event"}]

// Set IPFS
const ipfsHost = config.ipfs.host
const ipfsPort = config.ipfs.port
const ipfsProtocol = config.ipfs.protocol
const ipfs = new Ipfs({
	host: ipfsHost,
	port: ipfsPort,
	protocol: ipfsProtocol,
});

// Helpers function
const utils = new Helpers()

//  TODO: Set contract

exports.listenQueryEvent = function () {
	const recordContract = web3.eth.contract(myAbi)
	const myContract = recordContract.at(myContractAddress)

	return new Promise( function(resolve, reject) {
		var filter = myContract.requestH1Data()
		return filter.watch()
	}).then( (error, result) => {
    // event.stopWatching();
		console.log('result.args:', result.args)

    json = result.args.json
    signedHash = result.args.signedHash
    console.log("json:", json, " signedHash:", signedHash)

		const messageHashx = web3.sha3(json)
		const patientId = JSON.parse(json).patientId
		const recordId = JSON.parse(json).records[0].recordId
		const applicantId = JSON.parse(json).applicant.id
		const targetContract = dbData.hosiptals[applicantId - 1].contractAddress
		const patientAccount = dbData.patientId[0].account
		if (utils.verifySig(messageHashx, signedHash, patientAccount)) {
			resolve(recordId)
		} else {
			reject()
		}
  }).then( recordId => {
			const data = JSON.stringify(dbData.records[0])
			return addRecord()
	}).then( ipfsHash =>
		// callReceiveFunction(contractAddress, signedHash, ipfs_url)
		callReceiveFunction(targetContract, patientId, ipfsHash)
	).then (
		txId => resolve(txId)
	)
}

// TODO
function verify(pubkey, sign) {
  return(0)
}

exports.addRecord = function(records) {
  return new Promise( function(resolve, reject) {
		ipfs.add(records, (err, ipfsHash) => {
			if (err !== null) {
					console.log("error:", err)
					reject(err);
					return; }
			console.log("ipfsHash:", ipfsHash)
			resolve(ipfsHash)
		})
	})
}

exports.getRecord = function(ipfsHash) {
  return new Promise( function(resolve, reject) {
    // var ipfsHash = hexToBase58(ipfsHashHex.slice(2));
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
  .then(result => { return result } )
}

function callReceiveFunction(contractAddress, signedHash, ipfs_url) {
		// doMyBest(bytes32 signedHash, bytes32 ipfs_url)
    return new Promise( function(resolve, reject) {
        const myRecordContract = recordContract.at(contractAddress)
        const nonce = web3.eth.getTransactionCount(myAccount)
        myRecordContract.showMeYourRecord(patientId, json, signedHash, {from: myAccount, gas: 4700000, nonce: nonce})
    })
}

function base58ToHex(b58) {
  var hexBuf = new Buffer(bs58.decode(b58));
  return hexBuf.toString('hex');
};

function hexToBase58(hexStr) {
  var buf = new Buffer(hexStr, 'hex');
  return bs58.encode(buf);
};
