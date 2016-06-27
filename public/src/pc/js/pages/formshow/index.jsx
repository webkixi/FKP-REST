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

window.kkk = Radios(_config, {
    container: 'for-radio',
    itemMethod: function(){
        // console.log(this);
    }
});

var _config_ckbox = {
    type: 'checkbox',
    name: ['zzz', 'zzz', 'zzz'],
    title: ['选项1', '选项2', '选项3'],
    value: ['1', '2', '3']
}

window.ckbox = Radios(_config_ckbox, {
    container: 'for-checkbox',
    itemMethod: function(){
        // console.log(this);
    }
});




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
    'Radio & Checkbox',

    {
        input:{
            type: 'radio',
            name: ['ddd', 'ddd', 'ddd'],
            title: ['选项1', '选项2', '选项3'],
            value: ['1', '2', '3']
        }
    },
    {
        input:{
            type: 'radio',
            name: ['sss', 'sss', 'sss'],
            desc: ['选项4', '选项5', '选项6'],
            value: ['4', '5', '6']
        }
    },

    {
        input:{
            type: 'checkbox',
            name: ['www', 'www', 'www'],
            title: ['选项1', '选项2', '选项3'],
            value: ['1', '2', '3']
        }
    },

    // ===========================
    'Input及联动',

    {
        input:{
            name:      'user',
            id:        'user',
            value:     null,
            type:      'text',
            placehold: '我的id是user'
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
            placehold: '绑定user'
        },
        title:     '聊天',
        class:     null,
        desc:      null,
        union: {
            id: "user",
            cb: function(){
                // this是message的父级lable
                libs.msgtips('我是message,我关联姓名');
                $('#user').on('input',function(){
                    $('#message').val($('#user').val())
                })
            }
        }
    },

    {
        input:{
            name:      'good',
            id:        'good',
            value:     null,
            type:      'text',
            placehold: '绑定user'
        },
        title:     '绑定',
        class:     null,
        desc:      null,
        union: {
            id: "user",
            cb: function(){
                // this是message的父级lable
                libs.msgtips('good,我关联姓名');
                $('#user').on('input',function(){
                    $('#good').val($('#user').val())
                })
            }
        }
    },

    {
        input:{
            name:      'other',
            id:        'other',
            value:     null,
            type:      'text',
            placehold: '我不会联动'
        },
        title:     '其他',
        class:     null,
        desc:      '*其他'
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


    '联动下拉菜单',


    {
        input:{
            name:      'select',
            id:        'select',
            value:     [[1,2,3], ['a','b','c']],
            type:      'select',
            placehold: '请选择'
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
            type:      'select',
            placehold: '请选择'
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
            type:      'select',
            placehold: '请选择'
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

    '提交',

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

window.bbb = Inputs(_input_config,
{
    container: 'for-input',
    theme: 'index'
},
function(){
    _input_config[5].desc= '我是被SAX重新渲染过的'
    _.delay(function(){
        libs.msgtips('SAX将启动渲染', 'warning')
    }, 1000)
    _.delay(function(){
        SAX.setter('for-input', _input_config)
    }, 3000)
})
