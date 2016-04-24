var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var api = libs.api;
var valide = libs.formValide;


//当前页公共变量
var _page = {}


var bindEvent = function(){
    //此处各种dom 操作
    valide('Form_verify')
          ('mobile', 'mobile', function(stat, regs){
              return stat;
          })

    valide('Form_bind')
          ('mobile', 'mobile')
          ('validatecode', 'verify')
          ("agreement", 'noop')

    $('#getCode').click(function(){
        var postdata = SA.get('Form_verify')
        postdata.method = 'get'
        console.log('======== getCode');
        console.log(postdata);
        if (postdata.ckstat){
            api.req('/get_mms', postdata, function(data){
                console.log(data);
            });
        }
    });

    $('.login_submit').click(function(){
        var postdata = SA.get('Form_bind')
        postdata.openid = _page.openid
        postdata.method = 'get'
        console.log('======== login_submit');
        console.log(postdata);
        if (postdata.ckstat){
            router('uc/index')
        }
    });
};

//演示模块
var Show = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="default_div app_login">
                <ul className="default_form">
                    <li className="login_li_data">
                        <label>手机号码</label>
                        <input id="mobile" type="text" className="f_phone_code" />
                        <a id="getCode" className="f_btn f_code">获取验证码</a>
                    </li>
                    <li className="login_li_data">
                        <label>验证码</label>
                        <input id='validatecode' defaultValue="9969" type="text" />
                    </li>
                </ul>
                <div className="f_ck">
                    <p>
                        <input id="agreement" type="checkbox"/>我同意《大白管家条款》
                    </p>
                </div>
                <div className="f_submit">
                    <input type="submit" defaultValue="下一步" className="f_btn login_submit" />
                </div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot: function(){},
        trigger:function(){
            this.libs.changeTitle('登录');    //更改当前页面标题
            this.main()
        },
        goback: function(){
            router.cb = function(name){
                if (wx){
                    wx.closeWindow()
                }
            }
        },
        ready: function(){
            this.libs.changeTitle('登录');    //更改当前页面标题
        },
        main: function(){
            this.render(
                <Show itemDefaultMethod={bindEvent} />,
                document.getElementById(name)
            )
        }
    })
}

module.exports = start;
