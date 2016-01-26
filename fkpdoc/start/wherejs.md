# 4、JAVASCRIPT写在哪里 {"id":"wherejs", "class":"wherejs"}  
优秀的结构产出，包括html，css，可以使JAVASCRIPT应用起来更加效率。
## 特性  

### 模块化开发    
  &#160; &#160;  支持AMD，CMD的语法，可以无缝的切换到之前基于requirejs的项目中去。  
&#160; &#160;  node的出现，使得前端的开发不再像之前那么碎片化了，我们可以重新组织代码，抽离公用部分，像后端那样用模块的方式来引入加载  

### 支持backbone，react, avalone, angular...
&#160; &#160; 默认支持 react与jquery/zepto  
&#160; &#160; 拿，前端不止要和后端、产品PK，前端与前端也有着非常激烈的火拼，当然合理的选择与搭配很重要。  
&#160; &#160; FKP-REST通过配置理论上可以支持任何一款前端库，当然这些前端库会和node端存在兼容的问题，比如通用的 **{{}}**，因为FKP-REST现在前后端都是用**handlebars**模板解析库，和angular及avalone就冲突了，现在这个问题还没有完美解决，后续会更新

### 编译模块化
&#160; &#160; FKP-REST的编译也可以支持配置生成  
&#160; &#160; 通过核心编译文件及相应的打包规则，配置以适当的参数，我们可以对不同的文件，目录，对象进行前端编译打包。包括图片等  

### 更多特性  
* {"id":"test","class":"good"}
* 支持原生JS及coffeejs的语法 {"class":"tttt"}  
* 微信开发支持  
* 各种组件持续开发中  



## JAVASCRIPT写在这里  

FKP-REST的js目录与html和css是分离的，由编译将三者整合输出。首先，我们找到js目录，如下  

![Alt wherecss](/images/doc/wherejs.png)  

##### _js/jsx/cjsx/coffee/_    
&#160; &#160; 以上几个都为js文件的扩展名，即FKP-REST可以支持 **js/jsx** 及这两个的coffee变种 **coffee/cjsx**

## JAVASCRIPT的目录结构
如下图  
![Alt wherecss](/images/doc/wherejs.png)


