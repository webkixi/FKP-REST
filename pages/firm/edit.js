var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');


function *demoIndexData(oridata){
    libs.wlog('pages/firm/edit.js')
    var mtd = this.method;
    var local = this.local;
    var apiData = [];
    if(mtd==='GET'){

    }else if(mtd==='POST'){
    	
    }
    return oridata
}

module.exports = {
    getData : demoIndexData
}