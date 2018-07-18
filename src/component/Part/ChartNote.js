import React from 'react'

export default class ChartNote extends React.Component{
    render(){
        const { chartnote, noteStyle } = this.props
        return(
            <p className={noteStyle}>{chartnote}</p>
        )
    }
}