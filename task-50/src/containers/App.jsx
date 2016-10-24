import React from 'react'
import {render} from 'react-dom'
import {Component} from 'react'


import QuestionList from './questionList'
import LookData from './lookData'
import NewQuestionCon from './newQuestionCon'
import QuestionEditCon from './QuestionEditCon'

//这个是路由层
class App extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return <QuestionEditCon/>
	}
}



export default App