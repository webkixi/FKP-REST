# pages
FKPJS的 NODE 端使用`KOA@1.2`实现的，MVC 架构，`pages目录`作为 MVC 中的 control 层，连接数据与模板。  
在 NODE 端，我们使用`koa-router`来实现访问路由，并输出html内容。  

## 同名原则  
作为一个整体，`pages目录`下的文件必须与前端 HTML 目录下的文件同名  

##### public/src/pc/html/a.hbs 文件对应
```
／pages/a.js
```
`a.js`会自动匹配`a.hbs`，在`a.js`中，我们可以处理 GET/POST/UPDATE 等数据  


## 代码示例  
这里以`/pages/hello.js`的代码示例  

```
"use strict";

function *hello(oridata, control) {

    return control.run({
        get: async ()=>{
            oridata.fkp = 'FKP-REST';

            if (this.local.query._stat_ &&
                this.local.query._stat_ === 'DATA'
            ){
                this.body = {pdata: '我是get数据'}
            }
            else{
                return oridata;
            }

        },

        post: async () => {
            return {pdata: '我是post数据'}
        }
    })

}

export {hello as getData}  // 输出必须命名为getData的`generator`，基于`koa@1.2`

```
NODE 端默认开启了 babel， 支持 es6/es7语法。对于`koa@2.0`的支持，正在开发中
