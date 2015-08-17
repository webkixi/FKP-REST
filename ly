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

install(){
    cd public
    npm install node-gyp -g
    npm install
    npm install node-sass

    cd ..
    npm install
    npm install gulp -g
    npm install nodemon -g
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
esac
