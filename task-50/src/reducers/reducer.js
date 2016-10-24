import {combineReducers} from 'redux'
import {DELETEQUESTION, 
	    DELETESELECTEDQUESTION,
	    SAVEQUESTION} from '../constants/ActionTypes'

const initialState = [
	{
		title: '问卷的标题',
		time: '问卷创建的时间',
		state: 1,
		data: [{
			question: '每个问题',
			type: 1,
			options: ['选项一', '选项二'],
			selected: [false, false],
			text: '如果是文本就是文本的内容,否则为空'
		},{
			question: '每个问题',
			type: 2,
			options: ['选项一', '选项二', '选项三'],
			selected: [false, false, false],
			text: '如果是文本就是文本的内容,否则为空'
		}]
	},
	{
		title: '问卷的标题',
		time: '问卷创建的时间',
		state: 2,
		data: [{ 
		    //这里面的数据就是每个题
			question: '每个问题',
			type: 3,
			options: ['选项一', '选项二', '选项三'],
			text: '如果是文本就是文本的内容'
		}]
	}
];


function deleteSingle(state=initialState, action) {
	switch(action.type){
		case DELETEQUESTION:
			return state.filter( (ele, index)=> 
					index !== action.index
			)
		case DELETESELECTEDQUESTION:
		    return state.map(function(val, index) {
		    	if(action.selects.indexOf(index) === -1){
		    		return val;
		    	}
		    })
		case SAVEQUESTION:
			console.log('保存新的问卷数据，下面是新的data');
			console.log(state.push(action.data));
			return state.concat(action.data)
		default: 
			return state
	}
}



export default deleteSingle