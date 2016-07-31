exports = module.exports = function (server) {
  var io = require('socket.io');
  var lightwallet = require('eth-lightwallet');

  var ws = io(server);
  ws.on('connection',function(socket){
    socket.on('signedMessage',function(data){
      var recoveredAddress = lightwallet.signing.recoverAddress(data.msg, data.v,data.r,data.s);
      console.log('Received message '+data.msg+' signed by '+recoveredAddress.toString('hex'));
      // To do: Check if address is allowed to operate service
      // To do: Check message
      ws.emit('newContent',{
        msg : data.msg
      })
    })

  })
}
