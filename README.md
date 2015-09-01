#FKP-REST
FRONT-END KOAJS WEBPACK
BY `koa` / `webpack` / `gulp` / `npm` / `git`/`sass`

#INSTALL

##安装
 - python
 - nodejs
 - npm
 - git

git clone https://github.com/webkixi/FKP-REST.git

//转到根目录下
```
ly install
```


# LOG
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

`2015/6/27`
```
搞定动态部分/静态部分，共享API数据,及生产/开发共享数据，demo不共享数据
```

`2015/6/27`
```
发现动态部分和静态部分不能共享数据，及静态部分没有数据，这是搞毛，开发的时候没有数据是不能接受的
```

`2015/6/26`
```
静态部分（编译）/动态部分，动态部分直接使用静态部分产出的static资源，模板/css/js等
```

`2015/6/25`
```
完善KOAJS，业务模块化，缺少API层和数据层，还有一个存储层，展示没什么思路
```

`2015/6/24`
```
完善KOAJS，功能模块化
```

`2015/6/23`
```
部署kosjs，之前看过淘宝的一片文章，部署NODE层作为MODLE层和VIEW层，这样可以脱离PHP了，后端数据由JAVA
提过，那么没有PHP什么事情了
```

`2015/6/22`
```
前端编译部分，完善并完成模块化，自动化，现在slime的核心部分大部分采用GULP来处理（感觉稳定点），JS分包
仍然采用webpack来处理
```

`2015/6/21`
```
支持coffee，react
```

`2015/6/20`
```
基于WEBPACK/GULP处理前端静态资源，具体说明，请参考slime-build说明
```

`2015/6/19`
```
把slime-build的前端自动化部分移植过来```
