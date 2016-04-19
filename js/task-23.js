

function Tree (node) {
	this.stack = [];
	this.root = node;
}

Tree.prototype.traverseDF = function  (callback) {
	var stack = [];
	
	//������һ������ִ�к���
	(function recurse (currentNode) {

			stack.push(currentNode);
			//step2
			for (var i = 0, length = currentNode.children.length; i < length; i++) {

				// step3
				recurse(currentNode.children[i]);
			}

		//step4,ѭ�������������ִ���Ǹ��ص�������traverseDF(callback);
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
			throw new Error('������ӵ������ڵĽڵ���');
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
			throw new Error('Ҫɾ���Ľڵ㲻����');
		} else {
			childToRemove = parent.children.splice(index, 1);
		}
	} else {
		throw new Error('parent does not exist');
	}
	return childToRemove;
};

//������⿪ʼִ��
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
			alert("���ڱ�����");
			return ;
		}

		switch (btn.id) {
			case "traverseDF":
			case "traverseBF":
				tree[btn.id]();

				//�����ڼ��Ҫ��ʾ��Ԫ����ʾ����
				animation(tree.stack);
				break;
			case "DFSearch":
			case "BFSearch":
				tree["traverse" + btn.id.substring(0, 2)]();
				animation(tree.stack, checkInput(search));
				if (find) {
					alert("û�ҵ�");
				}
				break;
			default:
				//Ŀǰʲô������



		}

	});

	function checkInput (ele) {
		return ele.value.trim();
	}
	/**
	 * Ⱦɫ
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
