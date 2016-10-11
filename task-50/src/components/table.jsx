import React from 'react';
import {Component} from 'react'

class Table extends Component {
	handleEdit(){
		//编辑页面就是进入问卷编辑页，使用路由进行处理就行了
		console.log('编辑页面就是进入问卷编辑页');
	}

	handleDelete(){
		//删除当前问卷，需要在顶层一个回调，修改state，把这个问卷数据删掉
		console.log('删除当前问卷');
	}

	seeData(){
		//查看问卷数据，把问卷的数据所有的展示出来
		console.log('跳转到当前问卷的数据页');
	}

	handleCheckAll(){
		//选择全部的问卷，颜适那里就没做，我试着做一下
		//把所有的问卷的选项都勾上
		console.log('实现选择全部的问卷');
	}

	handleDeleteAll(){
		//删除所有的问卷数据
		//实现：给子组件传递一个action，然后从props调用回调函数删除数据
		console.log('把所有的问卷数据都删除掉');
	}

	renderQuestion(){
		var data = this.props.data;
		var that = this;
		return data.map(function (value, index, arr) {	
			return <tr key={index}>
				<td>
				    <input className="checkbox" type="checkbox" />
				    <span className="question-name">{value.title}</span>
				</td>
                <td>{value.time}</td>
                <td>{value.state}</td>
                <td>
                    <span className="operation-attribute" onClick={that.handleEdit}>编辑</span>
                    <span className="operation-attribute" onClick={that.handleDelete}>删除</span>
                    <span className="operation-attribute" onClick={that.seeData}>查看数据</span>
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
	                    <th>操作<span className="new-question">+新建问卷</span> </th>
	                </tr>
	           	 </thead>
	           	 <tbody className="table-body">
	           	 	{this.renderQuestion()}
	           	 	<tr>
	           	 	  <td>
	           	 	     <input className="checkbox" type="checkbox" />
	           	 	     <span className="question-name" onClick={this.handleCheckAll}>全选</span>
	           	 	     <span className="check-delete" onClick={this.handleDeleteAll}>删除</span>
	           	 	  </td>
	           	 	</tr>	
	           	 </tbody>
			</table>
		</div>)
	}
}

export default Table