var ItemMixin = require('../../mixins/item')
var libs = require('../libs/libs')
var _ = libs.lodash;
// <Radio data={name: [], id: [], title: [], rtitle:[], cb: fn} />

var Radio = React.createClass({
    mixins: [ItemMixin],
	getInitialState:function(){
		return {
            fill: false
		}
	},
	//插入真实 DOM之前
	componentWillMount:function(){
        this.names = [],
        this.ids = [],
        this.types = [],
        this.titles = [],
        this.descs = [],
        this.values = [],
        this.classes = [],
        this.pholds = [],
        this.fills = [];
        var checked;
        var _cls = 'fkp-radio-box'

        if (this.props.data){
            var data = this.props.data

            if (data.name)
                this.names = libs.type(data.name) === 'Array' ? data.name : ['noname']

            if (data.type)
                this.types = libs.type(data.type) === 'Array' ? data.type : ['text']

            if (data.id)
                this.ids = libs.type(data.id) === 'Array' ? data.id : ['']

            if (data.title)
                this.titles = libs.type(data.title) === 'Array' ? data.title : ['']

            if (data.desc)
                this.descs = libs.type(data.desc) === 'Array' ? data.desc : ['']

            if (data.value)
                this.values = libs.type(data.value) === 'Array' ? data.value : ['']

            if (data.class)
                this.classes = libs.type(data.class) === 'Array' ? data.class : ['']

            if (data.placehold)
                this.pholds = libs.type(data.placehold) === 'Array' ? data.placehold : ['']

            if (this.names.length){
                var names = this.names
                var me = this;
                names.map(function(item, i){
                    var _id = me.ids[i] ? me.ids[i] : '',
                        _type = me.types[i] ? me.types[i] : 'text',
                        _title = me.titles[i] ? me.titles[i] : '',
                        _desc = me.descs[i] ? me.descs[i] : '',
                        _value = me.values[i] ? me.values[i] : '',
                        _class = me.classes[i] ? 'inputItem '+me.classes[i] : 'inputItem',
                        _placehold = me.pholds[i] ? me.pholds[i] : '',

                        _input = [],
                        _active = '';

                        _input.push(
                            <lable className={_class}>
                                {(function(){
                                    if (_title)
                                        return <span className="fkp-title">{_title}</span>
                                })()}
                                {(function(){
                                    var $text_type = ['text', 'password', 'select'],
                                        $phold_type =['text'],
                                        $button_type = ['button','submit']

                                    if (_.indexOf($text_type, _type)>-1){
                                        if (_.indexOf($phold_type, _type)>-1){
                                            return <input placeholder={_placehold} type={_type} name={item} id={_id} value={_value} className='form_control'/>
                                        }
                                        return <input type={_type} name={item} id={_id} value={_value} className='form_control'/>
                                    }
                                    if (_.indexOf($button_type, _type)>-1){
                                        return <input type={_type} name={item} id={_id} value={_value} className='btn'/>
                                    }
                                })()}
                                <span className="fkp-input-box" />
                                {(function(){
                                    if (_desc)
                                        return <span className="fkp-desc">{_desc}</span>
                                })()}
                            </lable>
                        )
                    me.fills.push(_input)
                })
            }

            if (this.fills.length){
                this.setState({
                    fill: this.fills
                })
            }
        }
	},
	// //插入真实 DOM之后
	// componentDidMount:function(){
    //
	// },
	// //被重新渲染之前
	// componentWillUpdate:function(){
    //
	// },
	// //被重新渲染之后
	// componentDidUpdate:function(){
    //
	// },
	// //移出真实 DOM之前
	// componentWillUnmount:function(){
    //
	// },
	// //已加载组件收到新的参数时调用
	// componentWillReceiveProps:function(){
    //
	// },
	// //组件判断是否重新渲染时调用
	// shouldComponentUpdate:function(){
	// 	return true;
	// },
    //
	// handleClick:function(){
    //
	// },
	render:function(){
        var fill = this.state.fill ? this.state.fill : false;
        if (fill){
            return (
                <div className="inputGroup">
                    {fill}
                </div>
            )
        }
	}
});

module.exports = Radio;
