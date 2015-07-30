libs = require('libs/libs');
var api = require('../../_common/api');


// attr react compont
var Tabswitch = require('modules/tabs/tabswitch');
var Cnt = require('./_component/cnt');
var SelectBar = require('./_component/select_bar');
var rend = React.render;

//request数据并回掉渲染
api.req('mall_attr',{},rd);

//attr 回掉函数
function rd(body){
	if(body.success){
		var nav_data = body.data.spCatList;
		var list_data = body.data.attributes;
		nav_data.unshift({id: 'all', catName: '全部'});

		var tmp = {};

		//按数字排序
		var sortAry = function(a,b){
			aaa = a.substring(0,2);
			bbb = b.substring(0,2);
			return aaa-bbb;
		}
		var kkk = Object.keys(list_data).sort(sortAry);

		//重新生成对象
		kkk.map(function(item,i){
			var id = item.substring(0,2);
			var str = item.substring(3);
			if(i%4===0)
				tmp[id] = {}
			tmp[id][str] = list_data[item];
		})

		//新对象数组，用于取出新对象的数据
		var cnt_tabs = {};
		for(unit in tmp){
			var items = []
			var i = 0;
			for(u in tmp[unit]){
				var ele = tmp[unit][u];
				if(libs.getObjType(ele[0])==='Object'){
					ele.unshift({id: 'unlimit',catName: '不限'});
					ele.unshift({id: 'pinming',catName: '品名'})
				}else{
					ele.unshift('不限');
					if(i===1){
						ele.unshift('规格');
					}
					if(i===2)
						ele.unshift('质量标准')
					if(i===3)
						ele.unshift('厂家')
				}
				items.push(ele);
				i++;
			}
			cnt_tabs[unit] = items;
		}
		var keys = Object.keys(cnt_tabs);


		var ddd = cnt_tabs[keys[0]];
		//每一个tab响应事件
		var itemClick = function(){
		    $(this).click(function(){
				var id = this.getAttribute('data-val');
				var ddd = cnt_tabs[id];
	                $('.tabswitch li').removeClass('active');
	                $(this).parent().addClass('tiger-active');
	                $(this).toggleClass('active');
	                $(this).siblings().removeClass('active');
	                SA.setter( 'Cnt',{ data: ddd } );
					SA.setter( 'SelectBar',{ data: [] } );
		    })
		}

		//cnt内每一个元素点击
		var attrClick = function(){

		    $(this).click(function(){
				var text = $(this).text();
				var catParam = $(this).attr('data-param')
				var catValue = $(this).attr('data-val')
				dealWithSelectBarData( {
					item: text,
					param: {
						name: catParam,
						value: catValue||text
					}
				} );
		        $(this).toggleClass('active');
		        $(this).siblings().removeClass('active');
		    })
		}

		var seleClick = function(){
			$(this).delegate( 'a', 'click', function(){
				var text = $(this).text();
				dealWithSelectBarData( text, 'delete')
				dealWithSelectBarData( {item: text, type: 'delete'})
			} )
		}

		var dealWithSelectBarData = function( opts ){
			var options = {
				item: '',
				type: 'other',
				param: {name: '', value: ''}
			}
			options = $.extend({}, options, opts);
			item = options.item;
			type = options.type;
			param = options.param;

			var filter = SA.getter('SelectBar').data;

			if( type === 'other'){
				exbQuery[param.name] = param.value;
			}
			if( type === 'delete' ){

			}

			if( filter && filter.data ){
				if( type === 'delete' )
					libs.lodash.remove( filter.data, function( n ){ return ( n === item ) })
				else
					filter.data.push( item );

				SA.setter( 'SelectBar',filter );
			}else
				SA.setter( 'SelectBar',{ data: [item] } );
		}

		rend(
			<Tabswitch data={nav_data} listClass={'tiger'} itemStyle={{width:'150px'}} itemMethod={itemClick}>
				<Cnt data={ddd} listClass={'fox'} itemStyle={{width:'auto'}} itemMethod={attrClick}/>
				<SelectBar itemMethod={seleClick}/>
			</Tabswitch>
			,document.getElementById('tab-test')
		)
	}
}



/*
* 数据查询参数
* {pageCurrent} {num} 当前页
* {orderField} {string} 排序字段
* {orderDirection} {string} 排序方向
* {pageSize} {num} 每页数量
*/
var Exhibition = require('./_component/exhibition');

var exbQuery = {
	pageCurrent: 1 ,
	orderField: '' ,
	orderDirection: '' ,
	pageSize: 25
}
// Long catId, Long catId2, String vender, String model, String quality
//api 调用
api.req( 'mall_exhibition', exbQuery, exb_cb );

//mall_exhibition回掉函数
function exb_cb( body ){
	if ( body.success ) {
		rend(
			<Exhibition data={body.pagination.recordList} listClass={'tiger'} itemStyle={{width:'240px'}} />
			,document.getElementById('exhibition')
		)
	}
}
