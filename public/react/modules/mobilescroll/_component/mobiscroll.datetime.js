(function (factory) {
    "use strict";
    if(!window.jQuery){
        var jQuery = Zepto
    }
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = factory(jQuery);
    }
    else if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define([], factory(jQuery));
    } else {
        // no AMD; invoke directly
        window.datetime = factory(jQuery);
    }
}(function ($) {

    $.each(['date', 'time', 'datetime'], function (i, v) {
        $.mobiscroll.presetShort(v);
    });

}))
