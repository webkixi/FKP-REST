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
            <div className="default_div app_faq">
                <ul className="faq_list">
                    <li>
                        <em>Q: 你吃饭了吗？</em>
                        <p>A: 没吃，就等你请饭了，已经饿了2天2夜了，对，你没有看错，就是饿了3天3夜了</p>
                    </li>
                    <li>
                        <em>何人132544557411</em>
                        <p>广东广州大道北19232号c座24栋</p>
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
            this.libs.changeTitle('常见问题');    //更改当前页面标题
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
