/**
 * 发起一个微信支付请求
 * 
 * */

var getWXConfig = require('./_component/_getWXConfig');

function chooseWXPay(charge,sucFn,cancelFn,failFn){
	
	var _config = charge.credential.wx_pub;

	//获取配置
	getWXConfig(function(){
		//调用微信支付接口
		wx.chooseWXPay({
		    timestamp: _config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		    nonceStr: _config.nonceStr, // 支付签名随机串，不长于 32 位
		    package: _config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		    signType: _config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		    paySign: _config.paySign, // 支付签名
		    success: function (res) {
		        // 支付成功后的回调函数
		        sucFn && sucFn(res);
		    },
		    cancel:function(res){
		    		if(cancelFn){
		    			cancelFn(res);
		    		}else{
					alert(JSON.stringify(res));
		    		}
		    },
		    fail:function(res){
		    		if(failFn){
		    			failFn(res);
		    		}else{
					alert(JSON.stringify(res));
		    		}		
		    }
		});
		
	});
	
	
}


module.exports = chooseWXPay;
