require('../../_comm_plug/ie')
require('../../_common/laypage.dev')
require('../../_comm_plug/jquery_picker')
require('../../_comm_plug/jquery_picker_date')
require('../../_comm_plug/jquery_ui')
require('../../_comm_plug/jquery.fileupload')
require('../../_comm_plug/jquery_i')
require('../../_comm_plug/jquery_form')

$(function(){
var ajaxAsync = true;
var ajaxTimeout = 3000;
var dataType = "json";
var image = 0;
var dayStopHours = [9, 10, 11, 12, 13, 14];
var nightStopHours = [21, 22, 23, 24];
    $('#catId').change(function() {
        changeGoodsCat();
    });
    $('#catId2').change(function() {
        changeGoodsCat2();
    });
    $('#brandId').change(function() {
        changeBrand();
    });
    $('#catId').trigger("change");

    $("#stopDate").pickadate({min: new Date("${stopDateMinDate}"),max: new Date("${stopDateMaxDate}")});

    //改变单位时更新库订购量，增量，升贴水单位
    $('#unit').change(function() {
        var unitName = $(this).find("option:selected").text();;
        $("#minQuantityUnit").text(unitName);
        $("#increaseUnit").text(unitName);
        $("#discountUnit").text("/" + unitName);
		$("#priceUnit").text("/" + unitName);
    });
    $('#unit').trigger("change");
    $('#isNightPlate').click(function() {
        $('#stopHour').empty();
        $(dayStopHours).each(function(index, item){
            $('#stopHour').append("<option value='" + item + "'>" + item + "</option>");
        });
        if($('#isNightPlate').attr("checked") == "checked"){
            $(nightStopHours).each(function(index, item){
                $('#stopHour').append("<option value='" + item + "'>" + item + "</option>");
            });
        }
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
    });
    $(dayStopHours).each(function(index, item){
        $('#stopHour').append("<option value='" + item + "'>" + item + "</option>");
    });
    $('#stopHour').trigger("change");
    //$("#stock").inputmask("999999.9999");
    //$("#minQuantity").inputmask("999999.9999");
    //$("#increase").inputmask("9999");
    //$("#price").inputmask("999999.99");
    $('#goodsForm').ajaxForm();
    $('#goodsForm').submit(function() {
        $(this).ajaxSubmit();
        return false;
    });
    $('#btnSave').click(function() {
    	$('#btnSave').attr("disabled",true);
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
        //    dropAlert("请填写商品厂家！");
        //    return;
        //}

        if($("#stock").val().trim() == "") {
            messager.alert({title:"提示",content:"请填写商品挂牌量！",type:"warning"});
        	$('#btnSave').attr("disabled",false);
            return;
        }
        if(/^\d+(\.\d*)?$/.test($("#stock").val().trim())==false) {
            messager.alert({title:"提示",content:"商品挂牌量必须是大于零的数字！",type:"warning"});
        	$('#btnSave').attr("disabled",false);
            return;
        }
        if($("#minQuantity").val().trim() == "") {
            messager.alert({title:"提示",content:"请填写商品起订量！",type:"warning"});
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
        if(/^\d+(\.\d*)?$/.test($("#minQuantity").val().trim())==false) {
            messager.alert({title:"提示",content:"商品起订量必须是大于零的数字！",type:"warning"});
        	$('#btnSave').attr("disabled",false);
            return;
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
        var catName = $("#catId").find("option:selected").text();
        var catName2 = $("#catId2").find("option:selected").text();
        var brandName = $("#brandId").find("option:selected").text();
        $("#fullName").val(catName + " " + catName2 + " " + brandName);

        $('#goodsForm').ajaxSubmit({dataType: 'json',
            success: function(data){
                if(data.success == true) {
                    messager.alert({title:"提示",content:"商品保存成功！",type:"success", fn: function(){
                        document.location.href = "${rc.contextPath}/goods/list.html";
                    }});
                    return;
                } else {
                    if(data.message) {
                        messager.alert({title:"错误提示",content:data.message,type:"error"});
                    } else {
                        messager.alert({title:"错误提示",content:"商品保存失败，请检查填写数据！",type:"error"});
                    }
                	$('#btnSave').attr("disabled",false);
                }
            }
        });
        return false;
    });
    $('#btnCancel').click(function() {
        window.close();
    });
    $('#valuation').change(function() {
        $("div[data-valuation]").hide();
        $("div[data-valuation=" + $('#valuation').val() + "]").show();
    });
    $('#valuation').trigger("change");

    $('#storage').change(function() {
        $("div[data-storage]").hide();
        $("div[data-storage=" + $('#storage').val() + "]").show();
    });
    $('#storage').trigger("change");
    //没有图片时隐藏IMG标签
    $("img").each(function(i, item) {
        var str = "jpg,png,jpeg,gif"
        if(str.indexOf($(item).attr("src").slice(-3))<0||$(item).attr("src")==""){
            $(item).css("visibility", "hidden");
        }
    });
    var iframe = false;
    var dataType = "json";
    var url = "${rc.contextPath}/goods/picture/upload.html";
     if($.browser.msie && $.browser.version < 10) {
        iframe = true;
        dataType = "text";
        $(".goods_updown").addClass("ie_updown");
    }
    $('.hide_file').fileupload({
        dataType: dataType,
        iframe: iframe,
        autoUpload: true,
        sequentialUploads: true,
        maxChunkSize: 10000000,
        minFileSize: 1000,
        url: url,
        add: function (e, data) {
            $(this).parents(".goods_updown").addClass("uploading");
            data.submit();
        },
        done: function (e, data) {
            if(iframe){
                data.result = JSON.parse(data.result);
            }
            var src = data.result.path + data.result.fileName ;
            $(this).next(".pic_src").attr("name","pictures").val(data.result.fileName);
            $(this).prevAll(".goods_upic").attr("src",src).css("visibility","visible");
            $(this).parents(".goods_updown").removeClass("uploading").addClass("exist_img");
        }
    });
    //删除图片
    $(".del_img").click(function(){
        if($(".goods_updown.exist_img").length<=1)return messager.alert({title:"提示",content:"商品图片不得少于一张",type:"warning"});
        var upicbtn = $(this).parent();
        upicbtn.nextAll(".pic_src").attr("name","").val("");
        upicbtn.prevAll(".goods_upic").attr("src","").css("visibility","hidden");
        upicbtn.parents(".goods_updown").removeClass("exist_img")
    })
    //更新图片
    $(".updata_img").click(function(){
        var upicbtn = $(this).parent();
        upicbtn.nextAll(".hide_file ").trigger("click");
    })
    //上传图片
    $(".file_btn").click(function(){
        $(this).nextAll(".hide_file ").trigger("click");
    })
    function changeGoodsCat() {
        if(!$('#catId').val()){
            return;
        }
        $.ajax({
            type: "GET",
            url: "${rc.contextPath}/goods/cat2/list.html?catId=" + $('#catId').val(),
            timeout: ajaxTimeout,
            dataType: dataType,
            async: ajaxAsync,
            success: function(response) {
                $('#catId2').empty();
                $(response).each(function(index, item){
                    $('#catId2').append("<option value='" + item.id + "' tradeCode='" + item.pageTitle + "'>" + item.catName + "</option>");
                });
                //显示交易代码
                var tradeCode = $("#catId2").find("option:selected").attr("tradeCode");
                if(tradeCode && tradeCode != "") {
                    $('#brandTradeCode').text(tradeCode);
                }
                changeGoodsCat2();
                return;
            },
            error: function() {
            }
        });
    }
    function changeGoodsCat2() {
        if(!$('#catId2').val()){
            return;
        }
        $.ajax({
            type: "GET",
            url: "${rc.contextPath}/goods/brands/list.html?catId=" + $('#catId2').val(),
            timeout: ajaxTimeout,
            dataType: dataType,
            async: ajaxAsync,
            success: function(response) {
                $('#brandId').empty();
                $(response).each(function(index, item){
                    $("#brandId").append("<option value='" + item.id + "' logo='" + item.logo + "'>" + item.brandName + "</option>");
                });
                changeBrand();
            },
            error: function() {
            }
        });
    }
    function changeBrand() {
        $('#brandLogo').attr("src", "");
        var logo = $("#brandId").find("option:selected").attr("logo");
        var src = "${path}" + logo;
        if(logo && logo != "") {
            $('#brandLogo').attr("src",src).css("visibility","").nextAll(".pic_src").val(logo).attr("name","pictures");
        }
    }
});
