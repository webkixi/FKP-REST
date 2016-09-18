# @FKPJS多环境支持   
上线之前，我们有多个环境，如开发，单元测试，测试，release，准生产，生产等等环境，有得还需要有冗余配置，这就使得环境配置多种多样，FKPJS现在可以支持多环境部署，一点都不难   

![configs.png](/uploader/web-22522614532442042929359031989889.png)

在以上目录添加对应的配置文件，环境配置的变量名前缀为`env_` 特殊配置名`test`，请参看下面示例


### 开发部署   
开发部署用于本地开发用，方便调试，支持watch，热部署...  

#### 本地开发：  

```
./ly dev // 默认配置   
./ly dev test //启动 configs/test 配置   
./ly dev env_1 //启动 configs/env_1 配置   
./ly dev env_2 //启动 configs/env_2 配置   
./ly dev env_xxx //启动 configs/env_xxx 配置   
```  

#### 本地开发仿生产：  

```
./ly pro // 默认配置   
./ly pro test //启动 configs/test 配置   
./ly pro env_1 //启动 configs/env_1 配置   
./ly pro env_2 //启动 configs/env_2 配置   
./ly pro env_xxx //启动 configs/env_xxx 配置   
```  

### 生产部署   
生产部署用于各种生产环境，如开发、测试、准生产，生产。。。。，为适用各种环境，请写好各种环境配置   

```
pm2 start index.js -i 4 // 默认配置   
pm2 start index.js -i 4 -- test //启动 configs/test 配置   
pm2 start index.js -i 4 -- env_1 //启动 configs/env_1 配置   
pm2 start index.js -i 4 -- env_2 //启动 configs/env_2 配置   
pm2 start index.js -i 4 -- env_xxx //启动 configs/env_xxx 配置   
```  
