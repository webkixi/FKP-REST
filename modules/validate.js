/**
 * Module dependencies.
 */
var libs = require('../libs/libs');

var tips = function(msg){
    libs.elog(msg);
}

/**
* form表单校验
* @opts  json对象，对象元素允许函数，用于替换默认block校验正则
* return self（function） 循环检测
*   self(val,reg,msg,name)
*   @val  需要被校验的值，如 var aaa = $('input').val();中的aaa
*   @reg  block的对象key值
*   @msg  弹出提示信息，如为空，提示默认信息
*   @name 弹出信息的名称
* SAMPLE
* var fcker = fck(chkopts)
              (user,'username',null,'昵称')
              (telephone,'mobile','')
              (comment,'notempty',null,'评论')
              (code,'verify','验证码不正确')
              ();
*/
var form_valide = function(opts) {
    var ckstat=true;
    var tmp;
    var old;
    var popmsg=true;   //允许弹出消息
    var block = {
        email    : /^[\.a-zA-Z0-9_=-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        username : /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
        verify   : /^[a-z\d]{4}$/i,
        verify_m : /^[\d]{6}$/,
        pwd      : /^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/,//密码
        guhua    : /^(\d{3,4})?[-]?\d{7,8}$/,//电话号码的格式
        mobile   : /^(13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8})$/, //手机
        url      : /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?$/, //url
        ip4      : /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/, //ip地址
        notempty : /^\S+$/, //非空
        qq       : /^[1-9]*[1-9][0-9]*$/, //QQ号码
        idcard   : /^[1-9]([0-9]{14}|[0-9]{17})$/, //身份证
        birthday : /^(\d{4})[\.-](\d{1,2})[\.-](\d{1,2})$/,
        all      : /[\s\S]/,
        tips     : tips,
        popmsg : true
    };
    if(opts && _.isObject(opts)){
        old = _.extend({},block);
        block = _.extend(block,opts);
    }
    return function self(val,reg,msg,name) {
        var tips = block.tips;
        popmsg=block.popmsg;
        if (!val){
            if(arguments.length==0){
                return ckstat;
            }
            else{
                if(popmsg){
                    if(msg) tips(msg,'alert');
                    else if(name) tips(name+'不能为空','alert');
                    else tips(reg+'不能为空','alert');
                }
                ckstat = false;
                return function(){
                    if(arguments.length==0) return ckstat;
                    else{
                        return arguments.callee;
                    }
                };
            }
        }
        reg = reg || 'username';
        if(_.isFunction(block[reg])){
            popmsg = false;
            var fun = block[reg];
            tmp = val=='' ? false : fun.call(this,val,old);
            if(!tmp) ckstat = false;
        }else{
            console.log(reg);
            tmp = val=='' ? false : block[reg].test(val);
        }
        if(!tmp) {
            ckstat = false;
            if(popmsg){
                if(!msg){
                    if(name) tips(name+'数据不正确','alert');
                    else     tips(reg+'数据不正确','alert');
                }
                else
                    tips(msg,'alert');
            }
            return function(){
                if(arguments.length==0) return ckstat;
                else{
                    return arguments.callee;
                }
            };
        }
        return self;
    };
}


module.exports = form_valide;
