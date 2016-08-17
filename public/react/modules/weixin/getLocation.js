/**
 * 获取地理位置接口
 * 
 * */

var getWXConfig = require('./_component/_getWXConfig');

function getLocation(sucFn,errFn){
	//获取配置
	getWXConfig(function(){
		//var _position = SAX.getter('signInfo');
		//alert(JSON.stringify(_position));
		//获取地理位置接口
		wx.getLocation({
		    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
		    success: function (res) {
		        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		        var speed = res.speed; // 速度，以米/每秒计
		        var accuracy = res.accuracy; // 位置精度
		        sucFn && sucFn(latitude,longitude,res);
		    },
		    fail:function(res){
		    	errFn && errFn(res);
		    }
		});
		
	});
	
	
}


module.exports = getLocation;
