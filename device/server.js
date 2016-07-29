var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var lightwallet = require('eth-lightwallet');
var currentAddress = '';
var currenURL = '';

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
io.on('connection',function(socket){
  socket.on('signedMessage',function(data){
    console.log(data);
    console.log(data.v);
    var recoveredAddress = lightwallet.signing.recoverAddress(data.msg, data.v,data.r,data.s);
    console.log(recoveredAddress.toString('hex'));

  })
})
