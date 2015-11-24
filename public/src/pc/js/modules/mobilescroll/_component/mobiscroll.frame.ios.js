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

    var themes = $.mobiscroll.themes.frame,
        theme = {
            display: 'bottom',
            dateOrder: 'MMdyy',
            rows: 5,
            height: 34,
            minWidth: 55,
            headerText: false,
            showLabel: false,
            btnWidth: false,
            selectedLineHeight: true,
            selectedLineBorder: 1,
            useShortLabels: true,
            deleteIcon: 'backspace3',
            checkIcon: 'ion-ios7-checkmark-empty',
            btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left5',
            btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right5',
            btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down5',
            btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up5',
            // @deprecated since 2.14.0, backward compatibility code
            // ---
            onThemeLoad: function (lang, s) {
                if (s.theme) {
                    s.theme = s.theme.replace('ios7', 'ios');
                }
            }
            // ---
        };

    themes.ios = theme;

    // @deprecated since 2.14.0, backward compatibility code
    themes.ios7 = theme;

}));
