# FKP-REACT-NATIVE  

#### [GITHUB](https://github.com/webkixi/FKP-REACT-NATIVE)  

it's a simple framework for react-native, with router, socket.io and SAX etc...   
FKP-REACT-NATIVE兼容android和ios, 基于node的寻址结构，import的时候，省略不必要的`../../`  

[1]:http://www.agzgz.com/uploader/web-214634867849606177520925611446951.gif    
[2]:http://www.agzgz.com/uploader/web-10371096658112267040971650214665534.gif  

| IOS | Android |
| -------------| ----- |
| ![ios.gif][1] | ![ios.gif][2] |

## dependencies
myself environment
```
node = 6.2.2  
npm = 3.0+  
rnpm = latest
react-native = 0.30+
react-native-cli = 1.0.0+

// win/mac/linux的安装环境，请大家自行搜索一下
npm install -g node-pre-gyp
npm install -g react-native-cli
npm install -g rnpm
```

## Install  
1. clone or get the case `.zip`
2. npm install  
3. rnpm link  


## Start  
$ react-native run-ios/andorid


## Feature
1. Router
2. SAX
3. Socket.io
...

#### Router  
封装`Navigator`，Router作为全局，可随时切入到预定义的场景，并带入`intent`数据  
```
render(){
    return (
        route.init( {
            tabbar: require('./common/tabbar').default,
            web: require('comp/modules/webrender').default,
        })
        .start('tabbar')
    )
}

// like FKP-JS SPA  
// blog list item click -> Router('web', {...})
```

#### SAX  
`SAX`是继承自 [FKP-JS](https://github.com/webkixi/FKP-REST) 框架，store and action X，用以驱动数据 then render react Component, SAX is a global variable, no config, no stat..., in this case, i write the High Level Component `store` of react-native with `SAX`  

```
// define FKP-tabbar
let Home = tabs({
        blog: _blog,
        message: _msg,
        setting: _set,
        badge: _bdg
    },
    { sax: 'TabBlog' }
)

....

let saxData = {
    data: {
        badge: {
            message: 3,
            setting: 2,
            badge: 11
        }
    }
}

SAX.setter('TabBlog', saxData)

```

#### webSocket  
With `Socket.io`, u can communicate with `FKP-JS` server，variable name is `Sio`，it's a global variable，实时推送数据，根据数据结构，结合SAX，动态更新app结构  

```
// websocket
// 服务器由agzgz.com推送(FKPJS搭建)
Sio(function(socket){
    socket.on('imchat', (msg)=>{   //msg is a JSON Object
        console.log(msg);
        Toast.show(msg.message)
    })
})
```
