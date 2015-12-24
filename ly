#!/bin/bash

# dev
dev(){
    cd public
    gulp dev

    cd ..
    if [ $1 ]; then
        nodemon --harmony index.js dev $1 &
    else
        nodemon --harmony index.js dev &
    fi
    sleep 2

    cd public
    if [ $1 ]; then
        gulp watch --port $1
    else
        gulp watch
    fi
}

bbdev(){
    cd public
    gulp bbdev

    cd ..
    nodemon --harmony index.js dev &
    sleep 2

    cd public
    gulp watch
}

pro(){

    cd public
    gulp build

    cd ..
    nodemon index.js &
    sleep 2

    cd public
    gulp watch:pro
}

demo(){
    cd public
    gulp
}

ngdemo(){
    cd public
    gulp ng
}

bbdemo(){
    cd public
    gulp bb
}

bbdemo(){
    cd public
    gulp bb
}

install(){
    npm install

    cd public
    npm install

    cd ..
}

install2(){
    npm install gulp -g
    npm install nodemon -g
    npm install node-gyp -g
}

server(){
	nodemon --harmony index dev
}

build(){
    cd public
    gulp build
    pm2 restart all
}

case $1 in
  install)
      install
      ;;
  install2)
      install2
      ;;
  server)
      server
      ;;
  dev)
      dev $2
      ;;
  pro)
      pro
      ;;
  demo)
      demo
      ;;
  ngdemo)
      ngdemo
      ;;
  bbdemo)
      bbdemo
      ;;
  build)
      build
      ;;
esac
