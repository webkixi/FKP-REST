// 分页演示demo

var api = require('libs/api'),
    libs = require('libs/libs'),
    Pagi = require('modules/pagination/pagi'),
    _ = libs.lodash,

    // 分页数据
    pageData = {
    	total: 200,
     	per:   10,
    	url:   '/',
     	query: 'page='
    }

function bindItem(){
}

Pagi(pageData, {
    container: 'pagi',
})
