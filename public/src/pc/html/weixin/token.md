# 二、微信的token  
###### 1、normal token  
normal token是通过服务器端获取的，FKP-REST已集成配置在nodejs端，调用实例如创建公众号菜单  
```
api.req('/weixin/menu', function(data){
    console.log(data)
})
# api方法是FKP-REST封装了jq的ajax  
```

###### 2、web token
web token主要用于拿取微信的openid，区别于normal token，基于oAUTH的原理实现，由前端代理获取，调用实例
```
# 由前端实现，需要由微信传入的code、state参数  
# code/state参数请参考
# http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html

var wx = require('modules/weixin/index')
```
