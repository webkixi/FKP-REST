var Tabs = require('modules/tabs/tabs')
var libs = require('libs/libs')
var Inputs = require('modules/form/text1')


var _config = [
    {title: '典型页面','data-idf':'1'},
    '导航',
    <a>表单</a>,
    '列表',
    '高级搜索'
]


var ttt = Tabs(_config,
    {   container: 'for-vtabs',
        globalName: 'TabSwitch',
        itemMethod: function(){
            $(this).click(function(){
                libs.msgtips('5')
            })
        }

    },
    function(eles){
        $(eles).each(function(i, view){
            view.content(<span>{'我是初始数据'+i}</span>)
        })
    }
);




var eee = Tabs(_config,
    {   container: 'for-htabs',
        theme: 'htabs',
        class: 'tabsGroupY',
        globalName: 'hTabSwitch',
        event: 'mouseover'
    },
    function(eles){
        $(eles).each(function(i, view){
            view.content('我是初始数据'+i)
        })
    }
);




var inputs = [ { input:{ id: 'addtab_b', value: '增加tab', type: 'button'} } ]
var inputs_method = function(){
    $('#addtab_b').click(function(){

        ttt.add('测试', function(select){
            select('你妹啊，是我')
        })
        eee.add('测试1', function(select){
            select(<span>你妹啊，是我1</span>)
        })
    })
}

Inputs(
    inputs,
    { container: 'addtab' },
    inputs_method
)
