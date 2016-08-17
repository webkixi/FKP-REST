config = require '../configs/config.coffee'

module.exports = (gulp,$,slime,env)->
    return (cb) ->
        slime.build ['global'], true, {"env": env, noCommon: true, source: 'dir'}, () ->
            slime.build ['pages'], false, {"env": env, noCommon: false, source: 'dir'}, cb
        # slime.build 'pages', false, {"env": env}, cb

        # slime.build('pages',cb);
        # slime.build(config.dirs.pages + '/html/',{type: 'hbs',data: datas, 'env': env});
