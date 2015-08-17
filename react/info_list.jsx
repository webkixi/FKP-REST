/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	
	loopRender:function(){
		var items = [];
		var datas = this.props.data.pageBean;

		datas.recordList.map(function(item){
			var img = "/images/blank.gif";
			var imgClass="error_img";
			if(!!item.figure) {
				img = item.pictureLibUrl+item.figure;
				imgClass = "";
			}
			var time = new Date(item.publishTime);
			time = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate() +" "+ (time.getHours()<10?"0"+time.getHours():time.getHours())+":"+time.getMinutes();
			items.push(
					<li>
						<div className={"info-mpic"}>
							<a href={"/info/view/"+item.id+".html"}>
								<img src={img} className={imgClass} />
							</a>
						</div>
						<div className={"info-mcom"}>
							<div className={"info-mtitle clearfix"}>
								<em><a href={"/info/view/"+item.id+".html"}>{item.title}</a></em>
								<span>{time}</span>
							</div>
							<p>{item.summary}</p>
							<a href={"/info/view/"+item.id+".html"} className={"more"}>查看详情 >></a>
						</div>
					</li>
				)
		})

		return items;
	},

	render: function () {
		var fills = this.loopRender();
		return (
			<ul className={"info-mlist"}>
				{fills}
			</ul>
		)
	}
});

module.exports = tmpApp;
