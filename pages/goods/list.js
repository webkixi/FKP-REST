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
            if(apiData.success){
                var goodsList = rct('account_goods_list',{
                    data:apiData.pagination.recordList
                })
                dataset.goodsList = goodsList;
            }
	        
            //商品类别
            var catData = {};
            catData = yield api.pullApiData('goods_cat_list',{});
            catData = JSON.parse(catData[1]);
            if(catData.success){
                dataset.catList = catData.list;
            }
            //仓库信息
            var storagesData = {};
            storagesData = yield api.pullApiData('goods_storages_list',{});
            storagesData = JSON.parse(storagesData[1]);
            if(storagesData.success){
                dataset.storagesList = storagesData.list;
            }
            console.log(storagesData);

    	}else{
    		this.redirect('/account/login');
    	}


	}else if(mtd==='POST'){
        if(typeof this.sess.user!=='undefined'&&this.sess.user){
            userId = this.sess.user.accountNo;
            for (var i = 1; i <= 3; i++) {
                
            };
            //商品列表
            var body = yield libs.$parse.form(this); 
            console.log(body) 
            apiData = yield api.pullApiData('goods_list',{
                accountNo:userId,
                pageSize:3,
                pageCurrent:body.pageCurrent
            });
        }else{
            //this.redirect('/account/login');
        }
        return yield JSON.parse(apiData[1]);
    }
    dataset.root = api.apiPath.base;
    oridata = libs.$extend(true,oridata,dataset);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
