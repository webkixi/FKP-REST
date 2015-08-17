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
		return  time.getFullYear() + "-" + initNum(time.getMonth()+1) + "-" + time.getDate()
}
function initCurrency(num){
	return "￥"+num.toFixed(2);
}

function dealwithdata(data){
	var datas = [];
		for (var i = 0; i < data.length; i++) {
			var items = data[i];
			datas[i] = [];
			datas[i].push(items.catName1);
			datas[i].push(items.catName2);
			datas[i].push(items.brandName);
			datas[i].push(items.storageName);
			if(!!items.quantity)datas[i].push(items.quantity+items.unit);
			else datas[i].push("");
			if(items.valuationType ===0){
				if(items.status ===3){
					if(!!items.unitPrice)datas[i].push(initCurrency(items.unitPrice));
					else datas[i].push("￥0.00");
					if(!!items.totalPrice)datas[i].push(initCurrency(items.totalPrice));
					else datas[i].push("￥0.00");
				}else{
					var td = items.pricingContract;
					if(items.premium>0)td+="+";
					if(items.premium!=0)td+=items.premium;
					datas[i].push(td);
					datas[i].push(td +"*"+items.quantity);
				}
			}else{
				if(!!items.unitPrice)datas[i].push(initCurrency(items.unitPrice));
				else datas[i].push("￥0.00");
				datas[i].push(initCurrency(items.totalPrice));
			}
			datas[i].push(initTime(items.signTime));
			datas[i].push(<a href={"javascript:void(0)"} className={"accountDetail"} data-buyerid={items.buyerAccountNo}>{items.buyerName}</a>);
			datas[i].push( <a href={"/order/detail/"+items.id+".html"} target={"_blank"}>详情</a>);
		};
	return datas;
}
var nowTime = initTime(new Date());
var beginTime = initTime(new Date(new Date())-7776000000);

$("#endDate").val(nowTime);
$("#beginDate").val(beginTime);
$("input[data-type='date']").pickadate({
	max : new Date("2015-07-29")
});
var param={
	pageSize:15,
	pageCurrent:1,
	catId2:"",
	brandId:"",
	storage:"",
	beginDate:beginTime,
	endDate:nowTime,
	type:"seller" //seller卖单 buyer买单
}
var thead = ['类别','品名','品牌','仓库','数量','单价（元)','总金额（元)','订单日期','买/卖方','详情'];
var itemW = [50,60,60,155,185,0,0,100,105,50];//单列宽度，0表示自动
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
	api.req('account_order_list',obj,cb);
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
$("#queryOrderBtn").click(function(){
	param.catId2 =  $(this).parents(".tab-content").find(".catId2").val();
	param.brandId =  $(this).parents(".tab-content").find(".brandId").val();
	param.storage =  $(this).parents(".tab-content").find(".storage").val();
	param.beginDate =  $(this).parents(".tab-content").find("#beginDate").val();
	param.endDate =  $(this).parents(".tab-content").find("#endDate").val();
	param.pageCurrent=1;
	getGoodsList(param,rdquery);
	return false;
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
		catId2:"",
		brandId:"",
		storage:"",
		beginDate:beginTime,
		endDate:nowTime,
		type:$(this).attr("data-type")
	}
	param = params;
	getGoodsList(param,rdquery);
	$(this).addClass("active").siblings().removeClass("active");
	var select_box = $(".tab-content .select");
	for (var i = 0; i < select_box.length; i++) {
		select_box.eq(i).find("option").eq(0).attr("selected","selected");
	};
	$("#endDate").val(nowTime);
	$("#beginDate").val(beginTime);
})
$("#myTabContent").delegate(".accountDetail","click",function(){
	var accountNo = $(this).attr("data-buyerid");
	api.req('updateAccount',{'accountNo':accountNo},account);
	console.log($(this).attr("data-buyerid"));
})
function account(body){
	if(body.success){
		var data = body.data;
		console.log(data);
		var lis = [];
		lis.push(
			<li className={"clearfix"}>
				<div className={"span6"}><b>企业名称：</b>{data.firmInfo.firmFullName}</div>
				<div className={"span6"}><b>联系人：</b>{data.firmContact.name}</div>
			</li>
			)
		lis.push(
			<li className={"clearfix"}>
				<div className={"span6"}><b>联系电话：</b>{data.firmContact.phone}</div>
				<div className={"span6"}><b>公司固话：</b>{data.firmContact.landline}</div>
			</li>
			)
		lis.push(
			<li className={"clearfix"}>
				<div className={"span6"}><b>联系邮箱：</b>{data.firmContact.email}</div>
				<div className={"span6"}><b>联系QQ：</b>{data.firmContact.qq}</div>
			</li>
			)
		lis.push(
			<li className={"clearfix"}>
				<div className={"span6"}><b>传真号码：</b>{data.firmContact.fax}</div>
			</li>
			)
		lis.push(
			<li className={"clearfix"}>
				<div className={"span6"}><b>地区：</b>{data.firmContact.provinceName +"	"+data.firmContact.cityName +"	"+data.firmContact.districtName }</div>
			</li>
			)
		lis.push(
			<li className={"clearfix"}><div className={"span12"}><b>地址：</b>{data.firmContact.address}</div></li>
			)
		rend(
			<ul>{lis}</ul>
			,document.getElementById("myaccountInfo")
			)
		$("#myModalmerchant").addClass("in show");
		$("#myModalmerchant").find(".close").click(function(){
			$("#myModalmerchant").removeClass("in show");
		});
	}
}
