//fixedbar
var libs = require('libs/libs');
var SimplePageScrollMixin = require('./SimplePageScrollMixin');

var sheet = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 'auto',
    height: 'auto'
};

var PageScrollStartEndMixin = {
    mixins: [SimplePageScrollMixin],

    getInitialState: function() {
  		return {
          	sheets: {}
  	    };
  	},

    componentWillMount: function(){
      var sheets = ['width','height','top','left','right','bottom','ele','to'];
      for(var item in this.props){
      		if(libs.lodash.indexOf(sheets,item)){
              sheet[item] = this.props[item];
          }
      }

      this.setState({
          sheets: sheet
      });

      if(this.props.className)
          this.className+=' '+this.className;
    },

    componentDidMount: function() {
        this.isScrolling = false;
        this.scrollTop = 0;
    },

    componentWillUnmount: function() {
        window.clearTimeout(this.ttt);
    },

    _onScroll: function() {
        var scrollTop =  libs.getOffset().top;
  	    this.scrollTop = scrollTop;
  	    this.isScrolling = true;

        if(scrollTop>parseInt(this.state.sheets.to)){
            if(!document.getElementById('fixedbarid')){ //动态插入style
                var csstext = '#'+this.state.sheets.ele+','+'.fixedbar{'
                for(var atr in this.state.sheets){
                    if(atr!=='ele'||atr!=='to')
                        csstext+=atr+':'+this.state.sheets[atr]+';\n';
                }
                csstext+='}';
                libs.addSheet([csstext,'fixedbarid']);
            }

            window.clearTimeout(this.ttt);
      	    this.ttt = window.setTimeout(this._onScrollEnd, 0);

            if (typeof this.props.onscroll === 'function')
        	    	this.props.onscroll.call(this, scrollTop);
        }else{
            if(document.getElementById('fixedbarid')){ //动态插入style
                var fixedbarid = document.getElementById('fixedbarid');
                libs.node.remove(fixedbarid)
            }
        }
    },

    _onScrollEnd: function() {
      	var scrollTop =  libs.getOffset().top;
        if(scrollTop == this.scrollTop){

            window.clearTimeout(this.ttt);
          	this.isScrolling = false;

  	        var scrollbar = document.getElementById('scrollbar'),
      			nDivHight  = libs.DocmentView().height,
      			nScrollHight = document.documentElement.scrollHeight,
      			nScrollTop = libs.getOffset().top;

      			if(nScrollTop + nDivHight >= nScrollHight){
    	        	if (typeof this.props.onscrollend === 'function')
      	        		this.props.onscrollend.call(this, scrollTop);
    			  }
        }
    }
};

module.exports = PageScrollStartEndMixin;
