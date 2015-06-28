var
// ItemVIEW = require('widgets/itemView/itemView'),
//LoadList = require('modules/list/loadlist'),
// LazyList = require('modules/list/lazylist'),
FixedBar = require('modules/fixed/fixedbar')
render = React.render;

//循环数据
render(
  <FixedBar>
      <div style='background-color:blue;'>123</div>
  </FixedBar>
  ,document.getElementById('good')
);



module.exports = {};


//参考
// from http://jsfiddle.net/aabeL/1/
// https://github.com/jeroencoumans/react-scroll-components
// https://github.com/guillaumervls/react-infinite-scroll
// http://levi.cg.am/archives/3099   //getBoundingClientRect
//
// http://www.cnblogs.com/dingyingsi/archive/2013/09/24/3337813.html   scrollHeight
