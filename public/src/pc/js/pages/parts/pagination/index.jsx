
//引入模块
var pagination = require('modules/pagination/pagi');
// var data = require('../_json/mall_list.json')



// 根据总的文章数和每页文章数算出分页总数，并配好链接
var pagi = {
    	total: 300,   //文章总数
     	per:   10,    //每页文章数
    	url:   '/xxx/yyy.html',  //文章url
     	query: 'abc="slime"&xyz="pack"&curentPage='  //文章query
    },

    //分页条有几个分页标签
    begin = {
        start: 0,
        off: 10
    }


pagination( pagi, begin, 'pagi')
