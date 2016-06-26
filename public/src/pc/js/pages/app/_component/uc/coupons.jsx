var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var _user = SA.get('USER')


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
            <div className="default_div app_coupons">
                <ul className="coupons_list">
                    <li>
                        <div className="coupons_item">
                            <div className="part part-left">
                                哇哈哈桶装水
                            </div>
                            <div className="part part-right">
                                已生效
                            </div>
                        </div>
                        <div className="part part-left">
                            共<small>10</small>桶，剩余<small>8</small>桶
                        </div>
                        <div className="part part-right">
                            购买日期: 2016-10-15
                        </div>
                    </li>
                    <li>
                        <div className="coupons_false">
                            <div className="part part-left">
                                哇哈哈桶装水
                            </div>
                            <div className="part part-right">
                                已生效
                            </div>
                        </div>
                        <div className="part part-left">
                            共<small>10</small>桶，剩余<small>8</small>桶
                        </div>
                        <div className="part part-right">
                            购买日期: 2016-10-15
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot: function(self){
        },
        trigger:function(self){
            this.libs.changeTitle('我的卡券');    //更改当前页面标题
            self.main(self, _page.data)
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
