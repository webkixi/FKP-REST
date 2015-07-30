var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');


function *demoIndexData(oridata){
    libs.wlog('pages/info/view')
    var dataSet = {};
    var mtd = this.method;
    var local = this.local;
    var apiData = [];
    if(!!this.params.id){
        if(mtd === 'GET'){
            libs.clog('pages/malllist.js========GET');

            var infoId = this.params.id.substr(0,this.params.id.indexOf(".html"));
            // console.log(this.local);
            // console.log(this.params);
            apiData = yield api.pullApiData('info_view',{
            	'infoId':infoId
            });
            apiData = JSON.parse(apiData[1]);
            if(apiData.success){
                var info = apiData.data.info;

                var time = new Date(info.publishTime);
        		var hour = time.getHours();
        		time = time.getFullYear() +
        		"-" + time.getMonth() +
        		"-" + time.getDate() +
        		" " + (hour < 10 ? '0'+hour : hour) +
        		":" + time.getMinutes();

                var tags = [];
                if(info.tagContent)
                    tags = info.tagContent.split(',');

                info.time = time;
                info.tags = tags;

                oridata.info = info;

                //面包屑
                var baseRoot = typeof(this.params.id)!=='undefined'
                ? '/'+this.params.cat+'/'+this.params.title
                : '/'+this.params.cat;
                var crumbsHtml = rct('common/crumbs',{
                    data: apiData.data.infoCatContainParent,
                    base: baseRoot
                })
                oridata.crumbsNav = crumbsHtml;
            }

        }

        else if(mtd === 'POST'){
            libs.clog('pages/malllist.js========POST');

        }
    }else{
        // dataSet.errState = true;
    }
    return oridata
}

module.exports = {
    getData : demoIndexData
}
