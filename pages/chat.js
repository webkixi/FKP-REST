const libs = include('libs/libs')
const _ = libs.lodash;

SIO.on('imchat', function(data, socket){
    var _io = this.io,
        _id = socket.id,
        _socket = socket;

    if (typeof data === 'string'){
        if (data.indexOf('FKP')>-1){
            _socket.emit('imchat', {
                user: 'FKP机器人',
                message: '你好，你妹好吗？'
            })
            setTimeout(()=>{
                _socket.emit('imchat', {
                    user: 'FKP机器人',
                    message: '开个玩笑，不要生气'
                })
            }, 2000)
        }
        if (data==='hi'){
            _socket.emit('imchat', {
                user: 'FKP机器人',
                message: '你好，这里是FKPJS，你试着输入FKP，看看我会说什么'
            })
        }
    }
})

function *chat(oridata) {

    var method = this.method;

    if (method === 'GET') {
        oridata.fkp = 'FKP-REST'
        return oridata;
    }

    if (method === 'POST') {
        var post_data = '我是post数据'

        try {
            var body = yield libs.$parse(this);
            if (!body){
                this.throw("The topic body is empty", 400);
            }
            var rtn_data = {
                user: body.user||'匿名',
                message: body.message
            }
            post_data = body.message
            if (body.message.indexOf('FKP')===-1)
                SIO.emit('imchat', rtn_data)
            return [];
        } catch (e) {
            console.log(e);

        } finally {
            post_data = '你看看，我是websocket的数据'
        }
    }
}

module.exports = {
    getData : chat
}
