import React from 'react'

export default class ChartNote extends React.Component{
    render(){
        const { chartnote } = this.props
        return(
            <p className="chartnote">{chartnote}</p>
        )
    }
}