var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var Pt = require('widgets/itemView/pic_title');
var List = require('widgets/listView/list')



var mycars = require('./_mycar.json');
mycars[0].dot = [ <div><a className="ifont icon-next"></a><a className="ifont icon-deletefill"></a></div> ];

var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index mycar'}>
                <header>
                    {'我的车'}
                </header>
                <article id="content">
                    <List data={mycars} listClass={'like_app_list'} itemClass={'wid-12'} itemView={Pt}/>,
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>{'添加车辆'}</a>
                </footer>
            </div>
        )
    }
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
        <Index data={data} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
