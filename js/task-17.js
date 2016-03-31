(function  (window, undefined) {
	// "use strict"
	/**
	 * 数据是提前给好的
	 * 查看城市
	 * 分为月周日
	 * 月统计周统计日统计
	 * 绘制dom柱形图,月最粗，下来周，下来月	不同颜色使用随机数
	 * 鼠标移动要柱子时，用title属性提示这个柱子的具体日期和数据
	 */
	/**
	 * 数据格式
	 * var aqiSourceData = {
	 * 	"北京": {
	 * 	 "2016-01-01":10,
	 * 	 "2016-01-02":10,
	 * 	 "2016-01-03":10
	 * 	}
	 * }
	 */
	//以下两个函数用于随机模拟生成随机数据
	function getDateStr (dat) {
		var y = dat.getFullYear();
		var m = dat.getMonth() + 1;
		m = m < 10 ? '0' + m : m;
		var d = dat.getDate();
		d = d < 10 ? '0' + d : d;
		return y + '-' + m + '-' + d;
	}

	function randomBuildData (seed) {
		var returnData = {};
		var dat = new Date('2016-01-01');
		var str = '';
		for (var i = 0; i < 92; i++) {
			str = getDateStr(dat);
			returnData[str] = Math.ceil(Math.random() * seed);
			dat.setDate(dat.getDate() + 1);
		}
		return returnData;
	}
	var aqiSourceData = {
		'北京':randomBuildData(500),
		'上海':randomBuildData(300)
	};

	//用于渲染图表的数据
	var chartData = {};

	//记录当前页面的表单选项
	var pageState = {
		nowSelectCity: -1,
		nowGraTime: 'day'
	};
	/**
	 * 渲染图表
	 */
	function renderChart () {
		//使用渲染图表的数据，画柱状图
		var str = '';
		for (var v in chartData) {
			str += "<div class='box "+pageState['nowGraTime']+"'>";
			str += "<div class='histogram' style='height:"+chartData[v]+"px;background:"+getRandomColor()+"'title='"+v+":"+chartData[v]+"'></div>";
			str += '</div>';
		}
		var warp = document.querySelector('.aqi-chart-wrap');
		warp.innerHTML = str;
		console.log('我负责渲染数据');
	}
	/**
	 * 获取随机颜色值
	 */
	/**
	 * 随机生成6个字符拼接到一起
	 *
	 * @method     getRandomColor
	 * @return     {string}  { description_of_the_return_value }
	 */
	var getRandomColor = function(){
	  return  '#' +
	    (function(color){
	    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
	      && (color.length == 6) ?  color : arguments.callee(color);
	  })('');
	}
	/**
	 * 获取当前选中的时间
	 */
	function getTimeNow () {
		var typeNow = '';
		var types = document.getElementsByName('gra-time');
		[].forEach.call(types, function  (v) {
			if (v.checked) {
				typeNow = v.value;
			}
		});
		return typeNow;
	}
	/**
	 * 日，周，月的radio事件点击时的处理函数
	 */
	function gramTimeChange () {
		// 确定是否选项发生了变化
		var typeNow = getTimeNow();
		if (typeNow == pageState['nowGraTime']) {
			return ;
		} else {
            //设置对应数据
            initAqiChartData();
            //调用图表渲染数据
            renderChart();
		} ;
	}
	/**
	 * select发生改变时的处理函数
	 */
	function citySelectChange () {
		//确定选项是否发生了变化
		var cityNow = document.querySelector('#city-select').value;
		if (cityNow === pageState["nowSelectCity"]) {
			return ;
		} else {
			//设置对应数据
			initAqiChartData();
		    //调用图标渲染函数
		    renderChart();
		}
		
	}
	/**
	 * 初始化日、周、月的radio事件，当点击时，调用函数gramTimeChange
	 */
	function initGraTimeForm () {
		//给option添加事件，如果被点击获取选项的值
		var types = document.getElementsByName('gra-time');
		console.log('types:'+types);
		[].forEach.call(types, function  (value) {
			value.addEventListener('click', gramTimeChange);
		})
	}
	/**
	 * 初始化城市select下拉框中的选项
	 */
	function initCitySelector () {
		//读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
		var select = document.getElementById('city-select');
		//给select设置事件，当选项发生变化时调用函数citySelectChange
		var str = '';
		for (var city in aqiSourceData) {
			str += '<option value = '+city+'>'+city+'</option>';
		}
		console.log(select)
		select.innerHTML = str;
		select.addEventListener('change',citySelectChange);
	}
	/**
	 * 初始化图表所需要的数据格式
	 */
	function initAqiChartData () {
		//将原始的源数据处理成图表所需要的原始数据格式
		//处理好的数据存到chartData中
		var type = getTimeNow();
		var city = document.getElementById('city-select').value;
		pageState['nowGraTime'] = type;
		console.log(type)
		pageState['nowSelectCity'] = city;
		switch(type) {
			case 'day':
				chartData = aqiSourceData[city];
				break;
			case 'week':
				chartData = {};
				var count = 0, total = 0,week = 1,data,weekDay;
				for (var v in aqiSourceData[city]){
					data = new Date(v);
					weekDay = data.getDay();
					if (weekDay == 6) {
						count++;
						total += aqiSourceData[city][v];
						chartData['week'+week] = Math.round(total/count);
						count = 0;
						total = 0;
						week++;
					} else {
						count++;
						//取出每一个日期的值
						total += aqiSourceData[city][v];
					}
				}
				//剩下的天数
  			    chartData['week'+week] = Math.round(total/count);
  			    break;
  			case 'month':
  				chartData = {};
  				var count = 0, total = 0, month = -1, date;
  				for (var v in aqiSourceData[city]) {
  					date = new Date(v);
  					if (month == -1) {
  						month = date.getMonth()+1;
  					} else if (date.getMonth() + 1 != month) {
  						chartData[month+'月'] = Math.round(total/count);
  						month = date.getMonth()+1;
  						count=0;
  						total=0;
  					}
  					count++;
  					total += aqiSourceData[city][v];
  				}
  				console.log("月分的数据："+JSON.stringify(chartData));
  				//这是别人写的
  				// chartData={};
      //           var count= 0,total= 0,month=-1,date;
      //           for(var v in aqiSourceData[city]){
      //               date=new Date(v);
      //               if(month==-1){
      //                   month=date.getMonth()+1;
      //               }else if(date.getMonth()+1!=month) {
      //                   chartData[month+"月"]=Math.round(total/count);
      //                   month = date.getMonth()+1;
      //                   count=0;
      //                   total=0;
      //               }
      //               count++;
      //               total+=aqiSourceData[city][v];
      //           }

  				chartData[month+'月'] = Math.round(total/count);
  				break;
		}
		console.log(JSON.stringify(chartData));
		renderChart();
	}
	/**
	 * 初始化函数
	 */
	function init () {
		initGraTimeForm();
		initCitySelector();
		initAqiChartData();
	}
	init();
})(window, undefined);