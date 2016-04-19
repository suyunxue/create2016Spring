
function Tree (node) {
	this.stack = [];
	this.root = node;
}

//深度优先搜索
Tree.prototype.traverseDF = function  (callback) {
	var stack = [];

	(function recursion (currentNode) {
		stack.push(currentNode);

		for (var i = 0, length = currentNode.children.length; i < length; i++) {
				recursion(currentNode.children[i]);
		}

		if (callback) {
			callback(currentNode);
		} else {

		}

    }(this.root));
	this.stack = stack;
};

//广度优先搜索
Tree.prototype.traverseBF = function  (callback) {
	var quenu = [],
		currentNode = this.root;

	while (currentNode) {
		for (var i = 0, length = currentNode.children.length; i < length; i++) {
			quenu.push(currentNode.children[i]);
		}

		if (callback) {
			callback(currentNode);
		} else {

		}

		currentNode = quenu.shift();
		this.stack.push(currentNode);
	}
	
};


/**
 * 点击节点被显示，遍历找到改变颜色
 */
window.onload = function  () {
	var root = $(".body"),
		tree = new Tree(root),
		delBtn = $("#removeEle"),
		addBtn = $("#addEle"),
		ele = $("#ele"),
		tarNode = null;

	//节点被选中
	addHandler(root, "click", function  (e) {
		var target = e.target;
		tree.traverseBF(function  (node) {
			node.style.background = "#fff";
			if (node === target) {
				node.style.background = "#ccc";
				tarNode = node;
			} else {
				//就什么都不做
			}
		});
	});

	//删除选中节点
	addHandler(delBtn, "click", function  (e) {
		if (tarNode === null) {
			alert("没有选中节点");
			return ;
		} else {
			tarNode.parentNode.removeChild(tarnode);
		}
		
	});

	//增加节点
	addHandler(addBtn, "click", function  (e) {
		var value = ele.value;
		var newNode = document.createElement("div");
		newNode.innerText = value;
		tarNode.appendChild(newNode);
	});
};


/**
 * 需要有一个判断有没有的
 */
Tree.prototype.contains = function  (callback, traversal) {
	traversal.call(this, callback);
};

//遍历树，看到别人好的代码
var tarverse = [];
function preOrder (root) {
	if (root !== null) {
		tarverse.push(root);
		for (var i = 0; i < root.children.length; i++) {
			preOrder(root.children[i]);
		}
	}
}


