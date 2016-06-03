/**
 * alias
 * @wilson
 */

var path = require('path');
var configs = require('./config');

module.exports = {
    'root': path.resolve(path.join(__dirname, '../../../')),
    'pages': path.resolve(path.join(__dirname, '../../', configs.dirs.pages)),
    'vendor': path.resolve(path.join(__dirname, '../../', configs.dirs.vendor)),
    // 'modules': path.resolve(path.join(__dirname, '../../', configs.dirs.modules)),
    'modules': path.resolve(path.join(__dirname, '../../react/modules')),
    // 'widgets': path.resolve(path.join(__dirname, '../../', configs.dirs.widgets)),
    'widgets': path.resolve(path.join(__dirname, '../../react/widgets')),
    // 'mixins': path.resolve(path.join(__dirname, '../../', configs.dirs.mixins)),
    'mixins': path.resolve(path.join(__dirname, '../../react/mixins')),
    'libs': path.resolve(path.join(__dirname, '../../src/pc/js/libs')),

    // 组件
    // 'Swipe': path.resolve('modules/swipejs/swipe'),

    // 模块
    // 'Sp': path.resolve('modules/sp/sp'),
};
