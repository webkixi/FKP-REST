var libs = require('libs/libs');
var List = require('widgets/listView/list');
var Store = require('mixins/store');
var _storeName = 'Pagi'

//分页回掉
var _pageClick = function(){
	libs.addEvent(this, 'click', function(e){
		e=e||arguments[0];
		e.preventDefault();
		var page = this.getAttribute("data-page");
		var tmp = SA.getter(_storeName).data;
		tmp.begin.start = page-1;
		SA.setter( _storeName, tmp );

	});
}

//分页item 组织数据如下
/*
* data format
* {
*    url:  {String}
*    text: {String}
*  }
*/

var PageItem = React.createClass({

	//插入真实 DOM之前
	componentWillMount:function(){

	},

    componentDidMount: function () {
		_pageClick.call(this.getDOMNode())

		if(this.props.itemMethod){
			var mtd = this.props.itemMethod;
			if(typeof mtd==='function'){
				mtd.call(this.getDOMNode());
			}
		}
	},

	render:function(){
        var clsName = "item";
		var itemStyle = '';
		var sty = {};
		var data = this.props.data;

        if(this.props.itemClass){
			clsName = "item "+this.props.itemClass;
		}

		if(data.active){
			clsName+=' active';
		}

        if(this.props.itemStyle){
			clsName = 'item';
			sty = this.props.itemStyle;
		}

		var text;
		var value='';
		if(data.text){
			if(data.text.toString().indexOf('...')>-1){
				value = data.dataPage
				text = '...'
			}else{
				text = data.text;
				value = data.dataPage;
			}
		}

		return <li data-page={value} className={clsName} style={sty}>
	                <a href={data.url}>{text}</a>
		        </li>
	}
});

// 分页容器，组织数据格式如下
/*
* datas format
* {
* data: {
*	total: 123 ,  {Number}   产品总的个数
* 	per:   10, 	  {Number}   每页显示的个数
*	url:   '/xxx/yyy.html'   {String}    分页链接开头
* 	query: 'abc="slime"&xyz="pack"&curentPage='   {String}   分页向后台查询的query
* },

* //分页展示页数，从第几页到第几页
* begin: {
*   start: 0,    {Number}   从几开始
*	off: 10		{Number}   偏移值
* }
}
*/
//react tabswitch
var pagenation = {

	getDefaultProps: function() {
		return {}
	},

	getInitialState: function() {
        // this.addSheet();

	},

    addSheet: function(){
        //添加css到头部
        pagenationCss = '.pagenation{border:1px solid #efefef;\n margin-bottom:10px;}'
        libs.addSheet([pagenationCss,'pgtn']);
    },

	//插入真实 DOM之前
	componentWillMount:function(){
		SA.setter(_storeName,{
        	data: this.props.data,
			begin: this.props.begin || { start: 0, off: 5 }
	    });
	},

    componentDidMount:function(){
        if(this.props.boxMethod){
			var mtd = this.props.boxMethod;
			if(typeof mtd==='function'){
				mtd.call(this.getDOMNode());
			}
		}
    },

	render:function(){
		if(this.state.data){
            var data = this.state.data;
            var newData = [];
            var pages = data.total/data.per-1;
			if(data.total%data.per)
				pages+=1;

			var pre;
			var aft;
			var half;

			var begin = this.state.begin;
			var start = parseInt(begin.start);
			var ostart = start;
			var	off = parseInt(begin.off);
			var end = start+off;
			if(end>pages)end = pages;
			half = off%2 ? (off-off%2)/2 : (off-off%2)/2-1;

			if(start!==0){
				pre = start-half;
				if(pre < 1) pre=0;
				aft = pre + off;
				if(aft >= pages)aft = pages;
				start = pre;
				end = pre===0 ? off>=pages?aft:off : aft;
			}
			if(ostart>0)newData.push({url: data.url+'?'+data.query+ostart, text: '上一页',dataPage:ostart} );
			if(start>1){
				newData.push({url: data.url+'?'+(data.query+1), text: '1',dataPage:'1'} );
				newData.push({url: 'javascript:;', text: '...',dataPage:ostart-off>0?ostart-off:1} );
			}

			if( end > 0 ){
				for( var i=start; i<end; i++){
					query = data.query+i;
	                newData.push({
	                    url: data.url+'?'+query,
	                    text: i+1,
	                    dataPage:i+1,
						active:(function(){
							if(ostart < half || (ostart+half)>pages){
								return ostart===i?true:false
							}else{
								return (half+start)===i?true:false
							}
						})()
	                })
	            }

	            if(end<pages){
	            	newData.push({url: 'javascript:;', text: '...'+i,dataPage:ostart+off>pages?pages:ostart+off} );
					newData.push({url: data.url+'?'+query+(pages), text: (Math.ceil(pages)),dataPage:Math.ceil(pages) });
					newData.push({url: data.url+'?'+data.query+(ostart+2), text: '下一页',dataPage:ostart+2} );
	            }
			}
        }

		var props = {
			itemMethod: this.props.itemMethod
		}
		var that = this;

		if( end> 0 ){
			return <div className={'pagenation wid-12 u-clearfix'}>
					<List {...this.props} data={newData} itemView={PageItem}/>
	          </div>
		}else{
			return <div></div>
		}
	}
}

function mkPagenation( storeName ){
	if( storeName )
		_storeName = storeName;
	if( pagenation.mixins && pagenation.mixins.length )
		pagenation.mixins.push( Store( _storeName ))
	else
		pagenation.mixins = [ Store( _storeName ) ]

    return React.createClass( pagenation );
}

module.exports = mkPagenation;
