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

# 1、概述  
&#160; &#160; &#160; &#160;node的出现，正在悄悄的改变着传统的模式，这两年，淘宝/天猫的前端的崛起，我相信会更加深刻的改变现有的开发模式，MVC的'V'(VIEW)的工作也会越来越偏向于前端，彻底的从后端分离出来。  


#### FKP-REST是一套前后端分离的框架，是一套基于`node`的全栈框架（API/RESTFUL），现阶段实现了如下几个方面  
* 前端模块化开发（基于CMD模式，兼容AMD）
* 三套开发环境（demo/dev/pro）
* 前端代码的 编译／合成 / hash
* 服务端(基于node/koajs)数据处理及http服务  

## 特点
* RESTFUL模式  
* 支持微信接入  
* 支持微信扫一扫，在微信中打开页面预览  
* 支持React  
* 支持sass/less(默认less)  
* 支持原生javascript/coffeejs  
* 前端部分支持CMD/AMD语法，可以无缝切换  
* node端基于KOA MVC框架  
* 开发环境带入api接口数据  
* 支持markdown说明文档  
* 编译配置模块化  

## 全栈框架  
&#160; &#160; &#160; &#160;全栈框架，包含压缩，编译，API，KOA(MVC), database(mongo)
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
