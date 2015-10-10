var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

route({
    'index': index,
    'order': order,
    'order_over': order_over,
    'wash': wash,
    'detection': detection
});

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash){
        detection()
    }else{
        var hash = url.hash
        router(hash)
    }
})

function index(){
    require('./_component/_ycindex')('container-box',function(){
        // bindIndex();
    });
}
function order_over(){
    require('./_component/_order_over')('container-box',function(){
        // bindIndex();
    });
}
function order(){
    require('./_component/_order')('container-box',function(){
        // bindIndex();
    });
}
function wash(){
    require('./_component/_wash')('container-box',function(){
        // bindIndex();
    });
}
function detection(){
    require('./_component/_detection')('container-box',function(){
        // bindIndex();
    });
}
