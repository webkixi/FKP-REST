
var libs = require('../../libs/libs');
var api = require('../../apis/javaapi');
var validate = require('../../modules/validate');
var region = require('../../modules/region')
var formValide = validate;

var d = libs.$domain.create();
d.on('error',function(msg){
    console.log(msg);
});

var chkOptions = {
    password: function(input_obj,reg){
        var
        val = input_obj,
        tmp = true,

        level = (val.length>5) ? 0 + (val.length>7) + (/[a-z]/.test(val) && /[A-Z]/.test(val)) + (/\d/.test(val) && /\D/.test(val)) + (/\W/.test(val) && /\w/.test(val)) + (val.length > 12) : 0;  //level  0  1  2  3  4  password stronger
        if(!val) return false;
        if(val.length>20||/\s/.test(val)) level=0; //不包括空格
        if(level==0||!level){
			tmp = tmp;
        }
        return tmp;
    },
    repassword: function(input_obj,reg){
        var
        pval = input_obj[0],   //password object
        val = input_obj[1],    //repassword object
        tmp = true;

        if(val!==pval)
            tmp = false;

        return tmp;
    }
}

function *demoLoginData(oridata){
    libs.clog('pages/login.js');
    oridata.config = this.config;

    var mtd = this.method;
    var userData = {};

    if(mtd==='GET'){
        var province = yield region.getRegion();
        var areaData =  JSON.parse(province[1]);
        // console.log(provData.data.regionList[0]);
        var provinces = [];
        var citis = []
        var counties = []


        var user,userData;
        if(typeof this.sess.user !== 'undefined'){
            user = this.sess.user;
            if(user.login){
                userData = this.sess.user;
                //province id
                var pid = userData.firm.firmContact.province;
                //city id
                var cid = userData.firm.firmContact.city;
                //county id
                var did = userData.firm.firmContact.district;


                //loop for province
                areaData.data.regionList.map(function(item,i){
                    if(item.id == pid)
                        provinces.push("<option value='"+item.id+"' selected>"+item.regionName+"</option>");
                    else
                        provinces.push("<option value='"+item.id+"'>"+item.regionName+"</option>");
                });
                var tmp_p = provinces.join('\n');

                //loop for city
                var city = yield region.getRegion(pid);
                areaData =  JSON.parse(city[1]);
                areaData.data.regionList.map(function(item,i){
                    if(item.id == cid)
                        citis.push("<option value='"+item.id+"' selected>"+item.regionName+"</option>");
                    else
                        citis.push("<option value='"+item.id+"'>"+item.regionName+"</option>");
                });
                var tmp_c = citis.join('\n');

                //loop for county
                var county = yield region.getRegion(cid);
                areaData =  JSON.parse(county[1]);
                areaData.data.regionList.map(function(item,i){
                    if(item.id == cid)
                        counties.push("<option value='"+item.id+"' selected>"+item.regionName+"</option>");
                    else
                        counties.push("<option value='"+item.id+"'>"+item.regionName+"</option>");
                });
                var tmp_d = counties.join('\n');

                userData.provinces = tmp_p;
                userData.city = tmp_c;
                userData.county = tmp_d;
                var auth = userData.auth;
                auth.status =  userData.authStatus==auth.AUTH_FAIL.value || userData.authStatus==auth.AUTH_INIT.value;
                auth.status_init =  userData.authStatus==auth.AUTH_INIT.value;
                auth.status_fail =  userData.authStatus==auth.AUTH_FAIL.value;
                auth.status_success =  userData.authStatus==auth.AUTH_SUCCESS.value;
                oridata.account = userData;
                oridata.firm = userData.firm;
                oridata.auth = auth;
            }
            else{
                this.redirect('/account/login')
                // jump to login
            }
            oridata.navAccount ="active";
        }else{
            this.redirect('/account/login')
        }
        return oridata;

    }

    else if(mtd==='POST'){
        libs.clog('pages/login.js========POST');
        var body = yield libs.$parse(this);

        if (!!body.accountNo) {
            //查找用户信息
            var apiData= [];
            apiData = yield api.pullApiData('get_account_info',{'accountNo':body.accountNo});
            apiData = JSON.parse(apiData[1]);
            //province id
            var pid = apiData.data.firmContact.province;
            //city id
            var cid = apiData.data.firmContact.city;
            //county id
            var did = apiData.data.firmContact.district;
            var province = yield region.getRegion();
            province =  JSON.parse(province[1]);
            province.data.regionList.map(function(items){
                if(pid == items.id)apiData.data.firmContact.provinceName = items.regionName;
            })

            var city = yield region.getRegion(pid);
            city =  JSON.parse(city[1]);
            city.data.regionList.map(function(items){
                if(cid == items.id)apiData.data.firmContact.cityName = items.regionName;
            })
            
            var county = yield region.getRegion(cid);
            county =  JSON.parse(county[1]);
            county.data.regionList.map(function(items){
                if(did == items.id)apiData.data.firmContact.districtName = items.regionName;
            })
            

            return apiData;
        }else{

            var error = {
                errStat: 100,
                errMsg: '重置密码错误'
            };
            var success = {
                success: true
            }

            if(typeof(body.oldPassword)=='undefined' || typeof(body.newPassword)=='undefined'|| typeof(body.repassword)=='undefined'){
                if(typeof(body.oldPassword)=='undefined'){
                    error.errStat= 1;
                    error.msg = "原密码不能为空";
                    return error;
                }
                if(typeof(body.newPassword)=='undefined'){
                    error.errStat= 2;
                    error.msg = "新密码不能为空";
                    return error;
                }
                if(typeof(body.repassword)=='undefined'){
                    error.errStat= 3;
                    error.msg = "与新密码不匹配";
                    return error;
                }
            }
            if(!body.oldPassword||!body.newPassword||!body.repassword){
                error.errStat= 4;
                error.msg = "密码不合法，请重新输入";
                return error;
            }

            if(error.errStat===100){

                //后台校验用户提交数据
                var stat = formValide(chkOptions)
            	(body.oldPassword,'password')
            	(body.newPassword,'password')
            	([body.newPassword,body.repassword],'repassword')
            	();

                if(stat){
                    body.accountNo = this.sess.user.accountNo;
                    apiData = yield api.pullApiData('updatePassword',body);
                    var jsonData = JSON.parse(apiData[1]);
                    if(jsonData.success){
                        this.sess.user = null;
                        success.redirect = "/account/login.html";
                        return success;
                    }
                    else{
                        error.errStat = 5;
                        error.msg = jsonData.errMsg;
                        return error;
                    }
                }
                else{
                    return error;
                }
            }
            else{
                return error;
            }
        }
    }
}

module.exports = {
    getData : demoLoginData
}

// AUTH_INIT("未认证", 0),
// AUTH_SUCCESS("已认证", 1),
// AUTH_ING("认证审核中", 2),
// AUTH_FAIL("认证未通过", 3);

// user
// stat
//
