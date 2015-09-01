/*
* Auth: lgh
* 数据表格
*/
var Tab = require('./_component/table')()
var render = React.render


/*
* tab_body_data {Array}  二维数组，表格数据
* tab_head {Array}   一维数组，表头数据
* tab_head_width {Array}   一维数组，指定各个td的宽度，也可设置0
* ele     {String}  页面元素的ID
* {return}  渲染结构到指定ID
*/
// Tabswitch( '表格数据', '表头数据', '表格宽度',  '页面容器id' )
function tabswitch( tab_body_data, tab_head, tab_head_width, ele){
	render(
		<div className={'tabswitch'}>
			<Tab data={tab_body_data} hddata={tab_head} itemWidth={tab_head_width}></Tab>
		</div>
		,document.getElementById(ele)
	)
}

module.exports = tabswitch;
