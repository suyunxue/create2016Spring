import React from 'react';
import { render } from 'react-dom';
import Header from '../components/header';
import Table from '../components/table';
import SeeData from '../components/seeData';
import NewQuestion from '../components/newQuestion';
import QuestionEdit from '../components/QuestionEdit';


class App extends React.Component{
    render(){
        return (
        	<div>
                <Header />
                <QuestionEdit />
            </div>
           )
    }
}

var data = [
{
	title: '问卷的标题',
	time: '问卷创建的时间',
	state: '发布中，未发布，已结束',
	data: [{ 
	    //这里面的数据就是每个题
		question: '每个问题',
		type: '单选题，多选题，文本题',
		option: ['选项一', '选项二', '选项三'],
		text: '如果是文本就是文本的内容,否则为空'
	},{
		question: '每个问题',
		type: '单选题，多选题，文本题',
		option: ['选项一', '选项二', '选项三'],
		text: '如果是文本就是文本的内容,否则为空'
	}]
},
{
	title: '问卷的标题',
	time: '问卷创建的时间',
	state: '发布中，未发布，已结束',
	data: [{ 
	    //这里面的数据就是每个题
		question: '每个问题',
		type: '单选题，多选题，文本题',
		option: ['选项一', '选项二', '选项三'],
		text: '如果是文本就是文本的内容'
	}]
}];

render(<App data={data} />, document.getElementById('app'));