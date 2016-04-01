module.exports = (gulp,$,slime,env)->
    return (cb) ->
        slime.build('pages', false, {"env": env}, cb); 
        # slime.build('pages',cb);
