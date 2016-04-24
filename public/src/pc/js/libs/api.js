var doc = require('./_component/doc');
var src = "/";
var demoSrc = "http://mock.agzgz.com/";

function type(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};

var apiPath = {
    base: src,
    dirs: {},
    weixin: {
        userlist: src+'wx/userlist',   //?access_token=_cqch&next_openid=
        userinfo: src+'wx/userinfo'
    }
}

function req( api, param, cb ){
    var url = apiPath.dirs[api];
    if( !url ){
        url = api;
    }

    try {
        if (url.indexOf('http://')===0 || url.indexOf('https://')===0){
            if (type(param) === 'Object'){
                param._redirect = url;
            }
            else
            if (typeof param === 'function'){
                cb = param;
                param = {_redirect: url}
            }
            else{
                param = {_redirect: url}
            }
            url = '/redirect'
        }

        //有些环境不是根目录，需要添加前缀，前缀根据location来自动添加
        var kkk = doc.urlparse(location.href);
        if (!kkk.port){
            var _src = '/' + kkk.segments.splice(0, (kkk.segments.length-1)).join('/')
            url = _src+url;
            url = url.replace('//', '/')
        }

        if( type(param)==='Object' ) {
            var keys = Object.keys(param)
            if( keys.length>0 )
                $.post( url, param, function( body, status, xhr ){
                    if( status === 'success' ) {
                        if (body && typeof body === 'string')
                            body = JSON.parse(body)
                        cb( body, status, xhr ) ;
                    }
                }, "json")
            else
                $.post( url, {test: '123'}, function( body, status, xhr ){
                    if( status === 'success' ) {
                        if (body && typeof body === 'string')
                            body = JSON.parse(body)
                        cb( body, status, xhr ) ;
                    }
                }, "json")
        }
        else{
            if( type(param)==='Function' ){
                cb = param;
            }
            $.post( url, {test: '123'}, function( body, status, xhr ){
                if( status === 'success' ){
                    if (body && typeof body === 'string')
                        body = JSON.parse(body)
                    cb( body, status, xhr ) ;
                }
            }, "json")
        }
    } catch (e) {
        alert(e)
    }
}


module.exports = {
	apiPath: apiPath,
	req: req
}
