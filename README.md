#FKP-REST
#### FRONT-END KOAJS WEBPACK
>FKP-REST基于前端技术实现，可以用于部署一套完整的网站，例如博客、商城, H5微信端等。考虑到了前端对于并发性能的问题，因此基于webpack实现了静态资源的编译输出，同时兼顾了方便开发环境调试的非编译输出。
>FKP基于nodejs（KOAJS），gulp，webpack等技术实现，依照前端组件化、后端模块化的构建初衷来规划部署，FKP-REST支持静态编译，适用多人协作的前后模块式开发，可分布式部署提升并发访问性能
>目前支持的前端热门静态资源解决方案，如CSS（SASS, SCSS, LESS, STYLUS）, JAVASCRIPT(COFFEE, REACT, BACKBONE, JQ), 模板引擎(html, hbs, php)等。  

# NOTE
支持NODEJS 4.0版本

#INSTALL

##安装
 - python2.7.x
 - nodejs
 - npm
 - git

git clone https://github.com/webkixi/FKP-REST.git

转到根目录下
```
//linux
//请先安装gcc g++等编译环境，如debian系列，`apt-get install build-essential`
1、chmod +x ./ly
2、sudo ly install

//windows
1、请修改根目录下的package.json
2、删除ccap那一行(ccap是FKP动态部分实现的校验码功能，需linux/mac)
3、ly install
```

## 演示及命令
```
ly 为入口命令，我们可以通过ly 的组合命令来展示效果

// 支持 REACTJS
ly demo 纯静态端演示，列表出前端常用组件，静态资源非压缩
ly dev  动态展示，通过nodemon启动koajs，展示完整项目（暂无动态演示项目），静态资源非压缩
ly pro  动态展示，通过nodemon启动koajs，展示完整项目（暂无动态演示项目），压缩静态资源

// 支持 BACKBONE
ly bbdemo 纯静态演示，支持backbone
ly bbdev  动态支持backbone 开发
ly bbpro  动态支持backbone 生产

// 支持 ANGULAR
因为使用了handlebars模板引擎，与angular冲突，暂时未解决，后续更改模板引擎为ejs
```


# LOG
2015/9/23
```
1.1.3
新增了移动端TAB切换的效果
```
2015/9/20
```
1.1.2
修复了一个结构性的bug, 导致ly dev和 ly pro不能正确调用静态资源
```
2015/9/16
```
1.1.1
修正了二维码在DEMOINDEX页面路径错误的问题，现在在本地调试H5页面，扫一扫就好了
```
2015/9/15
```
0、调整版本依赖，支持node4.0
1、支持纯MD文档输出到demoindex页面
2、完成H5swipe slide页面效果
3、调整演示文件结构，DEMO用于完整演示，parts用于展示组件效果
```
2015/9/2
```
支持多层级目录结构
之前只支持2级目录，现在调整为支持多级目录，理论上不限制pages下的目录层数，打包与分包规则不变
```
2015/8/29
```
支持backbone开发H5界面
通过ly bbdemo / ly bbdev命令分别启动纯静态开发环境和koajs动态环境
ly pro 启动编译并启动koajs动态环境
```
2015/8/28
```
支持angular开发H5界面
通过ly ngdemo / ly ngdev命令分别启动纯静态开发环境和koajs动态环境
(环境支持了，但需要更改模板引擎，之前使用的handlebars,与angular冲突，所以推迟)
ly pro 启动编译并启动koajs动态环境
```
2015/8/20
```
支持上传
支持上传接口，先在可以选择上传到本地/上传到阿里云的oss
```
2015/8/19
```
支持验证码
请在非windows环境下使用，搞不定windows的gyp编译环境
```
2015/6/29
```
搞定markdown的样式
搞定一个react的组件，fixed-bar，电商一般常用的跟随条，可以动态设置top/left/right/bottom
```

2015/6/28
```
//搞定BASH来处理，命令为
$ fkp demo  //演示，没数据
$ fkp dev   //开发, 不压缩静态资源，有数据
$ fkp pro   //生产，压缩静态资源，有数据
```

2015/6/27
```
搞定动态部分/静态部分，共享API数据,及生产/开发共享数据，demo不共享数据
```

2015/6/27
```
发现动态部分和静态部分不能共享数据，及静态部分没有数据，这是搞毛，开发的时候没有数据是不能接受的
```

2015/6/26
```
静态部分（编译）/动态部分，动态部分直接使用静态部分产出的static资源，模板/css/js等
```

2015/6/25
```
完善KOAJS，业务模块化，缺少API层和数据层，还有一个存储层，展示没什么思路
```

2015/6/24
```
完善KOAJS，功能模块化
```

2015/6/23
```
部署kosjs，之前看过淘宝的一片文章，部署NODE层作为MODLE层和VIEW层，这样可以脱离PHP了，后端数据由JAVA
提过，那么没有PHP什么事情了
```

2015/6/22
```
前端编译部分，完善并完成模块化，自动化，现在slime的核心部分大部分采用GULP来处理（感觉稳定点），JS分包
仍然采用webpack来处理
```

2015/6/21
```
支持coffee，react
```

2015/6/20
```
基于WEBPACK/GULP处理前端静态资源，具体说明，请参考slime-build说明
```

2015/6/19
```
把slime-build的前端自动化部分移植过来```
