# 3、CSS写在哪里  
css是一个大坑，简单易上手，但如果规划不好，到后期非常的不好维护，虽然开发也有些年限，但始终不得其法，还是思考不够  

## 特性  {id:profile}  

##### 默认支持LESS  
&#160; &#160;  SASS的确强大，FKP-REST最开始默认支持的是sass，问题是在安装和配置环境上，非常不容易，考虑到让FKP-REST更易上手，最终还是放弃了sass，选择了LESS  

##### 通过扩展可支持SASS/STYLUS
&#160; &#160; 理论上可以直接支持STYLUS，但却没有测试过，sass默认是不支持的，必须安装相关的第三方库，为什么不预先装好sass，原因就在于sass的环境要求比较苛刻，具体请查看安装篇 [安装](/install_md.html)  

##### 更多特性  
* 集成bootstrap的全部mixins  


## CSS写在这里  {id:csshere}  

FKP-REST的css目录与html和js是分离的，由编译将三者整合输出。首先，我们找到css目录，如下  

![Alt wherecss](/images/doc/wherecss.png)  

##### _less_    
&#160; &#160; css文件的后缀名为`.less`  

## CSS的目录结构  {id:cssstruct}   


## _1. pages_ {id:page}
&#160; &#160; FKP-REST下的所有 __pages__ 目录都与业务相关，node/css/js都是如此， 在这里，与业务相关的css我们都存放在 __css/pages__ 目录下，拿`demoindex`来说，`demoindex`的css就是写在`pages`目录下。    

___html模板___  

![Alt wherecss](/images/doc/wherecss5.png) &#160;_这里的demoindex是文件_  

___css___  

![Alt wherecss](/images/doc/wherecss4.png) &#160;_这里的demoindex是目录_    

css的 `demoindex` 目录下的所有`.less`文件会合并打包生成 `demoindex.css`，有时候我们的css需要分段写，这有利于后期的维护。有两种方式
- 无序  
css的 `demoindex` 目录下的文件随意命名  

- 有序  
css的 `demoindex` 目录建立与目录同名的`demoindex.less`，其他的文件用`@import`有序加载    

###### _生成的`demoindex.css`，我们可以通过`/css/demoindex.css`来访问，来看一下生成后的结构图示_  

![Alt wherecss](/images/doc/wherecss6.png)  

##### _注：_  
- __与文件夹同名的文件__  
编译规则会自动匹配文件夹同名文件，有顺序需求时，我们可以使用这种命名方式，具体原因请查看这篇文章，[特殊的文件名](/start/duplicate_md.html)

- __下划线目录名__  
像这样 __ _xxx/__， 这种目录在编译时会被自动忽略，不会输出 __ _xxx.css__，单目录中的文件可以通过__@import__来调用，适用于文件存档，或者小的组件文件存放  

- __引入`@import "../_less/index"`__  
注意你自己的目录结构，less文件引入这个文件后，你就可以使用整个 bootstrap的mixins库了  


&#160; &#160;  
&#160; &#160;




## 2. _copy2dist {id:copy2dist}
&#160; &#160; __ _copy2dist__ 其实算是一个特殊目录，有时候我们引用第三方的css，而又不便于融入到我们现有的css结构当中(不折腾，直接用)，直接将这样的css放置到这个目录当中  

![Alt wherecss](/images/doc/wherecss1.png)  

__ _copy2dist__ 中的文件，会原封不动的输出到 `public/dist/css/t` 目录下，我们对比一下`markdown`这个文件，如下图所示  

![Alt wherecss](/images/doc/wherecss7.png)  

###### _生成的 `markdown.css` ，我们可以通过 `/css/t/markdown.css` 来访问_  

&#160; &#160;  
&#160; &#160;  



## _3. global_ {id:global}
&#160;&#160; global目录存放了第三方的css库，`LESS` 和 `SASS`，默认 `LESS`，`LESS`使用了`bootstrap`的mixins库，`SASS`则使用的是国内开源的sass库`sassCore 3.0`  

&#160;&#160; 默认使用 `LESS`或者`SASS` 可以在 `_base/index.less` 中定义，打开该文件，可以看到  
```
    @import "../_less/index";
    # 如果使用sass，请将'_base/index.less'改写为'_base/index.scss'
    # 如果使用sass，请引入 ../_sass/_settings/_setting_pages
    # 注意使用sass，需要额外安装sass库，具体请参考 [安装](/install_md.html)
```
我们先看看global目录结构，如下图所示  

![Alt wherecss](/images/doc/wherecss2.png)  

__global目录产出`common.css(dist/css/common.css)`__，内容很简单，来自global目录下的如下几个文件  

    - less/normalize.less   ＃ html样式重置
    - ui/*                  ＃ 两个ui类，btn和list  
    - utils/*               ＃ 一些助手类  

    # 具体内容，请直接打开文件查看  
    # ui/list.less，我们后面会详细描述  


&#160; &#160;  
&#160; &#160;  


## _4. modules_ {id:modules}
&#160; &#160; __modules存放组件相关的css__，一般配合 js 的 `modules` 目录下的组件 js 使用，产出的文件会输出到 `dist/css/t/` 这个目录下，不直接用于业务中   

&#160; &#160; __modules__ 下的文件的打包规则类似于 __ _copy2dist__ 目录，请参考上面的部分    

![Alt wherecss](/images/doc/wherecss3.png)  
