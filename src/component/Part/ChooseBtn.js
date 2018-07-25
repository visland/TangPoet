import React from 'react'

export default class ChooseBtn extends React.Component{
    render(){
        const { btnpic, handleClick, hoverHelight, alt, chobtnStyle } = this.props
        return(
            <div 
                className={chobtnStyle} 
                onClick={handleClick}
                onMouseOver={hoverHelight}
                >
                <p alt={alt}><img src={ btnpic } alt={ alt }></img></p>
                <p alt={alt}>{alt}</p>
            </div>
        )
    }
}