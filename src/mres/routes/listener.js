let Web3 = require('web3')
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


const myAbi = JSON.parse(config.contractAbi)

// Helpers function
const utils = new Helpers(config)

function callReceiveFunction(contractAddress, signedHash, ipfs_url) {
	// doMyBest(bytes32 signedHash, bytes32 ipfs_url)
	let tx = utils.callContract(contractAddress, myAbi, 'doMyBest', [signedHash, ipfs_url])
  return tx
}

const recordContract = web3.eth.contract(myAbi)
const myContract = recordContract.at(myContractAddress)

var filter = myContract.requestH1Data()
filter.watch((error, result) => {
	// Never stop to listen

	if (error) {
		console.log("1 Error: " + error);
	} else {
		console.log('result.args:', result.args)
		var json = result.args.json
		var signedHash = result.args.signedHash

		fakeJson = '{"patientId":"A12345678","applicant":{"id":2,"name":"貓大醫院","pubkey":"TODO"},"records":[{"hosiptalId":1,"recordId":1,"recordName":"熊大醫院 內科檢查"}]}'
		fakeSignedHash = '0x5da4800a548dde5f97d458910c4c171ad3899af7a69f002d19197714a8821072'
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
				utils.addRecord(data)
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
