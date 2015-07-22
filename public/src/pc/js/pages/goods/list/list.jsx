

libs = require('libs/libs');
var api = require('../../_common/api');


// react
var Tabswitch = require('modules/tabs/tabSwitch1');
var rend = React.render;


function initNum(num){
	return num<10?"0"+num:num;
}
function initTime(time){
		time = new Date(time);
		return  time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate()
}

function dealwithdata(data){
	var datas = [];
		for (var i = 0; i < data.length; i++) {
			var items = data[i];
			datas[i] = [];
			datas[i].push(items.goodsNo);
			datas[i].push(items.catName);
			datas[i].push(items.catName2);
			datas[i].push(items.brandName);
			datas[i].push(items.storageName);
			datas[i].push(initNum(items.stock) + items.unitName);
			datas[i].push(initNum(items.minQuantity) + items.unitName);
			if (items.valuation === 0) {
				datas[i].push(items.exchangeName + items.contractPeriod + (items.discount>0?"+":"") + (items.discount != 0?items.discount:""));
				datas[i].push(initTime(items.stopDate)+ " "+ initNum(items.stopHour)+":"+initNum(items.stopMinute)+":00")
			}else{
				datas[i].push(items.price==""?"":"%"+items.price);
				datas[i].push("");
			};
			datas[i].push(initTime(items.createTime));
			datas[i].push(<span><a href={"/goods/edit/"+items.id+".html"} target={"_blank"}>编辑</a> <a href={"/goods/edit/"+items.id+".html"} target={"_blank"}>详情</a></span>);
		};
	return datas;
}


function pageClick(){
	var that = this;
	$(".reactPage").find("a").click(function(){
		getGoodsList({ pageCurrent: $(this).attr("data-page")},cb)
	})

	function cb(body){
		console.log(that)
		var datas = dealwithdata(body.pagination.recordList)
		delete body.pagination.recordList
		body.pagination.recordList = datas;
		var pagination = body.pagination;
		that.setState({
			data:pagination
		});
	}
}

//回掉函数
function rd(body){
	if(body.success){
		
		var pagination = body.pagination;
		var thead = ['商品编号','类别','品名','品牌','仓库','挂牌量','起订量','单价（元)','点价截止时间','发布时间','编辑/详情'];
		var itemW = [0,0,0,0,185,0,0,0,105,100,0];//单列宽度，0表示自动
		var datas = dealwithdata(body.pagination.recordList)
		delete pagination.recordList
		pagination.recordList = datas;
		rend(
			<Tabswitch data={pagination} thdData={thead} itemWidth={itemW} itemMethod={pageClick}/>
			,document.getElementById('aas')
		)
	}else{
		console.log(body.errMsg)
	}
}

function getGoodsList(obj,cb){
	//request数据并回掉渲染
	console.log(obj)
	api.req('account_goods_list',obj,cb);
}
getGoodsList({},rd);

