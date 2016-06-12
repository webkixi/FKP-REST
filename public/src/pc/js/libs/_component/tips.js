function DocmentView(){
    var doch = window.innerHeight||document.documentElement.offsetHeight||document.body.clientHieght;
    var docw = window.innerWidth||document.documentElement.offsetWidth||document.body.clientWidth;
    var docST = document.documentElement.scrollTop||document.body.scrollTop;
    var docSL = document.documentElement.scrollLeft||document.body.scrollLeft;
    return {width:docw,height:doch,scrollTop:docST,scrollLeft:docSL};
};

//类数组对象转换成数组
function arg2arr(s){
     try{
         return Array.prototype.slice.call(s);
     } catch(e){
         var arr = [];
         for(var i = 0,len = s.length; i < len; i++){
             //arr.push(s[i]);
           arr[i] = s[i];  //据说这样比push快
         }
        return arr;
     }
 }

/*
* 消息弹出抽象函数
* 实例实现 tipsItem / tipsBox / anim
*/
var tipsbox = function(){
    this.pop = function(mmm,stat,cb){
        if(!stat)stat='normal';
        pushmsg.call(this,mmm,stat);
        // var args = arg2arr(arguments);
        // args = args.slice(3);
        if(cb){
            cb()
        }
    }

    //新建消息实例，可定制
    this.tipsItem = function(stat){};

    //消息实例容器，可定制
    this.tipsBox = function(stat){};

    //消息动画 实例化后必须定制
    this.anim = function(item,container){ if(!item) return;};

    //组合执行方法
    function pushmsg(mm,stat){
        var item = this.tipsItem(stat);
        var box = this.tipsBox(stat);
        item.innerHTML = mm;
        box.appendChild(item);
        this.anim(item,box,stat);
        return;
    }

}


/*
* msgtips 消息弹出窗，为tipsbox抽象的实例
* @msg 传入的消息
* @stat 传入状态，目前支持normal,alert
* @cb  动画结束后的回调函数
*/
var msgtips = function(msg,stat,cb){
    var msg_left, msg_top;
    var docRect = DocmentView();
    var scrollleft = docRect.scrollLeft;
    var scrolltop = docRect.scrollTop;
    var clientwidth = docRect.width;
    var clientheight = docRect.height;


    var msgtip = new tipsbox();
    //新建消息实例，可定制
    msgtip.tipsItem =function(stat){
        var tip = document.createElement('div');
        var subtip = document.createElement('div');
        var bgcolor='background-color:#4ba2f9;';
        tip.className = 'showmsg';
        if(stat=='alert'){
            bgcolor='background-color:rgb(211, 13, 21);';
        }
        if(stat=='warning'){
            bgcolor='background-color:#f0ad4e;';
        }
        tip.style.cssText = 'display:none;width:100%;text-align:center; margin-top:10px;color:#fff;line-height:40px;font-size:16px;'+bgcolor;
        return tip;
    }

    //消息实例容器，可定制
    msgtip.tipsBox=function(stat){
        msg_left = Math.round((parseInt(clientwidth)-300)/2);
        msg_top = 'top:0;';
        if(stat=='alert'||stat=='warning'||stat==='center'){
            msg_top = Math.round((parseInt(clientheight)-150)/2);
            msg_top = 'top:'+msg_top+'px;height:200px;overflow:hidden;';
        }
        $('#msgcontainer').length ? '' : $('body').append('<div id="msgcontainer" style="z-Index:10030;width:300px;position:fixed;top:10px;'+msg_top+'left:'+msg_left+'px;"></div>');
        return $('#msgcontainer')[0];
    }

    msgtip.anim=function(item,container){
        clearTimeout(ggg);
        $(item).fadeIn('slow').delay(2000).animate({'height':0,'opacity':0,'margin':0},300);
        var ggg = setTimeout(function(){
            $(item).remove();
            if($('.showmsg').length==0) $(container).remove();
            // do_action('do_tipsbox');
        }, 3000);
    }
    if(cb) msgtip.pop(msg,stat,cb);
    else
        msgtip.pop(msg,stat);
}
// window.tips = msgtips;

module.exports = msgtips
