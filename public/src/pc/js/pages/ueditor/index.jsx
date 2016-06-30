var libs = require('libs/libs')
var inject = libs.inject().js;
window.UEDITOR_HOME_URL = '/js/t/ueditor/'

inject(['/js/t/ueditor/ueditor.config.js', 'Baidu-Editor-Config'], alljs)

function alljs(){
    inject(['/js/t/ueditor/ueditor.all.js', 'Baidu-Editor'], startEditor)
}

function startEditor(){
    var ue = UE.getEditor('for-ueditor');
}
