var HookedWeb3Provider = require("hooked-web3-provider");
var Web3 = require('web3');
var io = require('socket.io-client');
var async = require('async');

require('../sass/wallet.scss');

var web3 = new Web3();
var global_keystore = '';

var signing = lightwallet.signing
var socket = io.connect()
var abiArray = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string", "value": "device" }], "type": "function" }, { "constant": false, "inputs": [], "name": "withDraw", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256", "value": "2" }], "type": "function" }, { "constant": false, "inputs": [], "name": "pay", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "CEOaddress", "outputs": [{ "name": "", "type": "address", "value": "0xc27f3b8e5b15fc2579b87206ad827f3cfc008cbd" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [], "name": "currentIndex", "outputs": [{ "name": "", "type": "uint256", "value": "0" }], "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8", "value": "0" }], "type": "function" }, { "constant": true, "inputs": [], "name": "standard", "outputs": [{ "name": "", "type": "string", "value": "Token 0.1" }], "type": "function" }, { "constant": true, "inputs": [], "name": "equityMarker", "outputs": [{ "name": "", "type": "uint256", "value": "0" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256", "value": "0" }], "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address", "value": "0xc27f3b8e5b15fc2579b87206ad827f3cfc008cbd" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "indexes", "outputs": [{ "name": "", "type": "address", "value": "0xc27f3b8e5b15fc2579b87206ad827f3cfc008cbd" }], "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string", "value": "dmt" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [], "name": "timePayUnlocks", "outputs": [{ "name": "", "type": "uint256", "value": "1469856151" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256", "value": "0" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "supplyIncreaseRate", "outputs": [{ "name": "", "type": "uint256", "value": "5" }], "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "1" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "device" }, { "name": "decimalUnits", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "value": "0" }, { "name": "tokenSymbol", "type": "string", "index": 3, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "dmt" }, { "name": "ceoAddress", "type": "address", "index": 4, "typeShort": "address", "bits": "", "displayName": "ceo Address", "template": "elements_input_address", "value": "0xc27f3b8e5b15fc2579b87206ad827f3cfc008cbd" }, { "name": "equityGoal", "type": "uint256", "index": 5, "typeShort": "uint", "bits": "256", "displayName": "equity Goal", "template": "elements_input_uint", "value": "5" }], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "currentHolder", "type": "address" }, { "indexed": false, "name": "lockedTill", "type": "uint256" }], "name": "LockedBy", "type": "event" }];
var stringAbi = JSON.stringify(abiArray);

$("#contractAbi").ready(function () {
	$("#contractAbi").attr("value", stringAbi);
});

function setWeb3Provider(keystore) {
  var web3Provider = new HookedWeb3Provider({
    host: "http://dci-node-1.media.mit.edu:8545",
    transaction_signer: keystore
  });
  web3.setProvider(web3Provider);
}

window.newAddresses = (password) => {

  if (password == '') {
    password = prompt('Enter password to retrieve addresses', 'Password');
  }
  var numAddr = parseInt($('#numAddr').val())
  lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
    global_keystore.generateNewAddress(pwDerivedKey, numAddr);
    var addresses = global_keystore.getAddresses();
    $('#sendFrom').html('')
    $('#functionCaller').html('')
    for (var i=0; i<addresses.length; ++i) {
      $('#sendFrom').append('<option value="' + addresses[i] + '">' + addresses[i] + '</option>')
      $('#functionCaller').append('<option value="' + addresses[i] + '">' + addresses[i] + '</option>')
    }
    getBalances();
  })
}

window.getBalances = () => {

  var addresses = global_keystore.getAddresses();
  $('#addr').html('Retrieving addresses...');
  async.map(addresses, web3.eth.getBalance, function(err, balances) {
    async.map(addresses, web3.eth.getTransactionCount, function(err, nonces) {
      $('#addr').html('');
      for (var i=0; i<addresses.length; ++i) {
        $('#addr').append('<div>' + addresses[i] + ' (Bal: ' + (balances[i] / 1.0e18) + ' ETH, Nonce: ' + nonces[i] + ')' + '</div>')
      }
    })
  })
}

window.setSeed = () => {
  var password = prompt('Enter Password to encrypt your seed', 'Password');

  lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
    global_keystore = new lightwallet.keystore($('#seed').val(), pwDerivedKey);
    $('#seed').val('');

    newAddresses(password);
    setWeb3Provider(global_keystore);

    getBalances();
  })
}

window.newWallet = () => {
  var extraEntropy = $('#userEntropy').val();
  $('#userEntropy').val('');
  var randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy);
  var infoString = 'Your new wallet seed is: "' + randomSeed +
  '". Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether. ' +
  'Please enter a password to encrypt your seed while in the browser.'
  var password = prompt(infoString, 'Password');
  lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
    global_keystore = new lightwallet.keystore(randomSeed, pwDerivedKey);

    newAddresses(password);
    setWeb3Provider(global_keystore);
    getBalances();
  })
}

window.showSeed = function() {
  var password = prompt('Enter password to show your seed. Do not let anyone else see your seed.', 'Password');
  lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
    var seed = global_keystore.getSeed(pwDerivedKey);
    alert('Your seed is: "' + seed + '". Please write it down.')
  })
}

window.sendEth = () => {
  var fromAddr = $('#sendFrom').val()
  var toAddr = $('#sendTo').val()
  var valueEth = $('#sendValueAmount').val()
  var value = parseFloat(valueEth)*1.0e18
  var gasPrice = 50000000000
  var gas = 50000
  web3.eth.sendTransaction({from: fromAddr, to: toAddr, value: value, gasPrice: gasPrice, gas: gas}, function (err, txhash) {
    console.log('error: ' + err)
    console.log('txhash: ' + txhash)
  })
}

window.functionCall = () => {
  var fromAddr = $('#functionCaller').val()
  var contractAddr = $('#contractAddr').val()
  var abi = JSON.parse($('#contractAbi').val())
  var contract = web3.eth.contract(abi).at(contractAddr)
  var functionName = $('#functionName').val()
  var args = JSON.parse('[' + $('#functionArgs').val() + ']')
  var valueEth = $('#sendValueAmountFunction').val()
  var value = parseFloat(valueEth)*1000000000000000000;
	console.log(value);
	console.log('in between');
	console.log(valueEth);
  var gasPrice = 50000000000
  var gas = 3141592
  args.push({from: fromAddr, value: value, gasPrice: gasPrice, gas: gas})
  var callback = function(err, txhash) {
    console.log('error: ' + err)
    console.log('txhash: ' + txhash)
  }
  args.push(callback)
  contract[functionName].apply(this, args)
}

window.signMessage = () => {
  var password = prompt('Enter Password', 'Password');
  var message = $('#url').val();
  lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
    var seed = global_keystore.getSeed(pwDerivedKey);
    var ks = new lightwallet.keystore(seed, pwDerivedKey);
    ks.generateNewAddress(pwDerivedKey);
    var addr = ks.getAddresses()[0];
    var signedMsg = signing.signMsg(ks, pwDerivedKey, message, addr);
    console.log(signedMsg.v.toString());
    console.log(signedMsg.r.toString());
    console.log(signedMsg.s.toString());
    socket.emit('signedMessage',{
      v:signedMsg.v,
      r:signedMsg.r,
      s:signedMsg.s,
      msg: message
    });
  });
}
