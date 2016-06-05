/*
 * lru cache
*/
var LRU = require('lru-cache'),
	options = { max: 500
		  , length: function (n, key) { return n * 2 + key.length }
		  , dispose: function (key, n) { n.close() }
		  , maxAge: 1000 * 60 * 60 },
	cache = LRU(options);

global.Cache = cache

cache.set('agzgz','yes you can use fkpjs full stack fragment')
