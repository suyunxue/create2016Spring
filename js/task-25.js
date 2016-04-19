/**
 * 需求：
 * 节点的展开与折叠
 * 允许增加节点和删除节点
 * 节点查找,找到的节点以特殊的形式展现，如果处于父节点折叠，则展开
 */


function Tree (root) {
	this.stack = [];
	this.root = root;
}

Tree.prototype.traversalDF = function  (callback) {
	var stack = [];

	(function recursion (currentNode) {
		stack.push(currentNode);

		for(var i = 0, len = currentNode.children.length; i < len; i++) {	
			recursion(currentNode.children[i]);
		}

		if (callback) {
			callback(currentNode);
		} else {

			//就什么都不做
		}
 
	})(this.root);

	this.stack = stack;
};
 

window.onload = function  () {

	var show = $$(".show"),
		flag = [],
		div = $$(".root div"),
		input = $(".input"),
		root = $(".root"),
		tree = new Tree(root),
		tarNode = null;
		


	//初始化每个div给每个div设置一个标志，用来表示div是否显示
	function initDiv () {
	 	for (var i = 0, len = div.length; i < len; i++) {
	 		div[i].setAttribute("flag", "true");
	 	}
	}

	//给每个折叠按钮添加单击事件
	function fold () {
		[].forEach.call(show, function  (el) {

			//遍历每一个折叠按钮下的所有元素，el代表每一个按钮
			addHandler(el, "click", function  () {

				//先把根节点每个子节点是否点击都设置为true
				for (var i = 0, len = el.parentNode.childNodes.length; i < len; i++) {

					var childNode = el.parentNode.childNodes[i];

					if (childNode.nodeName.toLowerCase() === "div" && 
						childNode.getAttribute("flag") === "true") {

						childNode.style.display = "none";
						el.innerText = "+";
						childNode.setAttribute("flag", "false");

					} else if (childNode.nodeName.toLowerCase() === "div" && 
						childNode.getAttribute("flag") === "false") {

						childNode.style.display = "block";
						el.innerText = "-";
						childNode.setAttribute("flag", "true");

					}

				}
			});
		});
	}
	
	//给文档添加事件，把对应元素颜色改变,并把此节点放到tarNode
	function  changeBg () {
		addHandler(root, "click", function  (e) {
			setBg ();
			var ele = e.target;
			if (ele.nodeName.toLowerCase() === "div") {
				ele.style.background = "#ccc";
				tarNode = ele;
			}
		});
	}
	

	//设置所有的节点为白色
	function setBg () {
		tree.traversalDF(function  (currentNode) {
			currentNode.style.background = "#fff";
		});
	}

    //增加节点
	function addNode () {
		var addBtn = $("#addBtn");
		addHandler(addBtn, "click", function  (e) {
			var value = input.value;
			if (value === "") {
				alert("请输入正确的字符");
				return ;
			}
			var newNode = document.createElement("div"),
				iTag = document.createElement("i"),
				sign = true;

			newNode.innerText = value;
			iTag.setAttribute("class", "show");
			iTag.innerText = "-";

			tarNode.appendChild(newNode);

			for (var i = 0; i < tarNode.children.length; i++) {
				if (tarNode.children[i].nodeName.toLowerCase() === "i") {
					sign = false;
				}
			}
			if (sign) {
				tarNode.insertBefore(iTag, tarNode.firstChild);
			}
		
		});
	}

	//删除节点
	function removeNode () {
		var delBtn = $("#removeEle");
		addHandler(delBtn, "click", function () {
			if (tarNode != null) {
				tarNode.parentNode.removeChild(tarNode);
			} else {
				alert("请先选中元素");
			}
		});
	}

	//节点查找
	function searchNode () {
		var search = $("#search");

		addHandler(search, "click", function  (e) {
			tree.traversalDF();
			animation(tree.stack, input.value.trim());
		});
	}	
	
	//动画查找
	function animation (nodes, keyword) {
		(function show () {
			var next = nodes.shift();
			while (next.nodeName.toLowerCase() !== "div") {
				next = nodes.shift();
			}

			if (next) {
				next.style.display = "block";
				next.style.background = "#ccc";
				setTimeout(function  () {
					if (!(next.firstChild.nodeValue === keyword)) {
						next.style.background = "#fff";
					} 
					log(next.firstChild.nodeValue);
					show();					
				}, 300);
			} else {

			}
		}());
	}


	function init () {
		//初始化，给每个div添加flag事件
		initDiv();
		//折叠功能
		fold ();
		//点击变色
		changeBg ();
		//增加节点
		addNode ();
		//删除节点
		removeNode();
		//查找元素
		searchNode();
	}

	//只有一个函数入口
	init();
	
};

