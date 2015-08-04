var libs = require('libs/libs');
var List = require('widgets/listView/list');
var Store = require('mixins/store');

//分页回掉
var _pageClick = function(){
	libs.addEvent(this, 'click', function(e){
		e=e||arguments[0];
		e.preventDefault();
		var page = this.innerText;
		if(page.indexOf('...')>-1){
			page = this.getAttribute("data-page");
		}
		var tmp = SA.getter('pagination').data;
		tmp.begin.start = page-1;
		SA.setter( 'pagination', tmp );

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
				value = data.text.toString().replace('...','')
				text = '...'
			}else{
				text = data.text;
				value = data.text;
			}
		}

		return <li data-page={value} className={clsName} style={sty}>
            <div className={"hheader"}>
                <a href={data.url}>{text}</a>
            </div>
        </li>
	}
});

// 分页容器，组织数据格式如下
/*
* data format
* {
*	total: 123 ,  {Number}
* 	per:   10, 	  {Number}
*	url:   '/xxx/yyy.html'   {String}
* 	query: 'abc="slime"&xyz="pack"&curentPage='   {String}
* }
*/
//react tabswitch
var pagenation = React.createClass({
    mixins: [Store('pagination')],

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
		SA.setter('pagination',{
        	data: this.props.data,
			begin: {
				start: 0,
				off: 10
			}
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

			for( var i=start; i<end; i++){
				query = data.query+i;
                newData.push({
                    url: data.url+'?'+query,
                    text: i+1,
					active:(function(){
						if(ostart < half || (ostart+half)>pages){
							return ostart===i?true:false
						}else{
							return (half+start)===i?true:false
						}
					})()
                })
            }
			newData.push({url: 'javascript:;', text: '...'+i} );
			newData.push({url: data.url+'?'+query+(pages), text: (Math.ceil(pages)) });
        }

		var props = {
			itemMethod: this.props.itemMethod
		}
		var that = this;
		return <div className={'pagenation wid-12 u-clearfix'}>
				<List {...this.props} data={newData} itemView={PageItem}/>
          </div>
	}
});

module.exports = pagenation;
