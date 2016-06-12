/**
 * 获取地理位置接口
 *
 * */

var getWXConfig = require('./_component/_getWXConfig');

var wxShare = function(opts, sucFn, errFn){
	getWXConfig(function(){
		wx.onMenuShareAppMessage({
			title: opts.title||'', // 分享标题
		    desc: opts.desc||'', // 分享描述
		    link: opts.link||'', // 分享链接
		    imgUrl: opts.imgUrl||'', // 分享图标
		    type: 'link', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function (res) {
		        sucFn && sucFn();
		    },
		    fail:function(res){
		    	errFn && errFn();
		    }
		})

		wx.onMenuShareWeibo({
			title: opts.title||'', // 分享标题
			desc: opts.desc||'', // 分享描述
			link: opts.link||'', // 分享链接
			imgUrl: opts.imgUrl||'', // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function (res) {
				sucFn && sucFn();
			},
			fail:function(res){
				errFn && errFn();
			}
		})

		wx.onMenuShareQQ({
			title: opts.title||'', // 分享标题
			desc: opts.desc||'', // 分享描述
			link: opts.link||'', // 分享链接
			imgUrl: opts.imgUrl||'', // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function (res) {
				sucFn && sucFn();
			},
			fail:function(res){
				errFn && errFn();
			}
		})

		wx.onMenuShareTimeline({
			title: opts.title||'', // 分享标题
			desc: opts.desc||'', // 分享描述
			link: opts.link||'', // 分享链接
			imgUrl: opts.imgUrl||'', // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function (res) {
				sucFn && sucFn();
			},
			fail:function(res){
				errFn && errFn();
			}
		})
	})
}


module.exports = wxShare;
