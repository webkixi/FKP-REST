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

    // 检测是否有联动
    function checkUnion(param, cb){
        var indexOfIntent = _.findIndex(intent, param)
        if (indexOfIntent>-1){
            var unionAry = _.filter(intent, param);
            if( _.isFunction(cb)) cb(unionAry)
            return unionAry
        }
        else {
            if( _.isFunction(cb)) cb()
        }
        return indexOfIntent
    }

    // 下拉菜单默认方法
    // 支持联动
    $('.fkp-dd').click(function(){
        var me = this;
        var _ipt = $(me).find('.fkp-dd-input');
        // var _ipt_txt = $(me).find('.fkp-dd-input-txt');
        var _ul = $(this).find('ul');
        var _ipt_id = _ipt[0].id;

        _ul.toggle();

        checkUnion({"id": _ipt_id}, optionClick)

        // @opts  union对象数组
        function optionClick(opts){
            $(me).find('.fkp-dd-option')
            .off('click')
            .click(function(e){
                e = e||argument[0]
                e.stopPropagation();

                var _opt_val = $(this).attr('data-value')||$(this).val(),
                _opt_txt = $(this).text(),
                _opt_attr = $(this).attr('data-attr');

                // 下拉菜单显示隐藏
                _ul.toggle();

                // 检测union，联动下拉菜单
                // 清楚联动select的下拉选项
                if (!compareSelctValue(_ipt_id, _opt_val) ) removeUnionTarget(_ipt_id);

                // 先检查，再赋值
                _ipt.attr('data-value', _opt_val)
                _ipt.val(_opt_txt);
                ctx.value[_ipt_id] = _opt_val;


                // 处理联动对象
                dealWithUnion(opts, {val: _opt_val, txt: _opt_txt, attr: _opt_attr});
            })
        }

    })

    $('.radioItem').find('input[type=radio]').change(function(){
        var _name = this.name;
        var _id = this.id;
        ctx.value[_name] = this.value;
    })

    $('.checkboxItem').find('input[type=checkbox]').change(function(){
        var _name = this.name;
        var _id = this.id;
        var _items = $('input[name='+_name+']:checked');

        ctx.value[_name]=[]
        if( _items.length ){
            _items.each(function(j, it){
                ctx.value[_name].push(it.value)
            })
        }
    })


    $('.inputItem > input')
    .off('change')
    .change(function(){
        var _id = this.id;
        ctx.value[_id] = this.value;
    })
    // 非select的input
    $('.inputItem > input')
    .off('focus')
    .focus(function(){
        var _ipt = this;
        var _ipt_id = _ipt.id;
        checkUnion({id: _ipt_id}, dealWithUnion);
    })


    function dealWithUnion(unionAry, data){
        if(unionAry && unionAry.length){
            unionAry.map(function(union, i){
                var _uObj = $('.for-'+union.target.id)[0];
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
                            if( _.isFunction(union.cb)){
                                union.cb.call(_uObj, data, _fill.call(_uObj, union))
                            }
                        }
                        else {
                            if( _.isFunction(union.cb)){
                                union.cb.call(_uObj, data)
                            }
                        }
                    })
                }
                else {
                    if( _.isFunction(union.cb)){
                        union.cb.call(_uObj)
                    }
                }
            })
        }
    }

    //填充数据到关联select
    // @data 根据异步数据处理过的符合select的数据，二维数组
    // @itnt intent数据，由ItemMixin下传过来的数据
    function fill(data, itnt){
        if( !_.isArray(data) ) return false;

        if (_.isArray(data)){
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
