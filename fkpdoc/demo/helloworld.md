# 一个实例，Hello World  
&#160; &#160; 前面说了那么多，还是要实际操作一下。老规矩，我们还是从`Hello World`开始吧！

## 1、新建HTML模板  {id:newhtml}  
&#160; &#160; 找到 **public/src/pc/html** 目录，新建一个模板，前端都是从模板开始。

![hello1](/images/doc/hello1.png ' {class:titleimg}')  
(图一)

#### 在模板中输入html的代码  
&#160; &#160;  这里按照标准的html语法输入就好了，但FKP-REST允许使用嵌套模板，这是基于`gulp-file-include`插件实现的，插件的帮助及demo文件点击 &#160; [这里](https://www.npmjs.com/package/gulp-file-include)
```
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <title>fkp-rest</title>
    @@include('./_common/header/head.html')  # head.html为嵌套模板
  </head>
  <body>
    <div class="box">
        <span>Hello</span>
        <span>{{fkp}}</span>
    </div>
    @@include('./_common/footer/foot.html')  # foot.html为嵌套模板
  </body>
</html>
```

#### 模板变量  
&#160; &#160; `{{fkp}}`属于模板变量，FKP-REST使用的是handlebars模板引擎，在`demo`模式下会被前端预编译环境赋值，在`dev`和`pro`模式会被node端赋值。  

&#160; &#160; 在`demo`环境下，`{{fkp}}` 为空，在`dev`及`pro`环境下，`{{fkp}}`为特定值，根据node端的设定

#### head.html嵌套模板中的内容
&#160; &#160; 在(图一)中，我们看到`html`目录下的结构，包含一个 `_common` 的目录，这个就是我们在 《[特殊文件名](/demoindex?md=start_duplicate)》 中提到过的带下划线名字的文件夹   
&#160; &#160; **commoncss：**  模板变量，关于commoncss我们可以在 《[css写在哪里](/demoindex?md=start_wherecss#global)》 中参看 `_global` 章节  
&#160; &#160; **pagecss：**  模板变量，关于pagecss我们可以在 《[css写在哪里](/demoindex?md=start_wherecss#page)》 中参看 `pages` 章节

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- <link rel="shortcut icon" href="/favicon.ico"> -->
    <link rel="stylesheet" href="/css/{{commoncss}}">
    <link rel="stylesheet" href="/css/{{pagecss}}">
    <meta name="description" content="">
    <!--[if lt IE 9]>
        <script src="/js/t/ie.js"></script>
    <![endif]-->

#### foot.html嵌套模板中的内容  
&#160; &#160; **commonjs：**  模板变量，关于commonjs我们可以在 《[javascript写在哪里](/demoindex?md=start_wherejs#vendor)》 中参看 `vendor` 章节  
&#160; &#160; **pagejs：**  模板变量，关于pagejs我们可以在 《[javascript写在哪里](/demoindex?md=start_wherejs#pages)》 中参看 `pages` 章节  

    <script src="/js/{{commonjs}}"></script>
    <script src="/js/{{pagejs}}"></script>



## 2、新建css  {id:newcss}   

![css](/images/doc/hellocss.png ' {class:titleimg}')  

#### css代码  

**box.less**  

    .box{
        position: absolute;
        display: block;
        margin: auto;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        height: 30%;
        width: 50%;
        border: 1px solid red;
        text-align: center;
        vertical-align: middle;
        padding-top: 8%;     
    }

**span.less**  

    .box{
        span{
            font-size: 5em;
        }
    }

`box.less`和`span.less`根据规则会最终合并成一个'hello.css'，如下图  

![hellocss](/images/doc/hellocss1.png)


## 3、新建前端js  {id:newjs}   

![hellojs](/images/doc/hellojs.png ' {class:titleimg}')  

首先我们来看下`abc.js`的代码  

```
var api = require('libs/libs').api
require('./_common/xyz')
alert('abc')

setTimeout(function(){
    api.req('hello', function(data){   # 这里会通过post调用node端的pages/hello.js，并异步返回值
        alert(data.pdata)
    })
},1000)  
```  
&#160; &#160; 代码很简单，`require`引入了`_common`下的文件，还记得`_common`目录的规则吗，不记得看回这里 《[特殊文件名](/demoindex?md=start_duplicate)》，`_common`属于带下划线的文件名的文件夹，在编译的时候会被自动忽略，但这里我们通过`require`可以引入其中的文件，在下面让我们把代码跑起来看看效果就知道了

## 4、新建node端js  {id:newnode}   

![hellonode](/images/doc/hellonode.png ' {class:titleimg}')  

接下来我们看下node端的`hello.js`文件中的内容  

```
function *hello(oridata) {

    var method = this.method;

    if (method === 'GET') {
        oridata.fkp = 'FKP-REST'
        return oridata;
    }

    if (method === 'POST') {
        var post_data = '我是post数据'
        oridata.pdata = post_data;
        return oridata;
    }

}

module.exports = {
    getData : hello
}
```
&#160; &#160;  node端的`hello.js`有一点复杂，大体的写法如上，FKP-REST的node端是基于`KOA`框架来完成的，所以会看到`ES6`的语法。在node端分为两种情况，一种是`GET`模式，一种是`POST`模式  

&#160; &#160; `GET`：用在模板渲染当中，浏览器第一次刷新页面的时候会自动调用`GET`方法，会自动赋值模板中的 **模板变量**，如我们在模板中设置的变量`{{fkp}}`  

&#160; &#160; `POST`：用于对接前端js的ajax调用(xhr)，还记得我们在`abc.js`中的api.req方法吗？让我们接下来跑一次效果吧

## 5、在环境中跑跑看 {id:env}

#### `ly demo`  

    $ ly demo


#### `ly dev`  

    $ ly dev

#### `ly pro`  

    $ ly pro
