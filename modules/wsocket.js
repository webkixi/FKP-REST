/**
 * websocket 模块
 */
var koa = require('koa');

//初始化
var app = koa()

var server = require('http').createServer(app.callback()),
    io = require('socket.io')(server);

// websocket connection
// io.of('/blog')  破坏了路由
io.on('connection', function(socket){
	// socket.broadcast.emit('hi');
	// io.emit('xxx', { 'data': msg });
	// socket.on('xxx',function(msg){
	// });
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

// websocket emit something
function wspush(name,msg){
	io.emit(name, { 'data': msg });
}

server.listen(7001);

module.exports = {}
