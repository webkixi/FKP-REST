	$(document).ready(function() {
		$('#orderForm').ajaxForm();
		$('#orderForm').submit(function() {
		    $(this).ajaxSubmit();
		    return false;
		});
		$('#submitOrderBtn').click(function() {
			//卖方送货商品必须填写送货地址
			if($("#deliveryAddr").val() == "") {

        messager.alert({title:"提示",content:"卖方送货商品，请填写送货地址。",type:"warning"});
				return;
			}
      if(messager.confirm({title:"确定提示",content:"订单提交后将无法修改，确定要提交该订单吗？",cancel:function(){return true},confirm:function(){submit();}})){
        return
      }
		     return false;
		});

    function submit(){
      $('#orderForm').ajaxSubmit({dataType: 'json',
         success: function(data){
           if(data.success == true) {

              messager.alert({title:"提示",content:"订单提交成功！",type:"success",fn:function(){
                    document.location.href = "${rc.contextPath}/order/list.html?curList=2";
              }});
              
              return;
           } else {
              messager.alert({title:"提示",content:data.message,type:"warning"});
              return;
           }
         }
       });

    }
	});