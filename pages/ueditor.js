"use strict";
var cfg = require('./common/ue_config');
import co from 'co';

function *ueditor(oridata, hlo) {

    return hlo.run({
        get: async ()=>{
            oridata.fkp = 'FKP-REST';

            if (this.local.query.action ){
                if (this.local.query.action === 'config'){
                    const _cfg = {
                        "imageUrl": "/ueditor?action=uploadimage",
                        "imagePath": "/uploader/",
                        "imageFieldName": "upfile",
                        "imageMaxSize": 2048,
                        "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
                    }
                    var config = _.extend( cfg, _cfg)
                    this.body = config;
                }
            }
            else{
                return oridata;
            }

        },

        post: async () => {
            const self = this;
            return co(function *(){
                return yield require('modules/uploader').local.call(self, fkpConfig.upload_root)
            })
            // return {pdata: '我是post数据'}
        }
    })

}

export {ueditor as getData}
