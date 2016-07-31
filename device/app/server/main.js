exports = module.exports = function (server) {
  var io = require('socket.io');
  var lightwallet = require('eth-lightwallet');

  var ws = io(server);
  ws.on('connection',function(socket){
    socket.on('signedMessage',function(data){
      //console.log(data);
      //console.log(data.v);
      var recoveredAddress = lightwallet.signing.recoverAddress(data.msg, data.v,data.r,data.s);
      console.log(recoveredAddress.toString('hex'));
      socket.emit('test',{
        msg : data.msg
      })
    })

  })
}
