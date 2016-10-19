import React from 'react'
import {Component} from 'react'

import '../../style/components/newQuestion.css'

/**
 * 这一页就是那个如果没有问卷的话就新建一个问卷的
 * 不牵扯到数据的问题，所以不需要props和dispaction的分发
 * 只需要做一个点击然后跳转的处理，这个使用路由就行
 */


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
