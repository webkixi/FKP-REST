require("coffee-script/register")
let libs = require('../libs/libs')
let path = require('path')
let co = require('co');
let docs = require( 'modules/docs' )

import fs from 'fs'
function readDocsDirs(){
  return new Promise( (resolve, reject)=> {
    let _homes = []
    let _root = path.join(__dirname, '../fdocs')
    fs.readdir(_root, (err, data)=>{
      if (err) throw err
      data.map((item, i)=>{
        let path = _root+'/'+item
        let _item = fs.statSync(path)
        if (_item.isDirectory()){
          fs.readdir(path, (err, sub)=>{
            if (err) throw err
            if (sub.indexOf('_home.md')){
              // ......  继续
            }
          })
        }
      })
    })
  })
}

function *demoIndexData(oridata, control){
    // readDocsDirs().then((res)=>{
    //   console.log(res);
    // })

    let that = this;
    async function getDocsData(url, opts){
        let _data = await docs.getDocsData(url, opts);
        return await co(_data)
    }

    async function loadMdFile(url){
        let _data = await docs.loadMdFile(url);
        let tmp = await co(_data)
        if (!tmp){
          if (that.method==='GET') return that.redirect('/404')
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
              return that.redirect('/404');
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
