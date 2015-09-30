var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

route({
    'esti': esti
});

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash){
        index()
        // esti()
    }else{
        var hash = url.hash
        router(hash)
    }
})




function esti(){     
    require('./_component/_estimate')('container-box',{}, function(){ });
}

function index(){
    require('./_component/_index')('container-box',{}, function(){
        bindIndex();
    });
}

function bindIndex(){
    var Select = require('modules/ui/select');

    //省份
    new Select({label:'省份'}, 'province',function(){
        $(this).click(function(){
            // $(this).find('.dot').toggle()
            SA.setter('Pop',{data:{body:'明天就会下雨',display:'block'}})
        })
    });

    //城市
    new Select({label:'城市'}, 'city',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    //品牌
    new Select({label:'品牌车系'}, 'brand',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    //型号
    new Select({label:'型号'}, 'model',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    //上牌
    new Select({label:'首次上牌'}, 'license',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    //里程
    new Select({label:'行驶里程'}, 'mileage',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    $('#now').click(function(){
        router('esti')
    })
}
