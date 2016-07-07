var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var api = require('libs/api');


var bindEvent = function(){
    //此处各种dom 操作

};

//演示模块
var Message = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="uc-message">
                <ul className="uc-message-list">
                    <li className="active">
                        <a>
                            <div>软件更新通知</div>
                            <div>2分钟前</div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div>恭喜白云区开设第二家网点</div>
                            <div>1天前</div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div>购买怡宝水满12瓶送1瓶活动截购买怡宝水满12瓶送1瓶活动截</div>
                            <div>2天前</div>
                        </a>
                    </li>
                </ul>
                <div className="uc-message-empty">
                    <div>暂无消息通知记录</div>
                </div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot:function(){},
        trigger:function(){
            libs.changeTitle('消息中心');    //更改当前页面标题
            this.main()
        },
        ready: function(){
        },
        main: function(){
            this.render(
                <Message itemDefaultMethod={bindEvent} />,
                document.getElementById(name)
            )
        }
    })
}

module.exports = start;
