var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var _user = SA.get('USER')
var api = require('libs/api');

function clicks(cls, rt){
    if (!cls){
        return false;
    }
    $('.'+cls).click(function(){
        router(rt)
    })
    return clicks;
}

var bindEvent = function(){
    
    if (!_user.info){
        SA.set('USER', _fun)
        function _fun(data){
            $('#uc_index_top_user_name').html(data.info.userName||'123')
            $('#uc_index_top_user_stat').html('')
        }
    }

    clicks('uc_order', 'uc/order')
          ('uc_coupon', 'uc/coupons')
          ('uc_edit', 'uc/edit')
          ('uc_faq', 'uc/faq')
          ('uc_message', 'uc/message')
          ('uc_intro', 'uc/siteIntroduce')
          ('uc_zone', 'uc/location')
};

//演示模块
var Show = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="default_div app_index">
                <ul className="default_Picture">
                    <li className="dP_pic uc_edit">
                        <div className="dp_pic_l">
                            <img src="./images/staticDemo/picture.jpg"/>
                        </div>
                        <div className="dp_pic_name">
                            <p id="uc_index_top_user_name">Lghua</p>
                            <a id="uc_index_top_user_stat" href="#">登录/注册</a>
                            <i className="iconfont icon-xiangyou"></i>
                        </div>
                    </li>
                    <li className="uc_order">
                        <label>网点电话</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li className="uc_order">
                        <label>我的订单</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li className="uc_message">
                        <label>消息中心</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li className="uc_coupon">
                        <label>我的卡劵</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li className="uc_intro">
                        <label>网点介绍</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li className="uc_zone">
                        <label>切换小区</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li className="uc_faq">
                        <label>常见问题</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                </ul>
                <div className="f_submit" style={{marginTop:".3rem"}}>
                    <input type="submit" defaultValue="退出登录" className="f_btn login_exit" />
                </div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot:function(){},
        trigger:function(){
            libs.changeTitle('演示模块');    //更改当前页面标题
            this.main()
        },
        main: function(){
            this.render(
                <Show itemDefaultMethod={bindEvent} />,
                document.getElementById(name)
            )
        },
        end: function(){
            // React.unmountComponentAtNode(document.getElementById(name))
        }
    })
}

module.exports = start;
