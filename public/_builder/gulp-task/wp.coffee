config = require '../configs/config.coffee'

module.exports = (gulp,$,slime,env)->
    return (cb) ->
        slime.build ['pages'], false, {"env": env, noCommon: false, source: 'dir'}, cb

        # slime.build ['global'], true, {"env": env, noCommon: true, source: 'dir'}, () ->
