var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

SA.setter('_GLOBAL',{data:{} })

route({
    'index': index,
    'order': order,
    'order_over': order_over,
    'order_ok': order_ok,
    'order_address_no': order_address_no,
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
        index()
    }else{
        var hash = url.hash
        router(hash)
    }
})
//大小保养
function index(){
    require('./_component/_ycindex')('container-box',function(){
        // bindIndex();
        $('#now').click(function(){
            router('order');
        })
    });
}
//洗车订单
function order_over(){
    require('./_component/_order_over')('container-box',function(){
        // bindIndex();
    });
}
//提交订单 填写个人信息
function order(){
    require('./_component/_order')('container-box',function(){
        // bindIndex();
        // console.log(SA.getter('_GLOBAL').data);
        
    });
}
//我的订单
function order_ok(){
    require('./_component/_order_ok')('container-box',function(){
        // bindIndex();
    });
}
//我的订单－无地址状态
function order_address_no(){
    require('./_component/_order_address_no')('container-box',function(){
        // bindIndex();
    });
}
//洗车
function wash(){
    require('./_component/_wash')('container-box',function(){
        // bindIndex();
    });
}
//全车检测
function detection(){
    require('./_component/_detection')('container-box',function(){
        // bindIndex();
    });
}
