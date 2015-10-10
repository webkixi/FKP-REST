var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

route({
    'about': about,
    'about_service': about_service
});

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash){
        about_service()
    }else{
        var hash = url.hash
        router(hash)
    }
})
//关于我们
function about(){
    require('./_component/_about')('container-box',function(){
        // bindIndex();
    });
}
//服务项目
function about_service(){
    require('./_component/_about_service')('container-box',function(){
        // bindIndex();
    });
}
