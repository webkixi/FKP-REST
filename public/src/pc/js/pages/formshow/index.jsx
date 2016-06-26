var Radios = require('modules/form/radio1')
var Inputs = require('modules/form/text1')
var libs = require('libs/libs')

// radios
// ==========================================================================================

var _config = {
    name: ['xxx', 'xxx', 'xxx'],
    title: ['选项1', '选项2', '选项3'],
    value: ['1', '2', '3']
}

Radios(_config, 'for-radio');




// inputs
// Input批量产出form表单，目前支持 text/hiden/password/tel
// ==========================================================================================

// 方案1
// var _input_config = {
//     name:      ['user', 'message' , 'submit'],
//     id:        ['user', 'message' , 'submit'],
//     type:      ['text', 'text', 'button'],
//     title:     ['姓名' , '聊天' , ''],
//     value:     [null  , null  , '发射'],
//     class:     ['user'  ,null  , 'chatSubmit'],
//     placehold: [null  , '请输入聊天内容']
// }

// 方案2
var _input_config = [
    //0
    {
        input:{
            name:      'user',
            id:        'user',
            value:     null,
            type:      'text',
            placehold: '请输入姓名'
        },
        title:     '姓名',
        class:     null,
        desc:      '*用户名'
    },

    {
        input:{
            name:      'message',
            id:        'message',
            value:     null,
            type:      'text',
            placehold: '请输入聊天内容'
        },
        title:     '聊天',
        class:     null,
        desc:      null
    },

    {
        input:{
            name:      'password',
            id:        'password',
            value:     null,
            type:      'password'
        },
        title:     '密码',
        class:     null,
        desc:      null
    },

    {
        input:{
            name:      'select',
            id:        'select',
            value:     [[1,2,3], ['a','b','c']],
            type:      'select'
        },
        title:     '选择',
        class:     null,
        desc:      null
    },

    {
        input:{
            name:      'select1',
            id:        'select1',
            value:     [[1,2,3], ['啥','y','z']],
            type:      'select'
        },
        title:     '开选',
        class:     null,
        desc:      null,
        // select1 将联动 select
        union:     {
            id: 'select',
            url: '/$listtopic',
            param: {page: "$value"},
            cb: function(data, fill){
                // @data url的回调数据
                // @fill 将数据整理好后，fill方法将重新生成下拉菜单
                // fill 方法需要二位数组
                // [ [data-value=.....], [text=....], [data-attr=....] ]
                fill([['1','2','3'], ['aa','bb','cc'], ['gg','ee','ww']])
            }
        }
    },

    {
        input:{
            name:      'select2',
            id:        'select2',
            value:     [[1,2,3], ['啥','y','z']],
            type:      'select'
        },
        title:     '选选',
        class:     null,
        desc:      null,
        // select2 将联动 select1
        union:     {
            id: 'select1',
            url: '/$listtopic',
            param: {page: "$value"},
            cb: function(data, fill){
                fill([['1','2','3'], ['tt','rr','ss'], ['qq','22','55']])
            }
        }
    },

    {
        input:{
            name:      'submit',
            id:        'submit',
            value:     '发射',
            type:      'button',
            placehold: null
        },
        title:     null,
        class:     'chatSubmit',
        desc:      null
    }
]

Inputs(_input_config, 'for-input', function(){
    _input_config[0].desc= '我是被SAX重新渲染过的'
    _.delay(function(){
        libs.msgtips('SAX将启动渲染', 'warning')
    }, 1000)
    _.delay(function(){
        SAX.setter('for-input', _input_config)
    }, 5000)
})
