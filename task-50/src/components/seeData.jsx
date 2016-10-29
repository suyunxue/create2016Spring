import React from 'react'
import {Component} from 'react';

import '../../style/components/seeData.css'

// 查看数据页

/**
 * 这一页就是纯数据展示，只需要把数据通过props传入就行了
 * 唯一有操作的不是操作数据就是一个返回，我通过了浏览器的history.back返回的
 * 如果不行就通过路由处理
 */
class SeeData extends Component {

	renderOption(options){
		return options.map(function(val, index, arr){
			return (<li key={index}>
				{val}
			</li>)
		})
	}

	renderList(){
		var data = this.props.data;
		var that = this;
		return data.map(function (val, index, arr) {
			return (<li key={index}>
				 <span className="problem-type">Q{index} {val.question}</span>
	                <ul>
	                	{that.renderOption(val.options)}
	                </ul>
			</li>)	
		})
	}

	render(){
		return (<div className="problem-data">
		           <a className="back" href="javascript:history.back();">返回
		           </a>
		           <h1 className="problem-title">{this.props.title}</h1>
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