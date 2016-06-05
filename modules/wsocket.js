var http = require('http'),
    socket_config = {},
    io,
    Server = require('socket.io');


function websocket(app){
    var scfg = socket_config;

    var srv = http.createServer(app.callback());
    io = new Server(srv);

    // websocket emit something
    function wspush(name, msg){
    	io.emit(name, msg);
    }

    function wson(name, cb){
        if (scfg[name]) return;
        scfg[name] = cb;
    }

    function wsuse(cb){
        return io.use(cb)
    }

    function robot(data){

    }

    global.SIO = {
        on: wson,
        emit: wspush,
        use: wsuse,
        robot: robot
    }

    return srv;
}

function of(path){
    if (io){
        io.of(path)
        run()
    }
}

function run(){
    function mkmkon(cb, skt){
        return function(data){
            cb.call({io: io}, data, skt)
        }
    }

    function mkon(skt){
        var scfg = socket_config;
        var _keys = Object.keys(scfg)
        _keys.map(function(item, i){
            var _cb = mkmkon(scfg[item], skt)
            skt.on(item, _cb)
        })
    }
    if (io){
        io.on('connection', function(socket){
            mkon(socket);

            // socket.on('imchat', function(data){
            //     io.emit('imchat', {data: { user: 'world',message:'ni mei' }});
            // })

            socket.on('disconnect', function(){
                console.log('user disconnect');
            })
        })
    }
}

module.exports = {
    init: websocket,
    of: of,
    run: run
}
