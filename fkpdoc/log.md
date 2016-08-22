@@@
tags: fkp,日志
@@@
# FKP日志-2.15.12

## 2.15.12
1. 完善`md`文档系统
2. 修复测试环境变量的bug    


## 2.14.10
1. 支持TypeScript2.0
2. 完成Typescript的demo演示 [Demo](http://www.agzgz.com/tpagi)  
现在FKPJS框架可以支持js/jsx/ts/tsx


## 2.13.10
1. 优化同构组件的方法  
2. 修复libs开发中的watch hot  
3. 补全SAX类的this.name  
4. 优化前端多页面SPA，使用更简单  
5. 优化博客首页展示效果   
6. 优化node端的require层级，同构更方便  
7. 同构tabs的demo，###[demo->](http://www.agzgz.com/demotabs)  
8. 优化node端的control方法  
9. node端支持跨域访问  

## 2.13.9
1. 优化list粒层组件，修复list method在渲染后不执行的bug

## 2.13.8
1. 增加百度ueditor编辑器及上传的demo
2. 增加编辑上传开关，在/config.js

## 2.12.8
1. node端/pages业务启用control的方法，规范control层的写法   

## 2.11.8  
1. 优化itemDealWithData的粒组件的body,footer...部分   
2. 修复一个node端的api的一个隐藏bug   
3. 修复一个apiarist不返回api列表的问题  

## 2.11.7
1、node端支持babel的stage-3;  
2、node端加入control模块，建议node端pages使用es6语法;  
3、优化博客内容过滤  
4、优化react的itemMixin，支持传递参数intent  
5、react增加utile助手方法，用于组件集成store的mixin  
6、优化hlist结构  
7、完成form表单的input，支持text, tel, password, 下拉菜单，checkbox, radiobox  
8、form表单DEMO [form表单->](http://www.agzgz.com/formshow)  

## 2.10.7  
1. 多环境支持，配置文件分离，适用多环境部署  
2. api.req的promise改造并兼容之前的语法  
3. 优化开发环境的编译，提升响应速度  

## 2.8.5  
1. pages分页栏的同构demo，[Demo ->](http://www.agzgz.com/pagi.html)   
2. 统一前后端require环境，方便以后同构开发   
3. 统一前后端的libs库，方便以后同构  

## 2.7.5  
1. 增加编译是否开启babel配置项  
2. 优化markdown样式  
3. 替换react0.13到react15版本
4. 优化组件，去除react15不支持的语法
5. 优化前端watch，速度更快  

## 2.6.4
1. 支持nodejs6.2.1  
2. 重写生产环境编译代码  
3. FKPJS博客系统完善  
4. 前端、node端支持websocket模块  
5. 修正markdown文件的解析  
6. 前端列表模块1.0版，同时支持下拉加载，lazy图片，lazy结构  
7. 完善前端路由模块，在移动端表现更好  
8. 修复雪碧图生成bug，新增雪碧图演示demo   

## fkp2.4  
 github: https://github.com/webkixi/FKP-REST     
1. 优化前端路由  
2. 前端libs库重新整理规划   
3. 优化开发环境和生产环境的sourcemap  
4. mongo blog正式版1.0  
5. 新增h5大单页demo http://agzgz.com/app  
 6. 新增h5 demo，仿商城无限加载 http://agzgz.com/cat
