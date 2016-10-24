import React from 'react'
import {Component}  from 'react'
import {render} from 'react-dom'
import { connect } from 'react-redux'
import {deleteSingle,
        deleteSelected,
        saveQuestion
    } from '../actions/deleteQuestion'

import Header from '../components/header'
import QuestionEdit from '../components/questionEdit'


class QuestionEditCon extends Component{
	render(){
		const {dispatch, data} = this.props
		return <div>
			<Header/>
			<QuestionEdit
				data={data}
				saveQuestion={(data)=>dispatch(saveQuestion(data))}
			/>
		</div>
	}
}


function select(state) {
	return {
		data: state
	}
}



export default connect(select)(QuestionEditCon)