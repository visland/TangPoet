import React from 'react'
import './style/style.less'

export default class Title extends React.Component {
    render() {
        const { title, titleid, titleLayout } = this.props
        const left = { left: titleLayout.left}
        
        
        return (
            <span id={titleid} className="title-style" style={left}>{title}</span>
        )
        
    }
}