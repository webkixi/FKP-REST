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
// param2 {number}   cd second
// param3 {function} when countdown is 0 then run callback
// example
/*
*  countDown(ele, 60, function(){})
*/
/*
 * sample
 * countdown(document.getElementById(xxx), 40, function(){})
*/
var _countDownElement = {}
function countDown(ele, cd, cb){
    if(!ele.nodeType)
        return false;

    var that = ele;
    if (!that.guid_cd)
        that.guid_cd = 'true';
    else{
        if (that.guid_cd === 'true'){
            return false
        }
        else {
            that.guid_cd = 'true'
        }
    }

    // cd 60 seconds
    var count = 61;
    // $(that).addClass('block')
    // console.log($(that).css('background-color'))
    that.style.cssText = "background-color:#ccc;"
    that.disabled = "disabled";

    if( typeof cd === 'function'){
        cb = cd;
    }

    if( typeof cd === 'number'){
        count = cd+1
    }
    if (!ttt){
        var ttt = setInterval(function(){
            if(count < 1){
                clearInterval(ttt);
            }
            else {
                that.innerHTML = --count+'秒';

                if(count === 0){
                    // $(that).removeClass('block')
                    that.guid_cd = 'false'
                    that.style.cssText = " "
                    clearInterval(ttt);
                    that.innerHTML = '重新发送'
                    cb()
                }
            }
        }, 1000);
        return true;
    }
}


/*
 * 返回和现在时间的时间差
 * ago {String}  timestamp 必须为时间戳
 * cb {function}  回调函数，用户自定义返回值
 */
function timeAgo(ago, cb){
  if (typeof ago === 'string'){
    if (ago.indexOf('-')>-1 && ago.indexOf(':')>-1 ) ago = convTimestamp(ago);
    ago = parseFloat(ago)
  }
  var day31 = [1,3,5,7,8,10,12]
  var day30 = [4,6,9,11]

  var date = new Date(),
      agodate = new Date(ago),
      _date = agodate;

  var $day = date.getDate(),
      $ago = agodate.getDate(),
      $hour = date.getHours(),
      $agoHour = agodate.getHours(),
      $month = date.getMonth(),
      $agoMonth = agodate.getMonth(),
      $year = date.getFullYear(),
      $agoYear = agodate.getFullYear();


  var now = Date.parse(date),
      diff = now-ago,
      _seconds = _.ceil(diff/1000, 2),
      _minute = _.ceil(_seconds/60, 2),
      _hour = _.ceil(_seconds/3600, 2),
      _day = _.ceil(_seconds/(3600*24), 2),
      _month = _.ceil(_seconds/(3600*24*30), 2),
      _year = _.ceil(_seconds/(3600*24*30*12), 2);

  var t_day = (_hour - $hour)/24;
  var _time = {
      day: t_day,
      diff:{
          seconds: _seconds,
          minute: _minute,
          hour: _hour,
          day: _day,
          month: _month,
          year: _year
      }
  }

  // 用户自行处理时间数据
  if (cb && typeof cb==='function'){
      return cb(_time)
  }

  var t = _time;
  if (t.diff.year>=1){
      return _date.Format("yyyy-MM-dd")
  }

  else if (t.diff.month>=1 && t.diff.month<12){
      return _date.Format("yyyy-MM-dd")
  }

  else if (t.day>=0 && t.diff.day<30){
      if (t.day>=0&&t.day<1){
          var _time = _date.Format("hh:mm")
          return '昨天 '+_time
      }

      else if (t.day>=1&&t.day<=2){
          var _time = _date.Format("hh:mm")
          return '前天 ' + _time
      }

      else{
        return _date.Format("yyyy-MM-dd hh:mm")
      }
  }

  else if (t.diff.hour>=1 && t.diff.hour<24){
      if (t.day<0){
          return _date.Format("hh:mm")
      }
  }

  else if (t.diff.minute>=1 && t.diff.minute<60){
      return _date.Format("hh:mm")
  }

  else if (t.diff.seconds>=1 && t.diff.seconds<60){
      return _date.Format("hh:mm")
  }
}

/*
 * "2010-03-15 10:30:00" 时间转时间戳
 * 兼容pc/ios/android
 * @time  {String}  "2010-03-15 10:30:00"
 */
function convTimestamp(time){
  var arr = time.split(/[- :]/),
      _date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]),
      timeStr = Date.parse(_date);
  return timeStr
}

module.exports = {
    timeAgo: timeAgo,
    countDown: countDown,
    convTimestamp: convTimestamp
}
