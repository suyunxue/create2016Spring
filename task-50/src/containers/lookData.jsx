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


//查看数据页只需要的数据是标题和选项的数据
function select(state) {
	console.log(state)
	console.log(state.data[state.currentIndex].data);
	console.log(state.data[state.currentIndex].title);
	return {
		data: state.data[state.currentIndex].data,
		title: state.data[state.currentIndex].title
	}
}

export default connect(select)(LookData)


