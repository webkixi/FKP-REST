var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var api = require('libs/api');
var valide = libs.formValide;

libs.inject()
.css(['#login .app_login .demo_dest p{margin-top:0.07rem;font-size:0.12rem;}', '_demo_dest'])


var bindEvent = function(){
    //此处各种dom 操作
    var _verify = valide('Form_verify')
          ('mobile', 'mobile', function(stat, regs){
              return stat;
          })

    var _bind = valide('Form_bind')
          ('mobile', 'mobile')
          ('validatecode', 'verify')
          ("agreement", 'noop')

    $('#getCode').click(function(){
        _verify(function(stat, e_els){
            console.log(stat);
            if (stat.ckstat){
                libs.msgtips('获取验证码成功', 'center')
            }
            else {
                libs.msgtips('请正确输入手机号码', 'center')
            }
        })
    });

    $('.login_submit').click(function(){
        _bind(function(stat, e_els){
            if (stat.ckstat){
                router('uc/index')
            }
        })
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
                        <input id="mobile" type="text" defaultValue="13255556666" className="f_phone_code" />
                        <a id="getCode" className="f_btn f_code">获取验证码</a>
                    </li>
                    <li className="login_li_data">
                        <label>验证码</label>
                        <input id='validatecode' defaultValue="9969" type="text" />
                    </li>
                </ul>
                <div className="f_ck">
                    <p>
                        <input id="agreement" type="checkbox"/>我同意《条款》
                    </p>
                </div>
                <div className="f_submit">
                    <input type="submit" defaultValue="下一步" className="f_btn login_submit" />
                </div>

                <div className="demo_dest" style={{marginTop:".2rem", padding: "0.2rem"}}>
                    <p>本demo是从实际微信项目中抽里出来的demo，所有接口都无效，是一个纯粹的演示。</p>
                    <p>本demo是大单页结构，所有页面一次加载，common.js压缩后为108K，包含react/JQ/fkp-*; app.js压缩后为20K左右。</p>
                    <p>该演示在微信端演示效果很好，在浏览器端演示则受到浏览器原本后退(android)效果的干扰，建议在微信端浏览</p>
                    <p>
                        1、包含同步/异步require，及"js/css"注入请求方式
                    </p>
                    <p>
                        2、media/rem兼容显示方式，以ip6为基准
                    </p>
                    <p>
                        3、react
                    </p>
                    <p>
                        4、FKP-SAX-flux
                    </p>
                    <p>
                        5、FKP-router  完美微信端后退
                    </p>
                    <p>
                        6、FKP-API，由前端的ajax+koajs-api
                    </p>
                    <p>
                        7、等等
                    </p>
                </div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot: function(){},
        trigger:function(){
            libs.changeTitle('登录');    //更改当前页面标题
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
            libs.changeTitle('登录');    //更改当前页面标题
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
