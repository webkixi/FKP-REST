# 我是开始
页面展示的是本页的源码，参考本页可产出其他文档页面  

## Html   
>目录：/public/src/pc/html/docslodash.hbs  

```
<html lang="en">
<head>
    {{#if mdcontent}}
    <title> {{mdcontent.title}} lodash api</title>
    {{else}}
    <title>lodash api</title>
    {{/if}}
    @@include('./_common/docs/header.html')
</head>

<body>
    <div class="page" data-module="">
        @@include('./_demoindex/top.html')
        <div class="doc-container">
            <div class="left">
                {{{menutree}}}
            </div>
                <div class="right">
                    {{#if mdcontent}}
                        @@include('./_demoindex/detail.html')
                    {{else}}
                    <div class="hheader demo">
                        @@include('./_common/docs/home.html')
                    </div>
                {{/if}}
            </div>
        </div>
    </div>

    <div id="footer">
        ....
        ....
    </div>
</body>

</html>
```   

## CSS  
>/public/src/pc/css/pages/docslodash/index.less  

```
请查看源代码，内容较多  
```

## JS  
>/public/src/pc/js/pages/docslodash/index.jsx  

```
var _ = require('lodash')

$('li.category a').click(function(e){
    e.stopPropagation()
})

$('li.category').find('h4').click(function(){
    $(this).find('.iconfont').toggleClass('icon-xiala').toggleClass('icon-sanjiao')
    $(this).next('ul').toggle()
})


//英文目录映射中文
var cl_json = require('./catalog.json')  //目录英文名，中文名映射json文件
var tmp = Object.keys(cl_json)
$('.catalog').each(function(i, item){
    var title = $(item).html()
    if (_.indexOf(tmp, title)>-1){
        $(item).html(cl_json[title])
    }
})
```


## node
>目录： /pages/docslodash.js  

```
let libs = require('../libs/libs')
let path = require('path')
let co = require('co');
let docs = require( 'modules/docs' )

function *demoIndexData(oridata, control){

    async function getDocsData(url, opts){
        let _data = await docs.getDocsData(url, opts)
        return await co(_data)
    }

    async function loadMdFile(url){
        let _data = await docs.loadMdFile(url)
        return await co(_data)
    }

    return control.run({
        get: async ()=>{
            let tmp={};
            let params = libs.uri(this.local.path);

            let home = path.join(__dirname, '../docs/_home.md');

            let staticData = await getDocsData('docs/lodash', {
                docs: false,
                start: '_home.md',
                menutree: true,
                append: oridata
            })

            if (params && params.md){
                // loadfile
                tmp = await loadMdFile(params.md);
                staticData = _.extend(staticData, tmp);
            }

            return staticData;
        },

        post: async () => {
            let _body = await libs.$parse(this);
            let body = await co(_body)

            let staticData = await getDocsData('docs/lodash');
            if (body.mt){
                return staticData;
            }
            else {
                return {pdata: '我是post数据'}
            }
        }
    })

}

export {demoIndexData as getData}
```
