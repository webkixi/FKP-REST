var libs = require('../libs/libs')
var captcha = require('ccap')

function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

function *getCaptcha( opts ){
    var options = {
        width:200,
        height:50,
        offset:30,
        quality:100,
        fontsize:30,
        len: 6
    }

    if(opts)
        options = libs.$extend({},options,opts);

    options.generate = function(){
            return randomString( options.len );
    }

    var tmp = captcha( options );
    var ary = tmp.get();

    var txt = ary[0];
    var buf = ary[1];

    this.sess.captcha = txt;

    // return yield {picture: buf};
    return buf;
}

module.exports = getCaptcha;
