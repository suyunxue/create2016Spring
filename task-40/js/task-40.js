var DatePicker = function  (container) {
	this.container = container;
	this.date = new Date();
	this.mainEle = null;
	this.selectedEle = null;

	this.init();
};

DatePicker.prototype = {
	days: ["日", "一", "二", "三", "四", "五", "六"],

	//初始化执行代码
	init: function  () {
		var self = this;

		this.mainEle = $("<div>").
						css({
							width: '350px',
							height: '400px',
							margin: "0 auto",
							border: "1px solid #ccc",
						}).appendTo(container);

		//标题
		var p = $("<p>").css({
			textAlign: 'center',
			margin: '0',
			padding: "5px",
			background: "#f00",
			color: "#fff",
		}).appendTo(this.mainEle);

		var title = $("<strong>").addClass('title').appendTo(p);
		
		var arrLeft = $("<strong>").html("<-").css({
			float: 'left',
			cursor: 'pointer'
		}).appendTo(p).click(function  () {
			self.prevMouth();
		});

		var arrRight = $("<strong>").html("->").css({
			float: 'right',
			cursor: 'pointer'
		}).appendTo(p).click(function  () {
			self.nextMouth();
		});

		function createEle () {
			var ele = $("<span>").css({
				textAlign: 'center',
				display: 'inline-block',
				width: "50px",
				height: "50px",
				lineHeight: "50px"
			});

			return ele;
		}

		//固定不变的日期
		for (var i = 0; i < 7; i++) {
			var el = createEle().html(self.days[i]).appendTo(self.mainEle);
			if (i===0 || i===6) {
				el.css('color', '#f00');
			}
		}

		//日期部分
        for (var i = 0; i < 42; i++) {
			var ele = createEle().css('cursor', 'pointer').appendTo(this.mainEle);
		}	

		this.renderByDate(this.date);

		//点选日期事件，写到这里
		this.mainEle.click(function  (e) {
			if (e.target.nodeName === "SPAN") {
				var allSpan = $("span"),
		       		index = allSpan.index($(e.target)),
		      		selectedIndex = allSpan.index(self.selectedEle);

		      	var dat = new Date(self.date);
		      	dat.setDate(dat.getDate() + index - selectedIndex);

		      	self.selectDate(dat);
			}

		});
	},

	//将日期数据渲染到页面
	renderByDate: function  (date) {

		//传过来的数据是正确的就是刚刚点击的那个日期	
		$(".title").html(date.getFullYear() + "年" + (date.getMonth() + 1) + "月");

		//找到第一个日期
		var dat = new Date(date);

		dat.setDate(dat.getDate() - date.getDate() + 1);

		//回退多少天
		dat.setDate(dat.getDate() - dat.getDay());

		var allSpan = $("span");
		for (var i = 0; i < 42; i++) {

			//获取显示日子jq对象
			var ele = $(allSpan.get(i+7)).html(dat.getDate());

			//不是同月的色彩变淡
			if (dat.getMonth() !== date.getMonth()) {
				ele.css('color', '#ccc');
			} else {

				//周六周日字变红
				if (dat.getDay() === 0 || dat.getDay() === 6) {
					ele.css('color', '#f00');
				} else {
					ele.css('color', '');
				}
			}

			//被选中的日期背景变红
			if (dat.getTime() === date.getTime()) {

				ele.css({
					background: '#f00',
					color: '#fff'
				});

				this.selectedEle = ele;

			}

			dat.setDate(dat.getDate()+1);
		}

	},

	//点击进入下一月，改变日期数据，并进行显示
	nextMouth: function  () {
		var dat = new Date(this.date);
		dat.setMonth(dat.getMonth() + 1);
		this.selectDate(dat);
	},

	//点击进入上一月，
	prevMouth: function  () {
		var dat = new Date(this.date);
		dat.setMonth(dat.getMonth() - 1);
		this.selectDate(dat);
	},

	//这里面的改变颜色有问题
	selectDate: function (date) {

		//传过来的日期,就是对的
		this.selectedEle.css({
			backgroundColor: '',
			color: ''
		});

		if (date.getMonth() === this.date.getMonth()) {
			var allSpan = $("span"),
				oIndex = allSpan.index(this.selectedEle);

			//计算出新元素的位置
			var temp = allSpan.get(oIndex + date.getDate()- this.date.getDate());

			this.selectedEle = $(temp).css({
				backgroundColor: '#f00',
				color: '#fff'
			});
		} else {
			this.renderByDate(date);
		}

		this.date = date;
	},

};


//主程序执行
var datePicker = new DatePicker($("#container"));