let express = require('express')

let router = express.Router()

let Web3 = require('web3')
let Ipfs = require('ipfs-mini')
let bs58 = require('bs58')
let url = require('url')
let Helpers = require('./utils')
let listener = require('./listener')

// import { addRecord, getRecord, listenQueryEvent }
// import { Helpers }  from './../../server/utils'


const config = require('./../env/config.json');
const dbData = require('./dbData.json');


// Set web3
const web3Host = config.web3.host
const web3Port = config.web3.port
const web3Protocol = config.web3.protocol
const web3 = new Web3(new Web3.providers.HttpProvider(web3Protocol + '://' + web3Host + ':' + web3Port ));

// Set contract infomation
const myContractAddress = config.myContractAddress
const myAccount = config.myAccount
const myPrivkey = config.myPrivkey
const myAbi = [{"constant":false,"inputs":[{"name":"signedHash","type":"bytes32"},{"name":"ipfs_url","type":"bytes32"}],"name":"doMyBest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"patientId","type":"string"},{"name":"json","type":"string"},{"name":"signedHash","type":"bytes32"}],"name":"showMeYourRecord","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"patientId","type":"string"},{"indexed":false,"name":"json","type":"string"},{"indexed":false,"name":"signedHash","type":"bytes32"}],"name":"requestH1Data","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"signedHash","type":"bytes32"},{"indexed":false,"name":"ipfs_url","type":"bytes32"}],"name":"passDataToH2","type":"event"}]
const recordContract = web3.eth.contract(myAbi)

function callQueryFunction(contractAddress, patientId, json, signedHash) {
    return new Promise( function(resolve, reject) {
        console.log('helloooooooo')
        const myRecordContract = recordContract.at(contractAddress)
				var tx = myRecordContract.showMeYourRecord(patientId, json, signedHash, {from: myAccount, gas: 4700000})
        // var getData = myRecordContract.showMeYourRecord.getData(patientId, json, signedHash);
        // var tx = web3.eth.sendTransaction({from: myAccount, to: contractAddress, data: getData, gas: 4700000});
        console.log("Transaction ID is " + tx);
    })
}


function watchEventHostiptal_2(patientId) {
		return new Promise( function(resolve, reject) {
			const myContract = recordContract.at(myContractAddress)
			var event = myContract.passDataToH2({patientId: patientId})
			return event.watch()
		})
		.then(
			(error, result) => {
		    event.stopWatching();
		    json = result.args.json;
		    signedHash = result.args.signedHash;
		    console.log("json:", json, " signedHash:", signedHash);
				resolve(signedHash)
		  }
		)
}


function decryptRecord(secret) {
	// TODO
	return secret
}



router.get('/api/no', function (req, res, next) {
	return new Promise( function(resolve, reject) {
		listener.listenQueryEvent()
		.then(
			result =>
			res.json(result)
		)
	})
})

router.get('/api/records', function (req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	const sign = req.query.sign
	const content = JSON.parse(req.query.content)


	const utils = new Helpers()
	console.log("content: ", content)
	// TODO:
	const applicantId = content.records[0].hosiptalId
	const patientId = content.patientId
	console.log('applicantId:', applicantId)
	const contractAddress = dbData.hosiptals[applicantId - 1].contractAddress
	console.log('contractAddress:', contractAddress)

	// '0xcc7220706510b11f8404562d0e9621fba7af72cd'

	const patientPrikey = "f481625bf23f9f5a02fd5b8d1abafef8e8c9e423ae36724f5231bbe19e0baa64"
	const result = utils.signMsg(patientPrikey, content.toString())
 	const messageHashx = result[0]
	const signedHash = result[1]

	callQueryFunction(contractAddress, patientId, content.toString(), signedHash)
	.then(
		result => {
			console.log("result:", result)
		}
	)

	watchEventHostiptal_2()
	.then(
		json => {
			// TODO: parse json to ipfsHash
			const item = json
			return listener.getRecord(item)
	}).then(
		 	record => {
				// TODO: WebSocket  to front-end
				const result = {
			    isSuccess: true,
					record: record
			  }
			  res.json(result)
			}
	)
})


router.get('/', function(req, res, next) {
  res.render('index');
})



module.exports = router
