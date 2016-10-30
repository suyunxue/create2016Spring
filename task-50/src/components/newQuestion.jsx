import React from 'react'
import {Component} from 'react'
import {Link} from 'react-router'

import '../../style/components/newQuestion.css'


//新建问卷页面
class NewQustion extends Component {
	constructor(){
		super();
	}

	render(){
		return <section className="new-box">
					<Link to="/questionEditCon">
        		    	<div className="only-new-question">新建问卷</div>
        		    </Link>
   			    </section>
	}
}

export default NewQustion
