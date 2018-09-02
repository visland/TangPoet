import React from 'react'
import './style/style2.less'

export default class Title extends React.Component {
    render() {
        const { title, titleid } = this.props        
        return (
            <p id={titleid} className="title-style">{title}</p>
        )
    }
}