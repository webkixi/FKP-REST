var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route
var api = require('libs/api')

api.wx('userlist',{},
function(data){
    console.log(data);
})

route({
    'userlist': userlist
});

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash){
        userlist()
    }else{
        var hash = url.hash
        router(hash)
    }
})


function userlist(){
    require('./_component/_userlist')('container-box',{}, function(){ });
}
