var base = require('./base')
var _ = base.lodash
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
//默认执行，扩展Date的方法
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}


//间隔多久可以点击
// param1 {element}  dom element not jq element
// param2 {number}   countdown second
// param3 {function} when countdown is 0 then run callback
// example
/*
*  countDown(ele, 60, function(){})
*/
function countDown(ele, countdown, cb){
    if(!ele.nodeType)
        return false;

    var that = ele;

    // countdown 60 seconds
    var count = 61;
    $(that).addClass('block')

    if( typeof countdown === 'function'){
        cb = countdown;
    }

    if( typeof countdown === 'number'){
        count = countdown
    }

    var ttt = setInterval(function(){
        that.innerHTML = --count+'秒';

        if(count === 0){
            $(that).removeClass('block')
            clearInterval(ttt);
            that.innerHTML = '重新发送'
            cb()
        }

        if(count < 1){
            clearInterval(ttt);
        }
    }, 1000);
}

function timeAgo(ago){
    if (typeof ago === 'string'){
        ago = parseFloat(ago)
    }
    var date = new Date(),
        now = Date.parse(date),
        diff = now-ago,
        _seconds = _.ceil(diff/1000, 2),
        _minute = _.ceil(_seconds/60, 2)
        _hour = _.ceil(_seconds/3600, 2),
        _day = _.ceil(_seconds/(3600*24), 2),
        _month = _.ceil(_seconds/(3600*24*30), 2),
        _year = _.ceil(_seconds/(3600*24*30*12), 2);

        if (_year>=1){
            return _.floor(_year)+'年前';
        }
        else
        if (_month>=1 && _month<12){
            return (new Date(ago)).Format("MM-dd")
            // return _.floor(_month)+'月前';
        }
        else
        if (_day>=1 && _day<30){
            return (new Date(ago)).Format("MM-dd")
            // return _.floor(_day)+'天前';
        }
        else
        if (_hour>=1 && _hour<24){
            // return (new Date(ago)).Format("hh:mm")
            return _.floor(_hour)+'小时前';
        }
        else
        if (_minute>=1 && _minute<60){
            return _.floor(_minute)+'分钟前';
            // if (_minute>30)
            //     return (new Date(ago)).Format("hh:mm")
            // else
            //     return _.floor(_minute)+'分钟前';
        }
        else
        if (_seconds>=1 && _seconds<60){
            return _.floor(_minute)+'秒前';
        }
}

module.exports = {
    timeAgo: timeAgo,
    countDown: countDown
}
