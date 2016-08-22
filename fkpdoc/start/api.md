# FKP的ajax请求  

终于更新到这一块了，给自己一个赞，api.req基于JQ实现的。     

以前是这样的  

```
api.req('/xxx', {...}, function(){
    // do something
    api.req('/yyy', {....}, function(){
        // ye do something
    })
})
```

现在是这样的  

```
api.req('/xxx', {...})
.then(callback)
.always(callback)

```

然并卵，怎么解决嵌套回调，是这样

```
var a1 = api.req(...)
var a2 = api.req(...)
var a3 = api.req(...)

a1.then(function(data1){
    return a2
})
.then(function(data2){
    return a3
})
.then(function(data3){

})

```

比以前好看一点了
