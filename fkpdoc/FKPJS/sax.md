# FKP-SAX   

```
// install
npm install fkp-sax --save
```

## API  

SAX的意思是"store and action X", 在`FKP-JS`和`FKP-RN`项目中均是核心方法，Router、Pager以及like flux mixins for react etc...都依赖于SAX  
SAX is a global variable in `FKP-JS` and `FKP-RN`  
I suggest u set SAX as global variable

| API | 描述 | 例子 |
| :-------------: |-------------| -----|
| set | 设置命名空间及参数 | SAX.set( ID, data, function )|
| get | 获取命名空间的数据 | SAX.get( ID )|
| append | 给指定ID的命名空间追加数据 | SAX.append( ID, data ) |
| setter | 设置命名空间并执行该空间中的方法 | SAX.setter( ID, data, function )|
| getter | 获取指定ID的命名空间的所有属性 | SAX.getter( ID ) |
| deleter | 删除指定ID的命名空间 | SAX.deleter( ID )|
| runner | 执行指定ID的命名空间 | SAX.runner( ID )|
| lister | 列表出所有的命名空间 | SAX.lister()|

## 作为内存数据库
as a simple data library in memery      
SAX可以作为简易的内存数据库，来存储页面中的变量  

> set and get and deleter   

```
// Json
SAX.set('Xyz', {a: 1, b: 2})
SAX.append('Xyz', {c: 3})
SAX.get('Xyz')
// {a:1, b:2, c:3}  

// Array
SAX.set('Xyz', [1,2,3])
SAX.append('Xyz', 4)
SAX.append('Xyz', 'abc')
SAX.append('Xyz', {x:22})
SAX.get('Xyz')
// [1, 2, 3, 4, 'abc', {x:22}]


SAX.deleter('Xyz')
SAX.lister()
// no Xyz namespace
```

## 作为触发器  
as a trigger to performance some predefine method, with ajax or delay data, it's Very useful   
SAX可以作为触发器，触发预定义的方法，配合ajax或者延时数据使用  

##### 简单方法/simple
```
// init  
SAX.set('Xyz', {x:3, y:4}, abc)
function abc(data){
   console.log(data)
}

setTimeout(function(){
   let _data = {a: 1, b: 2}
   SAX.setter('Xyz', _data) // only use `setter`
}, 3000)

// after 3 seconds then print {a: 1,b: 2}
```

##### 高级方法/adv
bind context  
SAX可以绑定上下文，及传送一个data的参数  
FKP's Router 和 Pager 使用了这种方式  
[demo](http://www.agzgz.com/app)

```
// init  
let context = {a: 1,b: 2}
SAX.set('Xyz', abc, [context])
function abc(data){
    console.log('this is:'+this)
    console.log('data is:'+data)
}
SAX.setter('Xyz', {x:3,y:4})
// this is : {a:1,b:2}
// data is : {x:3,y:4}
```

##### 自执行/run again
if ID has action, you can run it again, use `runner`   
runner能够执行已经存在的ID，如果该id有action 方法  

```
// init  
let context = {a: 1,b: 2}
SAX.set('Xyz', context, abc)
function abc(data){
    console.log('data is:'+data)
}
SAX.runner('Xyz')
// data is : {a: 1,b: 2}
```
