console.log('index');
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

libs.inject
.js(['/js/t/epic/js/epiceditor.js', 'epic'],initEpicEditor)
// .css(['/css/t/simplemde.css', 'simplemdecss'])

function initEpicEditor(){
    var opts = {
        container: 'epiceditor',
        textarea: null,
        basePath: '/js/t/epic',
        clientSideStorage: true,
        localStorageName: 'epiceditor',
        useNativeFullscreen: true,
        parser: marked,
        file: {
            name: 'epiceditor',
            defaultContent: '',
            autoSave: 100
        },
        theme: {
            base: '/themes/base/epiceditor.css',
            preview: '/themes/preview/bartik.css',
            editor: '/themes/editor/epic-light.css'
        },
        button: {
            preview: true,
            fullscreen: true,
            bar: "auto"
        },
        focusOnLoad: false,
        shortcut: {
            modifier: 18,
            fullscreen: 70,
            preview: 80
        },
        string: {
            togglePreview: 'Toggle Preview Mode',
            toggleEdit: 'Toggle Edit Mode',
            toggleFullscreen: 'Enter Fullscreen'
        },
        autogrow: false
    }
    var editor = new EpicEditor(opts).load();
    var find = function(name){
         return editor.getElement(name);
    }

    iframeDoc = find('editor')

    libs.inject(iframeDoc)
    .js(['/js/t/epic/js/test.js', 'iframeEditor'])


    var ed = {
        editor: editor,
        find: find
    }

    dealWithEditor.call(ed)
}

function dealWithEditor(){
    var editor = this.editor;
    var find = this.find

    var utilbar = $(find('epiceditor-utilbar'));  //工具栏
    $(utilbar).append('<button class="btn" id="add_md_btn">添加</button>')
    $(utilbar).append('<button class="btn" id="add_pic_btn">插图</button>')

    // ==========  添加文章  =========
    $(find('add_md_btn')).click(function(){
        var kkk = editor.exportFile(null,'json')
        kkk = JSON.parse(kkk)
        // console.log(typeof kkk);
        var ddd = submitContent(kkk.content)
        console.log(ddd);
        // var content = $('#add_md').val()

    })
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
    if (data.error){ //没有该用户
        console.log(data);
    }
    else{
        SA.set('USER', data)
        $('#edit').click(function(){
            $('.box').show()
            $('.addtopic').show()
        })
        console.log(data);
    }
    // $('.box').hide()
}

//点击登录
$('.login').click(login)


//添加文章
function submitContent(content){
    console.log(content);    // var content = $('#add_md').val()
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
        return data
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
