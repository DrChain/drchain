pragma solidity ^0.4.8;

contract Record {

    event requestH1Data(string patientId, string json, bytes32 indexed signedHash);
    event passDataToH2(bytes32 indexed signedHash, bytes32 ipfs_url);

    struct record {
        string patientId;
        string json;
        bytes32 signedHash;
    }

    struct history {
        bytes32 ipfs_url;
        bytes32 signedHash;
    }

    mapping (bytes32 => record) data;
    mapping (bytes32 => history) receipt;

    // H2 ------> H1
    function showMeYourRecord(string patientId, string json, bytes32 signedHash) {

        data[signedHash] = record({
            patientId: patientId,               // patientId
            json: json,                         // request data
            signedHash: keccak256(signedHash),  // authorization
        });

        // Fire event
        requestH1Data(patientId, json, keccak256(signedHash));
    }

    // H1 ------> H2
    function doMyBest(bytes32 signedHash, bytes32 ipfs_url) {

        receipt[signedHash] = history({
            ipfs_url: ipfs_url,                 // ipfs_url
            signedHash: keccak256(signedHash),  // patient's request
        });

        // Fire event
        passDataToH2(keccak256(signedHash), ipfs_url);
    }

}
