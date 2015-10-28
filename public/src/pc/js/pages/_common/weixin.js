var libs = require('libs/libs');
var api = require('libs/api')


function init_wx(){
    var tmp = SA.getter('_WEIXIN');
    if(!tmp || !tmp.user){
        SA.setter("_WEIXIN",{})
        getwx();
    }
}


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
        if(typeof data === 'string'){
            data = JSON.parse(data)
        }
        getLocalUser(data)
    })

    function getLocalUser(data){
        // openid
        if(data.openid){
            api.req('login',{openid: data.openid}, function(record){
                if(record){
                    if(typeof record === 'string'){
                        record = JSON.parse(record)
                    }
                    if(record.code === 1){
                        alert('abcd')
                    }else{
                        SA.setter("_WEIXIN",{user: data})                         
                    }
                }
            })
        }
    }
}

module.exports = init_wx()
