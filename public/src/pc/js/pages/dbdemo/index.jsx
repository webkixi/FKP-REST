// index.js
// 数据处理部分


SA.set('USER', {error: '-1'})
var Tabs = require('modules/tabs/tabs');
var IndexList = require('./_common/_index')

var WS = require('modules/wsocket/index')

WS.on('imchat', function(data){
    $('.chattip').show().addClass('animated tada')
    setTimeout(function(){
        $('.chattip').hide().removeClass('animated tada')
    },10000)
})

WS.on('article_count', function(val){
    console.log(val.data);
})


var _config = [
    '博客',
    'FKPJS',
    {title: <a href="/app">路由单页</a>, 'data-href':'大单页'},
    {title: <a href="/chat">聊天室</a>, 'data-href':'聊天室'},
    {title: <a href="/cat">分类列</a>, 'data-href':'分类列'},
    {title: <a href="/demotabs">同构Tabs</a>, 'data-href':'Tabs'},
    {title: <a href="/formshow">表单</a>, 'data-href':'表单'},
    {title: <a href="/hello">接口</a>, 'data-href':'接口'},
    {title: <a href="/pagi">同构分页</a>, 'data-href':'分页'},
    {title: <a href="/ueditor">编辑器</a>, 'data-href':'编辑器'}
]

var ttt = Tabs(_config,
    {   container: 'forTabs',
        globalName: 'TabSwitch'
    },
    function(views){
        IndexList(views[0]);
        views[1].content( "这其实是tabs的实例" )
    }
)
