var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});


function *demoIndexData(oridata){
    libs.clog('pages/goods/list.js');

    var apiData={};
    var dataset={};
    var mtd = this.method;
    var local = this.local;
    var userId = "";
    if(mtd==='GET'){
    	if(typeof this.sess.user!=='undefined'&&this.sess.user){
    		userId = this.sess.user.accountNo;
    		for (var i = 1; i <= 3; i++) {
    			
    		};
	        //商品列表
	        apiData = yield api.pullApiData('goods_list',{
	        	accountNo:userId
	        });
	        var apiData = JSON.parse(apiData[1]);
	        console.log(apiData);
	        var goodsList = rct('account_goods_list',{
	            data:apiData.pagination.recordList
	        })
			dataset.goodsList = goodsList;
    	}else{
    		this.redirect('/account/login');
    	}


	}
    oridata = libs.$extend(true,oridata,dataset);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
