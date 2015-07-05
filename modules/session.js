/**
 * Module dependencies.
 */
// var session = require('koa-generic-session');
var libs = require('../libs/libs');

//加密
function getSession(ctx,idf){
    var sess = ctx.session;
    
    // ctx.body = session.count;
}

function setSession(ctx,idf){
    var sess = ctx.session;

}


function rmvSession(ctx,idf){
    var sess = ctx.session;
    sess = null;

}

function countSession(ctx){
    var sess = ctx.session;
    sess.count = sess.count || 0;
    sess.count++;
}

var exp = {
    set: setSession,
    get: getSession,
    remove: rmvSession,
    count: countSession
}

module.exports = function(){
    return exp;
}
