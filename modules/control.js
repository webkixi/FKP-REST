"use strict";

function Control(ctx, oridata){
    this.ctx = ctx || null
    this._get_ = false
    this._post_ = false
    this.odata = oridata || {}
}

Control.prototype = {
    run: function(){
        var mtd = this.ctx.method;
        if (mtd === 'GET' && _.isFunction(this._get_)){
            return this._get_.call(this.ctx, this.odata)
        }

        if (mtd === 'POST' && _.isFunction(this._post_)){
            return this._post_.call(this.ctx, this.odata)
        }
    }
}

function control(ctx, odata){
    return new Control(ctx, odata)
}

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
