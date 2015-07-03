function checkLogin() {
	$.ajax({
		type : "GET",
		url : "/checkLoginPhone.html?loginPhone=" + $('#loginPhone').val() + "&code=" + $('#code').val(),
		timeout : 3000,
		dataType : "text",
		async : true,
		success : function(resp) {
			if (resp == "Success") {
				$(".r_wyzsj").addClass("hidden");
				$(".r_wyzsj").next().removeClass("hidden");
				$(".r_progress").addClass("r_p2");
			} else {
				dropAlert(resp);
			}
		},
		error : function(e) {
			alert(e.msg);
		}
	});
}
function checkAccount() {
	var mustRead = 0;
	if ($('#mustRead').attr("checked")) {
		mustRead = $('#mustRead').val();
	}
	$.ajax({
		type : "POST",
		url : "/account-save.html?eMail=" + $('#eMail').val() + "&mustRead=" + mustRead,
		timeout : 10000,
		dataType : "text",
		async : true,
		data : {
			loginPhone : $('#loginPhone').val(),
			loginName : $('#loginName').val(),
			password : $('#password').val(),
			rePassword : $('#rePassword').val(),
			name : $('#name').val(),
			firmFullName : $('#firmFullName').val(),
			fax : $('#fax').val(),
			qq : $('#qq').val(),
			province : $('#province').val(),
			city : $('#city').val(),

			district : $('#district').val(),
			address : $('#address').val()
		},
		success : function(resp) {
			if (resp == "success") {
				var RegName = $("#loginName").val();
				$(".r_wmessage").addClass("hidden");
				$(".r_wmessage").next(".r_wsuccess").removeClass("hidden");
				$(".r_progress").removeClass("r_p2").addClass("r_p3");
				$(".Regname").html(RegName);
				$(".r_wrap_list.r_wmessage,.r_wrap_list.r_wyzsj").remove();
			} else {
				dropAlert(resp);
			}
		},
		error : function(e) {
			alert(e.msg);
		}
	});
}