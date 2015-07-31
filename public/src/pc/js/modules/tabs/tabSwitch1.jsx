var Store = require('mixins/store');

var attrClick = function(){
    $(this).click(function(){
        $(this).toggleClass('active');
        $(this).siblings().removeClass('active');
    })
}


//react Page
var Page = React.createClass({
    mixins: [Store('Page')],
    getInitialState: function() {
    	return {};
    },

    //插入真实 DOM之前
    componentWillMount: function(){
        if(this.props.data){
            this.setState({
                data: this.props.data
            })
        }

    },

    loopRender: function(){
        var items=[];
        var num = 5;
        if(this.state.data&&this.state.data.totalCount!=0){
	        var pageData = this.state.data;
	        var begin = 0;
	        if(pageData.currentPage-1-parseInt(num/2)>0)begin=pageData.currentPage-1-parseInt(num/2);//收个分页
	        if(pageData.pageCount - begin < num) num = pageData.pageCount - begin;//显示分页个数
	        if (pageData.currentPage!=1) items.push(<a href={"javascript:void(0)"} data-page={pageData.currentPage-1}>上一页</a>);
	        for (var i = 1; i <=num; i++) {
	        	if((begin+i)==pageData.currentPage)items.push(<span className={"active"}>{begin+i}</span>);
	        	else items.push(<a href={"javascript:void(0)"} data-page={begin+i}>{begin+i}</a>);
	        };
	        if (pageData.currentPage!=pageData.pageCount) items.push(<a href={"javascript:void(0)"} data-page={pageData.currentPage+1}>下一页</a>);
	    }
        return items;
    },
    //已加载组件收到新的参数时调用
    componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    },

    render: function () {
        var fill = this.loopRender();
        return(
            <div className={'reactPage'} style={{width:'100%',height:'auto'}} >
                {fill}
            </div>
        )
    }
});


//react cnt
var Cnt = React.createClass({
    mixins: [Store('Cnt')],
    getInitialState: function() {
         SA.setter('tabswitch',{}, this.act);
        return {};
    },

    //插入真实 DOM之前
    componentWillMount: function(){
        if(this.props.data){
            this.setState({
                data: this.props.data
            })
        }

        if(this.props.hddata){
            this.setState({
                hddata: this.props.hddata
            })
        }
        if(this.props.itemWidth){
            this.setState({
                itemWidth: this.props.itemWidth
            })
        }
    },

    loopRender: function(){
        var items=[];
        var th = [];
        var tbd = []
        if(this.state.hddata){
            var tiemWidth = [];
            if(this.state.itemWidth) tiemWidth=this.state.itemWidth;
                this.state.hddata.map(function(item,i){
                    th.push(
                            <th width={tiemWidth[i]>0?tiemWidth[i]:""}>{item}</th>
                        )
            })
        }
        if(this.state.data){
            this.state.data.recordList.map(function(item){
                tbd.push(
                        <tr>
                            {(function(){
                                var tds =[];
                                item.map(function(td){
                                    tds.push(
                                            <td>{td}</td>
                                        )
                                })
                                return  tds;
                            })()}
                        </tr>
                    )
            })
        }
        items.push(
                <thead>
                    <tr>
                        {th}
                    </tr>
                </thead>
            )
        items.push(
                <tbody>
                    {tbd}
                </tbody>
            )
        return items;
    },
    //已加载组件收到新的参数时调用
    componentWillReceiveProps:function(nextProps){
        if(nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    },

    render: function () {
        var fill = this.loopRender();
        return(
            <table className={'table table-hover table-org'} style={{width:'100%',height:'auto'}} >
                {fill}
            </table>
        )
    }
});

//react tabswitch
var tabswitch = React.createClass({
    mixins: [Store('tabswitch')],
	getDefaultProps: function() {
		return { }
	},

	getInitialState: function() {
        this.addSheet();
		return {
        	data: [],
            hdData: [],
            itemWidth:[]

	    };
	},

    addSheet: function(){
        //添加css到头部
        tabcss = '.tabswitch{border:1px solid #efefef;\n margin-bottom:10px;}'
        //libs.addSheet([tabcss,'tabswt']);
    },

	//插入真实 DOM之前
	componentWillMount:function(){
        var that = this;
        if(that.props.data){
            that.setState({
                data: that.props.data
            })
        }

        if(that.props.thdData){
            that.setState({
                hdData: that.props.thdData
            })
        }
        if(that.props.itemWidth){
            that.setState({
                itemWidth: that.props.itemWidth
            })
        }
	},

	componentDidMount: function() {
        if(this.props.itemMethod){
        	this.props.itemMethod.call(this);
        }
    },


    renderChilds: function(){

    },

	render:function(){

		return <div className={'tabswitch'}>
                <Cnt data={this.state.data} hddata={this.state.hdData}  itemWidth={this.state.itemWidth} />
				<Page data={this.state.data}/>
          </div>
	}
});

module.exports = tabswitch;
