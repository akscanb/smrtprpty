/*/
/* This script should look for a payment event in the smrtprprty contract
/* and either try to look up a related twitter account and stream tweets
/* or alternatively accepts signed messages of websites or twitter handles.
/*/



/******************/
/* OneName config */
/******************/

var onenameAPI = require('onename-api'),
    OnenameClient = onenameAPI.OnenameClient

onenameClient = new OnenameClient(process.env.ONENAME_APP_ID, process.env.ONENAME_APP_SECRET)

/******************/
/* Twitter config */
/******************/

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_SECRET_KEY
});

/*******************/
/* Ethereum config */
/*******************/

var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));
}

abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"withDraw","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"CEOaddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"currentIndex","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"equityMarker","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"indexes","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"supplyIncreaseRate","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"},{"name":"ceoAddress","type":"address"},{"name":"equityGoal","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

contractAddress = '0xbaF3FD6D81Fbe3D1eDd140f528D7C1A7976fae31';


// This function should resolve a twitter account based on 
// function getTwitterHandleForAddress(address, cb) {
// 	onenameClient.searchUsers('Ethereum:'+address, cb(err, data)
// }

web3.eth.defaultAccount = '0x2fb02443e29b2fdddfd326d1ab9c7b824ebc1913'

console.log(web3.eth.defaultAccount);

var MyContract = web3.eth.contract(abiArray);
// instantiate by address
var myContractInstance = MyContract.at(contractAddress);

var result = myContractInstance.withDraw()

var result = web3.eth.estimateGas(myContractInstance.withDraw());

console.log(result);




// var event = myContractInstance.Payment({valueA: 23} [, additionalFilterObject])

// // watch for changes
// event.watch(function(error, result){
//   if (!error)
//     console.log(result);
// 	//getTwitterHandleForAddress()
// });

// // Or pass a callback to start watching immediately
// var event = myContractInstance.MyEvent([{valueA: 23}] [, additionalFilterObject] , function(error, result){
//   if (!error)
//     console.log(result);
// });




// var stream = client.stream('statuses/filter', {track: 'javascript'});
// stream.on('data', function(tweet) {
//   console.log(tweet.text);
// });
 
// stream.on('error', function(error) {
//   throw error;
// });
