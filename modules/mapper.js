/**
* Module dependencies.
*/
var fs = require('fs')
var views = require('co-views-helpers');
var config = require('../config')

// 从map.json拿取获取静态资源 hash 名称

var getMapJson = function(stat){
    if(!stat) stat = 'pro';
    console.log('===============');
    console.log('===============');
    console.log('===============');
    console.log(stat)
  	if(fs.existsSync(config.mapJson)||fs.existsSync(config.mapDevJson))
  		return mapJson = stat === 'dev' ? JSON.parse(fs.readFileSync(config.mapDevJson,'utf-8')) : JSON.parse(fs.readFileSync(config.mapJson,'utf-8'));
  	else
  		return false;
}


//设置全局变脸_mapper
var getMapper = function(stat){
    var _mapper={};
  	var mapper = getMapJson(stat);
  	if(!mapper)
    		return false;
  	_mapper = mapper;
  	_mapper.commonJs = _mapper.commonDependencies.js;
  	_mapper.commonCss = _mapper.commonDependencies.css;
  	_mapper.pageJs = _mapper.dependencies.js;
  	_mapper.pageCss = _mapper.dependencies.css;
  	_mapper.length = Object.keys(mapper).length;

    return _mapper;
}


module.exports = getMapper
