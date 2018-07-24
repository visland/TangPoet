import React from 'react'
import './style/style.less'

export default class Title extends React.Component{
    render(){
        const { titleText, titleInfo } = this.props
        return(
            <div className="title">
            <img src={require('./style/bird.png')}
            width='213' height='120' 
            style={{
                position:'relative',
                left:'9%'
            }} />
                <p className="title-text" >{titleText}</p>
                <p className="title-info">{titleInfo}</p>
            </div>
        )
    }
}