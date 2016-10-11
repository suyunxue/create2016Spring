import {Component} from 'react';

class SeeData extends Component {
	constructor(props){

		//里面就相当于是原来的那个构造函数模式写的那个
		super(); 

		//这里传的数据是要知道是访问哪个问卷,我可以使用数组下标就可以获取到对应的数据
		this.data = this.props.data;
	}

	renderList(){

	}x

	render(){
		return (
			 <div class="question-data">
		        <a class="back" href="javascript:history.back();">返回
		        </a>
		        <h1 class="question-title">{this.data.title}</h1>
       			 <ul class="question-list">
	             <li>
	                 <span class="question-type">Q1 单选题</span>
	                 <ul>
	                     <li>选项一</li>
	                     <li>选项二</li>
	                 </ul>
	             </li>
                 <li>
                     <span class="question-type">Q2 多选题</span>
	                <ul>
	                    <li>选项一</li>
	                    <li>选项二</li>
	                    <li>选项三</li>
	                    <li>选项四</li>
	                </ul>
           		 </li>
            <li>
                <span class="question-type">Q3 单选题</span>
                <ul>
                    <li>选项一</li>
                    <li>选项二</li>
                </ul>
            </li>
            <li>
                <span class="question-type">Q4 文本题</span>
                <div></div>
            </li>
        </ul>
        <div class="bottom-back">
            <a href="javascript:history.back();">返回</a>
        </div>
    </div>)
	}
}

