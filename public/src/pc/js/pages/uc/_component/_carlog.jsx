var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var FDiv = require('widgets/itemView/f_div');

var testdata = {
        body:[
            {
                attr: "0",
                k: '2015/11/28',
                v: '亲，马上就要做80000公里大保养啦'
            },
            {
                attr: "1",
                k: '2015/10/28',
                v: '75000公里做了次小保养'
            },
            {
                attr: "2",
                k: '2015/10/28',
                v: '65000公里做了次小保养'
            },
            {
                attr: "3",
                k: '2015/10/28',
                v: '60000公里做了次小保养'
            },
            {
                attr: "4",
                k: '2015/10/28',
                v: '55000公里做了次小保养'
            },
            {
                attr: "5",
                k: '2015/10/28',
                v: '50000公里做了次小保养'
            },
            {
                attr: "6",
                k: '2015/10/28',
                v: '45000公里做了次小保养'
            }
        ]
    }

var estimate = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index carlog'}>
                <header>
                    {'我的保养'}
                </header>
                <article>
                    <div className="profile">
                        <div className="center-line"></div>
                        <FDiv data={testdata} itemClass={'noclass'}/>
                    </div>
                </article>
            </div>
        )
    }
}

var Esti = React.createClass(estimate)

function defaultMethod(){
    router.clear()
    $('.profile .hbody p').each(function(i, item){
        if(i%2===0){
            $(item).css({
                position: "absolute",
                left: "0",
                top: i*2+"rem"
            })
            $(item).addClass('left')
            if(i===0){
                $(item).addClass('left-first')
            }
        }else{
            $(item).css({
                position: "absolute",
                right: "0",
                top: i*2+"rem"
            })
            $(item).addClass('right')
            if(i===1){
                $(item).addClass('right-first')
            }
        }
    })
}

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
        <Esti data={data} itemDefaultMethod={defaultMethod} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
