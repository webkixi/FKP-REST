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

		// cnt_tabs.all=[];
		// (function(){
		// 	var tmp = [];
		// 	keys.map(function(item, i){
		// 		cnt_tabs[item].map(function(it, j){
		// 			if(!tmp[j]){
		// 				tmp[j]=[];
		// 			}
		// 			tmp[j] = tmp[j].concat(it);
		// 		})
		// 	})
		// 	cnt_tabs.all = tmp;
		// })()

		//新对象数组，用于取出新对象的数据
		var cnt_tabs = {};
		var all = [];
		for(unit in tmp){
			var items = []
			var i = 0;
			for(u in tmp[unit]){
				if(!all[i])
					all[i]=[];
				var ele = tmp[unit][u];
				all[i] = all[i].concat(libs.clone(ele))
				if(libs.getObjType(ele[0])==='Object'){
					ele.unshift({id: 'unlimit', attr: 'second', catName: '不限'});
					ele.unshift({id: 'pinming',attr: 'first', catName: '品名'})
					if(all[i][1].attr!=='second'){
						all[i].unshift({id: 'unlimit', attr: 'second', catName: '不限'});
						all[i].unshift({id: 'pinming',attr: 'first', catName: '品名'})
					}
				}else{
					ele.unshift({id: 'unlimit', attr: 'second', catName: '不限'});
					if(all[i][1].attr!=='second'){
						all[i].unshift({id: 'unlimit', attr: 'second', catName: '不限'});
					}
					if(i===1){
						ele.unshift({id: 'guige',attr: 'first', catName: '规格'})
						if(all[i][1].attr!=='second'){
							all[i].unshift({id: 'guige',attr: 'first', catName: '规格'})
						}
					}
					if(i===2){
						ele.unshift({id: 'zhiliang',attr: 'first', catName: '质量标准'})
						if(all[i][1].attr!=='second'){
							all[i].unshift({id: 'zhiliang',attr: 'first', catName: '质量标准'})
						}
					}
					if(i===3){
						ele.unshift({id: 'changjia',attr: 'first', catName: '厂家'})
						if(all[i][1].attr!=='second'){
							all[i].unshift({id: 'changjia',attr: 'first', catName: '厂家'})
						}
					}
				}
				items.push(ele);
				i++;
			}
			cnt_tabs[unit] = items;
		}
		cnt_tabs['all']=all;
		var keys = Object.keys(cnt_tabs);
		//end 按序号大小重组对象


		// var ddd = cnt_tabs[keys[0]];
		var ddd = cnt_tabs['all'];

		//每一个tab响应事件
		var itemClick = function(){
		    $(this).click(function(){
				var id = this.getAttribute('data-val');
				var ddd = cnt_tabs[id];
	                $('.tabswitch li').removeClass('active');
					$('.tabswitch li[data-cls="second"]').addClass('active');
	                $(this).parent().addClass('tiger-active');
	                $(this).toggleClass('active');
	                $(this).siblings().removeClass('active');
	                SA.setter( 'Cnt',{ data: ddd } );
					SA.setter( 'SelectBar',{ data: [] } );
		    })
		}

		//selectBar 添加、删除对象响应的事件
		var attr = {};
		attr.add = function(){
			$(this).toggleClass('active');
	        $(this).siblings().removeClass('active');
		}
		attr.del = function(){
			$(this).toggleClass('active');
	        $(this).siblings().removeClass('active');
			$(this).siblings('li[data-cls="second"]').addClass('active');
		}

		//cnt内每一个筛选元素点击响应事件
		var attrClick = function(){

		    $(this).click(function(){
				var text = $(this).text();
				var catParam = $(this).attr('data-param')
				var catValue = $(this).attr('data-val')
				var that = this;
				if($(this).hasClass('active')){
					if(catParam==='catId2')
						dealWithSelectBarData( {item: text+'###'+catValue, type: 'delete'})
					else
						dealWithSelectBarData( {item: text, type: 'delete'})
				}
				else{
					dealWithSelectBarData( {
						unit: that,
						item: text,
						param: {
							name: catParam,
							value: catValue||text
						}
					} );
					attr[catParam] = {};
					attr[catParam].ctx = that;
				}
		    })
		}

		// selectBar中每一个元素点击响应事件
		var seleClick = function(){
			$(this).delegate( 'a', 'click', function(){
				var text = $(this).text();
				var pm = $(this).attr('data-pm');
				if( pm ){
					text = text + '###' + pm;
				}
				dealWithSelectBarData( {item: text, type: 'delete'})
			} )
		}

		//添加、删除selectBar元素事件中需要处理的数据及处理完数据后的动作
		var dealWithSelectBarData = function( opts ){
			var options = {
				unit: null,  //{object} 点击事件所对应的对象，将会传递给attr的add、del方法，作为上下文环境变量
				item: '',   //{string}
				type: 'other',  //{string} like 'delete'
				param: {name: '', value: ''} //{object} will sent a async request to the back-end
			}
			options = $.extend({}, options, opts);
			item = options.item;
			type = options.type;
			param = options.param;

			if( param.name === 'catId2' ){
				item = item+'###'+param.value;
			}

			//获取原有selectbar的数据
			var filter = SA.getter('SelectBar').data;

			var groupValue;
			if( type === 'other'){
				if(exbQuery[param.name]){
					groupValue = exbQuery[param.name];
					if(param.name==='catId2'){
						var tmp = $(options.unit).parent().find('li[data-val='+groupValue+']');
						var tmptext = tmp.text();
						groupValue = tmptext+'###'+groupValue;

					}
				}
				exbQuery[param.name] = param.value;
				attr.add.call(options.unit);
			}
			//删除同组数据
			if(groupValue && filter && filter.data){
				libs.lodash.remove( filter.data, function( n ){ return ( n === groupValue ) })
			}

			if( type === 'delete' ){
				var tmpKey;

				if( item.indexOf('###') > -1){
					var tmpKey = 'catId2';
				}
				else{
					libs.lodash.forIn(exbQuery, function(value, key) {
						if(value===item) tmpKey = key;
					});
				}
				if(tmpKey){
					delete exbQuery[tmpKey];
					attr.del.call(attr[tmpKey].ctx);
				}
			}
			if( filter && filter.data ){
				if( type === 'delete' )
					libs.lodash.remove( filter.data, function( n ){ return ( n === item ) })
				else{
					var dublicatIndex = libs.lodash.indexOf(filter.data, item);
					if(dublicatIndex === -1)
						filter.data.push( item );
				}
				SA.setter( 'SelectBar',filter );
			}else
				SA.setter( 'SelectBar',{ data: [item] } );

			//在selectBar数据处理完成后，异步请求更新图片列表
			api.req( 'mall_exhibition', exbQuery, function(body){
				if ( body.success ) {
					var query = libs.clone(exbQuery);
					delete query.pageCurrent;
					query.pageCurrent='';
					var queryStr = libs.json2url(query);
					var pa = body.pagination,
						padata = {
							total: pa.totalCount,
							per: pa.numPerPage,
							url: '/mall/list.html',
							query: queryStr
						};
					SA.setter( 'pagination', {data:padata,begin:{start:0,off:10}} );
					SA.setter( 'Exhibition',{ data: body.pagination.recordList } );
				}
			})
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

//分页回掉
var pageClick = function(){
	$(this).click(function(e){
		e=e||arguments[0];
		e.preventDefault();
		var page = $(this).attr('data-page')
		exbQuery.pageCurrent = page;
		api.req( 'mall_exhibition', exbQuery, function(body){
			if ( body.success ) {
				SA.setter( 'Exhibition',{ data: body.pagination.recordList } );
			}
		})
	});
}

/*
* 数据查询参数
* {pageCurrent} {num} 当前页
* {orderField} {string} 排序字段
* {orderDirection} {string} 排序方向
* {pageSize} {num} 每页数量
*/
var Exhibition = require('./_component/exhibition');
var Page = require('modules/pagination/index');

var exbQuery = {
	pageCurrent: 1 ,
	orderField: '' ,
	orderDirection: '' ,
	pageSize: 25
}

// query = page?pageCurrent=3&pageSize=25
// Long catId, Long catId2, String vender, String model, String quality
//api 调用
api.req( 'mall_exhibition', exbQuery, exb_cb );

//mall_exhibition回掉函数
function exb_cb( body ){
	if ( body.success ) {
		var query = libs.clone(exbQuery);
		delete query.pageCurrent;
		query.pageCurrent='';
		var queryStr = libs.json2url(query);
		var pa = body.pagination,
			padata = {
				total: pa.totalCount,
				per: pa.numPerPage,
				url: '/mall/list.html',
				query: queryStr
			};
		rend(
			<Exhibition data={body.pagination.recordList} listClass={'tiger'} itemStyle={{width:'240px'}}/>
			,document.getElementById('exhibition')
		)
		rend(
			<Page data={padata} listClass={'pagi'} itemMethod={pageClick}/>
			,document.getElementById('page')
		)
	}
}
