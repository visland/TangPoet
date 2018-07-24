import React from 'react'
import './style/style.less'

export default class Title extends React.Component{
    render(){
        const { titleText, titleInfo } = this.props
        return(
            <div className="title">
            <img src={require('./style/bird.png')}
            width='250' height='180' 
            style={{
                position:'relative',
                left:'5%'
            }} />
                <p className="title-text" >{titleText}</p>
                <p className="title-info">{titleInfo}</p>
            </div>
        )
    }
}