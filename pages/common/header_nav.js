var rct = require('../../modules/parseReact');
var api = require('../../apis/javaapi');
module.exports=function* (){
	var apiData = [];
	var navHtml = "";
    var user = {};
    
    if(typeof this.sess.user!=='undefined'&&this.sess.user){
        if(this.sess.user.login){
            user.name=this.sess.user.loginName;
            var status = this.sess.user.authStatus;
            user.statusName = status==1?"已认证":status==3?"认证未通过":status==2?"认证审核中":"未认证";
            if(status==1)user.autoSuccess = true;
        }
    }
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
	return {navData: navHtml,user:user}
}
