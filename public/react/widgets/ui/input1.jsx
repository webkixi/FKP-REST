var ItemMixin = require('../../mixins/item')
// <Radio data={name: [], id: [], title: [], rtitle:[], cb: fn} />

function mk_fill(ddd){
    var item = ddd;
    var _id = item.input.id || '',
        _name = item.input.name || 'noname'
        _type = item.input.type || 'text'
        _value = item.input.value || ''
        _placehold = item.input.placehold || ''

        _title = item.title || ''
        _desc = item.desc || ''
        _class = item.class ? 'inputItem '+item.class : 'inputItem';

        return (
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
                            return <input placeholder={_placehold} type={_type} name={_name} id={_id} defaultValue={_value} className='form_control'/>
                        }
                        return <input type={_type} name={_name} id={_id} defaultValue={_value} className='form_control'/>
                    }
                    if (_.indexOf($button_type, _type)>-1){
                        return <input type={_type} name={_name} id={_id} defaultValue={_value} className='btn'/>
                    }
                })()}
                <span className="fkp-input-box" />
                {(function(){
                    if (_desc)
                        return <span className="fkp-desc">{_desc}</span>
                })()}
            </lable>
        )

}

var Input = React.createClass({
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
            /*
                // CASE I
                var inputs = [
                    {
                        input:{
                            name:      'aaa',
                            id:        'aaa',
                            value:     null,
                            type:      'text',
                            placehold: '聊天内容'
                        },
                        title:     '聊天',
                        class:     null,
                        desc:      null
                    },
                    {
                        input:{
                            name:      'bbb',
                            id:        'bbb',
                            value:     '发射',
                            type:      'button',
                            placehold: null
                        },
                        title:     null,
                        class:     'chatSubmit',
                        desc:      null
                    }
                ]

                // CASE II
                var inputs = {
                    name:      ['aaa' , 'bbb'],
                    id:        ['aaa' , 'bbb'],
                    type:      ['text', 'button'],
                    title:     ['聊天' , ''],
                    value:     [null    , '发射'],
                    class:     [null    , 'chatSubmit'],
                    placehold: ['聊天内容']
                }
            */

            var me = this;
            var eles= this.props.data;

            if (_.isArray(eles)){
                eles.map(function(item, i){
                    me.fills.push( mk_fill(item) )
                })
            }

            if (_.isObject(eles)){
                var data = this.props.data

                if (data.name)
                   this.names = _.isArray(data.name) ? data.name : ['noname']

                if (data.type)
                   this.types = _.isArray(data.type) ? data.type : ['text']

                if (data.id)
                   this.ids = _.isArray(data.id) ? data.id : ['']

                if (data.title)
                   this.titles = _.isArray(data.title) ? data.title : ['']

                if (data.desc)
                   this.descs = _.isArray(data.desc) ? data.desc : ['']

                if (data.value)
                   this.values = _.isArray(data.value) ? data.value : ['']

                if (data.class)
                   this.classes = _.isArray(data.class) ? data.class : ['']

                if (data.placehold)
                   this.pholds = _.isArray(data.placehold) ? data.placehold : ['']


                var _input = [];

                if (this.names.length){
                    this.names.map(function(item, i){
                        _input.push({
                            input: {
                                name: item,
                                id: me.ids[i],
                                type: me.types[i],
                                value: me.values[i],
                                placehold: me.pholds[i]
                            },
                            title: me.titles[i],
                            class: me.classes[i],
                            desc: me.descs[i]
                        })
                    })

                    _input.map(function(item, i){
                        me.fills.push( mk_fill(item) )
                    })

                }
            }

            this.setState({
                fill: this.fills
            })
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

module.exports = Input;
