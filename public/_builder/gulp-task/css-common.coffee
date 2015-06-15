path = require 'path';
config = require '../configs/config.coffee';

module.exports = (gulp,$,slime)->
    return () ->
        slime.build(config.modulesCssDir,true,{
            type: 'sass',
            rename: 'common',
            prepend: [path.join(config.modulesCssDir+'/_settings/_setting.scss')]
        });
