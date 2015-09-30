var libs = require('libs/libs');
var ItemMixin = require('mixins/item')

var esti2 = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index'}>
                <header>
                    {'爱车在线估价'}
                </header>
                <article>
                    <div id="phone"></div>
                    <div id="province"></div>
                    <div id="city"></div>
                    <div id="district"></div>
                    <div id="remark"></div>
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>提交</a>
                </footer>
            </div>
        )
    }
}

var bindEsti = function(){
    var Select = require('modules/form/select');
    var Text = require('modules/form/text');

    //电话
    new Text({label:'手机号码'}, 'phone',function(){
        $(this).click(function(){

        })
    });

    //省份
    new Select({label:'省份'}, 'province',function(){
        // $(this).find('.dot').toggle()
        $(this).click(function(){
            SA.setter('Pop',{data:{body:'明天就不下雨',display:'block'}})
        })
    });

    //城市
    new Select({label:'城市'}, 'city',function(){

    });

    //地区
    new Select({label:'地区'}, 'district',function(){

    });

    //备注
    new Select({label:'备注'}, 'remark',function(){

    });
}

var Esti = React.createClass(esti2)

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
        <Esti data={data} itemDefaultMethod={bindEsti} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
