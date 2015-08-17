var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');


function *demoIndexData(oridata){
    var dataSet = {};
    var mtd = this.method;
    var local = this.local;
    var apiData = [];
    if(!!this.params.id){
        if(mtd === 'GET'){
            libs.clog('pages/malllist.js========GET');

            var catId = this.params.id.substr(0,this.params.id.indexOf(".html")),
                pageCurrent=1,//当前页数
                pageSize = 15;//每页条数
            if(!!this.local.query){

                var query = this.local.query.split("&");
                for (var i = 0; i < query.length; i++) {
                    var param = query[i].split("=");
                    if (param[0]=="pageCurrent") {pageCurrent = decodeURI(param[1])};
                };

            }
            apiData = yield api.pullApiData('info_cat',{
            	'catId':catId,
            	'pageCurrent':pageCurrent,
            	'pageSize':pageSize
            });
            //console.log(dataSet);
        }else if(mtd === 'POST'){
            libs.clog('pages/malllist.js========POST');

        }
        apiData = JSON.parse(apiData[1]);
        if(apiData.success){
        	//成功获取数据
            var sideNavHtml = rct('info_side_nav',{
                data: apiData.data  //数组
            });

            var infoList = rct('info_list',{
                data:apiData.data
            })

            //面包屑导航
            var current_path = "";
            if(apiData.data.infoCatContainParent.catLevel==3) current_path+=' &nbsp;&gt;&gt;&nbsp;<a href="/info/cat/'+apiData.data.infoCatContainParent.parent.parent.id+'.html">'+apiData.data.infoCatContainParent.parent.parent.catName+'</a>';
            if(apiData.data.infoCatContainParent.catLevel>=2) current_path +='&nbsp;&gt;&gt;&nbsp;<a href="/info/cat/'+apiData.data.infoCatContainParent.parent.id+'.html">'+apiData.data.infoCatContainParent.parent.catName+'</a>';
            current_path += '&nbsp;&gt;&gt;&nbsp;<a href="/info/cat/'+apiData.data.infoCatContainParent.id+'.html" class="currents">'+apiData.data.infoCatContainParent.catName+'</a>';


            dataSet.list = infoList;
            dataSet.current_path = current_path;
            dataSet.infoCatId = apiData.data.infoCat.id;
            dataSet.catName = apiData.data.infoCat.catName;
            dataSet.currentPage = apiData.data.pageBean.currentPage;
            dataSet.pageCount = apiData.data.pageBean.pageCount;
            dataSet.catId = apiData.data.catId;
            dataSet.test = sideNavHtml;

        }else{
        	libs.clog(apiData.errMsg);
            dataSet.errState = true;
        }

    }else{
        dataSet.errState = true;
    }
    dataSet.root = api.apiPath.base;
    oridata = libs.$extend(true,oridata,dataSet);
    return oridata
}

module.exports = {
    getData : demoIndexData
}
