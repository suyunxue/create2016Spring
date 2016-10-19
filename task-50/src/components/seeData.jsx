import React from 'react'
import {Component} from 'react';

import '../../style/components/seeData.less'


/**
 * 这一页就是纯数据展示，只需要把数据通过props传入就行了
 * 唯一有操作的不是操作数据就是一个返回，我通过了浏览器的history.back返回的
 * 如果不行就通过路由处理
 */
class SeeData extends Component {
	constructor(props){

		//里面就相当于是原来的那个构造函数模式写的那个
		super(); 

		//这里传的数据是要知道是访问哪个问卷,
		//我可以使用数组下标就可以获取到对应的数据
		//不过感觉应该是id比较好
		// this.data = this.props.data;
		this.title = '问卷的标题';
		this.data =  [{ 
		    //这里面的数据就是每个题
			problem: '每个问题',
			type: '单选题，多选题，文本题',
			option: ['选项一', '选项二', '选项三'],
			text: '如果是文本就是文本的内容,否则为空'
		},{
			problem: '每个问题',
			type: '单选题，多选题，文本题',
			option: ['选项一', '选项二', '选项三'],
			text: '如果是文本就是文本的内容,否则为空'
		}];

	}

	renderOption(){
		var option =  ['选项一', '选项二', '选项三'];
		return option.map(function(val, index, arr){
			return (<li key={index}>
				{val}
			</li>)
		})
	}

	renderList(){
		var data = this.data;
		var that = this;
		return data.map(function (val, index, arr) {
			return (<li key={index}>
				 <span className="problem-type">Q{index} {val.problem}</span>
	                <ul>
	                	{that.renderOption()}
	                </ul>
			</li>)	
		})
	}

	render(){
		return (<div className="problem-data">
		           <a className="back" href="javascript:history.back();">返回
		           </a>
		           <h1 className="problem-title">{this.title}</h1>
       			   <ul className="problem-list">
	                {this.renderList()}
                   </ul>
        		  <div className="bottom-back">
               		<a href="javascript:history.back();">返回</a>
        		  </div>
    		</div>)
	}
}

export default SeeData;