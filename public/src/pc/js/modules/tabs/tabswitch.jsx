// var
// ListView = require('widgets/listView/listView'),
// PageScrollStartEndMixin = require('mixins/PageScrollStartEndMixin'),
libs = require('../../libs/libs');
var qs = require('querystring');
var src = "http://120.25.223.175:5051/jh-web-portal/";
var apiPath = {
    base: src,
    dirs: {
        search: src+'api/search.html',
        user: src+'checkUserStatus.html',
        mall_list: src+'api/mall/item/list/query.html',
        mall_attr: src+'api/mall/item/list/attributes.html'
    }
}


function req(api,param){
	var that = this;

    var url = apiPath.dirs[api];
    var query = qs.stringify(param);

    if(libs.getObjType(param)!=='Object')
        return false;
	request({method:'POST', url:url+'?'+query, json:{relaxed:true}}, function(err,response,body){
		if(err)
		    throw err
		console.log(body);

        if(body.success){
            that.setState({
    			datas: body.data.spCatList
    		});
            console.log('aaaaaaaaaaaaaaaaaaaa');
        }
	})
}

//react
var tabswitch = React.createClass({
	getDefaultProps: function() {
		return {

		};
	},
	getInitialState: function() {
		return {
        	datas: []
	    };
	},
	//插入真实 DOM之前
	componentWillMount:function(){
		req.call(this,'mall_attr',{});
		if(this.props.datas && this.props.datas.length){
			req.call(this,'mall_attr',{})
		}
	},
	renderTabs: function(){
		var tabitems = [];

		if(this.state.datas.length){
			this.state.datas.map(function(item,i){
				tabitems.push(<li>{item}</li>);
			})
		}else{
			tabitems.push(<li>123456</li>)
		}

		return tabitems;
	},
	componentDidMount: function() {
        console.log('bbbbbbbbbbbbbbbbbb');
	},
	//已加载组件收到新的参数时调用
	componentWillReceiveProps:function(nextProps){
		// this.setState({
		// 	datas: nextProps.datas
		// });
	},
	render:function(){
		// {this.props.children}
		var items = this.renderTabs();
		return <div className={'tabswitch wid-12'}>
				<ul>
					{items}
				</ul>
				<div className={'tab-cnt'} />
          </div>
	}
});

module.exports = tabswitch;
