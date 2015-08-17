/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	getInitialState:function(){
		if(this.props.data){
			var viewData = this.props.data
			return {
				info: viewData
			}
		}
		else {
			return {}
		}
	},
	loopRender:function(){
		var items = [];
		var tmp = [];
		var tag, tagStr;
		var info = this.state.info;

		var img = "/images/blank.gif";
		var imgClass="error_img";
		if(!!info.figure) {
			img = info.pictureLibUrl + info.figure;
			imgClass = "";
		}
		var time = new Date(info.publishTime);
		var hour = time.getHours();
		time = time.getFullYear() +
		"-" + time.getMonth() +
		"-" + time.getDate() +
		" " + (hour < 10 ? '0'+hour : hour) +
		":" + time.getMinutes();

		var source = info.source ? info.source : '';
		if(info.tagContent){
			tags = [];
			info.tagContent.split(',').map(function(tag){
				tags.push(
					<dd><a href='#'>{tag}</a></dd>
				)
			})
		}

		return <div>
					<div className={"info-ftitle"}>
	                	<h2>{info.title}</h2>
	                	<span>{source}&nbsp;&nbsp;&nbsp;&nbsp;{time}</span>
							<dl>
							<dt>标签：</dt>
								{tags}
							 </dl>
		                </div>
		                <div className={"info-fbody"}>
		                	{info.infoContent.content}
		                </div>
					</div>

	},

	render: function () {
		var fills = this.loopRender();
		return ( <div className={"clearfix row"}>
				    <div className={"info-firm span10 fl"}>
						{fills}
						<div className={"info-right span2 fl"}>
							<img src={"/images/ad/ad2.jpg"} />
							<img src={"/images/ad/ad2.jpg"} />
						</div>
					</div>
				</div>
		)
	}
});

module.exports = tmpApp;
