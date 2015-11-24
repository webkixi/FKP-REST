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
            dateOrder: 'Mddyy',
            //mode: 'mixed',
            rows: 5,
            minWidth: 76,
            height: 36,
            showLabel: false,
            selectedLineHeight: true,
            selectedLineBorder: 2,
            useShortLabels: true,
            icon: { filled: 'star3', empty: 'star' },
            btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down6',
            btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up6',
            // @deprecated since 2.12.0, backward compatibility code
            // ---
            onThemeLoad: function (lang, s) {
                if (s.theme) {
                    s.theme = s.theme.replace('android-ics', 'android-holo');
                }
            },
            // ---
            onMarkupReady: function (markup) {
                markup.addClass('mbsc-android-holo');
            }
        };

    themes['android-holo'] = theme;
    themes['android-holo-light'] = theme;

    // @deprecated since 2.12.0, backward compatibility code
    themes['android-ics'] = theme;
    themes['android-ics light'] = theme;
    themes['android-holo light'] = theme;

}));
