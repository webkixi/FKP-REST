#!/bin/bash

# dev
dev(){
    cd public
    gulp dev

    cd ..
    node --harmony index.js dev &

    cd public
    gulp watch
}

pro(){
    cd public
    gulp build

    cd ..
    node --harmony index.js &

    cd public
    gulp watch:pro
}

demo(){
    cd public
    gulp
}

install(){
    cd public
    npm install

    cd ..
    npm install
}

case $1 in
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
