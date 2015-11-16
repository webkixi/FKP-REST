var libs = require('libs/libs');
var Pt = require('widgets/itemView/f_li');
var ItemMixin = require('mixins/item');
var List = require('widgets/listView/list');
var api = require('libs/api');
var pop = require('modules/pop/index');
var store = require('mixins/store');
var router = require('libs/router').router
var _addcar =[];
var pn;
var vs;

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
                    <a id="now" className={'btn-link'}>保存车辆</a>
                </footer>
            </div>
        )
    }
}

//品牌
function dealWith_Data_Brand(){
    var nav = [];
    var resaults = []
    var rtnDom;

    api.req('queryallbrand',{}, function(data){
      console.log(data);
        if(data.code && data.code===1){
        //   console.log(data);
            var tmp = {};
            data.results.map(function(item, i){
              var key = item.carfirstname;
              if(!tmp[key])
                tmp[key]=[];

              tmp[key].push(
                [item.carbrand, item.carimage]
              )
            })
            nav = Object.keys(tmp);
            if(nav.length){
                nav.map(function(item, i){
                   var tmp_foot = [];
                   tmp[item].map(function(unit, j){
                     tmp_foot.push({
                       attr: 'select',
                       k: <span><span><img src={'/images/logo/'+unit[1]} className={'img'}/></span>{unit[0]}</span>,
                       v: unit[0]
                     })
                   })
                    resaults.push(
                        {
                            body: item,
                            footer: tmp_foot
                        }
                    )
                })
            rtnDom = <List data={resaults}  listClass={'car_linkage'} itemClass={'wid-12'} itemView={Pt}/>
            SA.setter('Pop',{data:{body:rtnDom, display:'block'}})
        }
      }
    })
    return rtnDom;
}
//车系
function dealWith_Data_Series(){
    var results = []
    var rtnDom;
    var nav = [];
    // _car.model.empty();
    pn = { carbrand: $("#brand").find("input").val()}
    api.req('queryseries',pn, function(data){
      if(data.code && data.code===1){
        var tmp = [];
        data.results.map(function(item,i){
            var key = item.carseries;
            if(!tmp[key])
              tmp[key]=[];
        })
        nav = Object.keys(tmp);
        if(nav.length){
            nav.map(function(item, i){
                results.push(
                    {
                        footer: {
                          attr: 'select',
                          k: item,
                          v: item
                        }
                    }
                )
            })
            rtnDom = <List data={results}  listClass={'car_linkage car_linkage2'} itemClass={'wid-12'} itemView={Pt}/>
            SA.setter('Pop',{data:{body:rtnDom, display:'block'}})
        }
      }
    })
    return rtnDom;
}
//型号
function dealWith_Data_Type(){
    var results = []
    var rtnDom;
    var nav = [];
    cs = { carTypes: $("#series").find("input").val()}
    api.req('querycartype',cs, function(data){
      if(data.code && data.code===1){
        data.results.map(function(item,i){

            results.push({
                footer:{
                    attr: 'select',
                    k: item.cartype,
                    v: item.carid
                }
            })
        })
        rtnDom = <List data={results}  listClass={'car_linkage car_linkage2'} itemClass={'wid-12'} itemView={Pt}/>
        SA.setter('Pop',{data:{body:rtnDom, display:'block'}})
      }
    })
    return rtnDom;
}

var _car = {};
var bindEsti = function(){
    router.clear()
    var Select = require('modules/form/select');
    var Text = require('modules/form/text');

    //品牌
    var sss = <em style={{color:'red',marginRight:'0.3rem'}}>*</em>;
    _car.brand = new Select({label:'品牌', popclose: true, star: sss}, 'brand',function(){
        $(this).click(function(){
          dealWith_Data_Brand();
        })
    });
    _car.brand.selected = function(txt,val){
        if(this.text !== txt){
            _car.model.empty();
            _car.series.empty();
        }
    }

    //车系
    _car.series = new Select({label:'车系', popclose: true, star: sss}, 'series',function(){
        $(this).click(function(){
          if($("#brand").find("input").val())
            dealWith_Data_Series();
          else
            SA.setter('Pop',{data:{body:'请先选择品牌', display:'block'}})
        })
    });
    _car.series.selected = function(txt,val){
        if(this.text !== txt){
            _car.model.empty();
        }
    }

    //型号
    _car.model = new Select({label:'车型', popclose: true, star: sss}, 'model',function(){
        $(this).click(function(){
          if($("#series").find("input").val())
            dealWith_Data_Type();
          else
            SA.setter('Pop',{data:{body:'请先选择车系', display:'block'}})
        })
    });

    //上牌时间
    _car.reg = new Text({label:'上牌时间'}, 'license',function(){

    });

    //车牌号
    _car.number = new Text({label:'车牌号'}, 'number',function(){

    });

    //VIN
    _car.vin = new Text({label:'VIN'},'vin',function(){

    });

    //发动机号
    _car.engin = new Text({label:'发动机号'},'engin',function(){

    });

    $('#now').click(function(){
        checkValue()
    })
}
var uuu = [];
var allSelect;

function checkValue(ele){
    var xxx = [];
    $("article .select").find("input").each(function(i,item){
        if(item.value&&item.value!==''){
          xxx.push(
            item.value
          )
        }
    })
    if(xxx.length===3){
      $('article div').each(function(){
          if(this.id){
            uuu.push({
                body: {
                  k: $(this).find('input').val(),
                  v: $(this).find('input').attr('name')
                }
            })
          }
      });

      //form 提交数据
      uuu.form = {
          carid : _car.model.value,
          carbrand: _car.brand.value,
          carseries: _car.series.value,
          cartype: _car.model.text,
          carengno: _car.engin.value||'',
          plateno: _car.number.value||'',
          carvin: _car.vin.value||'',
          regtime: _car.reg.value||'',
          carrunkm: 50000,
          usercarremark: "just test ,don't call me",
          mobile: "18002278121"
      }

    //   SA.setter('_GLOBAL',{index: uuu})
      var fff = libs.extend(uuu.form)
      console.log(fff);
      api.req('useraddcar',{type: 'insert', data:fff},function(data){
        console.log(data)
        router('/uc.html#mycar')
      })
    }
    else {
      SA.setter('Pop',{data:{body:'品牌、车系、车型为必选项目，请选择！', display:'block'}})
    }
}
var Esti = React.createClass(esti2)
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

// console.log(addCarData);
    React.render(
        <Esti itemDefaultMethod={bindEsti} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
