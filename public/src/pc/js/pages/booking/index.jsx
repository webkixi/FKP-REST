var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

route({
    'index': index,
    'esti': esti,
    'esti2': esti2,
    'mydate': mydate
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
        // esti2()
    }else{
        var hash = url.hash
        router(hash)
    }
})




function esti(){
    require('./_component/_estimate')('container-box',{}, function(){
        $('header').click(function(){
            //back
            router('index')
        })
        $(".price").click(function(e){
            e.stopPropagation()
            router('esti2')
        })
    });
}

function esti2(){
    require('./_component/_estimate2')('container-box',{}, function(){
        $('header').click(function(){
            //back
            router('esti')
        })
        $('#now').click(function(){
            router('mydate')
        })
    });
}

function mydate(){
    require('./_component/_mydate')('container-box',{}, function(){
        $('header').click(function(){
            //back
            router('esti2')
        })
    });
}

function index(){
    require('./_component/_index')('container-box',{}, function(){
        $('#now').click(function(){
            router('esti')
        })
    });
}
