/**
 * Module dependencies.
 */
var api = require('../apis/javaapi');
//加密
function *getRegion(code, secret) {
    if(!code) code = 0;
    var id = {regionId: code};
    var provinces = yield api.pullApiData('region',id);
    return provinces;
}
//解密
function *city(code, secret) {
}
//解密
function *county(code, secret) {
}
module.exports = {
    getRegion: getRegion,
    city: city,
    county: county
}
