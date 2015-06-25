module.exports = (gulp,$,slime)->
    return (cb) ->
        slime.build('pages',cb);
