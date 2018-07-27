import React from 'react'
import './style/style.less'


export default class Title extends React.Component{
    render(){
        const { titleText, titleInfo } = this.props
        let info = titleInfo.split("<br>")
        return(
            <div className="title">
            <img src={require('./style/bird.png')}
            width='213' height='120' alt=""
            style={{
                position:'relative',
                left:'9%'
            }} />
                <p className="title-text" >{titleText}</p>
                {info.map((d, i) =>
                    <p key={i} className="title-info">{d}</p>
                )}
            </div>
        )
    }
}