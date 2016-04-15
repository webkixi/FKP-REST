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

module.exports = {
    changeTitle: changeTitle,
    isSupportFixed: isSupportFixed
}
