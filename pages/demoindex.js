require("coffee-script/register")
let libs = require('../libs/libs')
let path = require('path')
let co = require('co');
let docs = require( 'modules/docs' )

function *demoIndexData(oridata, control){
    let that = this;

    async function getDocsData(url, opts){
        let _data = await docs.getDocsData(url, opts)
        return await co(_data)
    }

    async function loadMdFile(url){
        let _data = await docs.loadMdFile(url);
        let tmp = await co(_data)
        if (!tmp){
          if (that.method==='GET') return this.redirect('/404')
          else {
            console.error('md document not exist');
            return libs.errors['50001']
          }
        }
        tmp.mdcontent.cnt = tmp.mdcontent.cnt.replace(/h1/ig, 'div');
        return tmp;
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

            if (!staticData){
              return this.redirect('/404');
            }

            if (params && params.md){
              tmp = await loadMdFile(params.md);
              // if (!tmp){
              //   return this.redirect('/404')
              // }
              // tmp.mdcontent.cnt = tmp.mdcontent.cnt.replace(/h1/ig, 'div');
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

            if (!staticData){
              return {error: '该文档不存在'}
            }

            if (body.md){
              var tmp = await loadMdFile(body.md);
              staticData = _.extend(staticData, tmp);
              return staticData;
            }
            else {
                return {pdata: '我是post数据'}
            }
        }
    })

}

export { demoIndexData as getDemoData }
