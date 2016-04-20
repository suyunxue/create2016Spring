(function (window, undefined) {
	var inputEles = [$("#name"), $("#password1"), $("#password2"), $("#email"), $("#phone")],
	    originTip = ["�������Ϊ4-16���ַ�","6��16λ���ֺ���ĸ","�ظ���������","example@haha.com","������11λ�ֻ�����"];

	var checkResult = {
		right: false,
		tip: ""
	}

	function checkValue (ele) {
		var str = ele.value.trim();

		if (str.length === 0) {
			checkResult.right = false;
			checkResult.tip = "���벻��Ϊ��";
			return ;
		}

		//����
		if(ele === inputEles[0]) {
			var len = str.replace(new RegExp("[\u4e00-\u9fa5]", "g"), "aa").length;	

			if (len >= 4 && len <= 16) {
				checkResult.right = true;
				checkResult.tip = "���ƿ���";
			} else {
				checkResult.right = false;
				checkResult.tip = "���������ַ���";
			}
		}

		if (ele === inputEles[1]) {
			if (str.match(/^\w{6, 16}$/)) {
				checkResult.right = true;
				checkResult.tip = "�����ʽ��ȷ";
			} else {
				checkResult.right = false;
				checkResult.tip = "������6��16λ�ַ���ֻ��Ϊ���ֺ���ĸ";
			}
		}

		if (ele === inputEles[2]) {
			if (str === inputEles[1].value.trim()) {
				checkResult.right = true;
				checkResult.tip = "������ȷ";
			} else {
				checkResult.right = false;
				checkResult.tip = "������������Ҫ��ͬ";
			}
		}

		if (ele === inputEles[3]) {
			var reg = new RegExp("^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$", "i");
			if (str.match(reg)) {
				checkResult.right = true;
				checkResult.tip = "�������";
			} else {
				checkResult.right = false;
				checkResult.tip = "�����ʽ����";
			}
		}

		if (ele === inputEles[4]) {
			if (str.match(/^1\d{10}$/)) {
				checkResult.right = true;
				checkResult.tip = "�������";
			} else {
				checkResult.right = false;
				checkResult.tip = "�����ʽ����";
			}
		}
	}

		for (var i = 0; i < inputEles.length; i++) {
			inputEles[i].addEventListener("blur", function  (e) {
				checkValue(e.target);
				var p = e.target.parentNode.getElementsByTagName("p")[0];
				p.innerHTML = checkResult.tip;
				if (checkResult.right) {
					e.target.style.border = "2px solid green";
					p.style.color = "green";
				}
			})

			inputEles[i].addEventListener("focus", function (e) {
				var index = inputEles.indexOf(e.target);
				var p = e.target.parentNode.getElementsByTagName("p")[0];
				p.innerHTML = originTip[index];
				p.style.visibility = "visible";
				p.style.color = "gray";
			})
		}

		$("#submit").addEventListener("click", function  () {
			var right = true;
			for (var i = 0; i < inputEles.length; i++) {
				var input = inputEles[i];
				checkValue(input);
				var p = input.parentElement.getElementsByTagName("p")[0];
				p.style.visibility = "visible";	
				p.innerHTML = checkResult.tip;
				if (checkResult.right) {
					input.style.border = "2px solid green";
					p.style.color = "green";
				} else {
					input.style.border = "2px solid red";
					p.style.color = "red";
					right = false;
				}
			}

			if (right) {
				alert("�ύ�ɹ�");
			} else {
				alert("�ύʧ�ܣ���������");
			}
		});
		






})(window, undefined);