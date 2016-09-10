var api = require('libs/api');

function select(intent, ctx){

    // 比较select的当前值与点击option获取的值是否相等
    function compareSelctValue(id, nextVal){
        var stat = false;
        var curVal = $('.for-'+id).find('.fkp-dd-input').attr('data-value')
        if (curVal === nextVal) stat = true;
        return stat;
    }

    // 清楚联动select
    function removeUnionTarget(id, cb){
        var indexOfIntent = _.findIndex(intent, {id: id});
        if (indexOfIntent>-1){
            var theIntent = intent[indexOfIntent];

            $('.for-'+theIntent.target.id).find('.fkp-dd-input').val('')
            $('.for-'+theIntent.target.id).find('.fkp-dd').find('ul').remove();
            removeUnionTarget(theIntent.target.id)
        }
    }

    /*
     * 检测单项是否有联动操作
     * param {JSON} {id: xxx}
     * cb {function}  回调函数
     * 通过lodash的filter函数匹配出符合param条件的联动项数组，从intent中
     * 在对数组项做处理，输出结构，及补全操作
     */
    function checkUnion(param, cb){
        var unionAry=[];
        var indexOfIntent = _.findIndex(intent, param)
        if (indexOfIntent>-1){
          unionAry = _.filter(intent, param);
          if( typeof cb === 'function' ) cb(unionAry)
          return unionAry
        }
        else {
          if( typeof cb === 'function' ) cb()
        }
        return indexOfIntent
    }


    /*
     * 下拉菜单点击事件 click
     * 支持联动操作
     */
    $('.fkp-dd').click(function(){
        var me = this;
        var _ipt = $(me).find('.fkp-dd-input');   // 下拉菜单文本框
        var _ipt_id = _ipt[0].id;
        // var _ipt_txt = $(me).find('.fkp-dd-input-txt');

        // 下拉项
        var _ul = $(this).find('ul');   // ul对象
            _ul.toggle();               // toggle动作

        // 检测该子项是否有联动操作
        checkUnion({"id": _ipt_id}, optionClick)

        // @opts  union对象数组
        /*
         * 下拉子项的click动作
         * opts {Array}  根据id匹配到联动子项
         *
         */
        function optionClick(opts){
            $(me).find('.fkp-dd-option').off('click')
            .click(function(e){
              e = e||argument[0]; e.stopPropagation();

              var _opt_val = $(this).attr('data-value')||$(this).val(),
                  _opt_txt = $(this).text(),
                  _opt_attr = $(this).attr('data-attr');


              // 下拉菜单显示隐藏
              _ul.toggle();


              // 是否联动
              // 先检查，再赋值
              // if 联动子项的值＝＝＝当前选项的值 则删除联动对象
              if (!compareSelctValue(_ipt_id, _opt_val) ) removeUnionTarget(_ipt_id);

              // 当前对象赋值
              _ipt.attr('data-value', _opt_val)  // value
              _ipt.val(_opt_txt);                // text

              // 实时赋值
              // 表单提交时，获取实时的数据
              // 当前对象数值变更，则直接修改父对象 Input.form中的值
              // Input.form.{id} = 'xxxx'
              ctx.form[_ipt_id] = _opt_val;


              // 处理联动对象
              dealWithUnion(opts, {val: _opt_val, txt: _opt_txt, attr: _opt_attr});
            })
        }

    })

    /*
     * radio子项动作
     * change
     */
    $('.radioItem').find('input[type=radio]').change(function(){
        var _name = this.name;
        var _id = this.id;

        // 实时赋值
        // 当前对象数值变更，则直接修改父对象 Input.form中的值
        ctx.form[_name] = this.value;
    })

    /*
     * checkbox子项动作
     * chang
     */
    $('.checkboxItem').find('input[type=checkbox]').change(function(){
        var _name = this.name;
        var _id = this.id;
        var _items = $('input[name='+_name+']:checked');

        // 实时赋值
        // 当前对象数值变更，则直接修改父对象 Input.form中的值
        ctx.form[_name]=[];

        if( _items.length ){
            _items.each(function(j, it){
                ctx.form[_name].push(it.value)
            })
        }
    })


    /*
     * 默认 input 元素的动作
     * like text tel等等
     */
    $('.inputItem > input')
    .off('change')
    .change(function(){
        var _id = this.id;
        ctx.form[_id] = this.value;
    })

    // 非select的input
    // like button
    $('.inputItem > input')
    .off('focus')
    .focus(function(){
        var _ipt = this;
        var _ipt_id = _ipt.id;
        checkUnion({id: _ipt_id}, dealWithUnion);
    })


    /*
     * 处理union动作
     * unionAry  {Array}  匹配到的 input 元素
     * data {JSON}  父级下拉选项的值  val, txt, attr
     * 支持异步数据处理
     */
    function dealWithUnion(unionAry, data){
        if(unionAry && unionAry.length){
          unionAry.map(function(union, i){
            var _uObj = $('.for-'+union.target.id)[0];

            // 根据url值
            if (union.url){
                if (union.param){
                  var _str =  JSON.stringify(union.param).replace('$value', data.val) .replace('$text', data.txt) .replace('$attr', data.attr)
                  union.param = JSON.parse(_str)
                }
                //关联select取回数据
                api.req(union.url, union.param)
                .then(function(data){
                  if (union.target.type==='select'){

                    // 执行回调
                    if( typeof union.cb === 'function'){
                      union.cb.call({form: ctx.form}, data, _fill.call(_uObj, union))
                    }
                  }
                  else {
                    if( typeof union.cb === 'function'){
                      union.cb.call({form: ctx.form}, data)
                    }
                  }
                })
            }
            else {
                if( typeof union.cb === 'function'){
                  union.cb.call({form: ctx.form})
                }
            }
          })
        }
    }

    /*
     * 联动表单
     * 适用于需要联动的select表单， 一般用于 省／市／区 联动
     * @data {Array}根据异步数据处理过的符合select的数据，二维数组
     * @itnt intent数据，由ItemMixin下传过来的数据
     */
    function fill(data, itnt){
        if( !Array.isArray(data) ) return false;

        if (Array.isArray(data)){
            _vals = data[0];
            _texts = data[1]||[];
            _attrs = data[2]||[];
            if (_vals.length !== _texts.length){
                alert('option的value与text不匹配')
            }
            var options=['<ul>']
            _vals.map(function(_val, i){
                options.push('<li class="fkp-dd-option" data-value='+_val+' data-attr='+_attrs[i]+'>'+_texts[i]+'</li>')
            })
            options.push('</ul>');
            $(this).find('.fkp-dd').append(
                options.join('')
            )
        }
    }

    function _fill(_intent){
        var that = this;
        return function(data){
            fill.call(that, data, _intent)
        }
    }

}

module.exports = function(ctx, intent){
    return select.call(ctx.ipt, intent, ctx)
}
