// require('../../_comm_plug/ie')
// require('../../_common/laypage.dev')
// require('../../_comm_plug/jquery_picker')
// require('../../_comm_plug/jquery_picker_date')
// require('../../_comm_plug/jquery_ui')
// require('../../_comm_plug/jquery.fileupload')
// require('../../_comm_plug/jquery_i')
// require('../../_comm_plug/jquery_form')
var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')

$(function(){
    $("#getAllStorage").click(function(){
        if($("#getAllStorage").val()==1) {
            var storage = $('#storage').html();
            var allStorage = $(this).nextAll(".hidden").html();
            $('#storage').html(allStorage);
            $(this).nextAll(".hidden").html(storage);
        }
    });

    var catId2Init = false;
    var brandInit = false;
    $('#catId').change(function() {
        changeGoodsCat();
    });
    $('#catId2').change(function() {
        changeGoodsCat2();
    });
    $('#catId').trigger("change"); 

    function changeGoodsCat() {
        if(!$('#catId').val()){
                messager.alert({title:"提示",content:"请选择类别！",type:"warning"});
            return;
        }
        //商品属性类型type值为，category类别，product品名，brand品牌，storage仓库 ，参数2为查询条件
        api.req('goods_attr',{type:'product',catId: $('#catId').val()},function(body){
            if(body.success){
                
                $('#catId2').empty();
                body.list.map(function(item){ 
                    $('#catId2').append("<option value='" + item.id + "' tradeCode='" + item.pageTitle + "'>" + item.catName + "</option>");
                });
                if(catId2Init == false) {
                    $('#catId2').val(cI);
                    catId2Init = true;
                }
                //显示交易代码
                var tradeCode = $("#catId2").find("option:selected").attr("tradeCode");
                if(tradeCode && tradeCode != "") {
                    $('#brandTradeCode').text(tradeCode);
                }
                changeGoodsCat2();
                return;                
            }
        })
    }
    function changeGoodsCat2() {
        if(!$('#catId2').val()){
            return;
        }
        api.req('goods_attr',{type:'brand',catId: $('#catId').val()},function(body){
            if(body.success){
                $('#brandId').empty();
                body.list.map(function(item){ 
                    $("#brandId").append("<option value='" + item.id + "' logo='" + item.logo + "'>" + item.brandName + "</option>");
                });
                if(brandInit == false) {
                    $("#brandId").val(bI);
                    brandInit = true;
                }            
            }
        })          
    }    
})