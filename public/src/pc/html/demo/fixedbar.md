# fixed bar react
实现电商常见的左右挂帘效果，可支持动态配置

## 代码示例  

```
//默认显示
react.render(
    <FixedBar left={'10px'} top={'100px'}>
        <div id={'test'} style=\{\{backgroundColor:'blue',height:'300px',width:'100px'\}\}>FKP</div>
    </FixedBar>
    ,document.getElementById('good')
);

```

```
//滚动到100px显示
react.render(
    <FixedBar left={'10px'} top={'100px'} to={'100px'}>
        <div id={'test'} style=\{\{backgroundColor:'blue',height:'300px',width:'100px'\}\}>FKP</div>
    </FixedBar>
    ,document.getElementById('good')
);

```
```
//指定页面元素滚动到100px显示, id
react.render(
    <FixedBar left={'10px'} top={'100px'} to={'100px'} ele={'FKP'} />
    ,document.getElementById('good')
);

```

## 语法说明
 * left 靠左位置，默认0  
 * top  靠顶位置，默认0  
 * right 靠右位置，默认0  
 * width 宽度，默认auto  
 * height 高度，默认auto
