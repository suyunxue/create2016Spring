import React from 'react'
import {Component}  from 'react'
import {render} from 'react-dom'
import { connect } from 'react-redux'

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

function select(state) {
	return {
		data: state
	}
}

export default connect(select)(NewQuestionCon)

