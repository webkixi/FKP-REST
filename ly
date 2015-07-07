#!/bin/bash

# node --harmony index.js dev

# 1

# if $1 = 'dev'; then
#     cd public
#     gulp dev
#
#     # 2
#     cd ..
#     node --harmony index.js dev &
#
#     # 3
#     cd public
#     gulp watch
# fi

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
