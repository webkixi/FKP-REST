var io = require('socket.io-client')
var socket = io();
// socket.on('article_count', function(val){
//     alert(val)
// });


// sample
// in your js file `var xxx = require("modules/websocket/index")`
// xxx(name, callback)

function ws(name, cb){
    if (name && typeof name === 'string' && typeof cb === 'function')
        socket.on(name, cb)
}

module.exports = ws
