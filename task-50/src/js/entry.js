import React from 'react';
import { render } from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {Router,
        Route,
        browserHistory,
        Link,
        IndexRoute,
        hashHistory
    } from 'react-router'



import App from '../containers/App'
import QuestionList from '../containers/questionList'
import NewQuestionCon from '../containers/newQuestionCon'
import QuestionEditCon from '../containers/questionEditCon'
import LookData from '../containers/lookData'


import rootReducer from '../reducers/reducer'



import '../../style/components/common.css'

let store = createStore(rootReducer);


render(
	<Provider store={store}>	
	    <Router history={hashHistory}>
	    	<Route path="/" component={App} />
			<Route path="/questionList" component={QuestionList} />
			<Route path="/newQuestionCon" component={NewQuestionCon} />
			<Route path="/questionEditCon" component={QuestionEditCon} />
			<Route path="/lookData" component={LookData} />
	    </Router>
	</Provider>,
	document.getElementById('app')
)


