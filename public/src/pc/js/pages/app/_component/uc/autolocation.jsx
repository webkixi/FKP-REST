var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
// var getLocation = require('modules/weixin/getLocation');

var api = libs.api;
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
            <div className="autolocation">
                <h3>定位成功，选择您的小区</h3>
                <ul className="default_Picture">
                    <li>
                        <label>小区1</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li>
                        <label>小区2</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li>
                        <label>小区3</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li>
                        <label>小区4</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li>
                        <label>小区5</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li>
                        <label>小区6</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                    <li>
                        <label>小区7</label>
                        <i className="iconfont icon-xiangyou"></i>
                    </li>
                </ul>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot:function(){},
        trigger:function(){
            this.libs.changeTitle('自动定位');    //更改当前页面标题
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
