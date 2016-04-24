var router = require('libs/router').router;
var pages = require('libs/pages');
var ItemMixin = require('mixins/item');
var libs = require('libs/libs');
var api = libs.api;
var _user = SA.get('USER')
var valide = libs.formValide;


function updateUserInfo(id, v){
    $('#'+id).val(v)
    return updateUserInfo
}

var bindEvent = function(){
    if (!_user.login){
        SA.set('USER', _fun)
        function _fun(data){
            updateUserInfo('uc_edit_name', (data.info.userName||'1'))
                          ('uc_edit_address', (data.info.address||'2'))
        }
    }

    function _valide(){
        var editupdate = valide('Form_uc_edit_user_info')
                      ('uc_edit_name', 'noop')
                      ('uc_edit_zone', 'noop')
                      ("uc_edit_address", 'noop')

        var postdata = SA.get('Form_uc_edit_user_info')
        postdata.method='get'

        // //更新用户资料接口没有
        // api.req('/xxx', postdata, function(data, status, xhr){
        //     SA.deleter('Form_uc_edit_user_info')
        // })
    }

    $('.uc_edit_submit').click(function(){
        _valide()
    })


}

//演示模块
var Show = React.createClass({
    mixins: [ItemMixin],
    render:function(){
        return (
            <div className="default_div app_index">
                <ul className="default_Picture">
                    <li className="dP_pic">
                        <label>头像</label>
                        <div className="dp_pic_r">
                            <img src="./images/staticDemo/picture.jpg"/>
                            <i className="iconfont icon-xiangyou"></i>
                        </div>
                    </li>
                    <li>
                        <label>姓名</label>
                        <input id="uc_edit_name" type="text" defaultValue="" />
                        {/*<i className="iconfont icon-xiangyou"></i>*/}
                    </li>
                    <li>
                        <label>所在小区</label>
                        <input id="uc_edit_zone" type="text" defaultValue="" />
                        {/*<i className="iconfont icon-xiangyou"></i>*/}
                    </li>
                    <li>
                        <label>具体地址</label>
                        <input id="uc_edit_address" type="text" defaultValue="" />
                        {/*<i className="iconfont icon-xiangyou"></i>*/}
                    </li>
                </ul>
                <div className="f_submit" style={{marginTop: ".3rem"}}>
                    <input type="submit" defaultValue="确定" className="f_btn uc_edit_submit" />
                </div>
            </div>
        );
    }
});

function start(name){
    return pages.new({
        boot:function(){},
        trigger:function(){
            this.libs.changeTitle('演示模块');    //更改当前页面标题
            this.main()
        },
        main: function(){
            this.render(
                <Show itemDefaultMethod={bindEvent} />,
                document.getElementById(name)
            )
        }
    })
}

module.exports = start;
