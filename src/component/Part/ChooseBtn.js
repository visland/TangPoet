import React from 'react'

export default class ChooseBtn extends React.Component{
    render(){
        const { btnpic, wpic, hpic, handleClick, hoverHelight, alt } = this.props

        return(
            <img
                src={ btnpic } alt={ alt }
                width={wpic}
                height={hpic}
                onClick={handleClick}
                onMouseOver={hoverHelight}
            >

            </img>
        )
    }
}