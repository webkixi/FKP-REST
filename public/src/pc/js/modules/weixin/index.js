/*
* 用于获取微信的相关数据
*/


var libs = require('libs/libs');
var api = require('libs/api')


// 初始化微信的数据
function init(cb){
    SA.set("_WEIXIN",{error: -1})
    getwx( cb);
    // if(typeof moni==='object'){
    //     setTimeout(function(){
    //         SA.setter("_WEIXIN",{user: moni})
    //         cb (moni)
    //     },1000)
    // }else
    //     getwx( cb );

}


//获取微信的数据，openid等
function getwx( cb ){
    var url = libs.urlparse(location.href),
        postdata,
        rtn_data;

    function callback(){
        if( cb )
            cb( rtn_data )
    }

    if(url.params.code && url.params.state){
        cd = url.params.code;
        st = url.params.state;
        postdata = {code: cd, state: st};
    }

    api.req('/weixin/userinfo', postdata, function(data){
        if(typeof data === 'string')
            data = JSON.parse(data)

        SA.setter("_WEIXIN",{user: data})
        rtn_data = data;
        callback()
    })


}

module.exports = init;


//虚拟数据
// var test_wx_data = {
//     "openid": "o07NUs3CiVcXXDFqB4kOWuFhgw64",
//     "nickname": "A赵义波",
//     "sex": 1,
//     "language": "zh_CN",
//     "city": "广州",
//     "province": "广东",
//     "country": "中国",
//     "headimgurl": "http://wx.qlogo.cn/mmopen/JcZacFyaMO7UGKLzDGAQdwQmDibjB6ZPC7K1KvGTItcuvKTtHkgb6D74lT181LZHsMGLicas99GnEDoHibOxxgUXHkeiaxY1PqVic/0",
//     "privilege": []
// }
//
// var test_wx_data1 = {
//     "openid": "o07NUs250UkhoK8Ks6bZAZK7Hkls",
//     "nickname": "天天修改",
//     "sex": 1,
//     "language": "zh_CN",
//     "city": "广州",
//     "province": "广东",
//     "country": "中国",
//     "headimgurl": "http://wx.qlogo.cn/mmopen/Lhlz6ia774dNwUgAucLtKIs94BWFSX1hPbdvibZT79y69oI7FusBz7I5qbech1olibVxribJ9vFErEoDrJFPpDa0my6yXkhmouoj/0",
//     "privilege": []
// }
