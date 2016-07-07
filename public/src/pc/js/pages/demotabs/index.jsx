var Tabs = require('modules/tabs/tabs')
var libs = require('libs/libs')
var Inputs = require('modules/form/text1')


var _data = [
    '典型页面',
    '导航',
    '表单',
    '列表',
    '高级搜索'
]

var v = {
    data: _data,
    option: {
        container: 'for-vtabs',
        globalName: 'TabSwitch',
        itemMethod: function(){
            $(this).click(function(){
                libs.msgtips('5')
            })
        }
    },
    cb: function(eles){
        $(eles).each(function(i, view){
            view.content(<span>{'我是初始数据'+i}</span>)
        })
    }
}

var h = {
    data: _data,
    option: {
        container: 'for-htabs',
        theme: 'htabs',
        class: 'tabsGroupY',
        globalName: 'hTabSwitch',
        event: 'mouseover'
    },
    cb: function(eles){
        $(eles).each(function(i, view){
            view.content('我是初始数据'+i)
        })
    }
}

var ipt = {
    data: [
        {
            input:{ id: 'addtab_b', value: '添加', type: 'button'},
            desc: '同时为两个tabs增加一个新的标签'
        }
    ],
    option: { container: 'addtab' },
    cb: function(){
        $('#addtab_b').click(function(){
            ttt.add('测试', function(select){
                select('你妹啊，是我')
            })
            eee.add('测试1', function(select){
                select(<span>你妹啊，是我1</span>)
            })
        })
    }
}

// 此tab与node端同构
var ttt = Tabs( v.data, v.option, v.cb );
var eee = Tabs( h.data, h.option, h.cb );
Inputs( ipt.data, ipt.option, ipt.cb );
