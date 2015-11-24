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
        window.utill = factory(jQuery);
    }

}(function ($) {
    $.mobiscroll.themes.frame['ios-classic'] = {
        display: 'bottom',
        dateOrder: 'MMdyy',
        rows: 5,
        height: 30,
        minWidth: 60,
        headerText: false,
        showLabel: false,
        btnWidth: false,
        selectedLineHeight: true,
        selectedLineBorder: 2,
        useShortLabels: true
    };
}));
