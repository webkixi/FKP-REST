/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	
	
	loopRender:function(){
		var datas = this.props.data;
		var items = [];
		var titles = [];
		var goodsPane = [];
		datas.map(function(item,i){
			var active = "";
			var goods_list = []
			if(!!item.cat.id){
				titles.push(
						<dd>
							<a href={"#goodsTab"+i} data-toggle={"tab"}>{item.cat.catName}</a>
						</dd>
					)
			}else{
				active = " in active";
				titles.push(
						<dt>
							<a href={"#goodsTab"+i} data-toggle={"tab"}><i className={"nav-icon"}></i>{"金属商城"}</a>
						</dt>
					)
			}

			item.goodsList.map(function(goods){
				goods_list.push(
						<li className={"span2"}>
							<dl>
								<dt>
									<a href={"/mall/item_datail/"+goods.id+".html"}><img src={goods.pictureLibUrl+goods.picture} /></a>
								</dt>
								<dd><span className={"lab"}>{goods.catName2}</span>{goods.model}</dd>
								<dd><span className={"lab"}>{"品牌："}</span>{goods.brandName}</dd>
								<dd><span className={"lab"}>{"存货量："}</span>{goods.stock +" "+ goods.unitName}</dd>
								<dd><span className={"lab"}>{"起订量："}</span>{goods.minQuantity +" "+ goods.unitName}</dd>
								<dd><span className={"lab"}>{"厂家："}</span>{goods.vender}</dd>
							</dl>
						</li>
					)
			})

			goodsPane.push(
					<div className={"sort_product tab-pane fade"+active} id={"goodsTab"+i}>
						<ul className={"row clearfix"}>{goods_list}</ul>
					</div>
				)
		})
		items.push(
				<div className={"sort_class"}>
					<dl id={"myGoods"}>
						{titles}
					</dl>
					<a href={"/mall/list.html"} className={"more"}>{"更多>>"}</a>
				</div>
			)
		items.push(
				<div id={"myTabContent3"} className={"tab-content index_metal"}>{goodsPane}</div>
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
