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
    })
    var catId2Init = false;
    $('#catId').change(function() {
        changeGoodsCat();
    });
    function changeGoodsCat() {
        if(!$('#catId').val()){
                messager.alert({title:"提示",content:"请选择类别！",type:"warning"});
            return;
        }
        var query={
            catId: $('#catId').val()
        }
        api.req('goods/cat2/list.html',query,function(body){
            if(body.success){
                $('#catId2').empty();
                $(response).each(function(index, item){ 
                    $('#catId2').append("<option value='" + item.id + "' tradeCode='" + item.pageTitle + "'>" + item.catName + "</option>");
                });
                if(catId2Init == false) {
                    //$('#catId2').val({{spGoods.catId2}});
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
})