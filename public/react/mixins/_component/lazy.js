var lazyLoad = function(elements,datas){
  var
  that = this,
  visibles = [],
  getOffset = libs.getOffset,
  DocmentView = libs.DocmentView,
  elements = _.toArray(elements);
  // elements = libs.arg2arr(elements);


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
                  datas[i].src = datas[i].lsrc;
                  // $this.trigger("appear");
                  /* if we found an image we'll load, reset the counter */
                  counter = 0;
          } else {
              if (++counter > settings.failure_limit) {
                  return false;
              }
          }
      });

      that.setState({
        datas:datas
      });

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

module.exports = lazyLoad
