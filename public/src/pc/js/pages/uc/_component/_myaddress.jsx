var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var FDiv = require('widgets/itemView/f_div');



var json = require('./_myaddress.json');
var myaddress = {
    body:[
        json.username,
        json.phone
    ],
    footer: [],
    dot: [
        <a className="ifont icon-next" style={{right: "0.4rem", top: "0.7rem"}}></a>,
    ]
}

json.address.map(function(item, i){
    myaddress.footer.push(
        {
            k: item,
            v: <a className="ifont icon-deletefill"></a>
        }
    )
})




var index = {
    mixins: [ItemMixin],
    render: function () {
        var fdiv;
        if(json.address.length)
            fdiv = <FDiv data={myaddress} itemClass={'noclass'}/>
        return(
            <div className={'index myaddress'}>
                <header>
                    {'我的地址'}
                </header>
                <article id="content">
                    <div className="like_app_list">
                        {fdiv}
                    </div>
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>{'添加新地址'}</a>
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
