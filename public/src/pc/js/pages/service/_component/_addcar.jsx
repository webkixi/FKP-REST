var libs = require('libs/libs');
var Pt = require('widgets/itemView/f_li');
var ItemMixin = require('mixins/item');
var List = require('widgets/listView/list');
var api = require('pages/_common/api');
var pop = require('modules/pop/index');
var esti2 = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index addcar'}>
                <header>
                    {'添加车辆'}
                </header>
                <article>
                    <div id="brand"></div>
                    <div id="series"></div>
                    <div id="model"></div>
                    <div id="license"></div>
                    <div id="number"></div>
                    <div id="vin"></div>
                    <div id="engin"></div>
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>添加车辆</a>
                </footer>
            </div>
        )
    }
}
var _addcar =[];
function dealWith_Data_Brand(){

    var nav = [];
    var resaults = []
    var rtnDom;

    api.req('queryallbrand',{}, function(data){
        if(data.code && data.code===1){
            _addcar = [];
            data.results.map(function(item, i){
                _addcar.push(
                  {
                      body: item,
                      footer: data[item]
                  }
                )
            })
            console.log(_addcar);
            rtnDom = <List data={_addcar} listClass={'car_linkage'} itemClass={'wid-12'} itemView={Pt}/>
        }
    })

    // [
    //   {
    //     body: 'A',
    //     footer: {
    //       attr: 'select'
    //       k: '',
    //       v: 'jfkdlf'
    //     }
    //   }
    // ]
    //
    // nav = Object.keys(data);
    // if(nav.length){
    //     nav.map(function(item, i){
    //         resaults.push(
    //             {
    //                 body: item,
    //                 footer: {data[item]}
    //             }
    //         )
    //     })
    //     rtnDom = <List data={resaults} listClass={'car_linkage'} itemClass={'wid-12'} itemView={Pt}/>
    // }
    return rtnDom;
}
var bindEsti = function(){
    var Select = require('modules/form/select');
    var Text = require('modules/form/text');


    //品牌
    new Select({label:'品牌'}, 'brand',function(){
        $(this).click(function(){
            var brand_dom = dealWith_Data_Brand();
            console.log(brand_dom);
            if(brand_dom)
                SA.setter('Pop',{data:{body:brand_dom, display:'block'}})
        })
    });

    //车系
    new Select({label:'车系'}, 'series',function(){
        // $(this).find('.dot').toggle()
        $(this).click(function(){
            SA.setter('Pop',{data:{body:'明天就不下雨',display:'block'}})
        })
    });

    //型号
    new Select({label:'型号'}, 'model',function(){

    });

    //上牌时间
    new Select({label:'上牌时间'}, 'license',function(){

    });

    //车牌号
    new Text({label:'车牌号'}, 'number',function(){

    });

    //VIN
    // new Text({
    //     label:'VIN',
    //     append: <div className='camera'></div>
    // },
    // 'vin',
    // function(){
    //
    // });
    new Text({label:'VIN'},'vim',function(){

        });

    //发动机号
    // new Text({
    //     label:'发动机号',
    //     append: <div className='camera'></div>
    // }, 'engin',function(){
    //
    // });
    new Text({label:'发动机号'},'engine',function(){

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
