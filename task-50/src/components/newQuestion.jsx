import React from 'react'
import {Component} from 'react'

import '../../style/components/newQuestion.css'


//新建问卷页面
class NewQustion extends Component {
	constructor(){
		super();
	}

	render(){
		return (<section className="new-box">
        		    <div className="new-question">新建问卷</div>
   			    </section>)
	}
}

export default NewQustion
