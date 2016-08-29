# 自动化部署FKP到linux服务器  

通过git，我们可以很容易的实现FKP的自动化部署，在我们推送代码后，服务器端会自动将前端代码编译好后并重启node服务器，一切都是非常自动及舒适
下述安装过程属于简化过程，没有描述npm的包安装过程，请参考之前的《安装》  

## 依赖环境 {id: env}   
1. node > 4.4  
2. npm > 3.0  
3. pm2全局  
4. node-gyp全局  
5. gulp全局  
6. git^2.8  
7. nginx ^1.9  

## nginx的反向代理 {id: nginx}  
```
nginx version: nginx/1.9.13
```

反向代理配置 conf.d/default
```
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

upstream fkp{
    server 127.0.0.1:8070;
}

server {
    listen 80;
    root /home/git/code/doc;
    server_name www.agzgz.com agzgz.com;
    location / {
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header Host $http_host;
         proxy_set_header X-Nginx-Proxy true;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection "upgrade";
         proxy_http_version 1.1;
         proxy_pass http://fkp;

    }
}
```  
重启nginx， `nginx -s reload`  



## git库安装 {id: git}  
git库分为两个部分，一个是bare库，一个是init库，通过bare库的hook/post-receive脚本自动更新、编译运行FKP  
不懂bare库与init库的区别，请自行百度  

1、建立库目录
```
adduser xxx
cd /home/xxx
mkdir rep && cd rep
git init --bare

cd /home/xxx
mkdir code && cd code
git init
```  

2、执行相应的操作  
我们在xxx的账户目录新建了两个git版本库，一个bare的，一个init的  
第一次，让我们手动来操作一次  
首先推送本地版本到bare库 git push .... master  
这样在bare库中，有了我们的第一个版本master  
接下来建立init库下的远程库，将远程库指向rep，并执行  
```
cd /home/xxx/code
git init
git remote add orign ../rep  
git pull orign master  
cd public  
gulp build
cd ..
pm2 start index.js //pm2 可以启动多进程，-i max，大大增加并发访问
```  
这样我们成功的将fkp运行在8070端口上，通过nginx的方向代理后，我们可以直接通过域名来访问

3、建立bare库的hooks下的钩子`post-receive`，并输入以下代码  
```
export GIT_WORK_TREE=/home/xxx/code
export GIT_DIR=/home/xxx/code/.git
cd $GIT_WORK_TREE
git pull orign master
cd public
gulp build
pm2 restart all
```  
ok，在我们再次向bare库中推送代码的时候，git钩子会启动脚本并执行FKP的编译，且重启pm2，整个过程大约1分钟左右

到此，fkp的自动化部署完成，是不是非常简单嗫~~
