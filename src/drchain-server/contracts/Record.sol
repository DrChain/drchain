pragma solidity ^0.4.8;

contract Record {

    event requestH1Data(string indexed patientId, string json, bytes32 signedHash);
    event passDataToH2(bytes32 indexed signedHash, bytes32 ipfs_url);

    struct record {
        address sender;
        string patientId;
        string json;
        bytes32 signedHash;
        uint256 timestamp;
    }

    struct history {
        address sender;
        bytes32 ipfs_url;
        bytes32 signedHash;
        uint256 timestamp;
    }

    mapping (bytes32 => record) data;
    mapping (bytes32 => history) receipt;

    // H2 ------> H1
    function showMeYourRecord(string patientId, string json, bytes32 signedHash) {

        data[signedHash] = record({
            sender: msg.sender,             // hospital
            patientId: patientId,           // patientId
            json: json,                     // request data
            signedHash: signedHash,         // authorization
            timestamp: block.number         // timestamp
        });

        // Fire event
        requestH1Data(patientId, json, signedHash);
    }

    // H1 ------> H2
    function doMyBest(bytes32 signedHash, bytes32 ipfs_url) {

        receipt[signedHash] = history({
            sender: msg.sender,             // hospital
            ipfs_url: ipfs_url,             // ipfs_url
            signedHash: signedHash,         // patient's request
            timestamp: block.number         // timestamp
        });

        // Fire event
        passDataToH2(signedHash, ipfs_url);
    }


/*
    // Get record timestamp
    function getRecordTimestamp(bytes32 signedHash) constant returns (uint256) {
        return data[signedHash].timestamp;
    }

    // Get record JSON
    function getRecord(bytes32 signedHash) constant returns (string) {
        return data[signedHash].json;
    }
*/

}
