# ueditor的集成  
> FKPJS集成了KOAJS，先要与百度ueditor集成，最麻烦的的其实是上传，官方并没有nodejs的案列，提供了PHP，JAVA版本的，
这么不待见nodejs吗？鼎沸   


自己动手，丰衣足食，说下几个关键点   

> 1. 全局变量window.UEDITOR_HOME_URL
2. 前端引入js文件
3. 前端配置文件  
4. node(KOA)端配置文件  
5. 上传返回成功   

#### UEDITOR_HOME_URL   
```
//最先这个设置，指定ueditor的所有静态文件放在哪里   
window.UEDITOR_HOME_URL = '/js/ueditor'
```

#### 前端引入js文件  
> 摘自官方    


```
<!DOCTYPE HTML>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <title>ueditor demo</title>
</head>

<body>
    <!-- 加载编辑器的容器 -->
    <script id="container" name="content" type="text/plain">
        这里写你的初始化内容
    </script>
    <!-- 配置文件 -->
    <script type="text/javascript" src="ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="ueditor.all.js"></script>
    <!-- 实例化编辑器 -->
    <script type="text/javascript">
        var ue = UE.getEditor('container');
    </script>
</body>

</html>
```

> FKPJS   

```
window.UEDITOR_HOME_URL = '/js/t/ueditor/'

inject(['/js/t/ueditor/ueditor.config.js', 'Baidu-Editor-Config'], alljs)

function alljs(){
    inject(['/js/t/ueditor/ueditor.all.js', 'Baidu-Editor'], startEditor)
}

function startEditor(){
    var ue = UE.getEditor('for-ueditor');
}

```  

FKPJS可以看[DEMO](http://www.agzgz.com/ueditor)， 如图  

![demo](http://fex.baidu.com/ueditor/doc/images/demo.png)

#### 前端配置文件  
在ueditor根目录中，找到`ueditor.config.js`  
```
serverUrl: "/ueditor" // xxx为后端路由，即为处理ueditor数据的文件, FKPJS的pages下的一个文件
```  
好了，前端配置结束  


#### node(KOA)端配置文件   
贴代码  

```
// pages/ueditor.js

return hlo.run({
    // GET
    get: async ()=>{
        oridata.fkp = 'FKP-REST';

        if (this.local.query.action ){
            if (this.local.query.action === 'config'){
                const _cfg = {
                    "imageUrl": "/ueditor?action=uploadimage",
                    "imagePath": "http://www.agzgz.comhttp://www.agzgz.com/uploader/",
                    "imageFieldName": "upfile",
                    "imageMaxSize": 2048,
                    "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
                }
                var config = _.extend( cfg, _cfg)
                this.body = config;
            }
        }
        else{
            return oridata;
        }

    },

    // POST
    post: async () => {
        const self = this;
        return co(function *(){
            return yield require('moduleshttp://www.agzgz.comhttp://www.agzgz.com/uploader').local.call(self, fkpConfig.upload_root)
        })
    }
})
```
注意，ueditor初始化，认证的时候走`GET`，数据处理的时候走`POST`  

#### 上传返回成功
这儿容易被忽视，且官方文档中没有强调，也是一个容易出错的地方，FKPJS使用 co-busboy来处理上传业务  

```
while (part = yield parts) {
    if (part.length) {
        // arrays are busboy fields
        // console.log('key: ' + part[0])
        // console.log('value: ' + part[1])
        if(part[0]==='name'){
            filename = part[1];
        }
    }
    else{
        console.log(part);
        if (part.filename){
            filename = part.filename
        }

        if (filename){
            var ext = path.extname(filename);
            filename = lib.guid()+ext
            o_filename = filename;
            filename = path.join(path2save,filename);
        }

        if(filename){
            var stream = fs.createWriteStream(filename)
            part.pipe(stream)
            console.log('uploading %s -> %s', part.filename, stream.path);
        }
    }
}

// 一定要按这个输出，ueditor认识的格式
return {
    "state": "SUCCESS",
    "url": 'http://www.agzgz.comhttp://www.agzgz.com/uploader/'+o_filename,
    "title": o_filename,
    "original": o_filename
}
```

好了，现在可以了
