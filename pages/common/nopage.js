var api = require('../../apis/javaapi');
var libs = require('../../libs/libs')

function *demoIndexData(oridata, route){
    libs.wlog('pages/common/nopage')

    var mtd = this.method;

    if( mtd==='GET' ){
        return oridata;
    }

    if( mtd === 'POST' ){
		var passdata;
        var body = yield libs.$parse(this);

		if(body){

			if( api.apiPath.dirs[route] || route === 'redirect')
				passdata = yield api.pullApiData.call(this, route, body, 'post');

            // 批处理加载大量js
            if (route === 'staticjs'){
                if (body.js){
                    var _jss = [];
                    // var scriptSrc = yield api.pullApiData.call(this, route, body, 'post');
                    // body.js.map(function(item){
                    //
                    // })
                }
            }

            if ( passdata && passdata[1] ){
                if (passdata[0].headers.login){
                    this.response.set('login', passdata[0].headers.login); //设置response的header
                }
                return passdata[1];
            }
			else {
                if (passdata && passdata[1]==='')
                    return { success: 'true'}
				return { error: "1", message:"后端数据返回出错" }
			}

        }
    }
}

module.exports = {
    getData : demoIndexData
}
