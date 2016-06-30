"use strict";

function *hello(oridata, hlo) {

    return hlo.run({
        get: async ()=>{
            oridata.fkp = 'FKP-REST';

            if (this.local.query._stat_ &&
                this.local.query._stat_ === 'DATA'
            ){
                this.body = {pdata: '我是get数据'}
            }
            else{
                return oridata;
            }

        },

        post: async () => {
            return {pdata: '我是post数据'}
        }
    })

}

export {hello as getData}
