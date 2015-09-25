/** @jsx React.DOM */
var React = require('react/addons');

var tmpApp = React.createClass({
	
	loopRender:function(){
		var items = [];
		var datas = this.props.data;
		datas.map(function(item){
			var time = "",td;
			if(item.valuation===0){
				td= item.exchangeName + item.contractPeriod
				time = initTime(item.stopDate) +"  "+ initNum(item.stopHour) +":"+ initNum(item.stopMinute)+":00";
			}else{
				td=item.price !=""?"$"+item.price:"";
			}
			items.push(
					<tr>
						<td>{item.goodsNo}</td>
						<td>{item.catName}</td>
						<td>{item.catName2}</td>
						<td>{item.brandName}</td>
						<td>{item.storageName}</td>
						<td>{item.stock+item.unitName}</td>
						<td>{item.minQuantity+item.unitName}</td>
						<td>{td}</td>
						<td>{time}</td>
						<td>{initTime(item.createTime)}</td>
						<td>
							<a href="/goods/edit/{item.id}.html" target="_blank">编辑</a>&nbsp;&nbsp;
							<a href="/goods/detail/{item.id}.html" target="_blank">详情</a>
						</td>
					</tr>
				)
		})
		function initNum(num){
			return num<10?"0"+num:num;
		}
		function initTime(time){
				time = new Date(time);
				return  time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate()
		}
		return items;
	},

	render: function () {
		var fills = this.loopRender();
		return (
			<div className={"myorder_table"}>
				<table className={"table table-hover table-org"}>
                    <thead>
                        <tr>
                            <th>商品编号</th>
                            <th>类别</th>
                            <th>品名</th>
                            <th>品牌</th>
                            <th width="185">仓库</th>
                            <th>挂牌量</th>
                            <th>起订量</th>
                            <th>单价（元)</th>
                            <th width="105">点价截止时间</th>
                            <th width="100">发布时间</th>
                            <th>编辑/详情</th>
                        </tr>
                    </thead>
                    <tbody>
                    	{fills}
                    </tbody>
				</table>
			</div>
		)
	}
});

module.exports = tmpApp;
