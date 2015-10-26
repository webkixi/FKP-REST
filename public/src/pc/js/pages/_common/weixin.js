var libs = require('libs/libs');
var api = require('libs/api')

SA.setter("_WEIXIN",{})

function getwx(){
    var url = libs.urlparse(location.href)
    var postdata = {test: '123'}
    if(url.params.code && url.params.state){
        cd = url.params.code;
        st = url.params.state;

        postdata = {code: cd, state: st};
    }

    // api.wx()
    api.wx('userinfo', postdata, function(data){
        if(typeof data === 'string')
            data = JSON.parse(data)
        SA.setter("_WEIXIN",{user: data})
    })
}

module.exports = getwx()
