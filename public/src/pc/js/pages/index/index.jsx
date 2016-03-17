var api = require('libs/api')
var libs = require('libs/libs')
var AppList = require('modules/list/load_list');
var cfg = require('root/config')
// var loginBox = require('modules/sign/signin')

var param = libs.queryString(),
    repass = false

if (param && param.type) {
    var type = param.type;
    if (type==='signup') {
        repass = true;
        $('.box, .sign, .repassword').show()
    }
}
else {
    //初始化获取用户信息
    api.req(
        '/$signin',
        sign_resaults
    )
}


// function login(){
//     var user = $('.username').val()
//     var pass = $('.password').val()
//
//     if (user && pass){
//         var $api = '/$signin',
//             postdata = {username: user, password: pass};
//         if (repass){
//             $api = '/$signup'
//             postdata = {username: user, password: pass, repass: $('.repassword').val()};
//         }
//
//         api.req(
//             $api,
//             postdata,
//             sign_resaults
//         )
//     }
// }
// //点击登录
// $('.login').click(login)


//signin返回信息回调
function sign_resaults(data){
    if (data.error){ //没有该用户
        console.log(data);
    }
    else{
        SA.set('USER', data)
        $('#edit').click(function(){
            $('.box').show()
            //插入编辑器
            require(['./_common/epic'], function(){})
        })
        console.log(data);
    }
}


//  ===========  列表文章  =========
api.req(
    '/$listtopic',
    listTopic_resaults
)

function listTopic_resaults(data){
    var lists = []
    data.map(function(item, i){
        // console.log(item);
        lists.push( <a href={"?topic="+item._id}>{item.title}</a> )
    })

    if (!param.topic){
        $('#listtopic').html('')
        AppList(lists, 'listtopic', {evt: 'auto'});
    }
}

// $('#reg').click(function(){
//     var scope = 'user',
//         client_id = cfg.auth.github.clientID,
//         state = 'agzgz',
//         redirect_uri = cfg.auth.github.callbackURL
//
//     window.location.href = "https://github.com/login?return_to=/login/oauth/authorize?client_id="+client_id+"&redirect_uri="+redirect_uri+"&response_type=code"
// })
