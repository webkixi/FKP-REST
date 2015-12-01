/**
*
* 优惠买单-支付成功
*
*/

var libs = require('libs/libs');
var Pt = require('widgets/itemView/f_li');
var ItemMixin = require('mixins/item');
var List = require('widgets/listView/list');
var api = libs.api
// var pop = require('modules/pop/index');
// var store = require('mixins/store');
 var router = require('libs/router').router


var createDom = {
    mixins: [ItemMixin],
    render:function(){
        router.clear();
        return (
          <div className={'index pay-ok-box'}>
                <header>
                    支付成功
                </header>
                <article className={'pay-ok'}>
                   <div className={'ifont icon-roundcheckfill pay-ok-icon'}></div>
                   <p>支付成功</p>
                   <a>查看订单详情</a>
                </article>
            </div>
        )
    }
};

var PayOk = React.createClass(createDom);


function bindEvent(){


    $('#now_addcar').click(function(){
    		if($(this).hasClass('unSubmit'))return;
    		checkValue();
    });

}




function renderDom(ele, cb){
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
        <PayOk itemDefaultMethod={bindEvent} itemMethod={cb} />,
        element
    )
}

module.exports = renderDom;
