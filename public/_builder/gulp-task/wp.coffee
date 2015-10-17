module.exports = (gulp,$,slime,env)->
    return (cb) ->
        slime.build('pages',cb);
