import React from 'react'
import {Component}  from 'react'
import {render} from 'react-dom'

import Header from '../components/header'
import NewQuestion from '../components/newQuestion'


//此容器只需要跳转就行了
class NewQuestionCon extends Component {
	render(){
		return <div>
			<Header/>
			<NewQuestion/>
		</div>
	}
}



export default NewQuestionCon

