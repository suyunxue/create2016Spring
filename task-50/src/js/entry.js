import React from 'react';
import { render } from 'react-dom';

class App extends React.Component{
    render(){
        return (<div>
                <h1>问卷管理</h1>
                <span>我的问卷</span>
            </div>)
    }
}

render(<App>, document.getElementById('app'));