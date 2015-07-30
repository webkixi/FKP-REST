   /*数量的增减*/
    $(".amount-btn").click(function(){
        var dj=$(this).parents(".ty-p-content dl").siblings(".scj").find(".n_price i").html();
        var i=$(this).attr("class").split(" ");
        var t=$(this).siblings("input");
        var minval = $(this).attr("data-minval");
        var increase = $(this).attr("data-increase");
        if(minval) {
            minval = Math.round(parseFloat(minval) * 10000) / 10000;
        } else {
            minval = 1;
        }
        if(increase) {
            increase = Math.round(parseFloat(increase) * 10000) / 10000;
        } else {
            increase = 1;
        }
        if(i[0]=="minus"&&parseFloat(t.val())>minval){
        	if(parseFloat(t.val())-increase < minval) {
                t.val(minval);
        	} else {
                t.val(Math.round((parseFloat(t.val())-increase) * 10000) / 10000 );
        	}
        }
        else if(i[0]=="plus"){
            t.val(Math.round((parseFloat(t.val())+increase) * 10000) / 10000);
        }
        // t.parents(".ty-p-content dl").siblings(".scj").find(".n_price i").html(t.val()*dj);
    });
    $(".o-amount input").keyup(function(){
        var dj=$(this).parents(".ty-p-content dl").siblings(".scj").find(".n_price i").html();
        //var reg=/^(-|\+)?\d+$/;
        var reg=/^-?\d+(\.\d*)?$/;
        if(reg.test($(this).val())==false) {
        	var minval = $(this).attr("data-minval");
        	$(this).val(minval);
        }
        $(this).parents(".ty-p-content dl").siblings(".scj").find(".n_price i").html($(this).val()*dj);
    }); 
    $('.sort .col li.select').click(function(){
        $(this).toggleClass("dropUp").siblings().removeClass("dropUp");
        
        if(setOrder) {
            orderField = $(this).attr("data-param");
            orderDirection = "";
            if($(this).hasClass("dropUp")) {
                orderDirection = "desc";
            }
            setOrder(orderField, orderDirection);
        }
        if(doQuery) {
            doQuery();
        }
    });
    $('.sort .col li.select').hover(function(){$(this).addClass("active").siblings().removeClass("active")});
    
    //为每个筛选条件添加属性
    $(".tab-pane").each(function(i,item){
        var items =  $(".tab-pane").eq(i).find(".filter-items")
           items.each(function(index,element){
                items.eq(index).find(".filter-name").attr("filter","filter"+index);
            })
    });


/*产品筛选 end*/

    //     $("#thumblist li a").click(function(){
    //     $(".ty-grid-galleryShow img").attr({"src":$(this).data('src'),"jqimg":$(this).data('src'));
    //     属性名一: “属性值一” , 属性名二: “属性值二”
    // });
