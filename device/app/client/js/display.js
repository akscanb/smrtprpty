
var io = require('socket.io-client');
var socket = io.connect();
var data;

function setContent(content) {
  var iframe = $("#displayout")
  iframe.attr('src',content);
}
function videoType(url) {
    if (strpos(url, 'youtube') > 0) {
        return getId(url);
    } elseif (strpos(url, 'vimeo') > 0) {
        return 'vimeo';
    } else {
        return 'unknown';
    }
}
function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}
var urllink = 'https://www.youtube.com/embed/mb6Jc4juSF8'
$("#displayout").ready(function(){
  setContent(urllink);
})


socket.on('newContent', function(data) {
  if (data != data.msg){
    data = data.msg;
    console.log('New content received" '+data.msg);
    setContent(data.msg);
  }
})
