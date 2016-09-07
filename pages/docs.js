let libs = require('../libs/libs')
let path = require('path')
let co = require('co');
let docs = require( 'modules/docs' )
let fs = require('fs');

let _whichDoc = 'fdocs/fkp';
let _docs;

function *_ckMkDir(path){

  function _watch(){
    fs.watch(path, (eventType, filename) => {
      console.log(`event type is: ${eventType}`);
      if (filename) {
        _docs = fs.readdirSync(path);
        console.log(`filename provided: ${filename}`);
      } else {
        console.log('filename not provided');
      }
    });
  }

  function _fsmkdir(path, cb){
    let _mode = '0777'
    fs.mkdirSync(path, _mode);
    if (typeof cb === 'function'){
      cb();
    }
    // fs.mkdir(path, _mode, async (err)=>{
    //   if (err){
    //     console.error(err);
    //     return;
    //   }
    //   if (typeof cb === 'function'){
    //     cb();
    //   }
    // })
  }

  function _initFile(){
    let _path = path+'/fkp/10summary.md';
    let _home = path+'/fkp/_home.md';
    copy('fkpdoc/FKPJS/10summary.md', _path);
    copy('fkpdoc/_home_start/index.md', _home);
  }

  function _initDoc(){
    let _path = path+'/fkp'
    _fsmkdir(_path, ()=>{
      _docs = fs.readdirSync(path);
      _initFile();
      _watch();
    })
  }

  function _fsexist(path){
    return function(done){
      fs.stat(path, (err, sss)=>{
        if (err){
          return done(false, false)
        }
        done(null, sss);
      });
    }
  }

  let _exist = yield _fsexist(path);

  if (!_exist){
    _fsmkdir(path, ()=>{
      _initDoc()
    });
  }
  else {
    _docs = fs.readdirSync(path);
    _watch();
  }
}

function *demoIndexData(oridata, control){

    async function getDocsData(path, opts){
        let _data = await docs.getDocsData(path, opts)
        return await co(_data)
    }

    async function loadMdFile(path){
        let _data = await docs.loadMdFile(path)
        return await co(_data)
    }

    if (!_docs){
      yield _ckMkDir('fdocs')
    }

    return control.run({
        get: async ()=>{
            let params = libs.uri(this.local.path);
            let keys = Object.keys(params);
            if (keys.length){
                let __whichDoc = keys[0];
                if (_docs && _docs.indexOf(__whichDoc)>-1){
                    _whichDoc = `fdocs/${__whichDoc}`
                }
            }
            else {
                _whichDoc='fdocs/fkp'
            }

            let tmp={};
            let staticData = await getDocsData(_whichDoc, {
                docs: false,
                start: '_home.md',
                menutree: true,
                append: oridata
            })

            if (!staticData){
              return this.redirect('/404');
            }

            if (params && params.md){
              tmp = await loadMdFile(params.md);
              if (!tmp){
                return this.redirect('/404');
              }
              tmp.mdcontent.cnt = tmp.mdcontent.cnt.replace(/h1/ig, 'div')
              staticData = _.extend(staticData, tmp);
            }
            else {
              delete staticData.mdcontent;
            }

            return staticData;
        },

        post: async () => {
            let _body = await libs.$parse(this);
            let body = await co(_body)

            let staticData = await getDocsData('fdocs/fkp', {
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
