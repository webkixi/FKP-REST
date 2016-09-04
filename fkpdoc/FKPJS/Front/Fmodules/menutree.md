# 树形菜单-前端  

`menutree`组件是基于react实现的同构组件，可用于前端／NODE端，`menutree`组件支持三层结构。  
##### [NODE端树形菜单说明](?md=fkpdoc_FKPJS_Node_Nmodules_menutree)

## 组件文件   
>##### react  
/public/react/modules/menutree/index.jsx     
/public/react/modules/menutree/_menutree/index.jsx  


## 调用实例  
具体代码参考`/public/src/pc/js/docslodash/index.jsx`
```
var Mtree = require('modules/menutree').pure()

function lm(){
  $('li.category a').on('click', function(e){
      e.stopPropagation()
  })

  $(this).find('h4').click(function(){
      $(this).find('.iconfont').toggleClass('icon-xiala').toggleClass('icon-sanjiao')
      $(this).next('ul').toggle()
  })
}

require('libs/api').req('/docslodash',{mt: 'test'})
.then(function(data){
    React.render(
        <Mtree data={data.docs} listMethod={lm}/>,
        document.getElementById('mtree')
    )
})

```

## 数据结构  
`menutree`组件根据数据结构产出 html 结构，要求的数据结构如下   
```
{
  "docs": {    
    ....
    ....
    ....
    //父节点 docs['FKPJS']
    "FKPJS": {                    
      "group": "fkpdoc/FKPJS",    //物理目录，相对于根目录
      "caption": "FKPJS",         //节点名称，分类名称
      "list": [                   //该分类下／节点下的文章列表

        //文章列表项信息
        {
          "url": "?md=fkpdoc_FKPJS_10summary",        //文章的链接地址
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_10summary", //文章的ip链接地址
          "group": "FKPJS",    //节点名称，分类名称
          "title": " 概述  ",   //在列表中现实的标题
          "fileName": "10summary.md",
          "fullpath": "fkpdoc/FKPJS/10summary.md",
          "des": "",
          "mdname": ""
        },
        ....
        ....
      ],
      "parent": "root",     //父级
      "children": [         //所包含的子集，子集在数据结构中处于同一层
        "10Start",  //docs['10Start']
        "Core",     //docs['Core']
        "Front",
        "Node"
      ],
      "subtree": "fkpdoc/FKPJS/Node"
    },

    // FKPJS节点的儿子一
    // docs['10Start']
    "10Start": {
      "group": "fkpdoc/FKPJS/10Start",
      "caption": "10Start",
      "list": [
        {
          "url": "?md=fkpdoc_FKPJS_10Start_12struct",
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_10Start_12struct",
          "group": "10Start",
          "title": " FKPJS结构图   ",
          "fileName": "12struct.md",
          "fullpath": "fkpdoc/FKPJS/10Start/12struct.md",
          "des": "",
          "mdname": ""
        },
        ....
        ....
      ],
      "parent": "FKPJS",
      "children": [],
      "subtree": true
    },

    // FKPJS节点的儿子二
    "Core": {
      "group": "fkpdoc/FKPJS/Core",
      "caption": "Core",
      "list": [
        {
          "url": "?md=fkpdoc_FKPJS_Core_sax",
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_Core_sax",
          "group": "Core",
          "title": " FKP-SAX   ",
          "fileName": "sax.md",
          "fullpath": "fkpdoc/FKPJS/Core/sax.md",
          "des": "",
          "mdname": ""
        }
      ],
      "parent": "FKPJS",
      "children": [],
      "subtree": true
    },

    // FKPJS节点的儿子三
    // 父节点 Front
    "Front": {
      "group": "fkpdoc/FKPJS/Front",
      "caption": "Front",
      "list": [
        {
          "url": "?md=fkpdoc_FKPJS_Front_api",
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_Front_api",
          "group": "Front",
          "title": " FKP的ajax请求  ",
          "fileName": "api.md",
          "fullpath": "fkpdoc/FKPJS/Front/api.md",
          "des": "",
          "mdname": ""
        },
        {
          "url": "?md=fkpdoc_FKPJS_Front_pages",
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_Front_pages",
          "group": "Front",
          "title": " pages",
          "fileName": "pages.md",
          "fullpath": "fkpdoc/FKPJS/Front/pages.md",
          "des": "",
          "mdname": ""
        },
        {
          "url": "?md=fkpdoc_FKPJS_Front_upload",
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_Front_upload",
          "group": "Front",
          "title": " ueditor的集成  ",
          "fileName": "upload.md",
          "fullpath": "fkpdoc/FKPJS/Front/upload.md",
          "des": "",
          "mdname": ""
        }
      ],
      "parent": "FKPJS",
      "children": [
        "Fmodules"
      ],
      "subtree": "fkpdoc/FKPJS/Front/Fmodules"
    },

    // Front节点的儿子一
    "Fmodules": {
      "group": "fkpdoc/FKPJS/Front/Fmodules",
      "caption": "Fmodules",
      "list": [
        {
          "url": "?md=fkpdoc_FKPJS_Front_Fmodules_router",
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_Front_Fmodules_router",
          "group": "Fmodules",
          "title": " 前端路由",
          "fileName": "router.md",
          "fullpath": "fkpdoc/FKPJS/Front/Fmodules/router.md",
          "des": "",
          "mdname": ""
        }
      ],
      "parent": "Front",
      "children": [],
      "subtree": true
    },

    // FKPJS节点的儿子四
    "Node": {
      "group": "fkpdoc/FKPJS/Node",
      "caption": "Node",
      "list": [
        {
          "url": "?md=fkpdoc_FKPJS_Node_auto",
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_Node_auto",
          "group": "Node",
          "title": " 自动化部署FKP到linux服务器  ",
          "fileName": "auto.md",
          "fullpath": "fkpdoc/FKPJS/Node/auto.md",
          "des": "",
          "mdname": ""
        },
        .....
        .....
      ],
      "parent": "FKPJS",
      "children": [
        "Nmodules"
      ],
      "subtree": "fkpdoc/FKPJS/Node/Nmodules"
    },

    // Node节点的儿子一
    "Nmodules": {
      "group": "fkpdoc/FKPJS/Node/Nmodules",
      "caption": "Nmodules",
      "list": [
        {
          "url": "?md=fkpdoc_FKPJS_Node_Nmodules_menutree",
          "ipurl": "http://192.168.199.135:8070?md=fkpdoc_FKPJS_Node_Nmodules_menutree",
          "group": "Nmodules",
          "title": " 树形菜单  ",
          "fileName": "menutree.md",
          "fullpath": "fkpdoc/FKPJS/Node/Nmodules/menutree.md",
          "des": "",
          "mdname": ""
        },
        ......
        ......
      ],
      "parent": "Node",
      "children": [],
      "subtree": true
    }
  }
}
```
