import React from 'react';
import {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import { connect } from 'react-redux'
import Header from '../components/header'
import SeeData from '../components/seeData'

//查看数据也页不需要修改数据，就不需要dispatch了
//也就是不需要reducer了
class LookData extends Component {


	render(){
		const {dispatch, data, title} = this.props
		return <div>
			<Header/>
			<SeeData 
				data={data}
				title={title}
			/>
		</div>
	}	
}



function select(state) {
	return {
		data: state[0].data,
		title: state[0].title
	}
}

export default connect(select)(LookData)


