/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	
	
	loopRender:function(){
		var datas = this.props.data.infoCat;
		var boothData = this.props.booth;
		var items = [];
		var titles = [];
		var info_list = [];
		var active_list = [];
		var booths = [];

		//第一版默认显示信息
		datas.children.map(function(item){
			var tab_info_list=[];
			titles.push(
					<dd>
						<a href={"#myTab"+item.id} data-toggle={"tab"}>{item.catName}</a>
					</dd>
				)
			info_list.push(
					<div className={"sort_product tab-pane fade"} id={"myTab"+item.id}>
						<ul className={"row clearfix"}>
							{tab_info_list}
						</ul>
					</div>
				)
			item.infoList.map(function(oneInfo){
				var time = new Date(oneInfo.publishTime);
				time = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
				tab_info_list.push(
						<li>
							<p>
								<a href={"/info/cat/"+oneInfo.id+".html"}>{oneInfo.title}</a>
							</p>
							<i>{time}</i>
						</li>
					)
			})
		})

		//遍历信息
		datas.infoList.map(function(item){
			var time = new Date(item.publishTime);
			time = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
			active_list.push(
					<li>
						<p>
							<a href={"/info/cat/"+item.id+".html"}>{item.title}</a>
						</p>
						<i>{time}</i>
					</li>
				)
		})

		//商品广告位
		boothData.goodsList.map(function(item){
			booths.push(
				<dl>
					<dt>
						<a href={"/mall/item_detail/"+item.id+".html"}><img src={item.pictureLibUrl + item.picture} /></a>
					</dt>
					<dd><span className={"lab"}>{item.catName2}</span>{item.model}</dd>
					<dd><span className={"lab"}>品牌： </span>{item.brandName}</dd>
					<dd><span className={"lab"}>存货量：</span>{item.stock + item.unitName}</dd>
					<dd><span className={"lab"}>起订量：</span>{item.minQuantity + item.unitName}</dd>
					<dd><span className={"lab"}>厂家：</span>{item.vender}</dd>
				</dl>

			)
		})

		//表头
		items.push(
				<div className={"sort_class"}>
					<dl id={"myTab"} className={"nav nav-tabs"}>
						<dt>
							<i className={"nav-icon"}></i>
							<a href={"#myTab"+datas.id} data-toggle={"tab"}>{datas.catName}</a>
						</dt>
						{titles}
					</dl>
					<a href={"/info/cat/"+datas.id+".html"} className={"more"}>{"更多>>"}</a>
				</div>
			)

		//信息列表
						
		items.push(
				<div className={"clearfix"}>
					<div id={"myTabContent"} className={"tab-content sort_content"}>
						<div className={"sort_product tab-pane fade in active"} id={"myTab"+datas.id}>
							<ul className={"row clearfix"}>
								{active_list}
							</ul>
						</div>
					{info_list}
					</div>
					<div className={"sort_goods"}>		
						{booths}		
					</div>
				</div>
			)

		return items;
	},

	render: function () {
		var fills = this.loopRender();
		return (
			<div className={"container"}>
				{fills}
			</div>
		)
	}
});

module.exports = tmpApp;
