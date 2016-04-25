(function  (window, undefined) {

	"use strict";

	/**
	 * 显示
	 * 关闭
	 * 居中
	 * 拖动
	 * 放大
	 */

	function Popuper (param) {
		// return new Popuper.prototype.init(param);
	}

	Popuper.prototype = {

		mask: document.querySelector(".mask"),
		pop: document.querySelector(".pop-wrap"),

		show: function  () {
	        this.mask.style.display = "block";
	        this.pop.style.display = "block";
		},

		hide: function  () {
			this.mask.style.display = "none";
			this.pop.style.display = "none";
		},

		center: function  () {
			var x = document.documentElement.clientWidth,
				y = document.documentElement.clientHeight,
				width = this.pop.offsetWidth,
				height = this.pop.offsetHeight;

			this.pop.style.left = (x - width)/2 + "px";
			this.pop.style.top = (y - height)/2 + "px";
		},

		drag: function  (select) {
				var drag = document.getElementById(select);

				drag.style.cursor = "move";
				drag.addEventListener("mousedown", function  (event) {
					fnDown(event);
				}, false);

				function fnDown (event) {
					var left = event.clientX - drag.offsetLeft,
					    top = event.clientY - drag.offsetTop;

					document.onmousemove = function  (event) {
		                console.log("x横坐标的值："+(event.clientX - drag.offsetLeft));
						drag.style.left = event.clientX - left + "px";
		       			drag.style.top = event.clientY - top +  "px";
					}

					document.onmouseup = function  () {
						document.onmousemove = null;
						document.onmouseup = null;
					}
				}
		},

		zoom: function  () {
			
		},


	};

	window.onload = function  () {
		var login = document.getElementById("login"),
			mask = document.getElementById("mask"),
			button = document.querySelectorAll(".pop-footer button");

		var pop = new Popuper();	
		pop.hide();

		login.addEventListener("click", function  () {
			
			pop.show();
			pop.center();
			pop.drag("pop-wrap");
		}, false);

		mask.addEventListener("click", function  () {
			pop.hide();
		}, false);

		for (var i = 0; i < button.length; i++) {
			button[i].addEventListener("click", function  () {
				pop.hide();
			}, false);
		}



	}
	
})(window, undefined);