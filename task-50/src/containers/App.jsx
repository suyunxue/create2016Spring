import {Router, Route, browserHistory} from 'react-router'


import React from 'react'
import {render} from 'react-dom'
import {Component} from 'react'
import {connect} from 'react-redux'


import QuestionList from './questionList'

//这个是路由层
class App extends Component {
	constructor(props){
		super(props);
	}

	render(){
		
		//如果没有数据则显示新建问卷页面，否则显示问卷列表页
		const {data} = this.props

		return <div>
			<QuestionList/>
		</div>
	}
}


function select(state) {
	return {
		data: state.data
	}
}



export default connect(select)(App)
	