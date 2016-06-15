var libs = require('libs/libs');
var List = require('widgets/listView/list');
var Store = require('mixins/store');
var _storeName;
var _ = libs.lodash
var _jump = false;

//分页回掉
var _pageClick = function(){
    $(this).click((e)=>{
        e=e||arguments[0];
        e.preventDefault();
        var page = $(this).attr("data-page");
        var jump = $(this).attr("data-jump");
        _jump = jump;
        var tmp = SA.get(_storeName);
        tmp.begin.start = page-1;
        SA.setter( _storeName, tmp );
    })
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
        var jump;
		if(data.text){
			if(data.text.toString().indexOf('...')>-1){
				value = data.dataPage
				text = '...'
			}else{
				text = data.text;
				value = data.dataPage;
			}
		}
        if (data.dataJump){
            jump = data.dataJump;
        }

		return <li data-page={value} data-jump={jump} className={clsName} style={sty}>
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

    addSheet: function(){
        //添加css到头部
        pagenationCss = '.pagenation{border:1px solid #efefef;\n margin-bottom:10px;}'
        libs.addSheet([pagenationCss,'pgtn']);
    },

	//插入真实 DOM之前
	componentWillMount:function(){

        var statData = {
            data: this.props.data,
            begin: this.props.begin
        }
        this.setState(statData)
	},

    componentDidMount:function(){ },

	render:function(){
		if(this.state.data){
            var data = this.state.data,
                newData = [],
                pages = data.total/data.per,
                pre,
                aft,
                half,
                begin = this.state.begin,
                start = parseInt(begin.start),
                ostart = start,
                off = parseInt(begin.off),
                end = start+off,
                query = '';

			if(data.total%data.per){
                pages+=1;
            }

			if(end>pages){
                end = pages;
            }

			half = off%2 ? (off-off%2)/2 : (off-off%2)/2-1;

			if(start!==0){
                pre = (start-half) < 1 ? 0 : start-half;
                aft = (pre + off) >= pages ? pages : (pre + off);

				start = pre;
				end = pre === 0 ? off >= pages ? aft : off : aft;
			}

			if(ostart>0){
                newData.push({
                    url: data.url+'?'+data.query+ostart,
                    text: '上一页',dataPage:ostart
                })
                if (ostart%begin.off === 0 && _jump){
                    console.log('============ jump');
                    console.log('============ jump');
                    console.log('============ jump');
                    console.log('============ jump');
                    console.log(_jump);
                    start = ostart
                    aft = aft + _.floor(begin.off/2)
                    end = (start+begin.off) >= pages ? pages : (start+begin.off);
                }
            }

            console.log('========== start');
            console.log('========== start');
            console.log('========== start');
            console.log('========== start');
            console.log(start);
            console.log(ostart);

			if(start>1){
				newData.push({
                    url: data.url+'?'+(data.query+1),
                    text: '1',
                    dataPage:'1',
                    dataJump: ''
                })
				newData.push({
                    url: 'javascript:;',
                    text: '...',
                    dataPage: ostart-off>0?ostart-off+1:1,
                    dataJump: ostart-off>0?ostart-off+1:1
                })
			}

			if( end > 0 ){
				for( var i=start; i<end; i++){
					query = data.query+(i+1);
	                newData.push({
	                    url: data.url+'?'+query,
	                    text: i+1,
	                    dataPage:i+1,
                        dataJump: '',
						active:( function(){
    							if(ostart < half || (ostart + half) > pages){
    								return ostart===i ? true : false
    							}
                                else{
    								return (half+start)===i ? true : false
    							}
    						})()
	                })
	            }

	            if(end < pages){
	            	newData.push({
                        url: 'javascript:;',
                        text: '...'+i,
                        dataPage: ostart+off>pages?pages+1:ostart+off+1,
                        dataJump: ostart+off>pages?pages+1:ostart+off+1
                    });

					newData.push({
                        url: data.url+'?'+query+(pages),
                        text: (_.ceil(pages)),
                        dataPage: _.ceil(pages),
                        dataJump: ''
                    });

					newData.push({
                        url: data.url+'?'+data.query+(ostart+2),
                        text: '下一页',
                        dataPage:ostart+2
                    });
	            }
			}
        }

        // <List {...this.props} data={newData}/>
		return (
            <div className={'pagenation wid-12 u-clearfix'}>
                <List {...this.props} data={newData} itemView={PageItem}/>
            </div>
        )
	}
}

function actRct( storeName ){
    _storeName = storeName||'_Pagi';
    var _rct = _.cloneDeep(pagenation);

	if( _rct.mixins && _rct.mixins.length ){
		_rct.mixins.push( Store( _storeName ))
    }
	else{
		_rct.mixins = [ Store( _storeName ) ]
    }

    return React.createClass( _rct );
}

module.exports = actRct;
