	function updateBaseInfo() {
		$.ajax({
			type : "POST",
			url : "${rc.contextPath}/account-save-baseInfo.html",
			timeout : 10000,
			dataType : "text",
			async : true,
			data : {
				loginPhone : $('#phone').val(),
				name : $('#name').val(),
				firmFullName : $('#firmFullName').val(),
				fax : $('#fax').val(),
				eMail : $('#email').val(),
				qq : $('#qq').val(),
				province : $('#province').val(),
				city : $('#city').val(),
				district : $('#district').val(),
				address : $('#address').val()
			},
			success : function(resp) {
				if (resp == "success") {
					dropAlert("基本信息更新成功！");
				} else {
					if (resp == "timeout") {
						dropAlert("登录超时或未登录,请重新登录.");
						setTimeout(function() {
							document.location.href = "${rc.contextPath}/login.html";
						}, 2000)
					} else {
						dropAlert(resp);
					}
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
			url : "${rc.contextPath}/account-save-password.html?oldPassword=" + $('#oldPassword').val() + "&newPassword=" + $('#newPassword').val()
					+ "&repassword=" + $('#repassword').val(),
			timeout : 10000,
			dataType : "text",
			async : true,
			success : function(resp) {
				if (resp == "success") {
					dropAlert("密码更新成功！");
				} else {
					if (resp == "timeout") {
						dropAlert("登录超时或未登录,请重新登录.");
						setTimeout(function() {
							document.location.href = "${rc.contextPath}/login.html";
						}, 2000)
					} else {
						dropAlert(resp);
					}
				}
			},
			error : function(e) {
				alert(e.msg);
			}
		});
	}
	function accountAuth() {
		$.ajax({
			type : "GET",
			url : "${rc.contextPath}/account-picture-auth.html?inputLiecncesName=" + $('#inputLiecncesName').val() + "&inputOrgCodeName="
					+ $('#inputOrgCodeName').val() + "&inputTaxName=" + $('#inputTaxName').val(),
			timeout : 10000,
			dataType : "text",
			async : true,
			success : function(resp) {
				if (resp == "success") {
					dropAlert({
						type : "success",
						content : "认证成功！",
						title : "恭喜您！"
					});
					document.location.href = "${rc.contextPath}/account-center.html";
				} else {
					if (resp == "timeout") {
						dropAlert({
							type : "warning",
							content : "登录超时或未登录,请重新登录.",
							title : "警告"
						});
					} else {
						dropAlert(resp);
					}
				}
			},
			error : function(e) {
				dropAlert({
					type : "warning",
					content : e.msg,
					title : "错误"
				});
			}
		});
	};