"use strict";


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

async function _parse(ctx, ctr){
    return await ctr.libs.$parse(ctx)
}

function *chat(oridata, $chat){

    return $chat.run({

        get: ()=>{
            oridata.fkp = 'FKP-REST'
            return oridata;
        },

        post: ()=>{
            var post_data = '我是post数据'
            try {
                _parse(this, $chat)
                .then( body => {

                    if (!body){
                        this.throw("The topic body is empty", 400);
                    }

                    var rtn_data = {
                        user: body.user||'匿名',
                        message: body.message
                    }
                    post_data = body.message
                    if (body.message.indexOf('FKP')===-1){
                        SIO.emit('imchat', rtn_data);
                    }
                })

            } catch (e) {
                console.log(e);

            } finally {
                return [];
            }
        }
    })
}

export {chat as getData}


// var libs = require('libs/libs')
//
// function *chat(oridata) {
//
//     var method = this.method;
//
//     if (method === 'GET') {
//         oridata.fkp = 'FKP-REST'
//         return oridata;
//     }
//
//     if (method === 'POST') {
//         var post_data = '我是post数据'
//
        // try {
        //     var body = yield libs.$parse(this);
        //     if (!body){
        //         this.throw("The topic body is empty", 400);
        //     }
        //     var rtn_data = {
        //         user: body.user||'匿名',
        //         message: body.message
        //     }
        //     post_data = body.message
        //     if (body.message.indexOf('FKP')===-1){
        //         SIO.emit('imchat', rtn_data);
        //     }
        //
        // } catch (e) {
        //     console.log(e);
        //
        // } finally {
        //     return [];
        // }
//     }
// }
//
// module.exports = {
//     getData : chat
// }
