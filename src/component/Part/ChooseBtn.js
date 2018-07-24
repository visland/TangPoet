import React from 'react'

export default class ChooseBtn extends React.Component{
    render(){
        const { btnpic, handleClick, hoverHelight, alt, chobtnStyle } = this.props
        return(
            <img
                src={ btnpic } alt={ alt }
                onClick={handleClick}
                onMouseOver={hoverHelight}
                className={chobtnStyle}
            >

            </img>
        )
    }
}