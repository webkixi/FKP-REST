//配置环境路径
var path = require('path')
var util = require('util')
var reModulePath = require('app-module-path')

// var base = path.resolve(__dirname);
function reRequire(base){
    if (base && util.isString(base)){

        var _path = {
            apis: base,
            db: base,
            fkpdoc: base,
            libs: base,
            modules: base,
            public: base,
            pages: base,
            react: base+'/public/react',
            root: base
        }

        //封装require方法
        //简化require的调用，别名化
        global.include = function(file){
            if (!file){
                throw new Error('没有指定文件名');
            }

            if (typeof file !== 'string'){
                throw new Error('file参数必须为String类型');
            }

            if (file.indexOf('/')>-1){
                var tmp = file.split('/')
                var key = tmp[0];
                if (_path[key]){
                    var merge_path;
                    if (key==='react'){
                        file = file.replace('react/','')
                        merge_path = path.join(_path[key], file)
                    }
                    else {
                        if (file.indexOf('root')>-1){
                            file = tmp[1]
                        }
                        merge_path = path.join(_path[key], file)
                    }

                    return require(merge_path)
                }
                else {
                    throw new Error('没有该文件或者路径错误');
                }
            }
            else {
                return require(file)
            }
        }

        reModulePath.addPath(base);
        reModulePath.addPath(base+'/public');

    }
}


module.exports = reRequire
