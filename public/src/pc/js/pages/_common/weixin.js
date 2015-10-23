var libs = require('libs/libs');
var api = require('libs/api')

SA.setter("_WEIXIN",{})

function getwx(){
    var url = libs.urlparse(location.href)
    if(url.params.code && url.params.state){
        cd = url.params.code;
        st = url.params.state;
        // api.wx()
        api.wx('userinfo', {code: cd, state: st},function(data){
            var kkk = Object.keys(data)
            var bbb = kkk.join(' ')
            alert(bbb)
            SA.setter("_WEIXIN",{user: data})
        })
    }
}

module.exports = getwx()
