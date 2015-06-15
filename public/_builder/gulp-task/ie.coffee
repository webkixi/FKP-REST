config = require '../configs/config.coffee';
module.exports = (gulp,$,slime)->
    return () ->
        slime.build(config.ieRequireList,{rename:'ie'});
