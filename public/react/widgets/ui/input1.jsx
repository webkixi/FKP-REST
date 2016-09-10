var ItemMixin = require('react/mixins/item')
var Radio = require('./radio');


/*
 * 生成select的表单
 * item 配置
*/
function mk_select(item){
  var _id = item.input.id || '',
      _name = item.input.name || 'noname'
      _type = item.input.type || 'text',
      _value = item.input.value || '',
      _placehold = item.input.placehold || '',

      _title = item.title || '',
      _desc = item.desc || '',
      _class = item.class ? 'inputItem '+item.class : 'inputItem';

      var _select;
      var options = [];

    if (_.isObject(item.union)){
        var unionObj = <span className="iconfont fkp-dd">
            <input type='text' className="form_control fkp-dd-input" name={_name} id={_id} placeholder={_placehold} defaultValue=''/>
        </span>

        return (
            unionObj
        )
    }

    // select的option
    // _value必须为二维数组  _value = [ [...], [...], [...]]
    // 第一个数组为 option value   required
    // 第二个数组为 option text    required
    // 第三个数组为 option custom value，以 data-attr 作为option的二外参数    not required
    else
    if (_.isArray(_value)){
        _vals = _value[0];
        _texts = _value[1]||[];
        _attrs = _value[2]||[];
        if (_vals.length !== _texts.length){
            return <span>select配置，请检查配置</span>  // select config error，must be array
        }
        else {
            var $val='请选择',    // pleas selected
                $attr='';        // data-attr

            _vals.map(function(_val, i){
                _val = _val.toString();
                if (_val){
                  if (_attrs){
                      $attr = _attrs[i]
                  }
                  if(_val.indexOf('-')===0){
                      $val = _val.replace('-','')
                      options.push(
                          <li data-value={$val} key={'opts'+i} data-attr={$attr}>{_texts[i]}</li>
                      )
                  }
                  else {
                      options.push(
                          <li className="fkp-dd-option" key={'opts'+i} data-attr={$attr} data-value={_val}>{_texts[i]}</li>
                      )
                  }
                }
            })
            _select = <ul>{options}</ul>
            return (
              <span className="iconfont fkp-dd">
                <input type='text' className="form_control fkp-dd-input" name={_name} id={_id} placeholder={_placehold} defaultValue=''/>
                {_select}
              </span>
            )
        }
    }
    return (
      <span>请检查select配置</span>
    )
}


/*
 * mk_element
 * 分析配置文件，并输出结构
 *
 */
function mk_element(ddd, _i){
    var self = this;
    var item = ddd;
    var _id = item.input.id || '',
        _name = item.input.name || 'noname',
        _type = item.input.type || 'text',
        _value = item.input.value || '',
        _placehold = item.input.placehold || '',

        _title = item.title || '',
        _desc = item.desc || '',
        _class = item.class ? 'inputItem '+item.class : 'inputItem';

    var $text_type = ['text', 'password', 'select', 'tel'],
        $phold_type =['text'],
        $radio_check = ['radio','checkbox'],
        $button_type = ['button','submit'];

    var lableObj;

    function whatElement(){
      if (_.indexOf($text_type, _type)>-1){
        if (_type === 'select'){
            return mk_select.call(self, item)
        }
        if (_.indexOf($phold_type, _type)>-1){
            return <input placeholder={_placehold} type={_type} name={_name} id={_id} defaultValue={_value} className='form_control'/>
        }
        return <input type={_type} name={_name} id={_id} defaultValue={_value} className='form_control'/>
      }
      if (_.indexOf($button_type, _type)>-1){
        return <input type={_type} name={_name} id={_id} defaultValue={_value} className='btn'/>
      }
    }

    // radio
    if (_.indexOf($radio_check, _type)>-1){
        lableObj = <Radio key={'radioGroup'+_i} data={item.input}/>
    }

    // 'text', 'password', 'select', 'tel'
    else {
        lableObj = <lable key={"lable"+_i} className={_class + ' for-' + _name}>
          {_title ? <span className="fkp-title">{_title}</span> : false}
          {whatElement()}
          <span className="fkp-input-box" />
          {_desc ? <span className="fkp-desc">{_desc}</span> : false}
        </lable>
    }



    if (_.isObject(item.union)){
        item.union.target = {
            id: _id,
            name: _name,
            type: _type,
            item: item
        }
        this.intent.push( item.union )
    }

    return (
        lableObj
    )

}

