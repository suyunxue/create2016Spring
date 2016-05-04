/**
 * 实现过程
 * 根据配置读取数据
 * 创建表格
 * 排序功能
 * 重新创建
 */
(function  () {
	var config = {
		tdWidth: "150px",
		tdHeight: "55px",	
		rowNum: "5",
		colNum: "5",
		thBgc: "#333",
		border: "1px solid #ccc",
		thContent: ["姓名","语文","数学","英语","总分"],
		trContent: [
					["小明",80,90,70,240],
					["小红",90,60,90,240],
					["小亮",60,100,70,230],
					["小强",100,70,80,250],
				   ],
	},
	tab = document.getElementById("tableScore");

	
	var addTh = function  () {
		var thNode = document.createElement("tr"),
			tdList;
		thNode = addTd(thNode, config.thContent);
		thNode.style.background = config.thBgc;
		thNode.style.color = "#fff";
		thNode.style.fontWeight = "bold";

		tdList = thNode.childNodes;
		for (var i = 1; i < config.colNum; i++) {
			addArrowUp(tdList[i]);
			addArrowDown(tdList[i]);
		}

		tab.appendChild(thNode);

		function addArrow (divNode, flag) {
			divNode.style.width = "0px";
			divNode.style.height = "0px";
			divNode.style.borderLeft = "8px solid transparent";
			divNode.style.borderRight = "8px solid transparent";
			divNode.style.cursor = "pointer";
			divNode.style.position = "absolute";
			divNode.style.right = "30px";

			divNode.addEventListener("click", function  (e) {
				var content = e.target.parentNode.innerHTML.split("<")[0],
					listNum = config.thContent.indexOf(content),//找到要排序的那一列下标
					sortList = [],
					newList = [],
					trList = tab.childNodes;

				//取出要排序的数据，保存在数组中
				for (var i = 0; i < config.rowNum-1; i++) {
					sortList.push(trList[i+1].childNodes[listNum].innerHTML);
				}

				//得到所要求经排序后的数组	
				//降序排序
				newList = sortList.sort(function  (a, b) {
					return (b-a);
				})				

				//需要升序则取反
				if (!flag) {
					newList = newList.reverse();
				}				

				//获取当前列的数据分布情况
				sortList = [];
				for (var i = 0; i < config.rowNum-1; i++) {
					sortList.push(trList[i+1].childNodes[listNum].innerHTML);
				}

				changeOrder(newList, sortList);

				/**
				 * 根据排序之后的结果重新排序
				 *
				 * @param      {<type>}  newList  排序之后的数组
				 * @param      {string}  oldList  排序之前的数组
				 */
				function changeOrder (newList, oldList) {
					var len = newList.length,
						pos_before,
						pos_now,
						trList = tab.childNodes,
						tempNode = document.createElement("tr"),
						temp;
						console.log(len)
					for (var k = 0; k < len; k++) {
						//记录当前值在新表中的位置，并寻找当前值在原表中的位置
						pos_now = k;
						pos_before = oldList.indexOf(newList[k]);

						//如果当前值在两个表中的位置不一样，则交换两个节点的内容
						if (pos_now != pos_before) {
							//先把行的位置一换
							tempNode.innerHTML = trList[pos_before+1].innerHTML;
							trList[pos_before+1].innerHTML = trList[pos_now+1].innerHTML;
							trList[pos_now+1].innerHTML = tempNode.innerHTML;

							//更新表的内容
							temp = oldList[pos_before];
							oldList[pos_before] = oldList[pos_now];
							oldList[pos_now] = temp;
						}
					}
				}
				
			}, false);

			return divNode;
		}

		function addArrowDown (tdNode) {
			var divNode = document.createElement("div");
			divNode = addArrow(divNode, true);
			divNode.style.borderTop = "10px solid #fff";
			divNode.style.top = "40px";
			tdNode.appendChild(divNode);
		}

		function addArrowUp (tdNode) {
			var divNode = document.createElement("div");
			divNode = addArrow(divNode, false);
			divNode.style.borderBottom = "10px solid #fff";
			divNode.style.top = "25px";
			tdNode.appendChild(divNode);
		}
	};

	/**
	 * 创建表格内的内容
	 *
	 * @param      {<type>}  rowNode      要填充的行节点
	 * @param      {<type>}  contentList  表格内部的内容
	 */
	var addTd = function  (rowNode, contentList) {
		var tdNode;

		for (var i = 0; i < config.colNum; i++) {
			tdNode = document.createElement("td");
			tdNode.innerHTML = contentList[i];
			tdNode.style.width = config.tdWidth;
			tdNode.style.height = config.tdHeight;
			tdNode.style.border = config.border;
			tdNode.style.position = "relative";
			rowNode.appendChild(tdNode);
		}

		return rowNode;
	};

	//添加新的行内容
	var addTr = function  () {
		var trNode;

		for (var i = 0; i < config.rowNum-1; i++) {
			trNode = document.createElement("tr");
			trNode = addTd(trNode, config.trContent[i]);
			tab.appendChild(trNode);
		}
	};

	
	window.onscroll = function  () {
		var top = tab.offsetTop,
		    scrollTop = document.body.scrollTop,
		    title = tab.childNodes[0],
		    tabHeight = tab.offsetHeight;

		//冻结窗口
		if (scrollTop >= top) {
			title.className += " "+"fixed";
		} else {
			title.classList.remove('fixed');
		}

		//当整个页面滚动出页面时,固定的第一行也消失	
		if (scrollTop >= (tabHeight+top)) {
			title.classList.remove('fixed');
		}

	}

	//程序执行
	function init () {
		addTh();
		addTr();
	}

	init();
	
}());