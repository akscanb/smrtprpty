
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');

var urllink = 'https://www.youtube.com/embed/mb6Jc4juSF8'
$("#displayout").ready(function(){
  var iframe = $("#displayout")
  iframe.attr('src',urllink);
})


socket.on('test',function(data){
  try{console.log(data.msg)}
  catch(err){
    console.log(err);
  }
  console.log(data.msg);
})
