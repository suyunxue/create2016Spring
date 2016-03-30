(function  (window, undefined) {
	"use strict";
	/**
	 * 存储用户输入的空气指数数据
	 * 示例格式
	 * aqiData = {
	 * 	'北京':90，
	 * 	'上海':40
	 * }
	 */
	var aqiData = {};
	/**
	 * 把从用户中获取到的数据进行处理，去除两边的空格
	 * 定义trim函数
	 */
	String.prototype.trim = function  () {
		return this.replace('/(^\s*)|(\s*$)/g','');
	}
	/**
	 * 从用户输入中获取数据，向aqiData中增加一条新数据
	 * 然后渲染aqilist列表，增加新增的数据
	 */
	 function  addAqiData () {
	 	var city = document.querySelector('#aqi-city-input').value.trim();
	 	var value = document.querySelector('#aqi-value-input').value.trim();
	 	if (!/^[\u4e00-\u9fa5]+$/i.test(city)){
	 		alert('请输入合法的城市名称');
	 		return ;
	 	}
	 	if (!/^[1-9]*$/.test(value)) {
	 		alert('请输入合法的质量值');
	 		return ;
	 	}
	 	aqiData[city] = value;
	 }
	 /**
	  * 判断一个js对象是否为空
	  */
	 function isEmptyObject (obj) {
	 	for (var key in obj) {
	 		return false;
	 	}
	 	return true;
	 }
	 /**
	  * 渲染aqi-table表格
	  * 渲染出来的形式如
		<tr>
			<td>西安</td>
			<td>11</td>
			<td><button data-city="西安">删除</button></td>
		</tr>
	  */
	 function renderAqiList () {
	 	var table = document.querySelector('#aqi-table');
	 	if (!isEmptyObject(aqiData)) {
	 		var html = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	 		var data = '';
	 		for (data in aqiData) {
	 			html += '<tr><td>'+data+'</td><td>'+aqiData[data]
	 			        +'</td><td><button data-city='+data+'>删除</button></td></tr>'
	 		}
	 		table.innerHTML = html;
	 	} else {
	 		table.innerHTML = '';
	 	}
	 }
	 /**
	  * 点击add-btn时的逻辑处理
	  * 获取用户数据，更新数据，并进行页面呈现的更新
	  * @method     init
	  */
	 function addBtnHandle () {
	 	addAqiData();
	 	renderAqiList();
	 }
	 /**
	  * 点击各个删除按钮时的逻辑处理
	  * 获取哪个城市的数据被删,删除数据，更新表格
	  * @method     init
	  */
	 function delBtnHandle (city) {
	 	delete aqiData[city];
	 	renderAqiList();
	 }

	function init () {
		//在下面给add-btn绑定一个事件，点击时触发addBtnHandle函数
		var add = document.querySelector('#add-btn');
		add.onclick = addBtnHandle;
		var  table = document.querySelector('#aqi-table');
		//给aqi-table中所有的删除按钮绑定事件，触发delBtnHandle函数
		table.onclick = function  (e) {
			if (e.target.nodeName.toLowerCase() === 'button') 
				delBtnHandle(e.target.dataset.city);
		}
	}
	init();
})(window);