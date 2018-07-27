import React from 'react'

export default class Legend extends React.Component{
    render(){
        return(
            <div className="legend">
                <div className="circle male"></div>
                <div className="word male">男诗人</div>
                <div className="circle female"></div>
                <div className="word female">女诗人</div>
            </div>
        )
    }
}