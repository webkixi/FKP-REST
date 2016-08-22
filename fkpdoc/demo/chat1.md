# websocket chat实例(node篇)

> 聊天室只是websocket的一个典型应用，不只聊天室，webapp应用中很多细节部分通过websocket，能够实现交互非常好的效果，例如消息推送，实时更新，金融系webapp的滚动数据等等。  

前一篇我们将聊天室的前端部分完成，这一篇进入NODE部分，由NODE端提供服务，支撑前端的交互，UI，数据等等。

## 全局websocket，从index.js开始  
在`FKPJS`中，我们同样封装的是`socket.io`这个库，因为它同时支持两端嘛。为方便各个模块、路由业务页面，websocket
作为全局存在，以模块的方式引入到`index.js`当中。   
```
// 引入模块文件
var socketio = require('./modules/wsocket'),  
```
需要注意的是，这里的modules是NODEJS端的模块文件夹，前端的模块文件夹在public目录下。  

![index_meitu_2.jpg](/uploader/web-3291599242874736471173811658568.jpg)   

如上图，仔细对照图中的文件index.js，不要混淆了。这个index.js是`FKPJS`的NODE端的入口文件，一切服务都从这里开始，
这篇主要讲述`websocket`部分，其他很多的内容，以后再开文另讲。   

> index.js，代码在113行左右，如下  

```
// websocket 初始化
var server = socketio.init(app)

//router
route.call(this,app,_mapper,render(args[0]))

//websocket统一挂载on
socketio.run();

```
我的注释应该很清楚吧！在路由启动前，启动websocket的初始化，这样我们的路由业务页面就可以使用websocket来为前端提供服务了。  

## 聊天室的node端  
由前端发起的请求，我们在node端接收并处理，如`GET`、`POST`请求；在通过websocket实时返回数据，文件如下图  

![nodechat_meitu_3.jpg](/uploader/web-36350386549052656777713386863.jpg)     

同样，对照上下目录，请找准相应的文件  

> 上代码  

```
// 监听有client端传送过来的数据
// SIO是全局websocket的变量
// 监听`imchat`入口
// @data，client端传入的数据
// @socket，io的soket连接
SIO.on('imchat', function(data, socket){

    // this只有一个io，这个io很大，很屌，可以干很多事情，一般不用
    var _io = this.io,
        _id = socket.id, //悄悄话就靠这个
        _socket = socket;

    if (typeof data === 'string'){

        // client端传入数据处理
        if (data.indexOf('FKP')>-1){

            // 向clent端发送数据，凡监听`imchat`的client都能收到此信息
            _socket.emit('imchat', {
                user: 'FKP机器人',
                message: '你好，你妹好吗？'
            })

            // 演示2秒发送另一条数据
            setTimeout(()=>{
                _socket.emit('imchat', {
                    user: 'FKP机器人',
                    message: '开个玩笑，不要生气'
                })
            }, 2000)

        }

        // client端传入数据处理
        if (data==='hi'){
            _socket.emit('imchat', {
                user: 'FKP机器人',
                message: '你好，这里是FKPJS，你试着输入FKP，看看我会说什么'
            })
        }
    }
})

// chat
function *chat(oridata) {

    // FKPJS接收前端的方法
    var method = this.method;

    // GET
    if (method === 'GET') {
        oridata.fkp = 'FKP-REST'
        return oridata;
    }

    // POST
    if (method === 'POST') {
        var post_data = '我是post数据'
        try {
            // 解析POST过来的json
            var body = yield libs.$parse(this);
            if (!body){
                this.throw("The topic body is empty", 400);
            }

            var rtn_data = {
                user: body.user||'匿名',
                message: body.message
            }

            post_data = body.message

            if (body.message.indexOf('FKP')===-1){
                // 向client端输出数据
                // 这里可不是ajax
                SIO.emit('imchat', rtn_data)
            }

            // ajax返回空数组
            return [];

        } catch (e) {         
            console.log(e);
        } finally {
            post_data = '你看看，我是websocket的数据'
        }
    }
}

// FKPJS的chain
module.exports = {
    getData : chat
}
```

哈哈，node端就这么多，还有一个地方需要修改下，是前端的`dbdemo.jsx`文件，也就是博客列表，我们在博客列表中
监听`imchat`，这样，聊天室一旦有人在聊天，在博客列表的同学就能第一时间知道这个内容。如下图的效果  

![聊天室](/images/doc/chat/xg3.jpg)  

修改`public/src/pc/js/pages/dbdemo/index.jsx`文件，加入如下代码  

```
WS.on('imchat', function(data){
    // libs.msgtips('有人在聊天室聊天哦','warning')
    // libs.msgtips('去 /chat 看看情况','center')
    $('.chattip').show().addClass('animated tada')
    setTimeout(function(){
        $('.chattip').hide().removeClass('animated tada')
    },10000)
})
```  

好了，至此，我们的websocket的聊天室实例讲解完成了  
