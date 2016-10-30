import React from 'react'
import {Component}  from 'react'
import {render} from 'react-dom'
import {deleteSingle, deleteSelected, jump} from '../actions/deleteQuestion'
import { connect } from 'react-redux'

import Header from '../components/header'
import Table from '../components/table'

class QuestionList extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const {dispatch, data} = this.props
		return (<div>
					<Header/>
					<Table
					    data={data}
					    handleDelete={(index) => dispatch(deleteSingle(index))}
					    handleDeleteAll={(selects) => dispatch(deleteSelected(selects))}
					    jumpHandle={(index) => dispatch(jump(index))}
					/>
				</div>)
	}
}


function select(state) {
	return {
		data: state.data
	}
}

export default connect(select)(QuestionList)