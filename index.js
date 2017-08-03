//要將這邊的網址變成動態查詢
const socket = require('socket.io-client')(process.env.HOST);
const pm2Tool = require("./lib/pm2Tool");
const processTool = require("./lib/processTool");
let timer = null;
socket.on('connect', function(so){
  console.log("connect");
  timer = setInterval(() => {
    const osStats = processTool.getOSStats();
    pm2Tool.list().then((list) => {
      socket.emit("message", Object.assign({}, osStats, {processList: list}));
    })
  }, 3000);

});

socket.on('disconnect', function(){
  clearInterval(timer);
});
