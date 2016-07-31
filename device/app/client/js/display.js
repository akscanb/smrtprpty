
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');
var urllink = 'https://www.youtube.com/embed/mb6Jc4juSF8'
var iframe = $("#displayout")
iframe.attr('src',urllink);
socket.on('signedMessage',function(data){
  try{
    iframe.attr('src',data.msg)
  }catch(err){
    console.log(err);
  }
  console.log(data.msg);
})