/*
 * inputs
 * Input批量产出form表单，目前支持 text/hiden/password/tel
 * ==========================================================================================
 * 方案1
    var _input_config = {
        name:      ['user', 'message' , 'submit'],
        id:        ['user', 'message' , 'submit'],
        type:      ['text', 'text', 'button'],
        title:     ['姓名' , '聊天' , ''],
        value:     [null  , null  , '发射'],
        class:     ['user'  ,null  , 'chatSubmit'],
        placehold: [null  , '请输入聊天内容']
    }
 * ==========================================================================================
 * 方案2
 * var _input_config = [
     //0
     'Radio & Checkbox',    //分割线加标题
     {
         input:{
             type: 'radio',               // checkbox/text/tel/password/select/button
             name: ['ddd', 'ddd', 'ddd'],
             title: ['选项1', '选项2', '选项3'],
             value: ['1', '2', '3']
         }
     },
     {
         input:{
             name:      'user',
             id:        'user',
             value:     null,
             type:      'text',
             placehold: '我的id是user'
         },
         title:     '姓名',
         class:     null,
         desc:      '*用户名'
     },

     {
         input:{
             name:      'message',
             id:        'message',
             value:     null,
             type:      'text',
             placehold: '绑定user'
         },
         title:     '聊天',
         class:     null,
         desc:      null,
         union: {                   // 联动配置，联动user的value
             id: "user",
             cb: function(form){    
                 // this是message的父级lable
                 libs.msgtips('我是message,我关联姓名');
                 $('#user').on('input',function(){
                     $('#message').val($('#user').val())
                     form.message = $('#user').val()
                 })
             }
         }
     },
     ....
     ....
* ==========================================================================================
*/
var Input = {
  mixins: [ItemMixin],
	getInitialState:function(){
		return {
      fill: false
		}
	},
	//插入真实 DOM之前
	componentWillMount:function(){
    if (this.props.data){
      this.setState({
          fill: this.props.data
      })
    }
	},

  _preRender: function(){
      this.intent = [];
      var self = this;
      this.names = [];
      this.ids = [];
      this.types = [];
      this.titles = [];
      this.descs = [];
      this.values = [];
      this.classes = [];
      this.pholds = [];
      this.fills = [];
      var checked;
      var _cls = 'fkp-radio-box';

      if (this.state.fill){

          var self = this;
          var eles= this.state.fill;

          if (_.isArray(eles)){
              eles.map(function(item, i){
                  if( _.isString(item)){
                      self.fills.push(<div key={'split'+i} className="split">{item}</div>)
                  }
                  else {
                      self.fills.push( mk_element.call(self, item, i) )
                  }
              })
          }

          if (_.isObject(eles)){
              var data = this.state.fill

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

              if (this.names.length||this.ids.length){
                  var _eles = _.gte(this.names.length, this.ids.length) ? this.names : this.ids;
                  this.names.map(function(item, i){
                      _input.push({
                          input: {
                              name: me.names[i],
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
                      me.fills.push( mk_element.call(self, item) )
                  })

              }
          }
      }
  },
	render:function(){
        this._preRender()
        var fill = this.fills ? this.fills : false;
        if (fill){
            return (
                <div className="inputGroup">
                    {fill}
                </div>
            )
        }
	}
}

//
function actRct( storeName ){
    return require('react/util/index')(storeName, Input)
}

module.exports = actRct;
