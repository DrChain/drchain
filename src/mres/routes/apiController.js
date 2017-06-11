let express = require('express')
let io = require('socket.io')()
let conf = require('../env/backend')

let router = express.Router()

let Web3 = require('web3')
let Ipfs = require('ipfs-mini')
let bs58 = require('bs58')
let url = require('url')
let Helpers = require('./utils')

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
const myAbi = [{"constant":false,"inputs":[{"name":"signedHash","type":"bytes32"},{"name":"ipfs_url","type":"bytes32"}],"name":"doMyBest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"patientId","type":"string"},{"name":"json","type":"string"},{"name":"signedHash","type":"bytes32"}],"name":"showMeYourRecord","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"patientId","type":"string"},{"indexed":false,"name":"json","type":"string"},{"indexed":true,"name":"signedHash","type":"bytes32"}],"name":"requestH1Data","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"signedHash","type":"bytes32"},{"indexed":false,"name":"ipfs_url","type":"bytes32"}],"name":"passDataToH2","type":"event"}]

const recordContract = web3.eth.contract(myAbi)



// Set IPFS
const ipfsHost = config.ipfs.host
const ipfsPort = config.ipfs.port
const ipfsProtocol = config.ipfs.protocol
const ipfs = new Ipfs({
  host: ipfsHost,
  port: ipfsPort,
  protocol: ipfsProtocol,
});

io.on('connection', function(client) {
  console.log(client.id)
})

io.listen(conf.wsPort)

// TODO
const IS_EVENT_TEST = true

function callQueryFunction(contractAddress, patientId, json, signedHash) {
  const myRecordContract = recordContract.at(contractAddress)
	var tx = myRecordContract.showMeYourRecord(patientId, json, signedHash, {from: myAccount, gas: 4700000})
  console.log("Transaction ID is " + tx)
  return tx
}

function getRecord(ipfsHash) {
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
}

router.post('/api/records', function (req, res, next) {
  const utils = new Helpers()

	var sign = req.body.sign
  console.log("sign: ", sign)
  console.log('req.body.content: ', req.body.content)
	
  let content = JSON.parse(req.body.content).content

	console.log("content: ", content)

  // TODO: Remove
  // Sign message as Patient
  const patientPrikey = "f481625bf23f9f5a02fd5b8d1abafef8e8c9e423ae36724f5231bbe19e0baa64"
  const result = utils.signMsg(patientPrikey, JSON.stringify(content))
  const messageHashx = result[0]
  sign = result[1]



	// TODO
	const applicantId = content.records[0].hosiptalId
	const patientId = content.patientId
	console.log('applicantId:', applicantId)
	const contractAddress = dbData.hosiptals[applicantId - 1].contractAddress
	console.log('contractAddress:', contractAddress)

  var json = JSON.stringify(content)

  // TODO: old sign is too long
  if (IS_EVENT_TEST) {
    console.log('[callQueryFunction]')
    console.log('    right sign:', sign)
    console.log('    right json:', json)

    sign = '0x5da4800a548dde5f97d458910c4c171ad3899af7a69f002d19197714a8821072'
    json = 'testyooo'
    console.log('    sign:', sign)
    console.log('    json:', json)
  }



	callQueryFunction(contractAddress, patientId, json, sign)

  const myContract = recordContract.at(myContractAddress)
  var filter = myContract.passDataToH2()
  // TODO var event = myContract.passDataToH2({patientId: patientId})
  filter.watch((error, result) => {
    // event.stopWatching();
    if (error) {
  		console.log("Error: " + error);
  	} else {
      console.log('result.args:', result.args)
      const json = result.args.signedHash
      const ipfs_url = result.args.ipfs_url

      // TODO: decrypt ipfs_url to ipfsHash

  		// const ipfsHash = ipfs_url
      const ipfsHash = 'QmS91fDHGTR4QHxcGoCYQu2xD6s97ZWBfmCz2CbiwGsLeh'

      getRecord(ipfsHash)
      .then(
    	 	record => {
          console.log(record)
    			// TODO: WebSocket to front-end
          io.emit('record_received', record)
          
          const result = {
    		    isSuccess: true,
    				record: record
    		  }
    		}
      ).catch((err) => {
        console.log('fail', err);
      })
    }
  })

  res.send("ok")
})
router.get('/', function(req, res, next) {
  res.render('index');
})



module.exports = router
