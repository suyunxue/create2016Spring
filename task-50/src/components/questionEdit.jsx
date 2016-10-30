import React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from "react-router"


import '../../style/components/questionEdit.css'


// 问卷编辑页
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
				data: []
			}
        };
    }
       
    //给相应问题添加选项
   	addOption(index){
   		return function(){
   			//就是添加数据
   			var options = this.state.data.data[index].options.concat('新选项');	
   			var data = this.state.data.data;
   			data[index].options = options;
   			data[index].selected.push(false);

   			this.setState({data: {...this.state.data, data: data}});
   		}
   	}

   	saveTitle(event){
   		let title = event.target.value;
   		this.setState({data: {...this.state.data, title: title}});
   	}

   	saveQuestionTitle(index){
   		return function(event){
   			let temp = this.state.data.data;
   			temp[index].question = event.target.value;
   			this.setState({data: {...this.state.data, data: temp}})
   		}
   	}

   	/**
   	 * 把state里面的data数据取出来，然后保存options
   	 * @param  {[type]} index 问题的下标
   	 * @param  i 问题选项的下标
   	 * @param cont 问题的内容
   	 * @return {[type]}       [description]
   	 */
   	saveOptionsData(index, i){

   		//复制一份data的数据
   		//在这个基础上做修改
   		return function(event){
   			let temp = this.state.data.data;
   			let val = event.target.value;
   			temp[index].options.splice(i, 1, val);
   			this.setState({data: {...this.state.data, data:temp}});
   		}
   	}

   	//保存文本数据
   	saveText(index){
   		return function(event){
   			let temp = this.state.data.data;
   			temp[index].text = event.target.value;
   			this.setState({data: {...this.state.data, data: temp}});
   		}
   	}

   	//删除问题特定的选项
   	//未实现
   	removeOption(index){
   	}	

	renderAddProblem(){

		//这里是点击添加问题出现的
		//应该是右一个状态控制的，就是点击添加问题然后
		return (
			<div className="problem-type">
		        <button onClick={this.handleSingle.bind(this)}> 单选题 </button>
		        <button onClick={this.handleMultiselect.bind(this)}> 多选题 </button>
		        <button onClick={this.handleText.bind(this)}> 文本题 </button>
			</div>
		)
	}

	handleSingle(){
		let data = this.state.data.data.concat({type: '1', 
										   options: ['选项一', '选项二'],
										   selected: [false, false]
										});
		this.setState({typeShow: false, data: {...this.state.data, data: data}});
	}

	handleMultiselect(){
		let data = this.state.data.data.concat({type: '2', 
										   options: ['选项一', '选项二', '选项三'],
										   selected: [false, false, false]
										});
		this.setState({typeShow: false, data: {...this.state.data, data: data}});
	}

	handleText(){
		let data = this.state.data.data.concat({type: '3', 
										        text: '文本'
										    });

		this.setState({typeShow: false, data: {...this.state.data, data: data}});
	}

	test(){
		console.log(this.state.data);
	}

	//遍历数据进行渲染
	renderProblemList(){
		let type = {'1': '单选题', '2': '多选题', '3': '文本题'}
		let data = this.state.data.data;
		let _self = this;
		if(data.length < 1){
			return <div></div>
		}else {
			return data.map(function(val, index, arr){
				if(val.type == '1'){
					let serial = 'Q' + (index + 1);
					let question = type[val.type];
					 return <li  key={index}>
					 				<span>{serial}</span>
					 				<input 
					 				       className="problem-title"  
					 				       defaultValue={question} 
					 				       onChange={_self.saveQuestionTitle(index).bind(_self)}
					 				/>
								    {val.options.map(function(v, i){
									    return <div className="problem-option" key={i}>
										            <input type="radio" name="single" />
										            <input 
										                defaultValue={v}  
										                onChange={_self.saveOptionsData(index, i).bind(_self)} 
										            />
									           </div>

							     	})
								    }
							</li>
				}else if(val.type == '2'){
					let serial = 'Q' + (index + 1);
					let question = type[val.type];
					return <li  key={index}>
								<span>{serial}</span>
				 				<input 
				 				       className="problem-title"  
				 				       defaultValue={question} 
				 				       onChange={_self.saveQuestionTitle(index).bind(_self)}
				 				/>
								{   val.options.map(function(v, i){
						     			return <div className="problem-option" key={i}>
						     				     <input type="checkbox" />
						     				     <input 
						     				         defaultValue={v}
						     				         onChange={_self.saveOptionsData(index, i).bind(_self)}
						     				      />
						     			       </div>
						     	    })
							    }
							</li>
				}else if(val.type == '3'){
					return <li  key={index}>
								<div className="problem-title">Q{index+1}{type[val.type]}</div>
								{  
								   <textarea
								   	   onChange={_self.saveText(index).bind(_self)}
								       placeholder="请填写文本内容"
								    >
								   </textarea>
							    }
							</li>
				}		
			})			
		}
	}

	//显示选择按钮
	addProblem(){
		this.setState({typeShow: true});
	}

	render(){
		let typeShow = this.state.typeShow ?  this.renderAddProblem() : '';
		console.log(this.state.data);
		return <section className="edit-box">
			    <input 
			        className="edit-title"
			        defaultValue='这里是标题' 
			        onChange={this.saveTitle.bind(this)}
			    />
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
			        <button 
			        	onClick={() => this.props.saveQuestion(this.state.data)}
			        >保存问卷</button>
			        <Link to="/questionList">
			        	<button>发布问卷</button>
			        </Link>
			    </div>
			</section>
	}

}

export default QuestionEdit
