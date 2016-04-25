# 2、安装

## 依赖
```
nodejs: >=4.2.x
npm
windows下，请安装git，需要git的命令行模式
```
安装完成依赖包后，下载源码   

## 下载  
```
git clone https://github.com/webkixi/FKP-REST
或者
下载 https://github.com/webkixi/FKP-REST/archive/newer.zip
```
下载/解压完成后，命令行模式进入源码根目录下  

## 一键安装
linux
```
1、 ./ly install         
```
windows请先安装git，然后在git命令行下输入，没有win环境，不保证
```
1、 ./ly install
```
mac
```
1、  ./ly install
```

## 手动安装方式  
##### 命令行模式进入源码根目录  
1. `sudo npm install gulp -g` windows下无需sudo
2. `sudo npm install node-gyp -g`
3. `sudo npm install nodemon -g`
4. `npm install`
5. `cd public && npm install`


## 如需sass  
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

![Alt 安装完成](/images/doc/install_ok.png)  
