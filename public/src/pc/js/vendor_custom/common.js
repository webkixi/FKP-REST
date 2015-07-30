;(function(){

    $(".arrow-select-down").click(function(){
	$(this).siblings("ul").toggleClass("hidden");
	});
	$(".item-select li").click(function(){
		var val = $(this).attr("data");
		$("#search_hide").val(val);
		$(this).parents("ul").addClass("hidden").siblings("a").find("span").html($(this).html());
	});
	$(document).click(function() {
		$('.item-select ul').addClass("hidden");
	});
	$('.arrow-select-down').click(function(event) {
		event.stopPropagation();
	});

	$("#searchHeader").submit(function(){
		if(!$(this).find(".search_text").val()){
			$(this).find(".search_text").addClass("bd_col")
			return false;
		}
	})

    $('#logout').click(function(){
        $.post('/account/login', {logout: true}, function(body){
            if(body.success){
                if(body.redirect)
                    window.location = body.redirect;
            }
        }, "json")
    })


//页面提示框；
//如果使用默认的提示框样式 dropAlert("提示内容")
//自定义提示信息dropAlert（{title:"标题",content:"提示内容",type:"提示框类型"}）;
//提示框类型可选 " ", "info" , "success", "warning", "danger" 默认为  " ";
//回调函数 fn，为空时则没有回调函数
messager={
	alert:function(data){
		var title =  "温馨提示",
			content = "",
			type = ""

		if(getObjType(data)=="Object"){
			if(!!data.title)title = data.title;
			if(!!data.content)content = data.content;
			if(!!data.type)type = data.type;
		}else{
			content = data
		}
	var html = '<div id="alertMask" class="alertMask"></div><div id="alertMsg" style="display:none" class="alertMsg alert-'+type+'">';
		html +=  '<h5 id="alert_title" class="alert_title"><i class="alert_icon"></i>'+title+'<i class="alert_close"></i></h5>';
		html +=	'<div class="alertBox clearfix">';
		html +=   '<p class="content">'+content+'</p>';
		html +=  '<button class="closeAlert">确定</button></div></div>';
		$("body").append(html);
		$("#alertMsg").css("marginTop",-$("#alertMsg").height()/2).fadeIn();
		$("#alertMsg").find(".alert_close").click(function(){
			removeBox();
		})
		$("#alertMsg").find("button.closeAlert").click(function(){
			if(!!data.fn){
				data.fn();
				removeBox();
			}else{
				removeBox();
			}
		})

		function removeBox(){
			$("#alertMsg").fadeOut("normal",function(){
				$("#alertMsg").remove()
			});
			$("#alertMask").remove();
		}
	},
	//确认信息框参数必须为json对象
	//content提示内容，confirm确定时的回调函数，cancel取消时的回调函数，type=="top"时提示框在头部出现
	confirm:function(data){
		if(!data.title)data.title="确认信息"
	var html = '<div id="confirmMask" class="alertMask"></div><div id="confirmMsg" style="display:none" class="alertMsg alert-question">';
		html +=  '<h5 id="alert_title" class="alert_title"><i class="alert_icon"></i>'+data.title+'<i class="alert_close"></i></h5>';
		html +=	'<div class="alertBox clearfix">';
		html +=   '<p class="content">'+data.content+'</p>';
		html +=  '<button class="closeAlert confirm">确定</button><button class="closeAlert cancel">取消</button></div></div>';
		$("body").append(html);
		if(data.type=="top")$("#confirmMsg").css("top",0);
		$("#confirmMsg").fadeIn().find(".alert_close").click(function(){
			removeBox();
		})
		$("#confirmMsg").find(".confirm").click(function(){
			if(!!data.confirm){
				data.confirm();
				removeBox();
			}else{
				removeBox();
			}
		})
		$("#confirmMsg").find(".cancel").click(function(){
			if(!!data.cancel){
				data.cancel();
				removeBox();
			}else{
				removeBox();
			}
		})

		function removeBox(){
			$("#confirmMsg").fadeOut("normal",function(){
				$("#confirmMsg").remove()
			});
			$("#confirmMask").remove();
		}
	},
	dropAlert: function(data){
		var title="温馨提示",
		type = "",
		content =""
		if(data instanceof Object ){
			if(!!data.title)title=data.title;
			if(!!data.type)type = data.type;
			if (!!data.content)content = data.content;
		}else{
			content = data;
		};
		var html = '<div id="dropAlert" class="dropAlert alert-'+type+'">';
			html +=	'<div class="alertBox clearfix">';
			html +=  '<h5 id="alert_title" class="alert_title">'+title+'</h5>';
			html +=   '<p class="content">'+content+'</p>';
			html +=  '<button class="closeDropAlert">关闭</button></div></div>';
			$("body").append(html);
			var top = $("#dropAlert").height()+10;
			$("#dropAlert").css({top:-top,display:"block"}).animate({top:0},500);
			$(".closeDropAlert").click(function(){
				hideBox();
			});
			setTimeout(function(){
				hideBox();
			},3000);
			function hideBox (){
				$("#dropAlert").animate({top:-top},400,function(){
					$("#dropAlert").remove();
				});
			}
	}
}

//判断对象类型
function getObjType(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

})();
