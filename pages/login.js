var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');
var rct = require('../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/login')
    var mtd = this.method;
    if(mtd==='GET'){
        return oridata;
    }

    if(mtd === 'POST'){

        var wx_postdata = {
          "common": {
        	"openid":"empty"
          }
        }

        var postdata = {
          "common": {
        	"smscode":"123456"
          },
          "content": [
                {
                 "mobile": "13333333333"
                }
            ]
        }

        var body = yield libs.$parse(this);
        if(body){
            if(body.mobile)
                postdata.content[0].mobile = body.mobile;

            if(body.openid){
                postdata = wx_postdata;
                postdata.common.openid = body.openid;
            }

            var logindata = yield api.pullApiData('login', postdata, 'post')
            console.log('ooooooooo for openid user ooooooooo');
            console.log(logindata[1]);
            console.log(logindata[1].results[0].addr);
            console.log(logindata[1].results[0].usercar);
            if (logindata)
                return logindata[1];

        }
    }



}

module.exports = {
    getData : demoIndexData
}