function pos_top(a,pos){
    if($(window).scrollTop()>pos){
        $(a).css({position:"fixed",top:"0",zindex:"99999"})
    }
    else{
        $(a).css({position:"relative"})
    }
}

  var ajaxAsync = true;
  var ajaxTimeout = 3000;
  var dataType = "json";

    /*使用jqzoom*/
    $(function() {
        $('.jqzoom').jqzoom({
            zoomType: 'standard',
            lens:true,
            preloadImages: false,
            alwaysOn:false
        });
        /*切换tab*/
        var pos=$(".ty-item-grid-inner-t").offset().top;
        $(window).scroll(function(){
            pos_top(".ty-item-grid-inner-t",pos);
        });
        var pos=$(".ty-item-grid-inner-t").offset().top;
        $(window).scroll(function(){
            pos_top(".ty-item-grid-inner-t",pos);
        });
        $(".ty-item-grid-inner-t li").click(function(){
            if($(window).scrollTop()>pos)
            $(window).scrollTop(pos);
            var i=$(this).index();
            $(this).addClass("select").siblings().removeClass("select");
            i=(i==4)?null:(i>4)?--i:i;
            if(i!=null)$(".ty-main-tab").show().children().eq(i).show().siblings().hide();
            else $(".ty-item-grid-inner-f").show().prev().hide();
        });
        $(".ty-c1-grid-l .ty-grid-galleryShow a").css("margin","auto");
        
        
        $("#submitOrderBtn").click(function (){
          //确认当前是否已经登录
          //checkLoginAndSubmitOrder();
          submitOrder();
        });
    });
    
      
    function submitOrder() {
        var minQuantity = parseFloat($("#quantity").attr("data-minval"))
        var stock = parseFloat($("#quantity").next(".amount-btn").attr("data-maxval"))
        var increase = parseFloat($("#quantity").prev(".amount-btn").attr("data-increase"))
       if(parseFloat($("#quantity").val()) < minQuantity) {
          messager.alert({title:"提示",content:"订单数量不能小于起订量，请修改。",type:"warning"});
      return;
      }
    if(parseFloat($("#quantity").val()) > stock) {
        messager.alert({title:"提示",content:"订单数量不能大于挂牌量，请修改。",type:"warning"});
        return;
      }
      var quantity = Math.round(parseFloat($("#quantity").val()) * 10000) / 10000;
       var increa = quantity - minQuantity;
       var rate = (Math.round(increa * 10000) / 10000) % increase;

      if(increase > 0 && rate != 0) {
        messager.alert({title:"提示",content:"订单增量必须是商品增量的整数倍，请修改。",type:"warning"});
        return;
      }
    $.ajax({
      type : "POST",
      url : "/mall/item_detail.html?quantity=" + $("#quantity").val()+"&gid="+ $("#submitOrderBtn").attr("gid")+ "&_rt=" + new Date().getTime(),
      timeout : 10000,
      dataType : "json",
      async : true,
      success : function(resp) {
        if (resp.success == true) {
          document.location.href = "/mall/item_order/" + resp.data.orderId + ".html?_rt=" + new Date().getTime();
        } else if(resp.errType === 'login') {
                //当前用户还没有登录，弹出登录创口登录
              $("#myModal").addClass("in show");
              $("#myModal .close").click(function() {
                $("#myModal").removeClass("in show");
              })
            return;
        }else if(resp.errType === 'noAuth'){
          messager.alert({title:"提示",content:resp.errMsg,type:"warning",fn:function(){
            document.location.href = "/account/myaccount.html";
          }});
        }else{
          messager.alert({title:"提示",content:'摘牌下单失败',type:"warning"});
        }
      },
      error : function(e) {
      }
    });
      
    }
    


var libs = require('libs/libs');
var formValide = libs.formValide;
var api = require('../../_common/api')

var form = $('#loginCheck')[0]

function getFormData(){
    return {
    'loginPhone' : { 'ipt' : form['loginPhone'] } ,
    'password'   : { 'ipt' : form['password']} ,
    'verify'     : { 'ipt' : form['verify-code']}
    }
}

var chkOptions = {
    username: function(input_obj,reg){   // username 长度大于8，小于20
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = reg.mobile.test(val);    //email check

        return tmp;
    },
    password: function(input_obj,reg){
        var
        iobj = input_obj,
        ipt = iobj.ipt,
        val = iobj.ipt.value,
        tmp = true,

        level = (val.length>5) ? 0 + (val.length>7) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
        if(val.length>20||/\s/.test(val)) level=0; //不包括空格
        if(level==0||!level){
            // tmp = false;
      tmp = tmp;
        }
        // chk['password']={};
        // chk['password']['level']=level;
        return tmp;
    }
}

function chkInputValue(){
  var inputs = getFormData();

  //valide login value
  var forLoginStat = formValide(chkOptions)
  (inputs.loginPhone,'username')
  (inputs.password,'password')
  ();

  //assemble query
  var query = {
    loginPhone: inputs.loginPhone.ipt.value,
    password: inputs.password.ipt.value
  }

  if(forLoginStat){
        //ajax 提交
    api.req('login',query,function(body){
      if(body.success){
               $(".r_logo .close").click();
               history.go(0);
      }
      if(body.errStat){
        $(".errorMsg").text(body.msg)
      }
    })
        // $(form).submit();
  }else{
    $(".errorMsg").text('请正确输入登录信息')
  }
}
$('#login').click(function(){
  chkInputValue();
})
