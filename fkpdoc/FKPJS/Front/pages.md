# pages
FKPJS将 HTML，CSS, JS, NODE 各个部分揉合到一起。因为前后端都为javascript，相比起php/java，可以做到更加细致，开发时更具敏捷性。  
`pages目录`主要存放与业务相关的文件。这篇文章主要讲述前端的`pages目录`，NODE 端我们放到后面再讲。

## HTML，特殊的pages  
>目录路径： public/src/pc/html/  

##### html目录存放的是各个业务的模版页面，作为 NODE 端`MVC`中的 VIEW 层  
* 输出到`public/dist/html`目录下  
* 支持handlebars模版语法  
* 基于`gulp-file-include`插件编译，支持html组件模块化  
* 支持 watch 热更新，开发中即时修改，即时生效  

##### Sample
```
..../html/a.hbs

//输出 public/dist/html/a.html
```


## CSS的pages目录  
>目录路径： public/src/pc/css/pages/  

* 支持less语法  
* 输出到`public/dist/css`目录下  
* 支持 watch 热更新，开发中即时修改，即时生效  

##### Sample1，自然排序
```
..../css/pages/a/index.less
..../css/pages/a/other.less
..../css/pages/a/sex.less

//输出 public/dist/css/a.css
```
HTML 目录下是文件(a.hbs)，不同的是`css/pages`下存放的是目录(a/)，且目录名与html下的文件同名。编译输出结果，如上例所示.
还有一种情况，我们需要有序的编译输出css文件  

##### Sample2，手动排序
```
..../css/pages/a/a.less
..../css/pages/a/index.less
..../css/pages/a/other.less
..../css/pages/a/sex.less

//输出 public/dist/css/a.css
//通过 http://www.xxx.com/css/a.css 访问
```

a.less内容，同名文件用作排序  
```
@import './index.less';
@import './sex.less';
@import './other.less';
```
编译时，检测到有同名文件，会自动忽略其他文件。  


## JS的pages目录  
>目录路径： public/src/pc/js/pages/  

* 可支持bable，需在config中开启  
* 支持coffee    
* 支持typescript    
* 支持react    
* 输出到`public/dist/js`目录下  
* webpack编译，编译时支持公共库提取  
* 支持 watch 热更新，开发中即时修改，即时生效  

##### Sample1，自然排序
```
..../css/pages/a/index.js
..../css/pages/a/other.js
..../css/pages/a/sex.js

//输出 public/dist/js/a.js
//通过 http://www.xxx.com/js/a.js 访问
```
HTML 目录下是文件(a.hbs)，不同的是`js/pages`下存放的是目录(a/)，且目录名与html下的文件同名。编译输出结果，如上例所示.
还有一种情况，我们需要有序的编译输出js文件  

##### Sample2，手动排序
```
..../css/pages/a/a.js
..../css/pages/a/index.js
..../css/pages/a/other.js
..../css/pages/a/sex.js

//输出 public/dist/js/a.js
```

a.js内容，同名文件用作排序  
```
require('./index.js')
require('./sex.js')
require('./other.js')
```
编译时，检测到有同名文件，会自动忽略其他文件。  

好了，前端的`pages目录`就是这样的，最后需要注意的是， `_xxx`下划线开头的文件和目录在编译时会自动忽略，但内容可以被`import`/`require`引用进来  


```
//css  
//引用下划线目录内的内容  
@import './_test/index.less'
```

```
//js
//引用下划线目录内的内容  
var test = require('./_test/index.js')
```
