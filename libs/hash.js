
var crypto = require('crypto');

function md5(str){
	var m5 = crypto.createHash('md5');
	m5.update(str);
	return m5.digest('hex');
}
// //加密
// function encrypt(str, secret) {
//     var cipher = crypto.createCipher('aes192', secret);
//     var enc = cipher.update(str, 'utf8', 'hex');
//     enc += cipher.final('hex');
//     return enc;
// }
// //解密
// function decrypt(str, secret) {
//     var decipher = crypto.createDecipher('aes192', secret);
//     var dec = decipher.update(str, 'hex', 'utf8');
//     dec += decipher.final('utf8');
//     return dec;
// }

function HashMap() {  
    var size = 0;  
    var entry = new Object();            
    this.put = function (key, value) {  
        var nkey = md5(key);
        entry[nkey] = value;  
        size++;  
    };
    this.putAll = function (map) {  
        if (typeof map == "object" && !map.sort) {  
            for (var key in map) {  
                this.put(key, map[key]);  
            }  
        } else {  
            throw "输入类型不正确，必须是HashMap类型！";  
        }  
    };           
    this.get = function (key) {  
        var nkey = md5(key);
        if(entry[nkey])
            return entry[nkey];
    };            
    this.remove = function (key) {  
        var nkey = md5(key);
        if(entry[nkey]){
            if (size == 0)  
                return;  
            delete entry[nkey];  
            size--;  
        }
    };          
    this.containsKey = function (key) {  
        var nkey = md5(key);
        if (entry[nkey]) {  
            return true;  
        }  
        return false;  
    };            
    this.containsValue = function (value) {  
        for (var key in entry) {  
            if (entry[key] == value) {  
                return true;  
            }  
        }  
        return false;  
    };            
    this.clear = function () {  
        entry = new Object();  
        size = 0;  
    };            
    this.isEmpty = function () {  
        return size == 0;  
    };            
    this.size = function () {  
        return size;  
    };            
    this.keySet = function () {  
        var keys = new Array();  
        for (var key in entry) {  
            keys.push(key);  
        }  
        return keys;  
    };           
    this.entrySet = function () {  
        var entrys = new Array();  
        for (var key in entry) {  
            var et = new Object();  
            et[key] = entry[key];  
            entrys.push(et);  
        }  
        return entrys;  
    };            
    this.values = function () {  
        var values = new Array();  
        for (var key in entry) {  
            values.push(entry[key]);  
        }  
        return values;  
    };           
    this.each = function (cb) {  
        for (var key in entry) {  
            cb.call(this, key, entry[key]);  
        }  
    };            
    this.toString = function () {  
        return __obj2str(entry);  
    };      
}

exports.hash = function(){
	return new HashMap();
}
// module.exports = co['default'] = co.co = co;