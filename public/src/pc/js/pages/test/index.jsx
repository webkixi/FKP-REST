var libs = require('libs/libs')
var router = require('libs/router').router
var route = require('libs/router').route

route({
    'abc': abc,
    'bcd': bcd
});

require.ensure([], function() {
    var url = libs.urlparse(location.href)
    if(!url.hash) return
    var hash = url.hash
    router(hash)
    $('#abc').click(function(){
        router('bcd')
    })
})

function bcd(){
    //密集图相册列表
    var imgs = [
        {title: 'aaaaaa', img:'/images/demo/aclass/11.png'},
        {title: 'bbbb',  img:'/images/demo/aclass/22.png'},
        {title: 'cccccc', img:'/images/demo/aclass/33.png'}
    ]

    var SlideList = require('modules/swipe/slide');
    SlideList(imgs, 'test');
}


function abc(){
    var pagi = require('modules/pagination/pagi');
    // 根据总的文章数和每页文章数算出分页总数，并配好链接
    var pagidata = {
        	total: 300,   //文章总数
         	per:   10,    //每页文章数
        	url:   '/xxx/yyy.html',  //文章url
         	query: 'abc="slime"&xyz="pack"&curentPage='  //文章query
        },

        //分页条有几个分页标签
        begin = {
            start: 0,
            off: 10
        }


    pagi( pagidata, begin, 'test', function(){
        $(this).click(function(){
            alert('bbbbbbb');
        })
    })
}
