/*
 * lru cache
*/
var md5 = require('md5');
var LRU = require('lru-cache'),
	options = { max: 500
		  , length: function (n, key) { return n * 2 + key.length }
		  , dispose: function (key, value) {  }
		  , maxAge: 1000 * 60 * 60 },
	cache = LRU(options);

var cac = {
	has: function(key){
		if (_.isString(key)){
			key = md5(key);
		}
		return cache.has(key)
	},
	get: function(key){
		if (_.isString(key)){
			key = md5(key);
		}
		return cache.get(key)
	},
	set: function(key, value, maxAge){
		if (_.isString(key)){
			key = md5(key);
		}
		return cache.set(key, value, maxAge)
	},
	peek: function(key){
		if (_.isString(key)){
			key = md5(key);
		}
		return cache.peek(key)
	},
	del: function(key){
		if (_.isString(key)){
			key = md5(key);
		}
		return cache.del(key)
	},
	reset: cache.reset,
	forEach: cache.forEach,
	rforEach: cache.rforEach,
	keys: cache.keys,
	values: cache.values,
	length: cache.length,
	itemCount: cache.itemCount,
	dump: cache.dump,
	load: cache.load,
	prune: cache.prune
}
global.Cache = cac

cache.set('agzgz','yes you can use fkpjs full stack fragment')
