var
SimplePageScrollMixin = require('./SimplePageScrollMixin');

var 
PageScrollStartEndMixin = {
    mixins: [SimplePageScrollMixin],
    componentDidMount: function() {
        this.isScrolling = false;
        this.scrollTop = 0;
    },
    componentWillUnmount: function() {
        window.clearTimeout(this.ttt);
    },
    _onScroll: function() {
        var
		scrollTop =  libs.getOffset().top;
	    this.scrollTop = scrollTop;
	    this.isScrolling = true;

        window.clearTimeout(this.ttt);
	    this.ttt = window.setTimeout(this._onScrollEnd, 300);

	    if (typeof this.props.onscroll === 'function') {
	    	this.props.onscroll.call(this, scrollTop);
	    }

    },
    _onScrollEnd: function() {
    	var
        scrollTop =  libs.getOffset().top;
        if(scrollTop == this.scrollTop){
        	window.clearTimeout(this.ttt);
        	this.isScrolling = false;
	        var 
	        scrollbar = document.getElementById('scrollbar'),
			nDivHight  = libs.DocmentView().height,
			nScrollHight = document.documentElement.scrollHeight,
			nScrollTop = libs.getOffset().top;

			if(nScrollTop + nDivHight >= nScrollHight){				
	        	if (typeof this.props.onscrollend === 'function') {
	        		this.props.onscrollend.call(this, scrollTop);
	        	}
			};
        }
    },
};

module.exports = PageScrollStartEndMixin;
