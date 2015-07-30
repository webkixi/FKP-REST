var libs = require('libs/libs');
var Store = require('mixins/store');

var SelectBar = React.createClass({
	mixins: [Store('SelectBar')],
	getInitialState: function() {
        this.addSheet();
		return {
			data: []
		}
	},
	componentWillMount: function(){
		if(this.props.data){
			this.setState({
				data: this.props.data
			})
		}
	},
	componentDidMount: function () {
		if(this.props.itemMethod){
			var mtd = this.props.itemMethod;
			if(typeof mtd==='function'){
				mtd.call(this.getDOMNode());
			}
		}
	},
    addSheet: function(){
        //添加css到头部
        selectcss = '\n.tab-select{ width:100%;\
            padding:20px;\
            height:100px;\
            line-height:60px;\
        }\n\
        .tab-select .lable{}\n\
        .tab-select .lable span{\
            font-family: "Microsoft YaHei","微软雅黑","Helvetica Neue",Helvetica,Arial,sans-serif;\
            font-size: 16px;\
            font-weight: bold;\
        }\n\
        .tab-select .lable a{\
            display: inline-block;\
            margin-left: 10px;\
        }\
        ';
        libs.addSheet([selectcss,'tabselect']);
    },
	componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    },
	renderContent: function(){
		if(this.state.data && this.state.data.length){
			var contents = [];
			var cnts = this.state.data;
			cnts.map(function(item){
				contents.push(
					<a href={'javascript:;'}>{item}</a>
				)
			})
			return contents;
		}
	},
    render: function () {
        var fill = this.renderContent();
        return(
            <div className={'tab-select'}>
                <div className={'lable'}><span>{"您选择的是："}</span>{fill}</div>
            </div>
        )
    }
});

module.exports = SelectBar;
