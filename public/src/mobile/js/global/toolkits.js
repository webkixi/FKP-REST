;(function(){

    var toolkits = {};

    /**
     * 封装console.log
     */
    toolkits.log = function(){
        console && console.log && console.log.apply( console, arguments )
    }


})();
