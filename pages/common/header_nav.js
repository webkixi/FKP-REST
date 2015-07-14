var rct = require('../../modules/parseReact');
var api = require('../../apis/javaapi');
module.exports=function* (){
	var apiData = [];
	var navHtml = ""
	apiData = yield api.pullApiData('header_nav',{
                'navBarCode': 'index_main'
            });
	apiData = JSON.parse(apiData[1]);

    if(apiData.success){
            //成功获取数据
        navHtml = rct('header_nav',{
            data: apiData.data.navBar  //数组
        });
    } 
	return {navData: navHtml}
}
