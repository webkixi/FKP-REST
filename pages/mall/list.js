var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});


function *demoIndexData( oridata ){
    libs.clog('pages/malllist.js');

    var apiData={};
    var mtd = this.method;
    var local = this.local;
    var attrHtml;
    var jsonData;
    var reactHtml;
    var query;

    if( mtd==='GET' ){
        libs.clog('pages/malllist.js=================GET===========');
        var props;

        //商品列表数据，默认全部商品
        //查询参数
        query = {
          pageCurrent: 1,
          orderField: '',
          orderDirection:'',
          pageSize:24,
          _rt: new Date().getTime()
        }

        apiData = yield api.mallList(query);
        jsonData = JSON.parse(apiData[1]);

        // react
        //商城商品列表模板render
        props = {
          itemStyle: {width:'240px'},
          data: jsonData.pagination.recordList  //数组
        }
        reactHtml = rct( 'list', props);
        jsonData.reactMallGoodsList = reactHtml;

        oridata = libs.$extend(true,oridata,jsonData);
        return oridata;
    }

    else

        if( mtd==='POST' ){
            libs.clog('pages/malllist.js========POST==============');

            var body = yield libs.$parse( this );
                body._rt = new Date().getTime();

                //商品列表，默认全部商品
                apiData = yield api.pullApiData('mall_list',body);
                jsonData = JSON.parse(apiData[1]);

                return jsonData;
        }


}

module.exports = {
    getData : demoIndexData
}
