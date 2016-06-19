var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var api = require('libs/api');
var valide = libs.formValide;


//当前页公共变量
var _page = {}


var bindEvent = function(){
    //此处各种dom 操作

};

//演示模块
var Show = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="invitecode">
                <div className="invitecode_input">
                    <label>请输入邀请码</label>
                    <input type="text" />
                    <div className="invitecode_btn">
                        <a href='javascript:;' >提交订单</a>
                    </div>
                </div>
                <div className="invitecode_input_have u-none">
                    <label>邀请码</label>
                    <div className="invitecode_number">
                        <p>23131231231</p>
                    </div>
                </div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot:function(){},
        trigger:function(){
            this.libs.changeTitle('邀请码');    //更改当前页面标题
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
