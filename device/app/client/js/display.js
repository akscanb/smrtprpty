
var io = require('socket.io-client');
var socket = io.connect();


function setContent(content) { 
  var iframe = $("#displayout")
  iframe.attr('src',content);
}

var urllink = 'https://www.youtube.com/embed/mb6Jc4juSF8'
$("#displayout").ready(function(){
  setContent(urllink);
})


socket.on('newContent', function(data) {
  console.log('New content received" '+data.msg);
  setContent(data.msg);

})



