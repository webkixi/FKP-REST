var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');

var bindEvent = function(){
    //此处各种dom 操作

};

//演示模块
var Show = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="logBox box-shadow app_coupondetail">
                <h3>使用明细</h3>
                <ul className="logList">
                    <li>
                        <i></i>
                        <p>购买桶水，订单号（28393939）</p>
                        <span>2016-03-15 07:15:15</span>
                        <em className="logList_num">-1</em>
                    </li>
                    <li>
                        <i></i>
                        <p>购买桶水，订单号（28393939）</p>
                        <span>2016-03-15 07:15:15</span>
                        <em className="logList_num">-1</em>
                    </li>
                    <li>
                        <i></i>
                        <p>成功购买该水卡</p>
                        <span>2016-03-15 07:15:15</span>
                        <em className="logList_num">180.00元</em>
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
            libs.changeTitle('卡券详情');    //更改当前页面标题
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
