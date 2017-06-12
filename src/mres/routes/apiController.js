let express = require('express')
let io = require('socket.io')()
let conf = require('../env/backend')

let router = express.Router()

let Web3 = require('web3')

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
const myContractAddress = config.myContract
const myAccount = config.myAccount
const myPrivkey = config.myPrivkey
const myAbi = JSON.parse(config.contractAbi)
const recordContract = web3.eth.contract(myAbi)

io.on('connection', function(client) {
  console.log(client.id)
})

io.listen(conf.wsPort)

// TODO
const IS_EVENT_TEST = true
const utils = new Helpers(config)

function callQueryFunction(contractAddress, patientId, json, signedHash) {
  let tx = utils.callContract(contractAddress, myAbi, 'showMeYourRecord', [patientId, json, signedHash])
  return tx
}


router.post('/api/records', function (req, res, next) {
  try {
  	var sign = req.body.sign
    console.log("sign: ", sign)
    console.log('req.body.content: ', req.body.content)
    let content = JSON.parse(req.body.content).content

    // TODO: Remove
    // Sign message as Patient
    const patientPrikey = "f481625bf23f9f5a02fd5b8d1abafef8e8c9e423ae36724f5231bbe19e0baa64"
    const result = utils.signMsg(patientPrikey, JSON.stringify(content))
    const messageHashx = result[0]
    sign = result[1]


  	// TODO: Handle multiple records
  	const applicantId = content.records[0].hosiptalId
  	const patientId = content.patientId
  	console.log('applicantId:', applicantId)

    // TODO: Every hosiptal should own a contract
  	// const contractAddress = dbData.hosiptals[applicantId - 1].contractAddress
    const contractAddress = myContractAddress

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
    var event = myContract.passDataToH2()

    // TODO: use filter conditions
    // var event = myContract.passDataToH2({patientId: patientId})

    event.watch((error, result) => {
      event.stopWatching();
      if (error) {
    		console.log("Error: " + error);
    	} else {
        console.log('result.args:', result.args)
        const json = result.args.signedHash
        const ipfs_url = result.args.ipfs_url

        // TODO: decrypt ipfs_url to ipfsHash

    		const ipfsHash = ipfs_url

        utils.getRecord(ipfsHash)
        .then(
      	 	record => {
            console.log(record)

      			// Send to front-end via WebSocket
            io.emit('record_received', record)

      		}
        ).catch((err) => {
          console.log('fail', err);
        })
      }
    })

    res.send("ok")
  } catch(err) {
    console.log(err)
  }
})
router.get('/', function(req, res, next) {
  res.render('index');
})

module.exports = router
