import { Router } from 'express'
import Web3 from 'web3'
import Ipfs from 'ipfs-mini'
import bs58 from 'bs58';
import { addRecord, getRecord } from './../listener'
import url from 'url'

var router = Router()

const config = require('./../../config.json');

// Set web3
const web3Host = config.web3.host
const web3Port = config.web3.port
const web3Protocol = config.web3.protocol
const web3 = new Web3(new Web3.providers.HttpProvider(web3Protocol + '://' + web3Host + ':' + web3Port ));

// Set contract infomation
const myContractAddress = config.myContractAddress
const myAccount = config.myAccount
const myPrivkey = config.myPrivkey
const myAbi = "...." // TODO

function callFunction() {
	// TODO: connect utils
	return true
}

function watchEvent() {
		// TODO
		return new Promise( function(resolve, reject) {
			resolve('Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD')
		})
}


function decryptRecord(secret) {
	// TODO
	return secret
}

router.get('/records', function (req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log('sign: ', req.query.sign, ' ,content: ', req.query.content)


	// TODO:
	callFunction()

	watchEvent()
	.then(
		json => {
			// TODO: parse json to ipfsHash
			const item = json
			return getRecord(item)
	}).then(
		 	record => {
				// TODO: render to front-end
				const result = {
			    isSuccess: true,
					record: record
			  }
			  res.json(result)
			}
	)
})



export default router
