#!/bin/bash

# dev
dev(){
    cd public
    gulp dev

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
    nodemon --harmony index.js &
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

install(){
    npm install gulp -g
    npm install nodemon -g
    npm install node-gyp -g
    npm install

    cd public
    npm install
    npm install node-sass

    cd ..
}

server(){
	nodemon --harmony index dev
}

case $1 in
  install)
      install
      ;;
  server)
      server
      ;;
  dev)
      dev
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
esac
