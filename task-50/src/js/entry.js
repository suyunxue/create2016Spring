import React from 'react';
import { render } from 'react-dom';
import Header from '../components/header';
import Table from '../components/table';

class App extends React.Component{
    render(){
        return (
        	<div>
                <Header/>
                <Table data={this.props.data} />
            </div>
           )
    }
}

var data = [
{
	id: '',
	title: '问卷的标题',
	time: '问卷创建的时间',
	state: '发布中，未发布，已结束',
	data: [{ 
	    //这里面的数据就是每个题
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