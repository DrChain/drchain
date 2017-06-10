var privateKey = '5KdLA5jBUja5Emb8vzpXeXdk2jGb1gDeN2jPpnAGCVYQNckkoBe';
var publicKey = '045371c4cee7210724d7733650801914abfeabdeb50960ebcb73de43dd7f020534d8adbaee5e78c0f3c5eb08177e6422f87db150d8275be3125791153feac24cf9';
var message = "foobar";
var bitcore = require('bitcore-lib');
var ECIES = require('bitcore-ecies');

var bob = ECIES()
  .privateKey(new bitcore.PrivateKey(privateKey))
  .publicKey(new bitcore.PublicKey(publicKey));

/**
 * encrypt the message with the publicKey of identity
 * @param  {{privateKey: ?string, publicKey: string}} identity
 * @param  {string} message
 * @return {string}
 */
var encrypt = function(bob, message) {
    /*
     * this key is used as false sample, because bitcore would crash when alice has no privateKey
     */
    var encrypted = bob.encrypt(message);

    return encrypted.toString('hex');
};

/**
 * decrypt the message with the privateKey of identity
 * @param  {{privateKey: ?string, publicKey: string}}   identity
 * @param  {string}   encrypted
 * @return {string}   message
 */
var decrypt = function (bob, encrypted) {
    var decryptMe = new Buffer(encrypted, 'hex');

    var decrypted = bob.decrypt(decryptMe);
    return decrypted.toString('ascii');
};

var enc = encrypt(bob, message);
console.log(enc)
var dec = decrypt(bob, enc);

if (dec != message) {
  console.log('error');
} else {
  console.log(dec);
  console.log('sucess');
}