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
const myContractAddress = config.myContract // '0x53c29e930753eec03002316e69565eb6cae707cc'
const myAccount = '0xfd54bccece385e59ca9549cea0322d133ea1e640'
const myPrivkey = 'dc335d1563244f9ff4babf57dd797b5b1ba3fa74ba42bd41133ed94d7f4f9f1d'


const myAbi = [{"constant":false,"inputs":[{"name":"signedHash","type":"bytes32"},{"name":"ipfs_url","type":"bytes32"}],"name":"doMyBest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"patientId","type":"string"},{"name":"json","type":"string"},{"name":"signedHash","type":"bytes32"}],"name":"showMeYourRecord","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"patientId","type":"string"},{"indexed":false,"name":"json","type":"string"},{"indexed":true,"name":"signedHash","type":"bytes32"}],"name":"requestH1Data","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"signedHash","type":"bytes32"},{"indexed":false,"name":"ipfs_url","type":"bytes32"}],"name":"passDataToH2","type":"event"}]

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

// exports.listenQueryEvent = function () {
// 	const recordContract = web3.eth.contract(myAbi)
// 	const myContract = recordContract.at(myContractAddress)
//
// 	return new Promise( function(resolve, reject) {
// 		var event = myContract.requestH1Data()
// 		return event.watch()
// 	}).then( (error, result) => {
//     // event.stopWatching();
// 		console.log('result.args:', result.args)
//
//     json = result.args.json
//     signedHash = result.args.signedHash
//     console.log("json:", json, " signedHash:", signedHash)
//
// 		const messageHashx = web3.sha3(json)
// 		const patientId = JSON.parse(json).patientId
// 		const recordId = JSON.parse(json).records[0].recordId
// 		const applicantId = JSON.parse(json).applicant.id
// 		const targetContract = dbData.hosiptals[applicantId - 1].contractAddress
// 		const patientAccount = dbData.patientId[0].account
// 		if (utils.verifySig(messageHashx, signedHash, patientAccount)) {
// 			resolve(recordId)
// 		} else {
// 			reject()
// 		}
//   }).then( recordId => {
// 			const data = JSON.stringify(dbData.records[0])
// 			return addRecord()
// 	}).then( ipfsHash => {
// 		// TODO: encrypt ipfsHash to ipfs_url
// 		const ipfs_url = ipfsHash
//
// 		// callReceiveFunction(contractAddress, signedHash, ipfs_url)
// 		return callReceiveFunction(targetContract, patientId, ipfs_url)
// 	}).then (
// 		txId => resolve(txId)
// 	)
// }

function addRecord (records) {
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

function callReceiveFunction(contractAddress, signedHash, ipfs_url) {
	// doMyBest(bytes32 signedHash, bytes32 ipfs_url)
  let myRecordContract = recordContract.at(contractAddress)
  let txId = myRecordContract.doMyBest(signedHash, ipfs_url, {from: myAccount, gas: 4700000})
  console.log("Transaction ID is " + txId)
  return txId
}

function base58ToHex(b58) {
  var hexBuf = new Buffer(bs58.decode(b58));
  return hexBuf.toString('hex');
};

function hexToBase58(hexStr) {
  var buf = new Buffer(hexStr, 'hex');
  return bs58.encode(buf);
};


const recordContract = web3.eth.contract(myAbi)
const myContract = recordContract.at(myContractAddress)

var filter = myContract.requestH1Data()
filter.watch((error, result) => {
	// event.stopWatching();

	if (error) {
		console.log("1 Error: " + error);
	} else {
		console.log('result.args:', result.args)
		var json = result.args.json
		var signedHash = result.args.signedHash

		fakeJson = '{"patientId":"A12345678","applicant":{"id":2,"name":"貓大醫院","pubkey":"TODO"},"records":[{"hosiptalId":1,"recordId":1,"recordName":"熊大醫院 內科檢查"}]}'
		fakeSignedHash = '0xa8096e23557d7de3bec8922d1f84b263926ffabac58d5ac581da875cdc04051950c5639bf3af673f59385de0a2d5ed471714d0e68fdbd42170549510f524b3e000'
		json = fakeJson
		signedHash = fakeSignedHash

		try {
			const messageHash = web3.sha3(json)
			const messageHashx = new Buffer(messageHash.replace("0x", ""), "hex")
			const patientId = JSON.parse(json).patientId
			const recordId = JSON.parse(json).records[0].recordId
			const applicantId = JSON.parse(json).applicant.id
			const targetContract = dbData.hosiptals[applicantId - 1].contractAddress
			const patientAccount = dbData.patients[0].account

      // TODO
			// if (utils.verifySig(messageHashx, signedHash, patientAccount)) { 
			if (true) {
      	const data = JSON.stringify(dbData.records[0])
				addRecord(data)
				.then((ipfsHash) => {
					// TODO: encrypt ipfsHash to ipfs_url
					const ipfs_url = ipfsHash

					// callReceiveFunction(contractAddress, signedHash, ipfs_url)
					callReceiveFunction(targetContract, signedHash, ipfs_url)
				}).catch((err) => {
          console.log('fail', err);
        })
			} else {
        console.log('Error: verifySig error')
			}
		} catch (err) {
			console.log(err)
		}
	}
})
