//简化选择
var $ = function (sel) {
	return document.querySelector(sel);
};

var $$ = function (sel) {
	return document.querySelectorAll(sel);
};

//添加事件兼容性
function addHandler (ele, type, handler) {
	try {
		if (ele.addEventListener) {
			ele.addEventListener(type, handler, false);
		} else if (ele.attachEvent) {
			ele.attachEvent(type, handler);
		} else {
			ele["on" + type] = handler;
		}
	} catch (e) {
		throw new Error(e);
	}
	
}

//阻止事件冒泡
function stopBubble (event) {
    event = window.event ? window.event.cancelBubble = true : event.stopPropagation();
}

//打印在控制台
function log (str) {
	console.log(str);
}

//显示rgb颜色
function displayRgb (a, b, c) {
	var str = "",
		div = document.createElement("div");

	str += a.toString(16);
	str += b.toString(16);
	str += c.toString(16);
	div.style.width = "100px";
	div.style.height = "100px";
	div.style.background = "#"+str;
	document.body.appendChild(div);
}

//获取style属性
function getStyle (ele, attr) {
	return window.getComputedStyle(ele, null).getPropertyValue(attr);
}

//封装一个获取特定类名的方法
function getClass (claName, parent) {
	var oParent = parent?document.getElementById(parent):document,
		eles = [],
		elemens = oParent.getElementsByTagName("*");

	for (var i = 0; i < elemens.length; i++) {
		if (elemens[i].getAttribute("claName") === claName) {
			eles.push(elemens[i]);
		}
	}

	return eles;
}

//表单序列化
function serialize (form) {
	var parts = [],
		field = null,
		i,
		len,
		j,
		optlen,
		option,
		optValue;

	for (i = 0, len = form.elemens.length; i < len; i++) {
		field = form.elements[i];

		switch(field.type) {
			case "select-one":
			case "select-multiple":

			if (field.name.length) {
				for (j = 0, optLen = field.options.length; j < optLen; j++) {
					option = field.options[j];
					if (option.selected) {
						optValue = "";
						if (option.hasAttribute) {
							optValue = 	(option.hasAttribute("value")) ?
										option.value : option.text);
						} else {
							optValue = (option.attributes["value"].specified ? 
										option.value : option.text);
						}
						parts.push(encodeURIComponent(field.name) + "=" +
							       encodeURIComponent(optValue));
					}
				}
			}
			break;
			case undefined: //字段集
			case "file": //文件输入
			case "submit": //提交按钮
			case "reset": //重置按钮
			case "button": //自定义按钮
			      break;
			case "radio": //单选按钮
			case "checkbox": //复选框
				  if (!field.checked) {
				  	break;
				  }

				  //执行默认操作
			default:
			 
				//不包含没有名字的表单字段
				if (field.name.length) {
					parts.push(encodeURIComponent(field.name) + "=" +
						       encodeURIComponent(field.value));
				}
		}
	}
	return parts.join("&");
}