

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
		return  time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate()
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
			datas[i].push(items.stock + items.unitName);
			datas[i].push(items.minQuantity + items.unitName);
			if (items.valuation === 0) {
				datas[i].push(items.exchangeName + items.contractPeriod + (items.discount>0?"+":"") + (items.discount != 0?items.discount:""));
				datas[i].push(initTime(items.stopDate)+ " "+ initNum(items.stopHour)+":"+initNum(items.stopMinute)+":00")
			}else{
				datas[i].push(items.price==""?"":"%"+items.price);
				datas[i].push("");
			};
			datas[i].push(initTime(items.createTime));
			datas[i].push(<span><a href={"/goods/edit/"+items.id+".html"} target={"_blank"}>编辑</a>&nbsp;
			 <a href={"/mall/item_detail/"+items.id+".html"} target={"_blank"}>详情</a></span>);
		};
	return datas;
}

var param={
	pageSize:15,
	pageCurrent:1,
	catId:"",
	catId2:"",
	brandId:"",
	storage:"",
	type:1
}
var thead = ['商品编号','类别','品名','品牌','仓库','挂牌量','起订量','单价（元)','点价截止时间','发布时间','编辑/详情'];
var itemW = [0,50,0,0,185,0,60,0,105,100,80];//单列宽度，0表示自动
function pageClick(){
	var that = this;
	$(".reactPage").delegate("a","click",function(){
		param.pageCurrent=$(this).attr("data-page")
		getGoodsList(param,cb)
	})

	function cb(body){
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
		var datas = dealwithdata(body.pagination.recordList)
		delete pagination.recordList
		pagination.recordList = datas;
		rend(
			<Tabswitch data={pagination} thdData={thead} itemWidth={itemW} itemMethod={pageClick}/>
			,document.getElementById("myorder_table")
		)
	}else{
		console.log(body.errMsg)
	}
}

function getGoodsList(obj,cb){
	//request数据并回掉渲染
	api.req('account_goods_list',obj,cb);
}
getGoodsList(param,rd);

//类别选择
$(".catId").change(function(){
	var _this = $(this);
	var _val = $(this).val();
	//商品属性类型type值为，category类别，product品名，brand品牌，storage仓库 ，参数2为查询条件
	api.req('goods_attr',{type:'product',catId:_val},cbc);
	function cbc(body){
		var html = '<option value="">--请选择--</option>';
		if(body.success&&body.list.length>0){
			for(var i=0;i<body.list.length;i++){
				html+='<option value="'+body.list[i].id+'">'+body.list[i].catName+'</option>'
			}
			_this.parents(".tab-content").find(".catId2").html(html);
		}else{
			_this.parents(".tab-content").find(".catId2").html(html);
		}
		
	}
})

//品名选择
$(".catId2").change(function(){
	var _this = $(this);
	var _val = $(this).val();
	//商品属性类型type值为，category类别，product品名，brand品牌，storage仓库 ，参数2为查询条件
	api.req('goods_attr',{type:'brand',catId:_val},cbc);
	function cbc(body){
		var html = '<option value="">--请选择--</option>';
		if(body.success&&body.list.length>0){
			for(var i=0;i<body.list.length;i++){
				html+='<option value="'+body.list[i].id+'">'+body.list[i].brandName+'</option>'
			}
			_this.parents(".tab-content").find(".brandId").html(html);
		}else{
			_this.parents(".tab-content").find(".brandId").html(html);
		}
		
	}
})

//查找商品
$(".queryGoodsBtn").click(function(){
	param.catId =  $(this).parents(".tab-content").find(".catId").val();
	param.catId2 =  $(this).parents(".tab-content").find(".catId2").val();
	param.brandId =  $(this).parents(".tab-content").find(".brandId").val();
	param.storage =  $(this).parents(".tab-content").find(".storage").val();
	param.pageCurrent=1;
	getGoodsList(param,rdquery);
	
});
function rdquery(body){

	var pagination = body.pagination;
	var datas = dealwithdata(body.pagination.recordList)
	delete pagination.recordList
	pagination.recordList = datas;
	SA.setter('tabswitch',{data: pagination});
}

$("#myTab>li").click(function(){
	var params={
		pageSize:15,
		pageCurrent:1,
		catId:"",
		catId2:"",
		brandId:"",
		storage:"",
		type:$(this).attr("data-type")
	}
	param = params;
	getGoodsList(param,rdquery);
	$(this).addClass("active").siblings().removeClass("active");
	var select_box = $(".tab-content .select");
	for (var i = 0; i < select_box.length; i++) {
		select_box.eq(i).find("option").eq(0).attr("selected","selected");
	};
})