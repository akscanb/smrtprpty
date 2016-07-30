var HookedWeb3Provider = require("hooked-web3-provider");
var Web3 = require('web3');
var io = require('socket.io-client');
var async = require('async');

require('../sass/wallet.scss');

var web3 = new Web3();
var global_keystore = '';

var signing = lightwallet.signing
var socket = io.connect('http://localhost:3000')


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
  var valueEth = $('#sendValueAmount').val()
  var value = parseFloat(valueEth)*1.0e18
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
