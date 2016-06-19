//lazy用滚动

// var lazyFn = require('./_component/lazy')

//loadlist
var SimplePageScrollMixin = require('./SimplePageScrollMixin'),
    libs = require('libs/libs'),
    scrollView = libs.scrollView,
    api = require('libs/api');


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
        var scrollTop =  scrollView(this._scrollContainer).top;
	    this.scrollTop = scrollTop;
	    this.isScrolling = true;

        window.clearTimeout(this.ttt);
	    this.ttt = window.setTimeout(this._onScrollEnd, 1000);

	    if (typeof this.props.onscroll === 'function') {
	    	this.props.onscroll.call(this, scrollTop);
	    }

    },
    _onScrollEnd: function() {
        $('.loadtype').hide()
    	var scrollTop =  scrollView(this._scrollContainer).top;
        if(scrollTop == this.scrollTop){
            var that = React.findDOMNode(this),
                nDivHight  = libs.getOffset(this._scrollContainer).height,
    			nScrollHight = scrollView(this._scrollContainer).height,
    			nScrollTop = scrollView(this._scrollContainer).top;

                window.clearTimeout(this.ttt);
                this.isScrolling = false;

			if( (nScrollTop + nDivHight) > (nScrollHight-100)){
                $('.loadtype').show()
	        	if (typeof this.props.onscrollend === 'function') {
                    // var _loadbar = React.findDOMNode(this.refs['loadbar']);
                    // $('.loadtype').parent().css({'height':'auto','margin':0,'padding':0})
                    // console.log($(_loadbar).parent());
                    // _loadbar.style.display = 'block'
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
        var that = React.findDOMNode(this)
        // if (!this.imgs){
            // var imgs = libs.arg2arr(libs.getElementsByClassName('lazyimg')||[])
            var imgs = _.toArray(libs.getElementsByClassName('lazyimg')||[])
            // var imgs2 = libs.arg2arr(document.getElementsByTagName('img')||[])
            var imgs2 = _.toArray(document.getElementsByTagName('img')||[])
            imgs = imgs.concat(imgs2)
            this.imgs = imgs;
        // }
        this.lazyLoad()
    },

    lazyLoad: function(elements,datas){
      if (!elements)
        elements = this.imgs;
      if (!elements.length)
        return

      var that = this,
          holder = React.findDOMNode(this),
          visibles = [],
          getOffset = libs.getOffset,
          DocmentView = libs.DocmentView,
          elements = _.toArray(elements);
        //   elements = libs.arg2arr(elements);

      var settings = {
          threshold       : 2000,
          failure_limit   : 0,
          event           : "scroll",
          effect          : "show",
          container       : this._scrollContainer,
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
              if (!element)
                  return;
              if (inviewport(element, settings)){
                  if(element.getAttribute('data-src')){
                      var _src = element.getAttribute('data-src')
                      if (element.nodeName === 'IMG'){
                          element.src = _src;
                      }
                      else{
                          api.req(_src, function(data){
                              holder.innerHTML(data)
                          })
                      }
                  }
                  if(element.getAttribute('data-imgsrc')){
                      var _src = element.getAttribute('data-imgsrc')
                      element.innerHTML = ''
                      libs.node.append(element, 'img', {
                          src: _src
                      })
                  }
              }
              else {
                  if (element.getAttribute('data-imgsrc')){
                      $(element).find('img').remove()
                  }
                  if (element.nodeName==='IMG'){
                      $(element).parent().addClass('lazyimg').attr('data-imgsrc', element.src)
                      $(element).remove()
                  }
              }
                //   if (abovethetop(element, settings) ||
                //       leftofbegin(element, settings)) {
                //           if(element.getAttribute('data-imgsrc')){
                //               $(element).find('img').remove()
                //           }
                //   } else if (!belowthefold(element, settings) &&
                //       !rightoffold(element, settings)) {
                //         //   datas[i].src = datas[i].lsrc;
                //           // $this.trigger("appear");
                //           /* if we found an image we'll load, reset the counter */
                //           counter = 0;
                //   } else {
                //       if (++counter > settings.failure_limit) {
                //           return false;
                //       }
                //   }
          });
      }

      function belowthefold(element, settings) {
          var fold;
          if (settings.container === undefined || settings.container === window) {
              fold = (window.innerHeight ? window.innerHeight : DocmentView().height) + scrollView().top;
          } else {
            //   fold = scrollView(settings.container).top + getOffset(settings.container).height;
              fold = getOffset(settings.container).bottom;
          }
          return fold <= getOffset(element).top - settings.threshold;
      };

      function rightoffold (element, settings) {
          var fold;

          if (settings.container === undefined || settings.container === window) {
              fold = DocmentView().width + scrollView().left;
          } else {
              fold = getOffset(settings.container).left + getOffset(settings.container).width;
          }

          return fold <= getOffset(element).left - settings.threshold;
      };

      function abovethetop (element, settings) {
          var fold;
          if (settings.container === undefined || settings.container === window) {
              fold = scrollView().top;
          } else {
              fold = getOffset(settings.container).top;
            //   console.log(getOffset(element).top + settings.threshold  + getOffset(element).height);
          }

          return fold >= getOffset(element).top + settings.threshold  + getOffset(element).height;
      };

      function leftofbegin(element, settings) {
          var fold;

          if (settings.container === undefined || settings.container === window) {
              fold = scrollView().left;
          } else {
              fold = getOffset(settings.container).left;
          }
          return fold >= getOffset(element).left + settings.threshold + getOffset(element).width;
      };
      function inviewport (element, settings) {
          return !rightoffold(element, settings) && !leftofbegin(element, settings) &&
            !belowthefold(element, settings) && !abovethetop(element, settings);
      };

      update();
    }
};

module.exports = PageScrollStartEndMixin;
