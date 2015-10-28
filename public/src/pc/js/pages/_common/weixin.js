var libs = require('libs/libs');
var api = require('libs/api')


var tes_data = {
    code: 1,
    message: 'Success',
    results:
    [
        {
            uid: 21,
            nick: 'A赵义波',
            openid: 'o07NUs3CiVcXXDFqB4kOWuFhgw64',
            gender: '1',
            mobile: '18617323269',
            addr: [
                {
                    zip: '440000',
                    province: '广东',
                    city: '440100',
                    county: '440103',
                    street: '好地方'
                }
            ],
            usercar: [
                {
                    carbrand: '本田',
                    carseries: 'CR-V',
                    cartype: '34310',
                    carid: 34310
                }
            ]
        }
    ]
}

var test_wx_data = {
    "openid": "o07NUs3CiVcXXDFqB4kOWuFhgw64",
    "nickname": "A赵义波",
    "sex": 1,
    "language": "zh_CN",
    "city": "广州",
    "province": "广东",
    "country": "中国",
    "headimgurl": "http://wx.qlogo.cn/mmopen/JcZacFyaMO7UGKLzDGAQdwQmDibjB6ZPC7K1KvGTItcuvKTtHkgb6D74lT181LZHsMGLicas99GnEDoHibOxxgUXHkeiaxY1PqVic/0",
    "privilege": []
}

function init_wx(){
    // SA.setter("_LOCAL_USER", tes_data.results[0]);
    // SA.setter("_WEIXIN", {user: test_wx_data})

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
        SA.setter("_WEIXIN",{user: data})
        // {"openid":"o07NUs250UkhoK8Ks6bZAZK7Hkls","nickname":"天天修改","sex":1,"language":"zh_CN","city":"广州","province":"广东","country":"中国","headimgurl":"http:\/\/wx.qlogo.cn\/mmopen\/Lhlz6ia774dNwUgAucLtKIs94BWFSX1hPbdvibZT79y69oI7FusBz7I5qbech1olibVxribJ9vFErEoDrJFPpDa0my6yXkhmouoj\/0","privilege":[]}
        getLocalUser(data)
    })

    function getLocalUser(data){
        if(data.openid){
            api.req('login',{openid: data.openid}, function(record){
                if(record){
                    if(typeof record === 'string'){
                        record = JSON.parse(record)
                    }
                    if(record.code === 1){
                        var local_user_info = record.results[0];
                        SA.setter("_LOCAL_USER", local_user_info);
                        //{ uid: 18, nick: '天天修改', openid: 'o07NUs250UkhoK8Ks6bZAZK7Hkls', gender: '1', mobile: '13576757688', addr: [Object], usercar: [Object] }
                    }
                }
            })
        }
    }
}

module.exports = init_wx()
