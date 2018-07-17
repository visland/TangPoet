import React from 'react'

export default class Title extends React.Component {
    render() {
        const { title, titleid, titleStyle } = this.props
        return (
            <span id={titleid} className={titleStyle}>{title}</span>
        )
    }
}