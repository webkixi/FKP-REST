// var libs = require('libs/libs');
// var api = require('libs/api')
// var router = require('libs/router').router
// var route = require('libs/router').route
//
//
// var tes_data = {
//     code: 1,
//     message: 'Success',
//     results:
//     [
//         {
//             uid: 21,
//             nick: 'A赵义波',
//             openid: 'o07NUs3CiVcXXDFqB4kOWuFhgw64',
//             gender: '1',
//             mobile: '18617323269',
//             addr: [
//                 {
//                     zip: '440000',
//                     province: '广东',
//                     city: '440100',
//                     county: '440103',
//                     street: '好地方'
//                 }
//             ],
//             usercar: [
//                 {
//                     carbrand: '本田',
//                     carseries: 'CR-V',
//                     cartype: '34310',
//                     carid: 34310
//                 }
//             ]
//         }
//     ]
// }
//
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
//
// function init_wx(cb){
//     // SA.setter("_LOCAL_USER", tes_data.results[0]);
//     // SA.setter("_WEIXIN", {user: test_wx_data})=
//
//     SA.setter("_LOCAL_USER",{error: "-1"});
//     SA.setter("_WEIXIN",{})
//     getwx();
// }
//
//
// function getwx(cb){
//     var url = libs.urlparse(location.href)
//     var postdata = {test: '123'}
//     if(url.params.code && url.params.state){
//         cd = url.params.code;
//         st = url.params.state;
//
//         postdata = {code: cd, state: st};
//     }
//
//     // api.wx()
//     api.wx('userinfo', postdata, function(data){
//         if(typeof data === 'string'){
//             data = JSON.parse(data)
//         }
//         SA.setter("_WEIXIN",{user: data})
//         getLocalUser(data, cb)
//         // {"openid":"o07NUs250UkhoK8Ks6bZAZK7Hkls","nickname":"天天修改","sex":1,"language":"zh_CN","city":"广州","province":"广东","country":"中国","headimgurl":"http:\/\/wx.qlogo.cn\/mmopen\/Lhlz6ia774dNwUgAucLtKIs94BWFSX1hPbdvibZT79y69oI7FusBz7I5qbech1olibVxribJ9vFErEoDrJFPpDa0my6yXkhmouoj\/0","privilege":[]}
//     })
//
//     function getLocalUser(data, callback){
//         if(data.openid){
//             api.req('login',{openid: data.openid}, function(record){
//                 if(record){
//                     if(typeof record === 'string'){
//                         record = JSON.parse(record)
//                     }
//                     console.log('－－－－－－本地用户数据－－－－－－－');
//                     // console.log(record);
//                     if(record.code === 1){
//                         var local_user_info = record.results[0];
//                         SA.setter("_LOCAL_USER", local_user_info);
//                     }else{
//                         SA.setter("_LOCAL_USER", {error: "-2"});
//                     }
//                 }
//             })
//             if(callback)
//                 callback()
//         }
//         else
//             SA.setter("_LOCAL_USER",{error: "-3"});
//     }
// }
//
//
// module.exports = init_wx






var libs = require('libs/libs');
var api = libs.api
var router = require('libs/router').router
var route = require('libs/router').route
var wx = require('modules/weixin/index')

// var test_wx_data = {
//     "openid": "oHSkUwle-4RdQspVz2SGwrtfuw-g",
//     "nickname": "更改名字",
//     "sex": 1,
//     "language": "zh_CN",
//     "city": "长沙",
//     "province": "湖南",
//     "country": "中国",
//     "headimgurl": "http://wx.qlogo.cn/mmopen/I5UfkKM8220xvsXQ6ibFHzn5Pkf6MR8MyWiapTqdtziaLCIUmIMfQathLt2Mj1eT2WAhXUWSRI0L9jypCGPhBK2kQKR4A8uBbt1/0",
//     "privilege": []
// }

/*
* 初始化本地全局用户数据
* 获取微信数据
* 通过微信数据获取本地用户数据
*/
function init_wx(){
    SA.set("_LOCAL_USER",{error: "-1"});
    // wx( getLocalUser )
    wx( getLocalUser )
}

/*
* 获取本地用户数据
* @param1 {json} json对象
*/
function getLocalUser( data ){
    if(data && data.openid){
        var params = {
                "content": {
                    "user": {
                        "userinfo":{
                            "openid": data.openid
                        }
                    }
                }
            };
        api.req('login',
            params,
            function(record){
            //验证返回数据
            //如果code===1则写入全局，并执行全局方法
            if(record){
                if(typeof record === 'string')
                    record = JSON.parse(record)

                console.log('－－－－－－本地用户数据－－－－－－－');
                if(record.code == 1){
                    var local_user_info = record.results.user;
                    local_user_info.uid = local_user_info.user_id;  //旧接口为 uid，新接口为user_id，为了兼容添加多 uid
                    SA.setter("_LOCAL_USER", local_user_info);
                }
                else{
                    SA.setter("_LOCAL_USER", {error: "-2"});
                }
            }
        })
    }
    else
        SA.setter("_LOCAL_USER",{error: "-3"});
}

module.exports = init_wx
