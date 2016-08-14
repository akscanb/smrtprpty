
exports = module.exports = function (server) {
  var io = require('socket.io');
  var lightwallet = require('eth-lightwallet');
  var ws = io(server);
  var Web3 = require('web3');
  var currentHolder = "";
  var currentContent;
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://dci-node-1.media.mit.edu:8545"));
  }
  var abiArray = [ { "constant": true, "inputs": [], "name": "currentHolder", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "Property Token" } ], "type": "function" }, { "constant": false, "inputs": [], "name": "withDraw", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "100" } ], "type": "function" }, { "constant": false, "inputs": [], "name": "pay", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "CEOaddress", "outputs": [ { "name": "", "type": "address", "value": "0xc27f3b8e5b15fc2579b87206ad827f3cfc008cbd" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "currentIndex", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "standard", "outputs": [ { "name": "", "type": "string", "value": "Token 0.1" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "paidUntil", "outputs": [ { "name": "", "type": "uint256", "value": "1471013866" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "indexes", "outputs": [ { "name": "", "type": "address", "value": "0xc27f3b8e5b15fc2579b87206ad827f3cfc008cbd" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "PT" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "price", "outputs": [ { "name": "", "type": "uint256", "value": "100000000000000000" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "supplyIncreaseRate", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "100" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "Property Token" }, { "name": "decimalUnits", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "value": "0" }, { "name": "tokenSymbol", "type": "string", "index": 3, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "PT" }, { "name": "ceoAddress", "type": "address", "index": 4, "typeShort": "address", "bits": "", "displayName": "ceo Address", "template": "elements_input_address", "value": "" }, { "name": "supplyIncRateNum", "type": "uint256", "index": 5, "typeShort": "uint", "bits": "256", "displayName": "supply Inc Rate Num", "template": "elements_input_uint", "value": "" }, { "name": "supplyIncRateDen", "type": "uint256", "index": 6, "typeShort": "uint", "bits": "256", "displayName": "supply Inc Rate Den", "template": "elements_input_uint", "value": "" }, { "name": "_price", "type": "uint256", "index": 7, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;price", "template": "elements_input_uint", "value": "" } ], "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "payer", "type": "address" }, { "indexed": false, "name": "paidUntil", "type": "uint256" } ], "name": "Payment", "type": "event" } ];
  var contractAddress = '0x9eb06FbCD5f1379142d5A3e51413Ba9b01d211C0';


  var MyContract = web3.eth.contract(abiArray);

  // instantiate by address
  //var number=0;
  //console.log(web3.eth.blockNumber);
  // while(true){
  //
  //   var state = web3.eth.getStorageAt(contractAddress,number,"latest");
  //   console.log(state);
  //   console.log(number)
  //   number ++;
  //
  // }

  var myContractInstance = MyContract.at(contractAddress);

  var pricePerMin = myContractInstance.price();

  var event = myContractInstance.Payment();
  console.log('hi');
  event.watch(function(error,result) {
    if(!error) {
      console.log(result.hasOwnProperty('args') && result.args.hasOwnProperty('payer'));
      if (result.hasOwnProperty('args') && result.args.hasOwnProperty('payer')) {
        currentHolder = result.args.payer+'';
        console.log('New holder: '+result.args.payer);
      }
    } else {
      console.log('Event error: '+error);
    }
  })


  ws.on('connection',function(socket){
    if(currentContent){
      ws.emit('onConnect',{
        msg : currentContent
      })
    }

    ws.emit('price', {
      msg : pricePerMin
    })

    socket.on('signedMessage',function(data){
      var recoveredAddress = lightwallet.signing.recoverAddress(data.msg, data.v,data.r,data.s);
      console.log('Received message '+data.msg+' signed by '+recoveredAddress.toString('hex'));
      // To do: Check if address is allowed to operate service
      // To do: Check message
      var msgSender = '0x'+ recoveredAddress.toString('hex');
      console.log(msgSender);
      console.log(currentHolder);
      console.log(currentHolder==msgSender);
      console.log(data.msg);
      if(currentHolder==msgSender){
        currentContent = data.msg;
        ws.emit('newContent',{
          msg : data.msg
        })
      }

    })

  })
}
