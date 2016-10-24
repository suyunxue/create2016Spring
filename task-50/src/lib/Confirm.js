/**
 * 此弹窗组件需要的config的参数有 
 *    title: 弹窗标题
 *    content: 弹窗里面要展示的内容   
 *    true: 点击确定之后的要执行的回调函数
 * @param {[type]} config [description]
 */
function Confirm(config) {
	var config = config || {};
	this.title = config.title || '提示';
	this.content = config.content || '确定要删除吗？';

	this.get = function(n){
		return config[n];
	}

	this.set = function(n, v){
		config[n] = v;
	}

	this.init();
}

Confirm.prototype = {
	init: function(){
		this.show();
		this.bindEvent();
	},

	createHtml: function(){
		var html = document.createElement('div');
		html.className = 'confirm';
		html.innerHTML = '<div class="title">'+this.title+'</div>'+
		               '<div class="content">'+this.content+'</div>'+
		               '<div class="footer">'+
		                  '<button id="confirm">确定</button>'+
		                  '<button id="cancel">取消</button>'+
		                '</div>';
		return html;
	},

	bindEvent: function(){
		var confirm = document.getElementById('confirm');
		var cancel = document.getElementById('cancel');
		var that = this;

		confirm.onclick = function(){
			var cb = that.get(true);
			cb && cb();
			that.hide();
		}

		cancel.onclick = function(){
			that.hide();
		}	
	},

	show: function(){
		var html = this.createHtml();
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(html);
	},

	hide: function(){
		var confirm = document.getElementsByClassName('confirm')[0];
		var body = document.getElementsByTagName('body')[0];
		body.removeChild(confirm);
	}
}


export default Confirm