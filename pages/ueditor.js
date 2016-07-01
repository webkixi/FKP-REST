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
                if (fkpConfig.editorUploader){
                    return yield require('modules/uploader').local.call(self, fkpConfig.upload_root)
                }
                else {
                    return {
                        "state": "FAILED"
                    }
                }
            })
        }
    })

}

export {ueditor as getData}
