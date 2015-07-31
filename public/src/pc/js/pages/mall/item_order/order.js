
var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api');
require('../../order/list/jquery.picker.data');
require('../../order/list/jquery.picker');
    /*
* 地区选择
*/
function getRegion(id,_this,arr1){
    var arr = [];
    if(arr1)arr = arr1;
    var query = {id: id};
    api.req('region',query,function(body){
      if(body.success&&body.data.regionList.length){
        console.log(name);
        _this.empty()
        body.data.regionList.map(function(item){
          if(item.id == arr[0]||item.id == arr[1]||item.id == arr[2])_this.append('<option selected="selected" value='+item.id+'>'+item.regionName+'</option>');
          else _this.append('<option value='+item.id+'>'+item.regionName+'</option>');
        })
        if(_this.find("option[selected]").length<=0)_this.find("option").eq(0).attr("selected","selected");

        if(_this.attr("name")=="province"){
          getRegion(_this.find("option[selected]").val(),$("select[name='city']"),arr)
        }
        if(_this.attr("name")=="city"){
          getRegion(_this.find("option[selected]").val(),$("select[name='district']"),arr)
        }
      }
    })
}
// 需要异步获取默认地址时可以执行以下语句，数组参数为省，市，区 ID
getRegion(0,$("select[name='province']"),[19,233,2375]);
$(".select_address").change(function(){
  var _this = $(this);
  if(_this.attr("name")=="province"){
    getRegion(_this.val(),$("select[name='city']"))
  }
  if(_this.attr("name")=="city"){
    getRegion(_this.val(),$("select[name='district']"))
  }
})
$(function(){
  $("input[name='deliveryTime']").pickadate({
  min : new Date()
});
  $("input[name='signTime']").pickadate({
});
})


$('#submitOrderBtn').click(function() {
  var province = $("#province").find("option[value='"+$("#province").val()+"']").text()
  var city = $("#city").find("option[value='"+$("#city").val()+"']").text()
  var district = $("#district").find("option[value='"+$("#district").val()+"']").text()
  $("#signPlace").val(province+city+district)
  if(!$("input[name='signTime']").val()) return  messager.alert({title:"提示",content:"请输入签订时间。",type:"warning"});
  if(!$("input[name='deliveryTime']").val()&&$("input[name='deliveryTime']").length>0) return  messager.alert({title:"提示",content:"请输入签订时间。",type:"warning"});
  if(!$("input[name='storageAddress']").val()&&$("input[name='storageAddress']").length>0) return  messager.alert({title:"提示",content:"请输入交货仓库地址。",type:"warning"});
  if(!$("input[name='quality']").val()&&$("input[name='quality']").length>0) return  messager.alert({title:"提示",content:"请输入质量标准。",type:"warning"});
  if(!$("input[name='sellerContactWay']").val()) return  messager.alert({title:"提示",content:"请输入卖方联系方式。",type:"warning"});
  if(!$("input[name='sellerAddress']").val()) return  messager.alert({title:"提示",content:"请输入卖方通信地址。",type:"warning"});
  if(!$("input[name='buyerContactWay']").val()) return  messager.alert({title:"提示",content:"请输入买方联系方式。",type:"warning"});
  if(!$("input[name='buyerAddress']").val()) return  messager.alert({title:"提示",content:"请输入买方通信地址。",type:"warning"});
  if(messager.confirm({title:"确定提示",content:"订单提交后将无法修改，确定要提交该订单吗？",cancel:function(){return true},confirm:function(){submit();}})){
    return false;
  }
     return false;
});

function submit(){
  var query = {};
    query.orderId = $("input[name='orderId']").val();
    query.step = $("input[name='step']").val();
    query.signPlace = $("#signPlace").val();
    query.signTime = $("input[name='signTime']").val();
    if($("input[name='deliveryTime']").length>0) query.deliveryTime = $("input[name='deliveryTime']").val();
    if($("input[name='storageAddress']").length>0) query.storageAddress = $("input[name='storageAddress']").val();
    query.freightParty = $("#freightParty").val();
    query.quality = $("input[name='quality']").val();
    query.sellerContactWay = $("input[name='sellerContactWay']").val();
    query.sellerAddress = $("input[name='sellerAddress']").val();
    query.buyerContactWay = $("input[name='buyerContactWay']").val();
    query.buyerAddress = $("input[name='buyerAddress']").val();
  api.req('submitOrder',query,function(body){
    if(body.success){
      messager.alert({title:"提示",content:"订单提交成功！",type:"success",fn:function(){
              document.location.href = "/order/list.html";
        }});
        
    }else{
      if (!!body.errMsg) {
          messager.alert({title:"提示",content:body.errMsg,type:"error"});
              $('#submitOrderBtn').attr("disabled",false);
      }else{
        messager.alert({title:"提示",content:'提交订单失败',type:"error"});
      }
    }
  })
}