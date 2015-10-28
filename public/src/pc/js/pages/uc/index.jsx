var libs = require('libs/libs')
var wx = require('../_common/weixin')()
var router = require('libs/router').router
var route = require('libs/router').route
SA.setter('_GLOBAL',{data:{} })
route({
    'index': index,
    'mycar': mycar,
    'addcar': addcar,
    'myaddress': myaddress,
    'addaddress': addaddress,
    'carstat': carstat,
    'carlog': carlog,
    'mycaris': mycaris,
    'carfinished': carfinished,
    'reg_log': reg_log
});

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function init(){
    var url = libs.urlparse(location.href)
    if(!url.hash){
        router('index')
    }else{
        var hash = url.hash
        router(hash)
    }
}

init()

// require([], function(wx) {
//     var url = libs.urlparse(location.href)
//     if(!url.hash){
//         router('index')
//     }else{
//         var hash = url.hash
//         router(hash)
//     }
// })


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

//我的地址及添加地址
function addaddress(){
    require('./_component/_addaddress')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}

//我的地址及添加地址
function carstat(){
    require('./_component/_carstat')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}

//car log
function carlog(){
    require('./_component/_carlog')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}

//car log
function carfinished(){
    require('./_component/_carfinished')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}
//car log
function mycaris(){
    require('./_component/_mycaris')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}
//注册跟登录（手机验证）
function reg_log(){
    require('./_component/_reg_log')('container-box',{}, function(){
        // $('#now').click(function(){
        //     router('esti')
        // })
    });
}
