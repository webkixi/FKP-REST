# 2、微信的token  
## 1、normal token  
以下服务需要normal token  
1. 公众号菜单  
2. 支付  
3. 当前地址信息，如经纬度  
4. 用户列表  
5. 自动回复聊天机器人  
6. 客服  
7. 扫一扫  
8. ....  

normal token是通过服务器端获取的，FKP-REST已根据微信官方文档已经集成配置在nodejs端，通过简单的调用就能够实现微信相应的功能  
```
api.req('/weixin/menu', function(data){
    console.log(data)
})
# api方法为FKP-REST封装的ajax异步方法  
```
如上，FKP会根据微信配置信息，自动匹配微信服务端，并返回正确的token值，再调用微信端的菜单接口动态创建菜单，具体微信菜单配置请参看后续文章

## 2、web token
以下功能需要微信web token
1. 获取微信客户信息，比如openid，用户头像等
2. ....  

web token基于oAUTH的原理实现，较之normal token更加复杂，需要与微信端经过3次交互才能正确的实现某些功能，在此不得不感叹微信端的安全步骤之繁复，折腾死人的节奏。  
举个栗子：获取微信用户信息  
1. 正确配置微信菜单
2. 根据菜单传递过来的code和stat去微信接口请求web token  
3. 将web token及其他参数传给微信的用户接口拿取用户信息  

```
# code/state参数请参考
# http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html

var wx = require('modules/weixin/index')
```
