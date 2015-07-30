// require('../../_comm_plug/ie')
// require('../../_common/laypage.dev')
// require('../../_comm_plug/jquery_picker')
// require('../../_comm_plug/jquery_picker_date')
// require('../../_comm_plug/jquery_ui')
// require('../../_comm_plug/jquery.fileupload')
// require('../../_comm_plug/jquery_i')
require('../../order/list/jquery.picker')
require('../../order/list/jquery.picker.data')
var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')

$(function(){
    //获取仓库列表,切换0 1
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
    
    var dayStopHours = [9, 10, 11, 12, 13, 14];
    var nightStopHours = [9, 10, 11, 12, 13, 14,21, 22, 23, 24];
    var stopHourInit = false;
    var stopMinuteInit = false;

    //获取最小时间与最大时间值
    var time = new Date();
    var nowTime = time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate();
    var behindTime = time.getFullYear() + "-" + (time.getMonth()+4) + "-" + time.getDate();
    $("input[data-type='date']").pickadate({
        'min': new Date(nowTime),
        'max': new Date(behindTime)
    });
    //获取时间 时 分
    $('#isNightPlate').click(function() {
        $('#stopHour').empty();
        var cutDate = dayStopHours;
        dayStopHours = nightStopHours;
        nightStopHours = cutDate;
        dayStopHours.map(function(item){
            $('#stopHour').append("<option value='" + item + "'>" + item + "</option>");                
        });
        $('#stopHour').trigger("change");
    });
    $('#stopHour').change(function() {
        $('#stopMinute').empty();
        if($('#isNightPlate').attr("checked") == "checked") {
            if($('#stopHour').val() == 9) {
                for(var item = 5; item < 60;) {
                    $('#stopMinute').append("<option value='" + item + "'>" + item + "</option>");  
                    item += 5;
                }
            } else if($('#stopHour').val() == 24){
                for(var item = 0; item <= 50;) {
                    $('#stopMinute').append("<option value='" + item + "'>" + item + "</option>");  
                    item += 5;
                }
            } else {
                for(var item = 0; item < 60;) {
                    $('#stopMinute').append("<option value='" + item + "'>" + item + "</option>");  
                    item += 5;
                }
            }
        } else {
            if($('#stopHour').val() == 9) {
                for(var item = 5; item < 60;) {
                    $('#stopMinute').append("<option value='" + item + "'>" + item + "</option>");  
                    item += 5;
                }
            } else if($('#stopHour').val() == 14){
                for(var item = 0; item <= 50;) {
                    $('#stopMinute').append("<option value='" + item + "'>" + item + "</option>");  
                    item += 5;
                }
            } else {
                for(var item = 0; item < 60;) {
                    $('#stopMinute').append("<option value='" + item + "'>" + item + "</option>");  
                    item += 5;
                }
            }
        }
        if(stopMinuteInit == false) {
            $('#stopMinute').val(minute);
            stopMinuteInit = true;
        }
    });
    dayStopHours.map(function(item){
        $('#stopHour').append("<option value='" + item + "'>" + item + "</option>"); 
    });
    // if($('#isNightPlate').attr("checked") == "checked"){
    //     nightStopHours.map(function(item){
    //         $('#stopHour').append("<option value='" + item + "'>" + item + "</option>");                
    //     });
    // }
    if(stopHourInit == false) {
        $('#stopHour').val(hour);
        stopHourInit = true;
    }
    $('#stopHour').trigger("change");
    //计价方式
    $('#valuation').change(function() {
        $("div[data-valuation]").hide();
        $("div[data-valuation=" + $('#valuation').val() + "]").show();
    });
    $('#valuation').trigger("change");
    //获取商品类别
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
    //提交内容
    $('#btnSave').click(function() {
        $('#btnSave').attr("disabled",true);   
        var catName = $("#catId").find("option:selected").text();
        var catName2 = $("#catId2").find("option:selected").text();
        var brandName = $("#brandId").find("option:selected").text();
        $("#fullName").val(catName + " " + catName2 + " " + brandName);

        var query = {};
        $('#goodsForm').find('input').map(function(i, item){
            query[item.name] = item.value;
        })
        $('#goodsForm').find("select").map(function(i, item){
            query[item.name] = $(item).val();
        })

        $('#goodsForm').find('textarea').map(function(i, item){
            query[item.name] = $(item).val().toString();
        })
        console.log(query)
        api.req('edit',query,function(body){
            console.log(body)
            if(body.success){
                console.log("22222222222")
                 messager.alert({title:"提示",content:"商品保存成功！",type:"success", fn: function(){
                    document.location.href = "/goods/list.html";
                }});
                return;
            }else{
                console.log("333333333333")
                if(body.errMsg) {
                    messager.alert({title:"错误提示",content:body.errMsg,type:"error"});
                } else {
                    messager.alert({title:"错误提示",content:"商品保存失败，请检查填写数据！",type:"error"});
                }
                $('#btnSave').attr("disabled",false);                
            }
        })
        if($("#catId").val().trim() == "") {
            messager.alert({title:"提示",content:"请选择商品类别！",type:"warning"});
            $('#btnSave').attr("disabled",false);
            return;
        }
        if($("#catId2").val().trim() == "") {
                messager.alert({title:"提示",content:"请选择商品品名！",type:"warning"});
                $('#btnSave').attr("disabled",false);
            return;
        }
        //if($("#vender").val().trim() == "") {
        //        dropAlert("请填写商品厂家！");
        //  $('#btnSave').attr("disabled",false);
        //  return;
        //}
        if($("#stock").val().trim() == "") {
                messager.alert({title:"提示",content:"请填写商品挂牌量！",type:"warning"});
                $('#btnSave').attr("disabled",false);
            return;
        }
        if(/^\d+(\.\d*)?$/.test($("#stock").val().trim())==false) {
                messager.alert({title:"提示",content:"商品挂牌量必须是大于等于零的数字！",type:"warning"});
                $('#btnSave').attr("disabled",false);
            return;
        }
        if($("#minQuantity").val().trim() == "") {
                messager.alert({title:"提示",content:"请填写商品起订量！",type:"warning"});
                $('#btnSave').attr("disabled",false);
            return;
        }
        if(/^\d+(\.\d*)?$/.test($("#minQuantity").val().trim())==false) {
                messager.alert({title:"提示",content:"商品起订量必须是大于零的数字！",type:"warning"});
                $('#btnSave').attr("disabled",false);
            return;
        }
        if(parseFloat($("#stock").val().trim()) > 0) {
            if(parseFloat($("#minQuantity").val().trim()) > parseFloat($("#stock").val().trim())) {
                messager.alert({title:"提示",content:"挂牌量大于零时商品起订量不能大于挂牌量！",type:"warning"});
                $('#btnSave').attr("disabled",false);
                return;
            }
        }
        if($("#increase").val().trim() != "") {
            if(/^\d+$/.test($("#increase").val().trim())==false) {
                messager.alert({title:"提示",content:"商品订单增幅必须是大于零的整数！",type:"warning"});
                $('#btnSave').attr("disabled",false);
                return;
            }
        }
        if($("#validity").val().trim() != "") {
            if(/^\d+$/.test($("#validity").val().trim()) == false) {
                messager.alert({title:"提示",content:"商品有效期必须是大于零的整数！",type:"warning"});
                $('#btnSave').attr("disabled",false);
                return;
            }
        }
        if($("#discount").val().trim() != "") {
            if(/^-?\d+$/.test($("#discount").val().trim())==false) {
                messager.alert({title:"提示",content:"商品升贴水必须为整数！",type:"warning"});
                $('#btnSave').attr("disabled",false);
                return;
            }
        }
        if($("#valuation").val() == "0") {
            if($("#stopDate").val().trim() == "") {
                messager.alert({title:"提示",content:"请填写商品点价截止日期！",type:"warning"});
                $('#btnSave').attr("disabled",false);
                return;
            }           
        } else {
            if($("#price").val().trim() == "") {
                messager.alert({title:"提示",content:"请填写商品单价！",type:"warning"});
                $('#btnSave').attr("disabled",false);
                return;
            }
            if(/^\d+(\.\d*)?$/.test($("#price").val().trim()) == false) {
                messager.alert({title:"提示",content:"商品单价必须是大于零的数字！",type:"warning"});
                $('#btnSave').attr("disabled",false);
                return;
            }
        }     
        return false;
    });
    $('#btnCancel').click(function() {
        window.close();
    });
})