# 2、HTML写在哪里  
越来越觉得html结构很重要，好的结构是一首诗。

## 特性  {id:profile}  

##### handlebars模板解析
&#160; &#160;  FKP-REST的HTML模板支持hbs语法，demo模式在编译时使用gulp的handlebars插件完成解析，dev和pro模式通过node端的handlebars插件完成解析。  

##### 模块式公共部分
&#160; &#160; 支持模块式拼装模式，我们可以把公共部分的模块单独抽离出来，在不同的页面中分别引用，这样的好处是可以减少重复开发，方便统一全站的html结构。  

##### 更多特性  
* 支持html和hbs的扩展名  
* 支持markdown的文档格式  
* 同名markdown文件，如(aaa.html/aaa.hbs与aaa.md) 会自动抽取md文件内容前200字作为文件介绍  
* 独立markdown文件自动生成html文档  


## HTML结构写在这里  {id:htmlhere}  

FKP-REST的html模板目录与js和css是分离的，由编译将三者整合输出。这里我们主要讲html模板的构建，会附带说明一下js和css相关的部分，首先，我们找到html目录，如下  

![Alt wherehtml](/images/doc/wherehtml.png)  

##### _hbs/html_    
&#160; &#160; 模板文件的后缀名为`.hbs`或者`.html`，存放结构内容。`.hbs`为handlebars文件的后缀

##### _markdown_
&#160; &#160; markdown文件会被编译成`xxx_md.html`，markdown文件用于对模板进行说明，同名markdown文件会作为注释部分参入到`demoindex.html`的列表中，当然是可以独立打开的，本文就是由markdown编辑而成  
&#160; &#160; markdown文件有自己的独立模板，存放路径为  

![Alt wherehtml](/images/doc/wherehtml5.png)  

##### _注：_  
- __与文件夹同名的文件__  
编译规则会自动匹配文件夹同名文件，一般不建议使用这样的同名文件，具体原因请查看这篇文章，[特殊的文件名](/start/duplicate_md.html)

- __markdown__  
markdown为流行的文档语法，可以快速高效产出说明文档  

- __同名markdown__  
如果模板文件为`xxx.hbs`，同时markdown的文件命名为'xxx.md'，即为同名markdown文件  

- __非同名markdown__  
非同名markdown文件会作为`demoindex.html`列表中的一个子项，如果你的博客非常简单，那么可以使用markdown文件来完成，就像本站一样， [__本站__](http://www.agzgz.com)  

- __demoindex列表__  
demoindex为演示页面，列表项如下  

![Alt wherehtml](/images/doc/wherehtml6.png)  

##### 关于markdown，后续会加入私有语法，暂时FKP-REST使用的标准markdown语法  




## 模板中的CSS和JS  {id:cssjs}  

##### 打开`demoindex.hbs`可以看到  

###### _CSS部分_  
![Alt wherehtml](/images/doc/wherehtml1.png)  

###### _JS部分_  
![Alt wherehtml](/images/doc/wherehtml3.png)  
`CSS` 和 `JS` 这两个部分分别在head，和</body>之前，我们在写html模板的时候一定要注意，不然你的样式和js都不能正确加载

__JS部分，我们注意到使用了特殊的写法__  
__@@include + url__  
__这样，我们可以引入公共的部分，避免重复__  
__url为相对地址，打开url对应的地址__  

![Alt wherehtml](/images/doc/wherehtml4.png)   

打开这个文件，看到如下  

![Alt wherehtml](/images/doc/wherehtml2.png)   

## 关于CSS和JS  {id:morecssjs}   
css和js分别分为common和page两个部分    
###### _CSS部分_  
* commoncss  
* pagecss  

###### _JS部分_  
* commonjs  
* pagejs

&#160; &#160; common部分为公共部分，由很少变动的代码和第三方引用库组成，因为浏览器的缓存，这样在第一次加载后，后续无需重复加载。如果每个页面都要重复加载一次，显然这不科学  

&#160; &#160; page为业务部分，一般是由业务逻辑或者业务页面特有的样式组成，相对较小，即便是重复加载，也不太会拖慢浏览时的交互体验。

##### _注：_  
- __第三方js库__  
commonjs的组成比较灵活，FKP-REST现在使用的时 React + Zepto，因为现在的项目需求，但FKP-REST可以结合backbone, avalon, angular(模板标记冲突)，jQuery等

- __第三方css库__  
引入了全套bootstrap的mixins，可根据需要自行开发less的部分组件  
