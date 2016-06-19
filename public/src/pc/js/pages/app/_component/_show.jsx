var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');

var radio = require('modules/form/radio1')
var api = require('libs/api')


var bindEvent = function(){
    //此处各种dom 操作
    var radiodata = {
        name: ['xxx', 'xxx', 'xxx'],
        title: ['xxx', 'yyy', 'uuu'],
        value: ['1', '2', '3']
    }
    var kkk = radio(radiodata, 'forradios')

};

//演示模块
var Show = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div>
                <h2>我是演示模块</h2>
                <div id="forradios"></div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        trigger:function(){
            this.libs.changeTitle('演示模块');    //更改当前页面标题
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
