var ItemMixin = require('../../mixins/item')
var libs = require('../libs/libs')

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
        this.titles = [],
        this.values = [],
        this.fills = [];
        var checked;
        var _cls = 'fkp-radio-box'

        if (this.props.data){
            var data = this.props.data

            if (data.name)
                this.names = libs.type(data.name) === 'Array' ? data.name : ['noname']

            if (data.id)
                this.ids = libs.type(data.id) === 'Array' ? data.id : ''

            if (data.title)
                this.titles = libs.type(data.title) === 'Array' ? data.title : ['notitle']

            if (data.value)
                this.values = libs.type(data.value) === 'Array' ? data.value : ['novalue']

            if (this.names.length){
                var names = this.names
                var me = this;
                names.map(function(item, i){
                    var _id = me.ids[i] ? me.ids[i] : '',
                        _title = me.titles[i] ? me.titles[i] : 'notitle',
                        _value = me.values[i] ? me.values[i] : 'novalue',
                        _input = [],
                        _active = ''

                    if (_value
                    && _value!=='novalue'
                    && parseInt(_value)<0){
                        checked = true;
                        _cls = 'fkp-radio-box'
                        _value = _value.replace('-','')
                    }
                    else {
                        checked = false;
                    }
                    if (_title){
                        _input.push(
                            <lable className="radioItem">
                                {(function(){
                                    if (checked){
                                        return <input defaultChecked type="radio" name={item} id={_id} value={_value}/>
                                    }
                                    else {
                                        return <input type="radio" name={item} id={_id} value={_value}/>
                                    }
                                })()}
                                <span className="fkp-radio-box" />
                                <span className="fkp-lable">{_title}</span>
                            </lable>
                        )
                    }                     
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
                <div className="radioGroup">
                    {fill}
                </div>
            )
        }
        else {
            var checked, _id='', _val='novalue', _name='noname', _title='notitle';
            if (this.props.id)
                _id = this.props.id

            if (this.props.name)
                _name  = this.props.name

            if (this.props.value)
                _val = this.props.value

            if (this.props.title)
                _title = this.props.title

            if (_val
            && _val!=='novalue'
            && parseInt(_val)<0){
                checked = true;
                _val = _val.replace('-','')
            }
            else {
                checked = false;
            }

            return (
                <div className="radioGroup">
                    <lable className="radioItem">
                        {(function(){
                            if (checked){
                                return <input defaultChecked type="radio" name={_name} id={_id} value={_val}/>
                            }
                            else {
                                return <input type="radio" name={_name} id={_id} value={_val}/>
                            }
                        })()}
                        <span className="fkp-radio-box" />
                        <span className="fkp-lable">{_title}</span>
                    </lable>
                </div>
            )
        }
	}
});

module.exports = Radio;
