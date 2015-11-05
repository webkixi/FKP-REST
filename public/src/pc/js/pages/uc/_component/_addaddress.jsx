var libs = require('libs/libs');
var Pt = require('widgets/itemView/pic_title');
var ItemMixin = require('mixins/item')
var List = require('widgets/listView/list')
var api = require('libs/api');
var store = require('mixins/store');
var router = require('libs/router').router
console.log(api);
var _form = {};


var index = {
    mixins: [ItemMixin],
    render: function () {
        return(
            <div className={'index addaddress'}>
                <header>
                    {'添加地址'}
                </header>
                <article>
                    <div className="layout">
                        <label>地址</label>
                        <div className="box">
                            <div id="city"></div>
                            <div id="district"></div>
                        </div>
                    </div>
                    <div id="address"></div>
                    <div id="name"></div>
                    <div id="phone"></div>
                </article>
                <footer>
                    <a id="now" className={'btn-link'}>{'保存新地址'}</a>
                </footer>
            </div>
        )
    }
}
var bindIndex = function(){
    var Select = require('modules/form/select');
    var Text = require('modules/form/text');
    var u = {};

    //联系人
    u.name = new Text({label:'联系人',valide: 'username'}, 'name',function(){
        $(this).click(function(){

        })
    });

    //电话
    u.phone = new Text({label:'手机号', valide: 'mobile'}, 'phone',function(){
        $(this).click(function(){

        })
    });

    // //城市
    u.city = new Select({}, 'city',function(){
        // api.req('region', {parent_id: 430000}, function(data){
        var parents = [];
        api.req('region', function(data){
            if(data && data.code===1){
                if(data.results.length){
                    data.results.map(function(item, i){
                        parents.push({
                            body:[
                                {
                                    attr: 'select',
                                    k: item.address_name,
                                    v: item.region_id
                                }
                            ]
                        })
                    })
                }
            }
        })
        $(this).click(function(){
            var xx = <List data={parents} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
            SA.setter('Pop',{data:{body:xx,display:'block'}} )
        })
    });
    //
    // 地区
    u.district = new Select({}, 'district',function(){
        districts = [];
        $(this).click(function(){
            var kkk = $('#city').find('input').val();
            api.req('region',{parent_id: kkk}, function(data){
                if(data && data.code===1){
                    if(data.results.length){
                        data.results.map(function(item, i){
                            districts.push({
                                body:[
                                    {
                                        attr: 'select',
                                        k: item.address_name,
                                        v: item.region_id
                                    }
                                ]
                            })
                        })
                    }
                    var yy = <List data={districts} listClass={'xxx'} itemClass={'wid-12'} itemView={Pt}/>
                    SA.setter('Pop',{data:{body:yy,display:'block'}} )
                }
            })
        })
    });

    //详细地址
    u.address = new Text({label: '详细地址', valide: 'username'}, 'address',function(){
        $(this).click(function(){

        })
    });

    $('#now').click(function(){
        var stat = checkValue(u);
        console.log(stat);
        if(stat){
            _form.mobile = u.phone.value;
            _form.province = "广东"
            _form.city = u.city.text
            _form.county = u.district.text
            _form.street = u.address.value
            _form.username = u.name.value

            var fff = libs.extend(_form);
            // console.log(fff);
            api.req('order_addaddr',{type: 'insert', data:fff}, function(data){
                console.log(data)
                router('/uc.html#myaddress')
            })
        }
    })
}

function checkValue(ele){
    var items = Object.keys(ele);
    items.map(function(item, i){
        if(!ele[item].stat){
            $(ele[item].ipt).addClass('error')
            return false;
        }
    })
    return true;
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
        <Index data={data} itemDefaultMethod={bindIndex} itemMethod={cb}/>,
        element
    )
}

module.exports = renderDom;
