(function  (window, undefined) {
	var name = document.getElementById("myName"),
		remind = document.getElementById("remind"),
		validate = document.getElementById("validate");

	function validateName () {
		validate.onclick = function  () {
			var value = name.value,
				length = countLength(value);
				if (length < 4 || length > 16) {
					if (length <= 0) {
						name.focus();
						name.setAttribute("class", "error");
						remind.innerText="姓名不能为空";
						remind.style.color = "red";
					} else {
						name.focus();
						remind.innerText="必填，长度为4~16个字符";
					}
					return false;
				} else {
					name.setAttribute("class", "right");
					remind.innerText="名称格式正确";
					remind.style.color = "#97d285";
				}
		}
	}

	//因为一个汉字是两个字符，所以要计算一下输入的长度
	function countLength (str) {
		var inputLength = 0;

		for (var i = 0; i < str.length; i++) {
			var countCode = str.charCodeAt(i);
			if (countCode >= 0 && countCode <= 128) {
				inputLength += 1;
			} else {
				inputLength += 2;
			}
		}

		return inputLength;
	}

	validateName(); 

})(window, undefined);