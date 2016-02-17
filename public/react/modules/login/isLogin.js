/**
 * 登陆校验
 * 
 * */


function preRender(opt){

  	var luser = SA.getter('_LOCAL_USER');

    if(luser.data.error){

    	opt.error && opt.error(luser);  

    }else{

    	opt.success && opt.success(luser);

    }

}


function loginAct(opt){

	var userInfo = SA.getter('_LOCAL_USER');

	if(userInfo.data.error==="-1"){

       	SA.setter('_LOCAL_USER', [preRender], [[opt]]);

    }else{

       	preRender(opt);
    }
	
}


module.exports = loginAct;
