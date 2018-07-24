import React from 'react'
import './style/style.less'


export default class Title extends React.Component{
    render(){
        const { titleText, titleInfo } = this.props
        let info = titleInfo.split("<br>")
        return(
            <div className="title">
                <p className="title-text">{titleText}</p>
                {info.map((d, i) =>
                    <p key={i} className="title-info" >{d}</p>
                )}
                {/* <p className="title-info">{titleInfo}</p> */}
            </div>
        )
    }
}