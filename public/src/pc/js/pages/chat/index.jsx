var api = require('libs/api')
var libs = require('libs/libs')
var Input = require('modules/form/text1')
var wsocket = require('modules/wsocket/index')

wsocket('imchat', function(data){
    var info = data.data
    $('#saloon').append('<div><span>'+info.user+'：</span><span>'+info.message+'</span></div>')
})

// Input批量产出form表单，目前支持 text/hiden/password/tel

// 方案1
// var inputs = {
//     name:      ['user', 'message' , 'submit'],
//     id:        ['user', 'message' , 'submit'],
//     type:      ['text', 'text', 'button'],
//     title:     ['姓名' , '聊天' , ''],
//     value:     [null  , null  , '发射'],
//     class:     ['user'  ,null  , 'chatSubmit'],
//     placehold: [null  , '请输入聊天内容']
// }

// 方案2
var inputs = [
    {
        input:{
            name:      'user',
            id:        'user',
            value:     null,
            type:      'text',
            placehold: null
        },
        title:     '姓名',
        class:     null,
        desc:      null
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

Input(inputs, 'kick-center', function(){
    $('#message').bind('keypress',function(event){
        if(event.keyCode == "13"){
            $('#submit').click()
        }
    });

    $('#submit').click(function(){
        var _msg = $('#message').val(),
            _user = $('#user').val()

        if (_msg){
            if (_msg.length>50){
                libs.msgtips('你不能输入超过50个字符', 'warning')
                return false;
            }
            var post_data = {
                message: _msg,
                user: _user
            }
            api.req('/chat', post_data, function(){
                $('#message').val('')
            })

        }
    })
})
