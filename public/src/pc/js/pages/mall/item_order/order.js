
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
getRegion(0,$("#province"),[19,233,2375]);
$(".select_address").change(function(){
  var _this = $(this);
  if(_this.attr("name")=="province"){
    getRegion(_this.val(),$("#city"))
  }
  if(_this.attr("name")=="city"){
    getRegion(_this.val(),$("#district"))
  }
})
$(function(){
  $("input[name='deliveryTime']").pickadate({
  min : new Date()
});
  $("input[name='signTime']").pickadate({
});
})


$('#submitOrderBtn1').click(function() {
  var province = $("#province").find("option[value='"+$("#province").val()+"']").text()
  var city = $("#province").find("option[value='"+$("#city").val()+"']").text()
  var district = $("#district").find("option[value='"+$("#district").val()+"']").text()
  $("#signPlace").val(province+city+district)
  if(messager.confirm({title:"确定提示",content:"订单提交后将无法修改，确定要提交该订单吗？",cancel:function(){return true},confirm:function(){submit();}})){
    return false;
  }
     return false;
});

function submit(){
  api.req('submitOrder',query,function(body){

  })
}