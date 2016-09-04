var List = require('react/widgets/listView/list');

function adapter(data){
	function getTitile(title){
		return (
			<h4>
				<i className="iconfont icon-xiala"/>
				<span className="catalog">{title}</span>
			</h4>
		)
	}

	function getLis(lis){
		var _lis = [];
		if (lis.length){
			lis.map(function(item, i){
				_lis.push({
					title: item.title,
					url: item.url
				})
			})
		}
		return _lis
	}

	var childrenCount = 1;   //限制级数为3层, react不能超过3层
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
				// _tmp.push( getChildren(data[child]) )
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
