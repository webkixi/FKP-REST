var io = require('socket.io-client')
var socket = io();

// sample
// in your js file `var xxx = require("modules/websocket/index")`
// xxx(name, callback)

function listen(name, cb){
    if (name && typeof name === 'string' && typeof cb === 'function')
        socket.on(name, cb)
}


function emit(name, data){
    if (name && typeof name === 'string'){
        socket.emit(name, data)
    }

}

function mkcb(cb, sk){
    return function(data){
        cb(data, sk)
    }
}

function of(name, cb){
    // var sk = io(name);
    // sk.on('connect', mkcb(cb, sk))
}


module.exports = {
    of: of,
    on: listen,
    emit: emit
}
