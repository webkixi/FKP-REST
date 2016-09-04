require("coffee-script/register")
let libs = require('../libs/libs')
let path = require('path')
let co = require('co');
let docs = require( 'modules/docs' )

function *demoIndexData(oridata, control){

    async function getDocsData(url, opts){
        let _data = await docs.getDocsData(url, opts)
        return await co(_data)
    }

    async function loadMdFile(url){
        let _data = await docs.loadMdFile(url)
        return await co(_data)
    }

    return control.run({
        get: async ()=>{
            let tmp={};
            let params = libs.uri(this.local.path);

            let staticData = await getDocsData('fkpdoc', {
                docs: false,
                sitemap: true,
                start: true,
                menutree: true,
                append: oridata
            })

            if (params && params.md){
              let url = params.md;
              // loadfile
              tmp = await loadMdFile(url);
              tmp.mdcontent.cnt = tmp.mdcontent.cnt.replace(/h1/ig, 'div');
              staticData = _.extend(staticData, tmp);
            }
            else {
              delete staticData.mdcontent
            }
            return staticData;
        },

        post: async () => {
            let _body = await libs.$parse(this);
            let body = await co(_body)

            let staticData = await getDocsData('fkpdoc', {
              docs: true,
              sitemap: false,
              start: false,
              menutree: false,
              append: {}
            });
            if (body.mt){
                return staticData;
            }
            else {
                return {pdata: '我是post数据'}
            }
        }
    })

}

export { demoIndexData as getDemoData }
