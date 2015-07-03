require('./prettify.min')
var libs=require('libs/libs');
var FixedBar = require('modules/fixed/fixedbar')
var render = React.render;

$("pre").addClass("prettyprint");
prettyPrint();

var pos = libs.getOffset(document.getElementById('good'));
var left = pos.left+'px';
var top = pos.top+'px';
//循环数据
render(
    <FixedBar left={left} ele={"side-menu"} to={top}/>
    ,document.getElementById('good')
);
