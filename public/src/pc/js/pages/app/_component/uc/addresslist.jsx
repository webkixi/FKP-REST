var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var api = require('libs/api');
var valide = libs.formValide;
var Radio = require('modules/form/radio1')(true)
var List = require('modules/list/load_list')(true, 'address_list');


//当前页公共变量
var _page = {}

var _addresslist_li = [];

function radioClick(){
    $(this).click(function(){
        router('waterSend', {back: "addresslist"})
    })
}

var bindEvent = function(){
    var addresslist_post = {
        login: '9bfb66cc96a242efaa6014f03b15d5aa',
        method: 'get'
    }
    api.req('userAddressList', addresslist_post, function(data){
        if(data){
            data.map(function(item, i){
                _addresslist_li.push(
                    <div>
                        <em>{item.contact}</em>
                        <p>{item.fullAddress}</p>
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
            })
            SA.setter('address_list',{data: _addresslist_li})
        }
    })
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
            this.libs.changeTitle('地址列表');    //更改当前页面标题
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
