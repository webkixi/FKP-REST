var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var FDiv = require('widgets/itemView/f_div');

var testdata = {
        body:[
            {
                k: '正常',
                v: '16项'
            },
            {
                k: '存在风险',
                v: '4项'
            }
        ]
    }

var estimate = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index carstat'}>
                <header>
                    {'我的车况'}
                </header>
                <article>
                    <div className="btn-circle">
                        <span>80</span>
                        <span>分</span>
                    </div>
                    <div className="profile">
                        <FDiv data={testdata} itemClass={'noclass'}/>
                    </div>
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>{'查看详情'}</a>
                </footer>
            </div>
        )
    }
}

var Esti = React.createClass(estimate)

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
        <Esti data={data} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
