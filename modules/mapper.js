/**
* Module dependencies.
*/
var fs = require('fs')
var views = require('co-views-helpers');
var config = require('../config')

// 从map.json拿取获取静态资源 hash 名称

var getMapJson = function(){
  	if(fs.existsSync(config.mapJson))
  		return mapJson = JSON.parse(fs.readFileSync(config.mapJson,'utf-8'));
  	else
  		return false;
}


//设置全局变脸_mapper
var getMapper = function(){
    var _mapper={};
  	var mapper = getMapJson();
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
