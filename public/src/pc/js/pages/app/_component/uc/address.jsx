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
    // valide('Form_verify')
    //       ('mobile', 'mobile', function(stat, regs){
    //           return stat;
    //       })
    //
    // valide('Form_bind')
    //       ('mobile', 'mobile')
    //       ('validatecode', 'verify')
    //       ("agreement", 'noop')
    //
    // $('#getCode').click(function(){
    //     var postdata = SA.get('Form_verify')
    //     postdata.method = 'get'
    //     console.log('======== getCode');
    //     console.log(postdata);
    //     if (postdata.ckstat){
    //         api.req('/get_mms', postdata, function(data){
    //             console.log(data);
    //         });
    //     }
    // });
    //
    // $('.login_submit').click(function(){
    //     var postdata = SA.get('Form_bind')
    //     postdata.openid = _page.openid
    //     postdata.method = 'get'
    //     console.log('======== login_submit');
    //     console.log(postdata);
    //     if (postdata.ckstat){
    //         api.req('/bind_wx', postdata, function(data){
    //             console.log(data);
    //         });
    //     }
    // });
};

//演示模块
var Show = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="default_div app_faq">
                <ul className="default_form">
                    <li>
                        <label>姓名</label>
                    <input type="text" placeholder="请输入姓名"/>
                    </li>
                    <li>
                        <label>姓名</label>
                        <p className="default_no_update">无法修改状态</p>
                    </li>
                    <li>
                        <label>手机号码</label>
                        <input type="text" defaultValue="1375226614" />
                    </li>
                    <li>
                        <label>所在小区</label>
                        <input type="text" placeholder="请选择小区"/>
                    </li>
                    <li>
                        <label>备注</label>
                        <p className="default_no_update">谢谢</p>
                    </li>
                </ul>
                <div className="f_submit mT03">
                    <input type="submit" defaultValue="完成" className="f_btn login_submit" />
                </div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot:function(){},
        trigger:function(){
            this.libs.changeTitle('新增地址');    //更改当前页面标题
            this.main()
        },
        ready: function(){
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
