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
