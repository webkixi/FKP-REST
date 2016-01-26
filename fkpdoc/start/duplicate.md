# 5、要注意特殊的文件名及文件夹   

## 打包规则  
&#160; &#160; FKP-REST会将html/css/js按照打包规则进行打包、编译、压缩几个动作，那么FKP-REST的打包规则是什么呢，具体可以参看这里 [打包规则](/demoindex?md=pakage)  

&#160; &#160;  这里简单的说明一下   

#### 一切从模板开始  
&#160; &#160; **public/src/pc/html** 下的模板文件是所有一切的开始，该目录下的一个文件对应 **public/src/pc/css** 或者 **public/src/pc/js** 目录下的一个目录，简单的代码说明如下，以下为通用情况  

    # base_dir = public/src/pc
    html/xxx.hbs  
    css/xxx/...  # 多个 less 文件，编译后会归并为 dist/css/xxx.css
    js/xxx/...   # 多个 js/jsx/coffee 文件，编译后会归并为 dist/js/xxx.js

    # css文件通过浏览器访问地址为 domain/css/xxx.css  
    # js文件通过浏览器访问地址为 domain/js/xxx.js


#### 为什么 css/js 下对应的是文件夹而不是文件
&#160; &#160; 以`xxx.hbs`为例，`xxx.hbs`根据规则会自动引入`xxx.js`，FKP-REST支持AMD/CMD的两种js规范，这样我们的js文件可以支持模块化开发，我们就可以以多人的方式协作开发'xxx.js'这个模块，每个人负责模块的一部分，按需引入到主模块中。说到这里，我想大家应该明白了吧。

&#160; &#160;同理，css也是这样的一个规则。

## 与文件夹同名/异名的文件  
### 同名文件
&#160; &#160; 这里的文件针对 **public/src/pc/css 或者 js目录** 我们还是以代码的方式来理解吧  

##### 源目录 = public/src/pc/js/xxx/  

    js/xxx/xxx.js       # 文件1
    js/xxx/yyy.js       # 文件2
    js/xxx/zzz.js       # 文件3

##### xxx.js
    require('./zzz')
    require('./yyy')

##### yyy.js
    console.log('yyy')

##### zzz.js
    console.log('zzz')

#### 编译输出文件  /dist/js/xxx.js，浏览器将打印
    # console.log('zzz')  
    zzz
    # console.log('yyy')
    yyy

#### 编译输出的模板  /dist/html/xxx.html
    .....  
    .....
    <script src="/js/xxx.js"></script>
    </body>

&#160; &#160; 根据规则，编译的时候，如果检测到与目录同名的文件，就会放弃去编译相同目录下的其他文件，而只会编译同名文件，如上面的 **xxx.js**   

### 异名文件  
&#160; &#160; 这里的文件针对 **public/src/pc/css 或者 js目录** 我们还是以代码的方式来理解吧  

##### 源目录 = public/src/pc/js/xxx/  

    js/xxx/www.js       # 文件1
    js/xxx/yyy.js       # 文件2
    js/xxx/zzz.js       # 文件3

##### www.js
    console.log('www')

##### yyy.js
    console.log('yyy')

##### zzz.js
    console.log('zzz')

#### 编译输出文件  /dist/js/xxx.js，浏览器将打印
    # console.log('www')
    www
    # console.log('yyy')
    yyy
    # console.log('zzz')
    zzz

#### 编译输出的模板  /dist/html/xxx.html
    .....  
    .....
    <script src="/js/xxx.js"></script>
    </body>

&#160; &#160; 根据规则，编译的时候，所有的异名文件会合并为`xxx.js`，那么这个合并有顺序吗？没有，这个顺序是操作系统的排序规则。但是同名文件的顺序可以自定义


## 下划线开始的文件夹名  
&#160; &#160; 根据编译规则，文件夹名以下划线开始的文件夹，都会被主动忽略，如下  

##### 源目录 = public/src/pc/  
    js/xxx/         # 正常目录
    js/xxx/aaa.js   

    js/_xxx/        # 被忽略的目录，连带下面的文件
    js/_xxx/bbb.js  

##### 我可以使用被忽略目录里面的文件吗？
&#160; &#160; 可以！`js/_xxx/` 在编译时是编译环境主动忽略的，但不影响正常文件require `js/_xxx/` 目录下的文件，如下示例

##### 源目录 = public/src/pc/js/xxx/aaa.js  
    require('./_xxx/bbb.js')  

像上面这种调用方式是合法的

## 中划线与文件名  
&#160; &#160; 请不要使用中划线来命名文件，文件夹  

#### 不合法的命名方式  

##### 源目录 = public/src/pc/
    # 不合法的文件夹
    js/abc-xxx/

    # 不合法的文件名  
    js/xxx/xxx-yyy.js

&#160; &#160; 根据编译规则，中划线命名被编译环境使用，主要用于多层级目录输出成单一文件，我们可以在打包规则中在详细说明中划线的用法
