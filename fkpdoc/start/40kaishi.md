
[install]: /demoindex?md=install "安装"
# 启动模式  
&#160; &#160; &#160; &#160;经过上篇“[安装篇][install]”，我们开始使用FKP-REST了

## DEMO 模式  {id: demomodle}  
###### DEMO模式用于纯静态页面的展示，该模式支持以下特性  
在前端实现UI部分的工作时，我们关注重点在布局，ui和效果交互上，属于纯粹静态部分
* 默认端口：9000  
* livereload,实时更新  
* 同步各浏览器展示效果  
* 与数据无关，（虚拟数据除外）  

#### 命令     
    # 进入源码根目录
    $ ./ly demo  

#### 成功后进入页面  

![alt demo](/images/doc/index_demo.png)  

__二维码为方便手机端开发，可通过手机端扫一扫功能在微信，或者浏览器中预览效果__  





## DEV 模式  {id: devmodle}    
###### DEV模式和后面的PRO模式是用于带后端数据的开发模式  
&#160; &#160; &#160;那么轮到node端登场了，我们使用handlebars语法解析`html/hbs`模板，通过node端的`get`方式渲染模板，这样node会解析生成完整的html结构。是的，这对seo非常友好  

&#160; &#160; &#160;数据从哪里来，当然是使用node与更后端的(java/php/.net)接口对接数据，这样FKP-REST完成了整个`VIEW`端的工作，`VIEW`部分正真从后端分离出来了。后端只需关注数据产出。  

&#160; &#160; &#160; 前端js通过ajax(get/post/put)与node端对接，这样逻辑，业务，数据，交互，ui就由前端统一实现，开发效率又提升了一个档次。
* 默认端口：3000/8070
* livereload,实时更新  
* 同步各浏览器展示效果  
* 数据相关  
* hbs变量由node端的handlebars模块解析  

#### 命令
    # 进入源码根目录
    $ ./ly dev
    $ ./ly dev [port]  # port 端口号，可选，默认8070，80端口需要sudo

成功后可看到如上图，不过端口为3000

#### 修改默认首页  
__默认dev和pro模式的默认首页为`demoindex`与demo模式相同__  
__默认首页可以修改，打开如下config文件__  

![Alt 微信配置文件](/images/doc/wxconfigfile.png)  

修改如下部分

![alt dev](/images/doc/dev_index.png)  

#### 成功后进入页面，参考DEMO  






## PRO 模式  {id: promodle}   
###### DEV模式的压缩编译版，带后端数据的开发模式，压缩编译静态文件，带hash，可输出生产用最终文件，用于上线前检查  

* 默认端口：3000/8070
* livereload,实时更新  
* 同步各浏览器展示效果  
* 与数据无关，（虚拟数据除外）
* hbs变量由node端的handlebars模块解析   

#### 命令
    进入源码根目录
    $ ./ly pro

#### 修改默认首页  
---
__默认dev和pro模式的默认首页为`demoindex`与demo模式相同__  
__默认首页可以修改，打开如下config文件__  
![Alt 微信配置文件](/images/doc/wxconfigfile.png)  

修改如下部分

![alt dev](/images/doc/dev_index.png)  

#### 成功后进入页面，参考DEMO  
