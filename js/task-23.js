

function Tree (node) {
	this.stack = [];
	this.root = node;
}

Tree.prototype.traverseDF = function  (callback) {
	var stack = [];
	
	//下面是一个立即执行函数
	(function recurse (currentNode) {

			stack.push(currentNode);
			//step2
			for (var i = 0, length = currentNode.children.length; i < length; i++) {

				// step3
				recurse(currentNode.children[i]);
			}

		//step4,循环完结束后，立即执行那个回调函数，traverseDF(callback);
		callback ? callback(currentNode) : null;

		//step1
	})(this.root);

	this.stack = stack;

};


Tree.prototype.traverseBF = function  (callback) {
	var queue = [],
		currentNode = this.root;

	this.stack = [];

	this.stack.push(currentNode);

	while(currentNode) {

			for (var i = 0, length = currentNode.children.length; i < length; i++) {
				queue.push(currentNode.children[i]);
			}

		callback = callback ? callback(currentNode) : null;
		currentNode = queue.shift();
		this.stack.push(currentNode);
	}
};

Tree.prototype.contains = function  (callback, traversal) {
	traversal.call(this, callback);
};


Tree.prototype.add = function  (data, toData, traversal) {
	var child = new Node(data),
		parent = null,
		callback = function  (node) {
			if (node.data === toData) {
				parent = node;
			}
		};

		this.contains(callback, traversal);

		if (parent) {
			parent.children.push(child);
			child.parent = parent;
		} else {
			throw new Error('不能添加到不存在的节点上');
		}
};

Tree.prototype.remove = function  (data, fromData, traversal) {
	var tree = this,
		parent = null,
		childToRemove = null,
		index;
	var callback = function  (node) {
		if (node.data === fromData) {
			parent = node;
		}
	};

	this.contains(callback, traversal);

	if (parent) {
		index = findIndex(parent.children, data);

		if (index === undefined) {
			throw new Error('要删除的节点不存在');
		} else {
			childToRemove = parent.children.splice(index, 1);
		}
	} else {
		throw new Error('parent does not exist');
	}
	return childToRemove;
};

//程序从这开始执行
window.onload = function () {
	var root = $(".body"),
		wrap = $(".wrap"),
		tree = new Tree(root),
		search = $("#search"),
		time = $("#time"),
		lock = false,
		interval = time.value,
		find = false;

	addHandler(wrap, "click", function  (e) {
		var btn = e.target;
		if (lock) {
			alert("正在遍历中");
			return ;
		}

		switch (btn.id) {
			case "traverseDF":
			case "traverseBF":
				tree[btn.id]();

				//遍历期间把要显示的元素显示出来
				animation(tree.stack);
				break;
			case "DFSearch":
			case "BFSearch":
				tree["traverse" + btn.id.substring(0, 2)]();
				animation(tree.stack, checkInput(search));
				if (find) {
					alert("没找到");
				}
				break;
			default:
				//目前什么都不做



		}

	});

	function checkInput (ele) {
		return ele.value.trim();
	}
	/**
	 * 染色
	 *
	 * @method     animation
	 * @param      {Array}  stack   
	 */
	function animation (nodes, keyword) {
		lock = true;
		var keyWord = keyword || null;
		(function show () {
			var next = nodes.shift();
			if (next) {
				next.style.background = "#ccc";
				setTimeout(function  () {
					if (!(next.firstChild.nodeValue.trim() === keyWord)) {
						next.style.background = "#fff";
					}
					show();
				}, interval);
			} else {
				lock = false;
			}
		}());
	}


};
