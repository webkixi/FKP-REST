"use strict";

function Control(ctx, oridata){
    this.ctx = ctx || null
    this._get_ = false
    this._post_ = false
    this.data = oridata || {}
}

Control.prototype = {
    run: function(opts){
        var dft = {
            get: this._get_,
            post: this._post_
        }
        if (_.isObject(opts)){
            dft = _.extend(dft, opts)
        }

        var mtd = this.ctx.method;
        var ctx = this.ctx;
        var _data;
        if (mtd === 'GET' && _.isFunction(dft.get)){
            _data = dft.get.call(this.ctx)
            return _data;
        }

        if (mtd === 'POST' && _.isFunction(dft.post)){
            _data = dft.post.call(this.ctx)
            return _data
        }
    },

    api: require('apis/javaapi'),

    libs: require('libs/libs'),

    parseJsx: require('./parseReact'),

    parseMd: require('./markdown')

}


function control(ctx, odata){
    return new Control(ctx, odata)
}

control.api = require('apis/javaapi')
control.libs = require('libs/libs')
control.parseJsx = require('./parseReact')
control.parseMd = require('./markdown')
// control.render = require('./render')(process.env.whereIs)

module.exports = control;

// class Control {
//     constructor(ctx, oridata){
//         this.ctx = ctx || null
//         this._get_ = false
//         this._post_ = false
//         this.odata = oridata || {}
//     }
//
//     run(){
//         let mtd = this.ctx.method;
//         if (mtd === 'GET' && _.isFunction(this._get_)){
//             return this._get_.bind(this.ctx, this.odata)()
//         }
//
//         if (mtd === 'POST' && _.isFunction(this._post_)){
//             return this._post_.bind(this.ctx, this.odata)()
//         }
//     }
// }
//
// export default function control(ctx, odata){
//     return new Control(ctx, odata)
// }
