//app
//ios
//主要解决ios下无法修改title的问题
function changeTitle(title){
    var $body = $('body')
    document.title = title
    var $iframe = $('<iframe src="/images/blank.gif" style="display:none;"></iframe>').on('load', function() {
      setTimeout(function() {
        $iframe.off('load').remove()
      }, 0)
    }).appendTo($body)
}

//app
//for ios 4
//浏览器是否支持fixed
function isSupportFixed() {
    var userAgent = window.navigator.userAgent,
        ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
        ios5below = ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) < 5),
        operaMini = /Opera Mini/i.test(userAgent),
        body = document.body,
        div, isFixed;

    div = document.createElement('div');
    div.style.cssText = 'display:none;position:fixed;z-index:100;';
    body.appendChild(div);
    isFixed = window.getComputedStyle(div).position != 'fixed';
    body.removeChild(div);
    div = null;
    return !!(isFixed || ios5below || operaMini);
}

// ios 时间转时间戳
// 兼容所有浏览器
// ios 使用 new Date("2010-03-15 10:30:00").getTime() 获取时间戳报错
// @time  "2010-03-15 10:30:00"
function getTs(time){
    var arr = time.split(/[- :]/),
    _date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]),
    timeStr = Date.parse(_date)
    return timeStr
}

module.exports = {
    changeTitle: changeTitle,
    isSupportFixed: isSupportFixed,
    getTs: getTs
}
