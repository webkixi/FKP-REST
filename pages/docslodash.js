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
            let staticData;
            let home = path.join(__dirname, '../docs/_home.md');

            if (params && params.md){
              staticData = await getDocsData('docs/lodash', {
                  docs: false,
                  start: false,
                  menutree: false,
                  append: oridata
              })
              // loadfile
              tmp = await loadMdFile(params.md);
              tmp.mdcontent.cnt = tmp.mdcontent.cnt.replace(/h1/ig, 'div')
              staticData = _.extend(staticData, tmp);
            }
            else {
              staticData = await getDocsData('docs/lodash', {
                  docs: false,
                  start: '_home.md',
                  menutree: true,
                  append: oridata
              })
            }

            return staticData;
        },

        post: async () => {
            let _body = await libs.$parse(this);
            let body = await co(_body)

            let staticData = await getDocsData('docs/lodash', {
              pre: 'post_',
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

export {demoIndexData as getData}
