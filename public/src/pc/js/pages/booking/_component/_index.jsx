var libs = require('libs/libs');
var ItemMixin = require('mixins/item')

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index'}>
                <header>
                    {'爱车估价'}
                </header>
                <article>
                    <div id="province"></div>
                    <div id="city"></div>
                    <div id="brand"></div>
                    <div id="model"></div>
                    <div id="license"></div>
                    <div id="mileage"></div>
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>{'立即评估'}</a>
                </footer>
            </div>
        )
    }
}

var bindIndex = function(){
    var Select = require('modules/form/select');

    //省份
    new Select({label:'省份'}, 'province',function(){
        $(this).click(function(){
            // $(this).find('.dot').toggle()
            SA.setter('Pop',{data:{body:'明天就会下雨',display:'block'}})
        })
    });

    //城市
    new Select({label:'城市'}, 'city',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    //品牌
    new Select({label:'品牌车系'}, 'brand',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    //型号
    new Select({label:'型号'}, 'model',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    //上牌
    new Select({label:'首次上牌'}, 'license',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });

    //里程
    new Select({label:'行驶里程'}, 'mileage',function(){
        // $(this).click(function(){
        //     $(this).find('.dot').toggle()
        // })
    });
}

var Index = React.createClass(index)

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
        <Index data={data} itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
