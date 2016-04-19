/**
 * 绑定事件处理函数，消除浏览器差异
 */
function addEventHandler (element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener);
	} else if (element.attachEvent) {
		element.attachEvent(event, listener);
	} else {
		element['on' + event] = listener;
	}
}

/**
 * 封装一下，获取元素的方法
 * 模仿jquery
 * 返回单个元素
 */
function $ (selector) {
	return document.querySelector(selector);
}

// 返回多个元素
function $s (selector) {
	return document.querySelectorAll(selector);
}

// 获取各个元素
var input = $('#input');
var tag = $('.add-Tag');
var textArea = $('textarea');
var btn = $('button');
var hobby = $('.display');

//实例对象
var tagObj = new CreatList(tag),
	hobbyObj = new CreatList(hobby);

/**
 * 面向对象思想的运用
 * 构造函数模式和原型模式结合
 */
// 构造函数拥有一些自有的方法
function CreatList (divList) {
	this.queue = [];
	this.render = function  () {
		var str = '';
		this.queue.forEach(function  (e) {
			str += '<span>' + e + '</span>';
		});
		divList.innerHTML = str;
	};
}

// 原型模式拥有一些共有的方法
CreatList.prototype.rightPush = function  (str) {
	this.queue.push(str);
	this.render();
};

CreatList.prototype.leftShift = function  () {
	this.queue.shift();
	this.render();
};

//对输入的数据分割成数组
function splitInput (str) {
	var input = str.trim().split(/[,，.。；;、\s\n]/);
	return input;
}

// 将tag显示在下方
function showTag () {
	if (/[,，.。；;、\s\n]+/.test(input.value) || event.keyCode == 13) {
		var data = splitInput(input.value),
			newTag = data[0];
		if (tagObj.queue.indexOf(newTag) === -1) {
			tagObj.rightPush(newTag);
			if (tagObj.queue.length > 10 ) {
				tagObj.leftShift();
			}
		} else {

			
		}
		tagObj.render();
		input.value = '';
	}
}

// 将爱好显示在下方
function showHobby () {
	var data = splitInput(textArea.value);
	data.forEach(function  (e) {
		if (hobbyObj.queue.indexOf(e) === -1) {
			hobbyObj.rightPush(e);
			if (hobbyObj.queue.length > 10) {
				hobbyObj.leftShift();
			}
		} else {
			//队列中存在，什么都不做
		}
	});
}

window.onload = function  () {
	addEventHandler(input, 'keyup', showTag);
	addEventHandler(btn, 'click', showHobby);
	addEventHandler(tag, 'mouseover', function  (e) {
		if (e.target && e.target.nodeName.toLowerCase() === 'span') {
			e.target.firstChild.insertData(0, '点击删除');
			e.target.style.background = 'red';
		}
	});
	addEventHandler(tag, 'mouseout', function  (e) {
		if (e.target && e.target.nodeName.toLowerCase() === 'span') {
			e.target.firstChild.deleteData(0, 4);
			e.target.style.background = '#78bcfb';
		}
	});
	addEventHandler(tag, 'click', function  (e) {
		if (e.target && e.target.nodeName.toLowerCase() === 'span') {
			tag.removeChild(e.target);
		}
	});
};