# websocket chat实例(前端)
> fkp内建了websocket模块, websocket用于实时推送信息到所有客户端，让所有用户同时收到推送的信息，聊天室是websocket最方便直观的一种体现，因此我们先从聊天室开始，看看怎么使用websocket推送消息  

> 在以前，聊天室非常火爆啊，非常多的约炮，约妹的故事都发生在聊天室，现在已经寂静了很多，几乎在百度找不到好用聊天室，当然是开放的   

> 这个聊天室只是一个简单功能的聊天室，有兴趣的朋友可以深入下去，记得给我源码就好了   

### DEMO演示效果图
![聊天室](/images/doc/chat/xg3.jpg)  


## 1、新建模版文件 {id: muban}   
在`public/src/pc/html/`目录下，新建一个模版文件`chat.hbs`
![聊天室](/images/doc/chat/chat.jpg)  

4个ID，'user@用户名', 'message@消息' , 'submit@提交'， 'saloon@容器'

如上图所示：有一个聊天框，和一个简单的form表单，这里的form表单使用的是fkp超级好用的表单生成组件，^_^|||，下面会展开说  

## 2、新建样式表 {id: style}  
当然，在有了结构之后，把表单整漂亮点是第一步要做的事情  

1. 在`public/src/pc/css/pages/`目录下新建样式目录, `chat/` ←←←← 注意这是目录  
2. 在`chat/` 目录下新建一个`index.less`的文件  
3. 开始写文件  

具体怎么写，各位自行研究啊，我写的css比较丑一点，但好在响应式做得还不错，大家可以到源码中自己了解下
源码目录为`public/src/pc/css/pages/chat/index.less`  

## 3、新建js文件 {id: javascript}    

1. 在`public/src/pc/js/pages/`目录下新建js目录, `chat/` ←←←← 注意这是目录  
2. 在`chat/` 目录下新建一个`index.jsx`的文件 ←←←← 注意这是jsx，因为fkp支持react   
3. 开始写文件  

```
// api=jquery.post，但做了封装
// 建议使用`api.req`代替`$.post`
// 有些特殊的api会自动转换
var api = require('libs/api')

// libs公共方法
var libs = require('libs/libs')

// 引入表单input生成模块
var Input = require('modules/form/text1')

// 引入websocket模块
var wsocket = require('modules/wsocket/index')

// websocket监听`imchat`事件，并做dom的处理
wsocket('imchat', function(data){
    var info = data.data
    $('#saloon').append('<div><span>'+info.user+'：</span><span>'+info.message+'</span></div>')
})

// 定义inputs表单
// 支持两种方式定义表单，下面的配置是一种，够简单，还有一种数组的方式，更灵活，以后会讲到
var inputs = {
    name: ['user', 'message' , 'submit'],
    id: ['user', 'message' , 'submit'],
    type: ['text', 'text', 'button'],
    title: ['姓名' , '聊天' , ''],
    value: [null , null , '发射'],
    class: ['user' ,null , 'chatSubmit'],
    placehold: [null , '请输入聊天内容']
}

// Input方法基于react实现，根据配置，生成表单结构，只有结构
// 在更复杂的表单应用中，FKPJS有好用的`valide`方法来配合使用，我们把校验和绑定放在valide中
// Input方法输出的结构参照`mobiscroll`的表单结构
//
// Input(options, id, callback)
//
Input(inputs, 'kick-center', function(){
    // this 等于整个表单的wrap层
    // 可以在这里打印看看输出

    // 所有的结构都在this中
    // 这里是最表层的处理，简易使用JQUERY，FKPJS的jq挂在全局上
    // Input方法内部使用原生实现

    // 绑定回车提交
    $('#message').bind('keypress',function(event){
        if(event.keyCode == "13"){
            $('#submit').click()
        }
    });

    // 提交
    $('#submit').click(function(){
        var _msg = $('#message').val(),
            _user = $('#user').val()

        if (_msg){
            if (_msg.length>50){
                libs.msgtips('你不能输入超过50个字符', 'warning')
                return false;
            }
            var post_data = {
                message: _msg,
                user: _user
            }
            api.req('/chat', post_data, function(){
                $('#message').val('')
            })

        }
    })
})
```

## 4、websocket的模块  

```
    // 引入websocket模块
    var wsocket = require('modules/wsocket/index')
```

还记得`FKP`是基于`webpack`的打包及模块机制吗？ so，通过`webpack`的别名配置，指定modules的目录，
我们能够很容易的引入`FKPJS`的模块  

贴图如下：

![siom_meitu_1.jpg](/uploader/web-29035386219974979044618552205068.jpg)  

modules的目录被藏在了`public/react/`目录下，并被封装为`commonJs`的形式，方便我们在开发中调用，
接下来看看`modules/wsocket/index.js`文件有些什么内容

```
// 请入socket.io的客户端，这个可以在<http://npmjs.com>中下载
var io = require('socket.io-client')

// socket.io初始化，它会自动寻找socket连接，node端开启的话
var socket = io();

// sample
// in your js file `var xxx = require("modules/websocket/index")`
// xxx(name, callback)

// 封装监听事件
function listen(name, cb){
    if (name && typeof name === 'string' && typeof cb === 'function')
        socket.on(name, cb)
}


// 封装发送事件
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

// socket.io的频道功能，这里暂时还没开启
function of(name, cb){
    // var sk = io(name);
    // sk.on('connect', mkcb(cb, sk))
}

// commonjs输出
module.exports = {
    of: of,
    on: listen,
    emit: emit
}
```  

OK，就这么多，这个模块仅仅是对socket.io进行了简单的封装，但足够好用就好了。  

接下来，要进入`FKPJS`的NODEJS部分，在NODE端，FKPJS也做好了相应的模块，简单够用，方便扩展，通过
NODE端提供的服务，我们才能真正将`websocket`跑起来。
