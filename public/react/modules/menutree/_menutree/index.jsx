var List = require('react/widgets/listView/list');
var libs = require('libs/libs');

function adapter(data){
	function getTitile(title){
		return (
			<h4>
				<i className="iconfont icon-xiala"/>
				<span className="catalog">{title}</span>
			</h4>
		)
	}


	/**
	 * getLis 所有子项li
	 * @param  {String|ReactElement|Array}  lis 子项数组
	 * @return {Array}     标准格式，符合ListView的数据格式
	 */
	function getLis(lis){
		var _lis = [];
		if (lis.length){
			lis.map(function(item, i){
				var _timeago = libs.timeAgo(item.ctime, function(timer){
					if (timer.diff.seconds>=1 && timer.diff.seconds<86400){
            return <i style={{color:'#fcbb9f'}}>new</i>
	        }
					else {
						return false;
					}
				});

				var _pos = _.uniqueId('pos')
				var _title = <a key={'lis'+i} href={item.url+'&pos='+_pos}>{item.title}{_timeago}</a>;
				if (item.stat){
					_title = <a className={item.stat} key={'lis'+i} href={item.url+'&pos='+_pos}>{item.title}{_timeago}</a>;
				}
				_lis.push({
					attr: {pos: _pos, stat: item.stat},
					title: _title
				})
			})
		}
		return _lis
	}

	var childrenCount = 1;   //限制级数为3层, react不能超过3层
	/**
	 * [getChildren 递归获取三层数据结构的目录结构]
	 * @param  {JSON} father [JSON的数据结构]
	 * @param  {String} cls    css class
	 * @param  {Number} depth  数据深度，允许三层
	 * @return {Array}        返回ListView的标准数据格式
	 */
	function getChildren(father, cls, depth){
		if (depth){
			childrenCount++
		}

		var _tmp = [];
		father.children.map(function(child){
			var lis = getLis(data[child].list);

			if (childrenCount<3 &&
				data[child].children.length
			){
				lis = lis.concat(getChildren(data[child], cls, true))
			}
			else {
				childrenCount = 1;
			}

			_tmp.push({
				title: getTitile(data[child].caption),
				li: lis,
				className: cls||''
			})

		})
		return _tmp
	}

	var keys = Object.keys(data);
	var _data = [];
	keys.map(function(item){
		childrenCount = 1;
		if (data[item].parent==='root' && data[item].list.length){
			if (data[item].children.length && item!=='root'){
				var lis = getLis(data[item].list);
				var childs = getChildren(data[item]);
				_data.push({
					title: getTitile(data[item].caption),
					li: lis.concat(childs)
				})
			}
			else {
				_data.push({
					title: getTitile(data[item].caption),
					li: getLis(data[item].list)
				})
			}
		}
	})
	return _data;
}

var pagenation = {
	//插入真实 DOM之前
	componentWillMount:function(){
		this.setState({
			data: adapter(this.props.data)
		})
		this.data = adapter(this.props.data);
	},

  componentDidMount:function(){ },

	render:function(){
        var list;
        if (this.state.data.length){
						// var _props = _.merge({data: this.data}, this.props);
						// list = React.createElement(List, _props)
            list = <List data={this.data} itemClass="category" listMethod={this.props.listMethod} itemMethod={this.props.itemMethod}/>
        }
        return (
            <div className="page-ui-kits docmenu">
                {list}
            </div>
        )
	}
}


function actRct( storeName ){
    return require('react/util')(storeName, pagenation)
}

module.exports = actRct;
