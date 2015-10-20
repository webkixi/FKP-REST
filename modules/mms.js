var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');

/**
 * Module dependencies.
 */
var api = require('../apis/javaapi');
//加密
function *getMms(code, secret) {
    //方法类型
    var mtd = this.method;

    //取值参数
    var postdata = {
        "content": [
            {
                "mobile": "18002278121"
            }
        ]
    }

    //更具传入参数，修正取值参数
    var body = yield libs.$parse(this);
    if(body){
        if(body.mobile){
            postdata.content[0].mobile = body.mobile;
        }
    }

    var msg = yield api.pullApiData('getmms', postdata, 'post');
    // console.log(address[1]);

    return msg[1];
}

module.exports = {
    getMms: getMms
}
