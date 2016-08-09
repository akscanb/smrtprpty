
var io = require('socket.io-client');
var socket = io.connect();
var data;

function setContent(content) {
  var iframe = $("#displayout")
  iframe.attr('src',content);
}


/**parses video url**/
function parseVideo(url) {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  var vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  var parsed = url.match(vimeoRegex);
  if (match && match[2].length == 11) {
    //parsed youtube link
    return "https://www.youtube.com/embed/"+match[2]+"?autoplay=1";
  } else if(parsed){
    //parsed vimeo link
    return "//player.vimeo.com/video/" + parsed[1]+"?autoplay=1";
  }
  else{
    return url;
  }
}

var urllink = 'http://www.media.mit.edu'

$("#displayout").ready(function(){
  setContent(parseVideo(urllink));
  console.log('done');
})


socket.on('newContent', function(data) {
  if (data != data.msg){
    data = data.msg;
    console.log('New content received" '+data.msg);
    var stringdata = ""+data.msg;
    setContent(parseVideo(stringdata));
  }
})
