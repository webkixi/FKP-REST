## About

This is a starter boilerplate app I've put together using the following technologies:

* Both client and server make calls to load data from separate API server
* [KOA](https://github.com/koajs/koa)
* [React](https://github.com/facebook/react)
* [Mongo](https://github.com/mongodb/mongo)
* [Mongoose](https://github.com/Automattic/mongoose)
* [FKP Cache](#) fkp cache
* [FKP Router](#) base fkp cache
* [FKP Flux](#) for react, base fkp cache, it's a React mixins
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [GULP](https://github.com/gulpjs/gulp)
* [browser-sync](https://github.com/BrowserSync/browser-sync)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [lru-memoize](https://github.com/erikras/lru-memoize) to speed up form validation
* [style-loader](https://github.com/webpack/style-loader)  
* [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, less

# [Demo](http://www.agzgz.com)   
# [Log](http://www.agzgz.com/demoindex?md=log)   

![](http://www.agzgz.com/images/demo/index.jpg)

# 1、概述  
FKP-REST是一套前后端分离，基于javascript的全栈实现，适用于中小型项目，基于node的高性能，易部署性及javascript前后端语言的一致性，学习成本，时间成本及项目快速启动等等方面，FKP都是一种不错的解决方案。提升项目前期、中期的开发效率   
&#160;  
FED: 前端有完整的脚手架系统，支持代码的编译、压缩、模块化，及基于Reactjs的各种组件，有router，flux, 存储等全局公共库；  
&#160;  
BACK: 后端是基于KOAjs的完整mvc架构，通过中间层map有机的和前端高效结合，提供数据和渲染的支持。中间层map能够独立出来，用以实现传统基于后端的开发模式;   
&#160;  
API: API层支持`pass`及`proxy`两种数据传输模式，极大的方便前端的开发工作，且避免了常见的跨域问题。通过简单的配置apilist实现与后端数据层的交互  
&#160;  
DB: 数据库层以mvc架构模式，支持mongodb数据库，面向node/前端提供数据支持；


#### FKP-REST是一套前后端分离的框架，是一套基于`node`的全栈框架  
* 前端模块化开发（基于CMD模式，兼容AMD）
* 三套开发环境（demo/dev/pro）
* 前端代码的 编译／合成 / hash
* 服务端(基于node/koajs)数据处理及http服务  
* 服务端同构React


## 特点
* RESTFUL模式  
* 支持微信接入  
* 支持React  
* 支持sass/less(默认less)  
* 支持原生javascript/coffeejs  
* 前端部分支持CMD/AMD语法，可以无缝切换  
* node端基于KOA1.2  
* 开发环境带入api接口数据  
* 支持markdown说明文档  
* 编译配置模块化  

## 全栈框架  
全栈框架，包含压缩，编译，API，KOA(MVC), database(mongo)
FKP-REST是基于前后端分离的模式开发而来，提供API模块与后端数据API接口对接，其他如渲染、简单逻辑、session，mv部分由前端统一处理.
当然，FKP-REST也同样支持传统开发模式，将map静态映射文件扔给后端就ok了  

## 模块化开发  
基于nodejs的CMD规范，支持CMD/AMD两种模块规范的语法，前端代码越来越复杂的现在，引入模块式的开发能够提升对代码的有效管理及大团队的多人的协同工作

## 开发环境  
三套开发环境，应对静态、数据、生产、源码压缩等不同的环境  
* demo环境用于开发纯静态模版、js、css，开发环境会自动输出非压缩的静态文件，同时输出xxxjs.map文件，用于快速调试与开发    

    ly demo  

* dev环境用于开发带API数据的环境，通过nodejs解决跨域问题，输出文件与demo环境输出文件相同   

    ly dev  

* pro环境是demo与dev的混合模式，并压缩静态文件，用于上线前检查输出文件是否有问题，所输出的静态文件可用于生产  

    ly pro  

* 测试环境  

    ly dev test 或者
    ly pro test  


## 依赖
```
nodejs: >= 5.7 < 6.5
npm > 3.0
windows下，请安装git，需要git的命令行模式
```

安装完成依赖包后，下载源码   


## 下载  
```
git clone https://github.com/webkixi/FKP-REST
或者
下载 https://github.com/webkixi/FKP-REST/archive/master.zip
```
下载/解压完成后，命令行模式进入源码根目录下  


> 从npmjs.com上下载速度很慢，我们先切换到国内的源在进行安装，速度就块多了  


## 国内源
```
$ npm install nrm -g
$ nrm use cnpm
$ nrm ls
```  
看到`*`号在cnmp上，证明源已经切换了，下面可以开始安装  

![nrm_meitu_1.jpg](http://www.agzgz.com/uploader/web-406394905664485818342341595953204.jpg)  


## 一键安装
> windows下推荐选择手动安装   
linux
```
1、 ./ly install         
```
windows请先安装git，然后在git命令行下输入，没有win环境，不保证  
[官方安装文件](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)  
```
1、 ./ly install
```
mac
```
1、 ./ly install
```

## 手动安装方式  
##### 命令行模式进入源码根目录  
1. `sudo npm install gulp -g` windows下无需sudo
2. `sudo npm install node-gyp -g`
3. `sudo npm install nodemon -g`
4. `npm install`
5. `cd public && npm install`


## ~~如需sass~~  
默认支持less，好吧，我承认sass的强大，但不管在哪个平台，安装都过于麻烦，所以FKP选择了less
* 环境：安装python 2.7.10，版本一定要匹配
* 额外安装以下npm包  
`npm install gulp-sass`  
`npm install sass-loader`  

## 安装完成  
一切顺利完成后，去源码根目录
```
./ly dev
```
如果顺利的话^_^，可以看到如下界面  

![Alt 安装完成](http://www.agzgz.com/images/doc/install_ok.png)  
