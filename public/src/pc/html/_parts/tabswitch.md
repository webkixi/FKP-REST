# tab切换效果展示  
>主要由reactjs实现，如果你不是很了解reactjs，请浏览这篇文章 [React入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)  

HTML结构： `html/demo/tabswitch.hbs`  
样式：   `css/page/demo/tabswitch/index.scss`  
js代码： `js/page/demo/tabswitch/index.jsx`




## 代码说明
```
// 仿太平洋的多属性选择框
tabSwitch_likePConline( tab_nav_data, tab_cnt_data, 'tab-switch')

//仿幕课网
Mooc( tab_mc_data, mc_cnt_data, mc_select_bar, "tab-switch-mooc" )

// 仿京东首页
Tabswitch( tab_nav_data, tab_cnt_data, "tab-switch2" )
```
函数基本结构，数据部分 + DOM id