## 1. pages
[](/# ' {"id":"xxx"}')
&#160; &#160; FKP-REST下的所有 __pages__ 目录都与业务相关，node/js/css都是如此， 在这里，与业务相关的js我们都存放在 __js/pages__ 目录下，拿`demoindex`来说，`demoindex`的js就是写在`pages`目录下。    

#### _html模板_  

![Alt wherecss](/images/doc/wherecss5.png) &#160;_这里的demoindex是文件_  

#### _js_  

![Alt wherecss](/images/doc/wherejs3.png ' {"class":"titleimg"}') &#160;_这里的demoindex是目录_    

js的 `demoindex` 目录下的所有文件会合并打包生成 `demoindex.js`，有时候我们的js需要分段写，这有利于后期的维护。有两种方式
- 无序  
js的 `demoindex` 目录下的文件随意命名  

- 有序  
js的 `demoindex` 目录建立与目录同名的`demoindex.js/jsx/cjsx/coffee`，其他的文件用`require`有序加载    

###### _生成的`demoindex.js`，不能独立运行(依赖common.js)，但我们可以通过`/js/demoindex.js`来访问，来看一下生成后的结构图示_  

![Alt wherecss](/images/doc/wherejs4.png ' {"class":"titleimg"}')  

##### _注：_  
- __与文件夹同名的文件__  
编译规则会自动匹配文件夹同名文件，有顺序需求时，我们可以使用这种命名方式，具体原因请查看这篇文章，[特殊的文件名](/demoindex?md=start_duplicate)    

- __下划线目录名__  
像这样 __ _xxx/__， 这种目录在编译时会被自动忽略，不会输出 __ _xxx.js__，单目录中的文件可以通过__@import__来调用，适用于文件存档，或者小的组件文件存放  





&#160; &#160;  
&#160; &#160;




## 2. _copy2dist
&#160; &#160; __ _copy2dist__ 其实算是一个特殊目录，有时候我们引用第三方的js，而又不便于融入到我们现有的js结构当中(不折腾，直接用)，直接将这样的js放置到这个目录当中  

&#160; &#160; __ _copy2dist__ 中的文件，会原封不动的输出到 `public/dist/js/t` 目录下，我们对比一下`ueditor`这个文件夹，如下图所示  

![Alt wherecss](/images/doc/wherejs6.png ' {"class":"titleimg"}') 源文件   

![Alt wherecss](/images/doc/wherejs5.png ' {"class":"titleimg"}') 目标文件  

###### _`ueditor`会完整的输出到`public/dist/t/`目录下 ，因为百度编辑器的文件非常多，且会依赖自身的css文件，很难将其拆分并融合到现有的项目中，因此放置到`_copy2dist`目录中，我们只需要在html模板文件中通过`<script>`标签将其引入进来就可以直接使用了_  




&#160; &#160;  
&#160; &#160;  




## 3. global
&#160;&#160; global目录暂时没有使用，留待后用   



&#160; &#160;  
&#160; &#160;



## 4. libs目录
&#160;&#160;
libs目录存放了FKP-REST的几个重要库文件 **libs.jsx**，**router.jsx**，**api.js**，**pages.jsx**   

&#160;&#160;
`.jsx`文件为react的特有文件格式，因为FKP-REST使用webpack来预编译文件，所以默认支持可以使用`jsx`文件，具体`jsx`文件的详细，请查阅度娘  

#### api.js   
api的库，是对于jq/zepto的ajax的二次封装，只支持`post`方式，这里的api会自动转换到node端的api，这样我们就能够实现跨域请求，而且使用起来非常简单

    # 引用方式  
    # 在pages/xxx.js 中
    require('libs/api')
    api.req('interface', function(data){
        //......
    })
    # api会有专门的一章详细说明   
 
#### router.jsx   
router的库，能够实现单页及多页之间的跳转。对于微信端或者其他H5的项目来说非常好用   

    # 引用方式  
    # 在pages/xxx.js 中
    var router = require('libs/router').router
    var route = require('libs/router').route
    
    route({
    	xxx: require('yyy'),
    	.....
    })
    
    # router（路由）会有专门的一章详细说明


#### libs.jsx   
libs的库，是对于常用方法的一个封装

    # 引用方式  
    # 在pages/xxx.js 中
    require('libs/api')
    api.req('interface', function(data){
        //......
    })
    # libs之后会有专门的一章详细说明



&#160; &#160;  
&#160; &#160;  




## 5. mixins
&#160;&#160; mixins和下面的widgets目录为react的专用目录，存放react的mixins和底层组件，mixins目录下的文件一般会用在组件或者模块中，FKP-REST中常用的mixins有，**item.js**(组件默认方法)，**store.js**(轻量flux)   

![mixins](/images/doc/wherejs7.png ' {"class":"titleimg"}')

&#160; &#160;  
&#160; &#160;

## 6. modules
&#160; &#160; __modules存放组件相关的js__，FKP-REST的组件基本上都是基于react构建的。现有模块，如微信模块，上传模块，H5表单模块等等，更多模块见下图  
![fff](/images/doc/wherejs1.png 'modules {"class":"titleimg1"}')

&#160; &#160;  
&#160; &#160;



## 7. vendor
&#160; &#160; __vender目录放置第三方js库__，这是一个重要的目录，该目录下的第三方库会被打包成 **common.js**，比如jQuery或者zepto，还有FKP-REST依赖的reactjs，该目录下的第三方库是通过bower安装后copy过来的源码，该目录下包含了一下第三方库，如图     
![wherejs](/images/doc/wherejs2.png "vendors {"class":"titleimg1"}'")

#### 注
- common.js可以通过配置文件进行调整，根据需要可以打包angula.js, avalon.js，jQuery等等丰富的第三方库.  
	需修改 **public/config.js**  
	需修改 **public/_build/gulp-task/concat-common-js**

&#160; &#160;  


## 8. vendor_custom
&#160; &#160; __vender_custom目录放置自定义的全局js文件__，这是一个重要的目录，该目录下的文件会被打包到 **common.js**，该目录下有一个重要的FKP-REST的全局库，**store.js**，后面会详细阐述该库的使用方式，实际上FKP-REST的路由库，各个模块都依赖于 **store.js**库   

&#160; &#160;  
&#160; &#160;

## 9. widgets
&#160; &#160; __widgets目录存放react最颗粒化得组件__，如list的item，FKP-REST的颗粒化组件就只有这一个，该组件会依据传入的数据输出相应的HTML结构，能把它叫万能组件吗？ ^_^   

