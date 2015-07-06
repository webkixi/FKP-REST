	function checkLogin() {
		$.ajax({
			type : "GET",
			url : "/checkForgetPassword.html?loginPhone=" + $('#loginPhone').val() + "&code=" + $('#code').val(),
			timeout : 10000,
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
	function updatePassword() {
		$.ajax({
			type : "GET",
			url : "/account-forget-password.html?loginPhone=" + $('#loginPhone').val() + "&newPassword=" + $('#newPassword').val()
					+ "&repassword=" + $('#repassword').val(),
			timeout : 10000,
			dataType : "text",
			async : true,
			success : function(resp) {
				if (resp == "success") {
					$(".account_msg").html("密码更新成功！");
					$("#myregerro").addClass("in show");
					$("#myregerro .close").click(function() {
						$("#myregerro").removeClass("in show");
						document.location.href = "/login.html";
					})
				} else {
					dropAlert(resp);
				}
			},
			error : function(e) {
				alert(e.msg);
			}
		});
	}