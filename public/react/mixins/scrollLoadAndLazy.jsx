//lazy用滚动

// var lazyFn = require('./_component/lazy')

//loadlist
var
SimplePageScrollMixin = require('./SimplePageScrollMixin'),
libs = require('libs/libs')

var
PageScrollStartEndMixin = {
    mixins: [SimplePageScrollMixin],
    componentDidMount: function() {
        this.isScrolling = false;
        this.scrollTop = 0;
        this.preLazy();
    },
    componentWillUnmount: function() {
        window.clearTimeout(this.ttt);
    },
    _onScroll: function() {
        var scrollTop =  libs.getOffset().top;
	    this.scrollTop = scrollTop;
	    this.isScrolling = true;

        window.clearTimeout(this.ttt);
	    this.ttt = window.setTimeout(this._onScrollEnd, 300);

	    if (typeof this.props.onscroll === 'function') {
	    	this.props.onscroll.call(this, scrollTop);
	    }

    },
    _onScrollEnd: function() {
    	var scrollTop =  libs.getOffset().top;
        if(scrollTop == this.scrollTop){
        	window.clearTimeout(this.ttt);
        	this.isScrolling = false;
	        var
	        // scrollbar = document.getElementById('scrollbar'),
			nDivHight  = libs.DocmentView().height,
			nScrollHight = document.documentElement.scrollHeight,
			nScrollTop = libs.getOffset().top;

            var that = this.getDOMNode()
			if( (nScrollTop + nDivHight) > (nScrollHight-100)){
	        	if (typeof this.props.onscrollend === 'function') {
	        		this.props.onscrollend.call(that, scrollTop);
	        	}
			};
            this.preLazy()
            if (this.props.lazyBlock){
                if (this.blocks){
                    lazyLoad(this.blocks);
                }
                else {
                    var block = this.props.lazyBlock;   //lazyBlock 指定的div的class
                    if (block && typeof block === 'string'){
                        var blocks = libs.getElementsByClassName(document, undefined, block)
                        this.blocks = blocks
                        lazyLoad(blocks);
                    }
                }
            }
        }
    },

    preLazy: function(){
        var that = this.getDOMNode()
        if (!this.imgs){
            var imgs = that.getElementsByTagName('img')
            this.imgs = imgs;
        }
        this.lazyLoad()
    },

    lazyLoad: function(elements,datas){
      if (!elements) elements = this.imgs;
      var
      that = this,
      holder = this.getDOMNode(),
      visibles = [],
      getOffset = libs.getOffset,
      DocmentView = libs.DocmentView,
      elements = libs.arg2arr(elements);

      var settings = {
          threshold       : 0,
          failure_limit   : 0,
          event           : "scroll",
          effect          : "show",
          container       : window,
          data_attribute  : "original",
          skip_invisible  : true,
          appear          : null,
          load            : null,
          error           : null,
          complete        : null,
          placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
      };

      function update() {
          var counter = 0;
          elements.map(function(element,i) {
              if (abovethetop(element, settings) ||
                  leftofbegin(element, settings)) {
                      /* Nothing. */
              } else if (!belowthefold(element, settings) &&
                  !rightoffold(element, settings)) {
                      if(element.getAttribute('data-src')){
                          var _src = element.getAttribute('data-src')
                          element.removeAttribute('data-src')
                          if (element.nodeName === 'IMG'){
                              element.src = _src;
                          }
                          else{
                              var api = libs.api;
                              api.req(_src, function(data){
                                  holder.innerHTML(data)
                              })
                          }
                      }
                    //   datas[i].src = datas[i].lsrc;
                      // $this.trigger("appear");
                      /* if we found an image we'll load, reset the counter */
                      counter = 0;
              } else {
                  if (++counter > settings.failure_limit) {
                      return false;
                  }
              }
          });

        //   that.setState({
        //     datas:datas
        //   });

      }

      belowthefold = function(element, settings) {
          var fold;
          if (settings.container === undefined || settings.container === window) {
              fold = (window.innerHeight ? window.innerHeight : DocmentView().height) + getOffset().top;
          } else {
              fold = getOffset(settings.container).top + getOffset(settings.container).height;
          }
          return fold <= getOffset(element).top - settings.threshold;
      };

      rightoffold = function(element, settings) {
          var fold;

          if (settings.container === undefined || settings.container === window) {
              fold = DocmentView().width + getOffset().left;
          } else {
              fold = getOffset(settings.container).left + getOffset(settings.container).width;
          }

          return fold <= getOffset(element).left - settings.threshold;
      };

      abovethetop = function(element, settings) {
          var fold;

          if (settings.container === undefined || settings.container === window) {
              fold = getOffset().top;
          } else {
              fold = getOffset(settings.container).top;
          }

          return fold >= getOffset(element).top + settings.threshold  + getOffset(element).height;
      };
      leftofbegin = function(element, settings) {
          var fold;

          if (settings.container === undefined || settings.container === window) {
              fold = getOffset().left;
          } else {
              fold = getOffset(settings.container).left;
          }
          return fold >= getOffset(element).left + settings.threshold + getOffset(element).width;
      };
      inviewport = function(element, settings) {
          return !rightoffold(element, settings) && !leftofbegin(element, settings) &&
            !belowthefold(element, settings) && !abovethetop(element, settings);
      };

      update();
    }
};

module.exports = PageScrollStartEndMixin;
