import React from 'react';
import {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import Confirm from '../lib/Confirm'


// 问卷列表页
class Table extends Component {

	constructor(props){
		super(props);

		/**
		 * slectAll: 全选状态
		 * selects: 选择选项的下标
		 * @type {Object}
		 */
		this.state = {
			selectAll: false,
			selects: []
		}
		this.handleCheckAll = this.handleCheckAll.bind(this);
		this.selectHandle = this.selectHandle.bind(this);

	}

	handleEdit(){	
		//编辑页面就是进入问卷编辑页，使用路由进行处理就行了
		console.log('编辑页面就是进入问卷编辑页');
	}

	seeData(){
		//查看问卷数据，把问卷的数据所有的展示出来
		console.log('跳转到当前问卷的数据页');
	}


	handleCheckAll(){
		let checks = document.querySelectorAll('.checkbox');
		let selects = [];
		for (let i = 0; i < checks.length; i++){
			checks[i].checked = true;
			selects.push(i);
		}

		this.setState({selectAll: true, selects: selects});
		console.log('实现选择全部的问卷');
	}

	selectHandle(index){
		return function(){
			let selects = this.state.selects;
			if(selects.indexOf(index) === -1){
				selects.push(index);
				this.setState({selects: selects});
			}
		}
	}

	renderQuestion(){
		var data = this.props.data;
		var _self = this;
		console.log(data);
		return data.map(function (value, index, arr) {	
			return <tr key={index}>
						<td>
						    <input className="checkbox" type="checkbox"/>
						    <span className="question-name">{value.title}</span>
						</td>
		                <td>{value.time}</td>
		                <td>{value.state}</td>
		                <td>
		                    <span className="operation-attribute">编辑</span>
		                    <span className="operation-attribute"
		                          onClick={() => _self.props.handleDelete(index)}>
		                          删除
		                    </span>
		                    <span className="operation-attribute">查看数据</span>
		                </td>
				 </tr>
		})
	}

	render(){
		return (<div className="question-list">
			<table className="question-table">
				<thead>
	                <tr>
	                    <th>标题</th>
	                    <th>时间</th>
	                    <th>状态</th>
	                    <th>操作
	                        <span className="new-question">+新建问卷</span>
	                    </th>
	                </tr>
	           	 </thead>
	           	 <tbody className="table-body">
	           	 	{this.renderQuestion()}
	           	 	<tr>
	           	 	  <td>
	           	 	     <input className="checkbox" 
	           	 	            type="checkbox"
	           	 	            onClick={this.handleCheckAll}
	           	 	     />
	           	 	     <span className="question-name">
	           	 	        全选
	           	 	     </span>
	           	 	     <span className="check-delete" 
	           	 	           onClick={()=>this.props.handleDeleteAll(this.state.selects)}>
	           	 	            删除
	           	 	     </span>
	           	 	  </td>
	           	 	</tr>	
	           	 </tbody>
			</table>
		</div>)
	}
}


Table.propTypes = {
	handleDelete: PropTypes.func.isRequired,
	handleDeleteAll: PropTypes.func.isRequired
}

export default Table