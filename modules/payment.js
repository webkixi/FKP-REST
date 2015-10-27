var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');

/**
 * Module dependencies.
 */
var api = require('../apis/javaapi');
//加密
function *pingpp() {
    //方法类型
    var _this = this;
    var mtd = this.method;

    //取值参数
    // var postdata = {test: '123'}

    //更具传入参数，修正取值参数
    var body = yield libs.$parse(this);
    console.log('8888888888888');
    console.log(body);

    if(body){
        // console.log('999999999999 for payment 999999999');
        // console.log(body);
        // console.log('hgggggggg');
    }

    // var msg = yield api.pullApiData('getmms', postdata, 'post');
    // console.log(address[1]);
    // return msg[1];
    return postdata
}

module.exports = {
    ping: pingpp
}
