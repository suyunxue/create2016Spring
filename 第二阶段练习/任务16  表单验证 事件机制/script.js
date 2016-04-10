window.onload = function(){
	/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var html = '';

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityName = document.getElementById('aqi-city-input').value.trim();
	var num = document.getElementById('aqi-value-input').value.trim();
	
	var re1 = /^[0-9]*[1-9][0-9]*$/;
	var re2 = /^[A-Za-z\u4e00-\u9fa5]*$/;

	if(!re1.test(num)){
		alert("输入数值不合法，请重新输入正整数");
		document.getElementById('aqi-value-input').value = '';
		document.getElementById('aqi-value-input').focus();
	}
	if(!re2.test(cityName)){
		alert("输入城市名称不合法，只能输入汉字和英文字母,请重新输入");
		document.getElementById('aqi-city-input').value = '';
		document.getElementById('aqi-city-input').focus();
	}
	if(re1.test(num)==true&&re2.test(cityName)==true){
		aqiData.cityName = num;
		html ='<tr><td>'+cityName+'</td><td>'+num+'</td><td><button>删除</button></td></tr>';
		renderAqiList();

	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	table.innerHTML += html; 
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
 // renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById('add-btn').onclick = function(){
    	addBtnHandle();
    }
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
   var oTable = document.getElementsByTagName('table')[0]; 
   oTable.onclick = function(event){
   	var event=event||window.event;
   	var target = event.target||event.srcElement;
   	//alert(target.tagName.toUpperCase());
   	if(target.tagName.toLowerCase() == 'button'){
   		var lis = document.getElementsByTagName('tr');
   		var trHtml = document.getElementsByTagName('tr')[0].innerHTML;
   		/*oTable.deleteRow(0);*/
   		/*for(var i=0;i<lis.length;i++){
   			if(trHtml == target.parentNode.parentNode.innerHTML){
   				oTable.deleteRow(i);
   			}
   		}*/
   		oTable.deleteRow(0);


   		/*删除功能未实现*/
   	}
   }
}

init();

}