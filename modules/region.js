var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');

/**
 * Module dependencies.
 */
var api = require('../apis/javaapi');
//加密
function *getRegion(code, secret) {
    //方法类型
    var mtd = this.method;

    //取值参数
    var postdata = {
        "common": {
            "session": "11",
            "uid": 1
        },
        "content": [
            {
                "parent_id": "440000"
            }
        ]
    }

    //更具传入参数，修正取值参数
    var body = yield libs.$parse(this);
    if(body){
        if(body.parent_id){
            postdata.content[0].parent_id = body.parent_id;
        }
    }

    var address = yield api.pullApiData('region', postdata, 'post');
    // console.log(address[1]);

    return address[1];
}

module.exports = {
    getRegion: getRegion
}
