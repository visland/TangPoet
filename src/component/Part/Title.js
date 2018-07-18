import React from 'react'

export default class Title extends React.Component {
    render() {
        const { title, titleid } = this.props
        return (
            <p id={titleid} className="title">{title}</p>
        )
    }
}