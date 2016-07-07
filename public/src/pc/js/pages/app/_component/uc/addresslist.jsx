var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var Radio = require('modules/form/radio1')(true)
var List = require('modules/list/base_list').store('address_list');

var _addresslist_li = [];

function radioClick(){
    libs.msgtips('radio click')
}

var bindEvent = function(){
    _addresslist_li.push(
        <div>
            <em>你好这是第一个地址</em>
            <p>广州市君华香柏广场</p>
            <div className="bar">
                <div className="part part-left">
                    <Radio name="default_address" value='-1' title="默认地址" itemMethod={radioClick} />
                </div>
                <div className="part part-right">
                    <span className="btn">编辑</span>
                    <span className="btn">删除</span>
                </div>
            </div>
        </div>
    )
    SA.setter('address_list',{data: _addresslist_li})
};


//演示模块
var Show = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        if(this.props.data){
            address_list_data = this.props.data
        }
        return (
            <div className="default_div app_addresslist">
                <List data={address_list_data} listClass={'address_list'}/>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot:function(){},
        trigger:function(){
            libs.changeTitle('地址列表');    //更改当前页面标题
            this.main()
        },
        ready: function(){
        },
        main: function(){
            this.render(
                <Show itemDefaultMethod={bindEvent}  data={_addresslist_li}/>,
                document.getElementById(name)
            )
        }
    })
}

module.exports = start;
