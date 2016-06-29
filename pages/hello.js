"use strict";

function *hello(oridata, hlo) {

    return hlo.run({
        get: function() {
            oridata.fkp = 'FKP-REST';
            return oridata;
        },

        post: function() {
            oridata.pdata = '我是post数据';
            return oridata;
        }
    })

}

export {hello as getData}
