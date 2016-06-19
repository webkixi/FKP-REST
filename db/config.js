// 数据库配置文件
var fs = require('fs')
var path = require('path')
var libs = require('libs/libs')
libs.clog('//数据库配置文件//---'+__filename)
process.env.dbconfig = '当前数据库连接至agzgz.com，该账号不能添加文章';

var _config = {
    mongo: {
        url: "mongodb://58.96.191.90:27017/fkp",
        options: {
            db: { native_parser: true },
            server: { poolSize: 3 },
            replset: { rs_name: 'myReplicaSetName' },
            user: 'fkp',
            pass: 'a123456'
        },
        pageSize: 20
    },
    // 使用 ./ly dev test 或者 ./ly pro test
    // 方式运行
    test: {
        mongo: {
            url: "mongodb://localhost:27017/fkp",
            options: {
                db: { native_parser: true },
                server: { poolSize: 3 },
                replset: { rs_name: 'myReplicaSetName' },
                user: 'fkp',
                pass: 'a123456'
            },
            pageSize: 20
        }
    }
}

var _o_path = path.join( __filename, '../../../configs/config.js')
var _o_config = fs.existsSync(_o_path);
if (_o_config){
    process.env.dbconfig = '';
    var _c = require(_o_path)
    _config = _c
    console.log(_c);
}

module.exports = _config
