var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
// var FDiv = require('widgets/itemView/f_div');
// var form = require('modules/form/formall')
//
//
// var Select = form.select;
// var Text = form.text;
// var Textarea = form.textarea;




var index = {
    mixins: [ItemMixin],
    chkClick: function(){
        var chkspan = React.findDOMNode(this.refs.chkspan);
        $(chkspan).toggleClass('active');

        var chkb = React.findDOMNode(this.refs.chkb);
        if($(chkspan).hasClass('active'))
            chkb.value="1"
        else {
            chkb.value="0"
        }
    },
    render: function () {
        return(
            <div className={'index addaddress'}>
                <header>
                    {'添加地址'}
                </header>
                <article>
                    <div id="zone">
                        <div id="city"></div>
                        <div id="district"></div>
                    </div>
                    <div id="address"></div>
                    <div id="contact"></div>
                    <div id="phone"></div>
                    <div className="ihaved">
                        <input value="0" ref="chkb" className="chk_1" type="checkbox"/>
                        <span ref="chkspan" className="chk_span" onClick={this.chkClick}></span>
                        <span>{"已有配件只需上门服务"}</span>
                    </div>
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>{'添加新地址'}</a>
                </footer>
            </div>
        )
    }
}

var bindEsti = function(){
    var Select = require('modules/form/select');
    var Text = require('modules/form/text');
    var Textarea = require('modules/form/textarea');

    //电话
    new Text({label:'手机号码'}, 'phone',function(){
        $(this).click(function(){

        })
    });

    //联系人
    new Text({label:'联系人'}, 'contact',function(){
        $(this).click(function(){

        })
    });

    //城市
    new Select({label:'所在地区'}, 'city',function(){
        $(this).click(function(){
            SA.setter('Pop',{data:{body:'明天就不下雨',display:'block'}})
        })
    });

    //地区
    new Select({}, 'district',function(){

    });

    //备注
    new Textarea({label:'详细地址'}, 'address',function(){

    });
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
        <Index data={data} itemDefaultMethod={bindEsti} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
