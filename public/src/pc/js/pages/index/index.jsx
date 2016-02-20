console.log('index');
var api = require('libs/api')
var libs = require('libs/libs')
var AppList = require('modules/list/load_list');
// var loginBox = require('modules/sign/signin')

var param = libs.queryString(),
    repass = false

if (param && param.type) {
    var type = param.type;
    if (type==='signup') {
        repass = true;
        $('.repassword').show()
    }
}

function login(){
    var user = $('.username').val()
    var pass = $('.password').val()

    if (user && pass){
        var $api = '/$signin',
            postdata = {username: user, password: pass};
        if (repass){
            $api = '/$signup'
            postdata = {username: user, password: pass, repass: $('.repassword').val()};
        }

        api.req(
            $api,
            postdata,
            sign_resaults
        )
    }
}
//signin返回信息回调
function sign_resaults(data){
    if (data.error==="10001"){ //没有该用户
        window.location.href = '/index?type=signup'
    }
    console.log(data);
}

//点击登录
$('.login').click(login)

//初始化获取用户信息
api.req(
    '/$signin',
    sign_resaults
)

// ==========  添加文章  =========


$('#add_md_btn').click(function(){
    var content = $('#add_md').val()
    if (content.length){
        if (libs.strLen(content)>15) {
            var postdata = {cnt: content};

            api.req(
                '/$addtopic',
                postdata,
                topic_resaults
            )

        }
        else {
            alert('文章字数少于15字')
        }
    }

    function topic_resaults(data){
        console.log(data);
    }
})


//  ===========  列表文章  =========
api.req(
    '/$listtopic',
    listTopic_resaults
)

function listTopic_resaults(data){
    var lists = []
    data.map(function(item, i){
        console.log(item);
        lists.push( <a href={"?topic="+item._id}>{item.title}</a> )
    })

    if (!param.topic){
        $('#listtopic').html('')
        AppList(lists, 'listtopic', {evt: 'auto'});
    }
}
