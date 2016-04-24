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
var SiteIntroduce = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="uc-siteIntroduce flex flex-v">  {/* flex flex-v 使在iphone中更流畅*/}
                <div className="flex-1 f-oTouch">           {/* flex-1 f-oTouch 使在iphone中更流畅*/}
                    <div className="siteInfo box-shadow">
                        <div className="infoHead">
                            <img src="../images/site.png" alt=""/>
                            <div className="siteContact">
                                <span className="siteName">君华香柏广场</span>
                                <span>联系电话：123456789</span>
                                <span>营业时间：周一至周日 9:00 - 21:00</span>
                            </div>
                        </div>
                        <div className="infoFoot">
                            <label>地址：</label>
                            <p>广州市白云区白云大道北君华香柏广场大白管家（中国黄金旁）</p>
                        </div>
                    </div>
                    <div className="services box-shadow">
                        <h4>服务项目</h4>
                        <ul className="servicesList">
                            <li><i className="icon-print"></i><span>应急复印</span></li>
                            <li><i className="icon-tel"></i><span>应急电话</span></li>
                            <li><i className="icon-water"></i><span>应急饮水</span></li>
                            <li><i className="icon-rainGear"></i><span>应急雨具</span></li>
                            <li><i className="icon-wifi"></i><span>应急上网</span></li>
                            <li><i className="icon-nav"></i><span>寻路指路</span></li>
                            <li><i className="icon-express"></i><span>快递收发</span></li>
                            <li><i className="icon-charge"></i><span>应急充电</span></li>
                            <li><i className="icon-runner"></i><span>跑腿服务</span></li>
                            <li><i className="icon-send"></i><span>包裹寄送</span></li>
                        </ul>
                    </div>
                    <div className="introduce box-shadow">
                        <p>大白管家由广州领壹科技有限公司倾力打造，致力于提升社区用户生活品质，
                            为社区用户提供贴心便捷的管家服务。包括包裹免费寄存、送件到家、快递代发、
                            预约配送桶装水等服务。倾力为您打造全方位无忧的管家服务，从此生活少一点烦恼，多一份轻松。<br/>
                            您的私人贴心助手，生活琐事通通交给大白，还在等什么？马上体验大白管家吧！</p>
                        <img src="../images/site1.png" alt=""/>
                    </div>
                    <div className="manager">
                        <div className="managerBox">
                            <img src="../images/manager1.png" alt=""/>
                            <span className="managerName">小红</span>
                            <div className="starBox">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                            <span className="score">
                                4.9分
                            </span>
                        </div>
                        <div className="managerBox">
                            <img src="../images/manager1.png" alt=""/>
                            <span className="managerName">小红</span>
                            <div className="starBox">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                            <span className="score">
                                4.9分
                            </span>
                        </div>
                        <div className="managerBox">
                            <img src="../images/manager1.png" alt=""/>
                            <span className="managerName">小红</span>
                            <div className="starBox">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                            <span className="score">
                                4.9分
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        trigger:function(){
            this.libs.changeTitle('网点介绍');    //更改当前页面标题
        },
        ready: function(){
            libs.changeTitle('网点介绍');
        },
        main: function(){
            this.render(
                <SiteIntroduce itemDefaultMethod={bindEvent} />,
                document.getElementById(name)
            )
        }
    })
}

module.exports = start;
