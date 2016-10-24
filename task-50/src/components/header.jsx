import React from 'react'


//问卷头
class Header extends React.Component {

    render(){
        return (<header className="header">
                    <h1 className="facility">问卷管理</h1>
                    <span>我的问卷</span>
                </header>)
    }
}

export default Header