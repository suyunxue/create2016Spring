import React from 'react'
import {Component, PropTypes} from 'react'

/**
 * 实现的功能
 * 根据不同的type，渲染出不同的问题选项
 * 可编辑
 * 对于选项可以增删
 * 添加问题
 * 删除问题
 * 最少一个问题
 * 最多十个问题
 * 可以 上移下移，复用
 * 最上面的没有上移，最下面的没有下移操作
 * 需要把自己的数据传回给父组件
 * 
 [{
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

class Edit extends Component {
	constructor(){
		super();
	}


	render(){
		return 
	}
}