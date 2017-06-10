import Web3 from 'web3'

import Ipfs from 'ipfs-mini'
import bs58 from 'bs58';

const config = require('./../config.json');

// Set web3
const web3Host = config.web3.host
const web3Port = config.web3.port
const web3Protocol = config.web3.protocol
const web3 = new Web3(new Web3.providers.HttpProvider(web3Protocol + '://' + web3Host + ':' + web3Port ));

const myContractAddress = config.myContractAddress
const myAccount = config.myAccount
const myPrivkey = config.myPrivkey
const myAbi = "...." // TODO

// Set IPFS
const ipfsHost = config.ipfs.host
const ipfsPort = config.ipfs.port
const ipfsProtocol = config.ipfs.protocol
const ipfs = new Ipfs({
	host: ipfsHost,
	port: ipfsPort,
	protocol: ipfsProtocol,
});

//  TODO: Set contract
// const MedContract = web3.eth.contract(myAbi)
// const myContract = MedContract.at(myContractAddress)


exports.listenEvent = function() {
  let event = myContract.Query()
  event.watch((error, result) => {
    var items = result.args.items
    var patientId = result.args.patientId
    var sign = result.args.patientId
    var requesterPubkey = result.args.requesterPubkey

    verify(requesterPubkey, sign)

    //  TODO: set sample data
    const records = "yo!"
    const targetContract = ""

    addRecord().then(function(ipfsHash){
        return callReceiveFunction(targetContract, patientId, ipfsAddress)
      }
    )
  });
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

function callReceiveFunction(targetContractAddresss, patientId, ipfsAddress) {
  console.log(targetContractAddresss, patientId, ipfsAddress)
  var result = {targetContractAddresss, patientId, ipfsAddress}
  return result
  // TODO Set Contract
  // const contract = MedContract.at(myContractAddress)
  // contract.receive(patientId,ipfsAddress , { from: myContractAddress, gas: 250000})
}

function base58ToHex(b58) {
  var hexBuf = new Buffer(bs58.decode(b58));
  return hexBuf.toString('hex');
};

function hexToBase58(hexStr) {
  var buf = new Buffer(hexStr, 'hex');
  return bs58.encode(buf);
};
