import React from 'react'
import './style/style.less'

export default class Aside extends React.Component{
    render(){
        const { asideSrc, asideStyle} = this.props
        return (
            <img src={asideSrc} alt="" style={asideStyle} className="aside-style"/>
        )
    }
}