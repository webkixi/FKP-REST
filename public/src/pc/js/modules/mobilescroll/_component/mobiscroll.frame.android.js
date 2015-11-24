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

    $.mobiscroll.themes.frame.android = {
        dateOrder: 'Mddyy',
        mode: 'clickpick',
        height: 50,
        showLabel: false,
        btnStartClass: 'mbsc-ic mbsc-ic-play3',
        btnStopClass: 'mbsc-ic mbsc-ic-pause2',
        btnResetClass: 'mbsc-ic mbsc-ic-stop2',
        btnLapClass: 'mbsc-ic mbsc-ic-loop2'
    };

}));
