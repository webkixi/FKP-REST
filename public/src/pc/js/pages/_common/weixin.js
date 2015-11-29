var libs = require('libs/libs');
var api = require('libs/api')
var router = require('libs/router').router
var route = require('libs/router').route
var wx = require('modules/weixin/index')


/*
* 初始化本地全局用户数据
* 获取微信数据
* 通过微信数据获取本地用户数据
*/
function init_wx(){
    SA.set("_LOCAL_USER",{error: "-1"});
    wx( getLocalUser )
}

/*
* 获取本地用户数据
* @param1 {json} json对象
*/
function getLocalUser( data ){
    if(data.openid){
        api.req('login',
            {openid: data.openid},
            function(record){

            //验证返回数据
            //如果code===1则写入全局，并执行全局方法
            if(record){
                if(typeof record === 'string')
                    record = JSON.parse(record)

                console.log('－－－－－－本地用户数据－－－－－－－');
                if(record.code === 1){
                    var local_user_info = record.results[0];
                    SA.setter("_LOCAL_USER", local_user_info);
                }
                else{
                    SA.set("_LOCAL_USER", {error: "-2"});
                }
            }
        })
    }
    else
        SA.set("_LOCAL_USER",{error: "-3"});
}

module.exports = init_wx
