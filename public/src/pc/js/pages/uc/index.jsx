var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

route({
    'index': index,
    'mycar': mycar,
    'addcar': addcar,
    'myaddress': myaddress
});

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash){
        myaddress()
    }else{
        var hash = url.hash
        router(hash)
    }
})


function index(){
    require('./_component/_index')('container-box',{}, function(){ });
}

//我的车
function mycar(){
    require('./_component/_mycar')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}

//添加车辆
function addcar(){
    require('./_component/_addcar')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}

//我的地址及添加地址
function myaddress(){
    require('./_component/_myaddress')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}
