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

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

abiArray = [];
contractAddress = '';


// This function should resolve a twitter account based on 
function getTwitterHandleForAddress(address, cb) {
	onenameClient.searchUsers('Ethereum:'+address, cb(err, data)}
}



var MyContract = web3.eth.contract(abiArray);

// instantiate by address
var myContractInstance = MyContract.at(contractAddress);

var event = myContractInstance.Payment({valueA: 23} [, additionalFilterObject])

// watch for changes
event.watch(function(error, result){
  if (!error)
    console.log(result);
	//getTwitterHandleForAddress()
});

// Or pass a callback to start watching immediately
var event = myContractInstance.MyEvent([{valueA: 23}] [, additionalFilterObject] , function(error, result){
  if (!error)
    console.log(result);
});




var stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(tweet) {
  console.log(tweet.text);
});
 
stream.on('error', function(error) {
  throw error;
});
