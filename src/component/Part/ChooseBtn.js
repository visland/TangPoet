import React from 'react'

export default class ChooseBtn extends React.Component{
    render(){
        const { btnstatus, btnpic, handleClick, hoverHelight, alt } = this.props
        return(
            <div 
                className="chobtn-style" 
                onClick={handleClick}
                onMouseOver={hoverHelight}
                data-status={ btnstatus === alt ? true : false}
                >
                <p alt={alt}><img src={ btnpic } alt={ alt }></img></p>
                <p alt={alt}>{alt}</p>
            </div>
        )
    }
}