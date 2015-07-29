var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});


function *demoIndexData(oridata){
    libs.clog('pages/order/list.js');

    var dataset={};
    var mtd = this.method;
    var local = this.local;
    var userId = "";
    if(mtd==='GET'){
    	if(typeof this.sess.user!=='undefined'&&this.sess.user){
    		userId = this.sess.user.accountNo;
			//买单列表
    	var apiData={};
            apiData = yield api.pullApiData('order_list_buyer',{
                accountNo:userId
            });
            apiData = yield JSON.parse(apiData[1]);
           if(apiData.success)dataset.buyer = apiData.pagination.totalCount;
           else dataset.buyer = 0;

           // 卖单列表
           apiData={};
            apiData = yield api.pullApiData('order_list_seller',{
                accountNo:userId
            });
            apiData = yield JSON.parse(apiData[1]);
           if(apiData.success)dataset.seller = apiData.pagination.totalCount;
           else dataset.seller = 0;


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

            console.log(apiData.pagination.totalCount);
    	}else{
    		this.redirect('/account/login');
    	}

	}else if(mtd==='POST'){
        if(typeof this.sess.user!=='undefined'&&this.sess.user){
            userId = this.sess.user.accountNo;
            //商品列表
            var apiData={};
            var uri = 'order_list_seller';
            var param = yield libs.$parse.form(this); 
            if(param.type=='buyer')uri = 'order_list_buyer';
            param.accountNo=userId;
            apiData = yield api.pullApiData(uri,param);
            dataset = yield JSON.parse(apiData[1]);
            dataset.type = param.type;
        }else{
            //this.redirect('/account/login');
        }
        return dataset;
    }
    dataset.navOrder="active";
    dataset.root = api.apiPath.base;
    oridata = libs.$extend(true,oridata,dataset);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
