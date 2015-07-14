var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var rct = require('../../modules/parseReact');



function *demoIndexData(oridata){
    libs.clog('pages/mall/item_detail.js');
    var jsonData = {};
    var mtd = this.method;
    var local = this.local;	
    if(!!this.params.id){
        if(mtd === 'GET'){
        	var catId = this.params.id.substr(0,this.params.id.indexOf(".html"));
        }else if(mtd === 'POST'){

        }
    }

    oridata = libs.$extend(true,oridata,jsonData);

    return oridata;
}

module.exports = {
    getData : demoIndexData
}
