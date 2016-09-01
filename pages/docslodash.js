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

            let home = path.join(__dirname, '../docs/_home.md');

            let staticData = await getDocsData('docs/lodash', {
                docs: false,
                start: '_home.md',
                menutree: true,
                append: oridata
            })

            if (params && params.md){
                // loadfile
                tmp = await loadMdFile(params.md);
                staticData = _.extend(staticData, tmp);
            }

            return staticData;
        },

        post: async () => {
            let _body = await libs.$parse(this);
            let body = await co(_body)

            let staticData = await getDocsData('docs/lodash');
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
