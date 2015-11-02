var libs = require('libs/libs');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var api = require('libs/api');
var router = require('libs/router').router

var _wx_userinfo = SA.getter('_WEIXIN').data.user;

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index mycar'}>
                <header>
                    {'请输入手机号码'}
                </header>
                <article id="content">
                  <div className={'service_myorder regist_login'}>
                      <div id="phone"></div>
                      <div className="layout">
                          <label></label>
                          <div className="box">
                              <div id="code"></div>
                              <div id="verify_btn">获取验证码</div>
                          </div>
                      </div>
                      <a id="now" className={'btn-link'}>{'确定'}</a>
                  </div>
                </article>
            </div>
        )
    }
}
var _form = {};
var bindIndex = function(){
    var Number = require('modules/form/number');
    var u = {};

    //电话
    u.phone = new Number({label:'手机号码', valide: 'mobile'}, 'phone',function(){
        $(this).click(function(){

        })
    });
    //验证码
    u.verify = new Number({label:'短信验证码',valide: 'verify_m'}, 'code',function(){
        $(this).click(function(){

        })
    });

    var btn_stat = 0;
    $('#verify_btn').click(function(){
            var btn = this;
            if(u.phone.stat){
                if(btn_stat===0){
                    btn_stat = 1;
                    api.req('getmms', {mobile: u.phone.value}, function(data){
                        if(data.code===1){
                            SA.setter('Pop',{data:{body:'请输入短信验证码',display:'block'}} );
                            libs.countDown(btn, 61, function(){
                                btn_stat = 0;
                                $(btn).html('重新发送')
                            })
                        }
                    })
                }
            }else{
                SA.setter('Pop',{data:{body:'请输入手机号码',display:'block'}} );
            }
    })
    $('#now').click(function(){
      var stat = checkValue(u);
      console.log(stat);
      if(stat){
        _form.mobile = u.phone.value;
        _form.code = u.verify.value;
        _form.userinfo = _wx_userinfo;
        var fff = libs.extend(_form);
        console.log(fff);
        api.req('mobilecode',{type: 'insert', data:fff},function(data){
          SA.setter('_LOCAL_USER', {mobile: data.results[0].mobile});
          router.goback()
        })
      }
    })
}
function checkValue(ele){
    var items = Object.keys(ele);
    items.map(function(item, i){
        if(!ele[item].stat){
            $(ele[item].ipt).addClass('error')
            return false;
        }
    })
    return true;
}

var Index = React.createClass(index);
function renderDom(ele, data, cb){
    var element;
    if(typeof ele==='string')
        element = document.getElementById(ele)
    else
        if(typeof ele === 'object')
            if(ele.nodeType)
                element = ele
    else
        return;

    React.render(
        <Index data={data} itemMethod={cb} itemDefaultMethod={bindIndex}/>,
        element
    )
}

module.exports = renderDom;
