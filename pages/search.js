var path = require('path')
var chalk = require('chalk');
var domain = require('domain');
var request = require('request')
var libs = require('../libs/libs')

var logErr = chalk.bold.red;
var logSucess = chalk.green;

var d = domain.create();
d.on('error',function(msg){
    console.log(msg);
});

//koa req
var req = function(api,options){

    function rp(err, rep, body){   //deal with response result
        if(error){
            throw new Error("async search: no respons data");
        }

        if (!error && response.statusCode == 200) {
            // console.log(body) // Show the HTML for the Google homepage.
            return body;
        }
    }

    return function(rp){
        request(api,rp);
  	}
}

// request('http://www.google.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage.
//   }
// })

function *demoIndexData(oridata){
    logSucess('pages/search.js');
    var apiData = yield req('http://120.25.223.175:5051/jh-web-portal/search-json.html?st=1&sc=%E7%BD%91');
    var jsonData = JSON.parse(apiData[1]);
    oridata = libs.$extend(true,oridata,jsonData);
    // libs.clog(oridata.pageBean.recordList[0]);
    return oridata;
}

module.exports = {
    getData : demoIndexData
}
