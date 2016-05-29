var libs = require('libs/libs');
var inject = libs.inject().css;

var Radio = require('../../widgets/ui/radio')
var render = React.render;

// var radiodata_waterCard = {
//     name: ['payWay','payWay'],
//     title: [<span className="pay_icon_bg"><i className="iconfont icon-weixinzhifu"></i>{'微信支付'}</span>,<span className="pay_icon_bg"><i className="iconfont icon-fukuan"></i>{'货到付款'}</span>],
//     value: ['-WEIXIN_DBGZH_PAY','PAY_ON_DELIVERY']
// }
// radio(radiodata_waterCard, 'radiodata_waterCard')

function radio(d, e, c){
    var _css = d.theme ? d.theme :'radio'
    inject([
        '/css/t/ui/form/'+_css+'.css'
        ,'formradio'
    ])
    delete d.theme

    var _fun = function(data, ele, cb){
        this.value;
        this.ipt;
        this.name;
        var self = this;

        function dm(){
            self.ipt = this;
            $(this).find('input[type=radio]').change(function(){
                $('fkp-radio-box active').removeClass('active')
                self.value = this.value;
            })

            if (cb&&typeof cb==='function')
                cb.call(self, this)
        }

        render(
            <Radio data={data} itemDefaultMethod={dm}/>,
            (function(){return ele.nodeType ? ele : document.getElementById(ele)}())
        )
    }

    if (d === true)
        return Radio;

    return new _fun(d, e, c)

}

module.exports = radio
