import React from 'react'
import {Component, PropTypes} from 'react'


import '../../style/components/questionEdit.css'

class  QuestionEdit extends Component{

	//初始化组件属性和状态
	constructor(props){
		super(props);
		this.state = {
            typeShow: false,
			data: {
				title: '这是里标题',
				time: '',
				state: '1',   
				data: [{
					question: '',
					type: '1',
					options: ['选项一', '选项二'],
					selected: [false, false],
					text: '文本的内容'
				}]

			}
        };
    }

        /*
        state = {
        	typeShow: false,
        	data: {
				title: '问卷的标题',
				time: '问卷创建的时间',
				state: '发布中，未发布，已结束',
				data: [{ 
				    //这里面的数据就是每个题
					question: '每个问题',
					type: '单选题，多选题，文本题',
					options: ['选项一', '选项二', '选项三'],
					selected: ['false', 'false'],
					text: '如果是文本就是文本的内容'
				}],
			},
        }
        state：1：发布中 2：未发布 3：已结束
        type: 1：单选题 2多选题 3文本题
        */


	renderAddProblem(){
		//这里是点击添加问题出现的 
		//应该是右一个状态控制的，就是点击添加问题然后
		return (
			<div className="problem-type">
		        <button onClick={this.handleSingle.bind(this)}>单选</button>
			</div> 
		)
	}

	handleSingle(){
		let data = this.state.data.data.concat({type: '1', 
										   options: ['选项一', '选项二'],
										   selected: [false, false]
										});
		this.setState({typeShow: false, data: {data: data}});
		console.log(this.state)
	}

	// handleMultiselect(){
	// 	let data = this.state.data.data.concat({type: '2', 
	// 									   options: ['选项一', '选项二', '选项三'],
	// 									   selected: [false, false, false]
	// 									});
	// 	this.setState({typeShow: false, data:{data: {data: data}}});
	// }

	// handleText(){
	// 	let data = this.state.data.data.concat({type: '3', 
	// 									   text: '文本'
	// 									});
	// 	this.setState({typeShow: false, data:{data: {data: data}}});
	// }

	//遍历数据进行渲染
	renderProblemList(){
		var type = {'1': '单选题', '2': '多选题', '3': '文本题'}
		var data = this.state.data.data;
		console.log(data);
		console.log(data instanceof Array);
		return data.map(function(val, index, arr){
   			    return <li  key={index}>
   						<div className="problem-title">Q{index}{type[val.type]}</div>
   							{val.options.map(function(v, i){
   								return <div className="problem-option" key={i}>
   									     <input type="radio" name="single" />
   									     <input defaultValue={v}/>
   								       </div>
   							})}
   						</li>
		})
	}

	//显示选择按钮
	addProblem(){
		this.setState({typeShow: true});
	}

	render(){
		let typeShow = this.state.typeShow ?  this.renderAddProblem() : '';
		return (<section className="edit-box">
			    <h1 className="edit-title">这里是标题</h1>
			    <section className="edit-content">
				    <ul className="problem-list">
				    	{this.renderProblemList()}     
				    </ul>   
			         {typeShow}
			        <div className="add-problem" onClick={this.addProblem.bind(this)}>添加问题</div>
			    </section>
			    <div className="footer-save">
			        <div className="end-date">
			         <span>问卷截至日期</span>
			         <span className="calendar">2016-04-22</span>
			         </div>
			        <button>保存问卷</button>
			        <button>发布问卷</button>
			    </div>
			</section>
		)
	}

}

export default QuestionEdit