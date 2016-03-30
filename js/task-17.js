(function  (window, undefined) {
	"use strict"
	/**
	 * ��������ǰ���õ�
	 * �鿴����
	 * ��Ϊ������
	 * ��ͳ����ͳ����ͳ��
	 * ����dom����ͼ,����֣������ܣ�������	��ͬ��ɫʹ�������
	 * ����ƶ�Ҫ����ʱ����title������ʾ������ӵľ������ں�����
	 */
	/**
	 * ���ݸ�ʽ
	 * var aqiSourceData = {
	 * 	"����": {
	 * 	 "2016-01-01":10,
	 * 	 "2016-01-02":10,
	 * 	 "2016-01-03":10
	 * 	}
	 * }
	 */
	//�������������������ģ�������������
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
		'����':randomBuildData(500),
		'�Ϻ�':randomBuildData(300)
	};

	//������Ⱦͼ�������
	var chartData = {};

	//��¼��ǰҳ��ı�ѡ��
	var pageState = {
		nowSelectCity: -1,
		nowGraTime: 'day'
	}
	/**
	 * ��Ⱦͼ��
	 */
	function renderChart () {
		//ʹ����Ⱦͼ������ݣ�����״ͼ
		//����chartdata = {12,23,32,431,21};
		
		
	}
	/**
	 * ��ȡ��ǰѡ�е�ʱ��
	 */
	function getTimeNow () {
		var typeNow = '';
		var types = document.getElementsByTagName('gra-time');
		[].foreach.call(types, function  (v) {
			if (v.checked) {
				typeNow = v.value;
			}
		})
		return typeNow;
	}
	/**
	 * �գ��ܣ��µ�radio�¼����ʱ�Ĵ�����
	 */
	function gramTimeChange () {
		// ȷ���Ƿ�ѡ����˱仯
		var typeNow = getTimeNow();
		if (typeNow == pageState['nowGraTime']) {
			return ;
		} else {
            //���ö�Ӧ����
            initAqiChartData();
            //����ͼ����Ⱦ����
            renderChart();
		} 
	}

	/**
	 * ��ʼ���ա��ܡ��µ�radio�¼��������ʱ�����ú���getTimechange
	 */
	function initGraTimeForm () {
		//��option����¼�������������ȡѡ���ֵ
		var types = document.getElementsByTagName('gra-time');
		Array.foreach.call(types, function  (value) {
			value.addEventListener('click', getTimechange);
		})
	}
	/**
	 * ��ʼ������select�������е�ѡ��
	 */
	function initCitySelector () {
		//��ȡaqiSourceData�еĳ��У�Ȼ������idΪcity-select�������б��е�ѡ��
		
		//��select�����¼�����ѡ����仯ʱ���ú���citySelectChange
	
	}
	/**
	 * ��ʼ��ͼ������Ҫ�����ݸ�ʽ
	 */
	function initAqiChartData () {
		//��ԭʼ��Դ���ݴ����ͼ������Ҫ��ԭʼ���ݸ�ʽ
		//����õ����ݴ浽chartData��
		var type = getTimeNow();
		var city = document.getElementById('city-select').value;
		pageState['nowGraTime'] = type;
		pageStatep['nowSelectCity'] = city;
		switch(type) {
			case 'day':
				charData = aqiSourceData[city];
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
						charData['week'+week] = Math.round(total/count);
						count = 0;
						total = 0;
						week++;
					} else {
						count++;
						//ȡ��ÿһ�����ڵ�ֵ
						total += aqiSourceData[city][v];
					}
				}
				//ʣ�µ�����
  			    chartData['week'+week] = Math.round(total/count);
  			    break;
  			case 'mouth':
  				charData = {};
  				var count = 0, total = 0, mouth = -1, date;
  				for (var v in aqiSourceData[city]) {
  					date = new Date(v);
  					if (mouth == -1) {
  						mouth = date.getMouth()+1;
  					} else if (date.getMouth() + 1 != mouth) {
  						charData[mouth+'��'] = Math.round(total/count);
  						mouth = data.getMouth+1;
  						count=0;
  						total=0;
  					}
  					count++;
  					total += aqiSourceData[city][v];
  				}
  				charData[mouth+'��'] = Math.round(total/count);
  				break;
		}
		console.log(JSON.stringify(charData));
		renderChart();
	}
	/**
	 * ��ʼ������
	 */
	function init () {
		initGraTimeForm();
		initCitySelector();
		initAqiChartData();
	}
	init();
})(window, undefined);