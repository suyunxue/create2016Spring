//先把每一份问卷的信息搞出来
/*	[{
		title: '问卷的标题',
		time: '问卷创建的时间',
		state: '发布中，未发布，已结束',
		data: [{ 
		    //这里面的数据就是每个题
			question: '每个问题',
			type: '单选题，多选题，文本题',
			option: ['选项一', '选项二', '选项三'],
			text: '如果是文本就是文本的内容'
		}],
	},
	{
	}]
*/
//要有保存数据的
var data = [];

function save (title, time, state) {
	var obj = {};
	obj.title = title;
	obj.time = time;
	obj.state = state;
}