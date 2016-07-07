var doc = require('./_component/doc');
var tips = require('./_component/tips')
var src = "/";

function type(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};

function req( api, param, cb, method ){
    var url = api;
    if (!method) method = 'POST'

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

    if( type(param)==='Function' ){
        cb = param;
    }

    if( type(param)!=='Object' ){
        param = {test: '123'}
    }

    var _keys = Object.keys(param);
    if( !_keys.length ){
        param = {test: '123'}
    }

    // 有些环境不是根目录，需要添加前缀，前缀根据location来自动添加
    // 如 http://www.xxx.com/yyy/ccc/app.html
    var kkk = doc.urlparse(location.href);
    if (!kkk.port){
        var _src = '/' + kkk.segments.splice(0, (kkk.segments.length-1)).join('/')
        url = _src+url;
        url = url.replace('//', '/')
    }

    var dtd = $.Deferred();

    function ccb(data, status, xhr){
        if( status === 'success' ) {
            if (data && typeof data === 'string'){
                data = JSON.parse(data)
            }
            if( cb && typeof cb==='function' ){
                cb( data, status, xhr )
            }
            else{
                dtd.resolve(data, status, xhr);
                return dtd.promise()
            }
        }
    }

    if (method==='GET'){
        param._stat_ = 'DATA'
    }

    return $.ajax({
        url: url,
        type: method,
        data: param,
        timeout: 3000,
        dataType: "json",
    })
    .done(ccb)
    .fail(function(xhr,status,statusText){
        tips('网络不给力','center')
        console.log('错误状态码：'+xhr.status+"<br>时间："+xhr.getResponseHeader('Date'))
        dtd.reject()
    })

    // return $.ajax({
    //     url: url,
    //     type: "POST",
    //     data: param,
    //     timeout: 3000,
    //     dataType: "json",
    //     success:function(body, status, xhr){
    //         if( status === 'success' ) {
    //             if (body && typeof body === 'string')
    //                 body = JSON.parse(body)
    //             if (cb && typeof cb === 'function'){
    //                 cb( body, status, xhr );
    //             }
    //         }
    //     },
    //     error:function(){
    //         tips('网络不给力','center')
    //     }
    // })
}

function get( api, param, cb ){
    return req( api, param, cb, 'GET')
}



module.exports = {
	req: req,
    get: get
}
