var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('message', function(data){
    console.log("clientData", data)
  });
  client.on('disconnect', function(){
    //斷線警報
  });
});
server.listen(8888);
