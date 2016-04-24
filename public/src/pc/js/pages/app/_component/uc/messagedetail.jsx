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

};

//演示模块
var MessageDetails = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="uc-message">
                <div className="uc-message-details">
                    <div className="uc-message-img"><img src="../images/list/1.jpg"/></div>
                    <h1 className="uc-message-title">我是标题</h1>
                    <p className="uc-message-time">2015-05-05 20:30</p>
                    <div className="uc-message-article">
                        山东济南非法经营疫苗系列案件发生后，国务院批准组成部门联合调查组，并成立国务院工作督查组，深入开展实地调查，推进全国协查联办，加大案件查办督促指导力度，组织对查扣疫苗开展安全性有效性评估。目前第一阶段调查处理工作基本完成。初步查明，此次疫苗系列案件涉及面广，性质恶劣，是严重违法犯罪行为，也暴露出疫苗质量监管和使用管理不到位、对非法经营行为发现和查处不及时、一些干部不作为、监管和风险应对机制不完善等突出问题，教训深刻。会议要求抓紧完成对涉案疫苗接种人群的风险评估，及时向社会公开评估结果，妥善做好后续处置，并加快完善食品药品监管体制和疫苗管理长效机制，强化事中事后监管，对危害群众生命健康的违法违规行为绝不姑息。目前各地已立案刑事案件192起，刑事拘留202人。
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
            this.libs.changeTitle('消息中心-消息详情');    //更改当前页面标题
            this.main()
        },
        ready: function(){
        },
        main: function(){
            this.render(
                <MessageDetails itemDefaultMethod={bindEvent} />,
                document.getElementById(name)
            )
        }
    })
}

module.exports = start;
