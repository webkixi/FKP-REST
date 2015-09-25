/**
 * alias
 * @wilson
 */

var path = require('path');
var configs = require('./config');

module.exports = {
    'pages': path.resolve(path.join(__dirname, '../../', configs.dirs.pages)),
    'vendor': path.resolve(path.join(__dirname, '../../', configs.dirs.vendor)),
    'modules': path.resolve(path.join(__dirname, '../../', configs.dirs.modules)),
    'widgets': path.resolve(path.join(__dirname, '../../', configs.dirs.widgets)),
    'stores': path.resolve(path.join(__dirname, '../../', configs.dirs.stores)),
    'mixins': path.resolve(path.join(__dirname, '../../', configs.dirs.mixins)),
    'libs': path.resolve(path.join(__dirname, '../../', configs.dirs.libs)),


    // 组件
    'Swipe': path.resolve('modules/swipejs/swipe'),

    // 模块
    'Sp': path.resolve('modules/sp/sp'),
};
