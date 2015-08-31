/*
* Auth: lgh
* 数据表格
*/
var Tab = require('./_component/table')()
var render = React.render


/*
* nav_data {Array}   一维数组
* cnt_data {Array}   二维数组
* cnt_top_data {Array}   一维数组
* ele     {String}  页面元素的ID
* {return}  渲染结构到指定ID
*/
function tabswitch( tab_body_data, tab_head, tab_head_width, ele){
	render(
		<div className={'tabswitch'}>
			<Tab data={tab_body_data} hddata={tab_head} itemWidth={tab_head_width}></Tab>
		</div>
		,document.getElementById(ele)
	)
}

module.exports = tabswitch;
