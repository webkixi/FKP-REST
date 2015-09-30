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
        <Index data={data} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
