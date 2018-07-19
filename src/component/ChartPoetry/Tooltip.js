import React from 'react'

import './style/tooltip.less'

export default class Tooltip extends React.Component{
    render(){
        const { tooltip, hideToolTip } = this.props;
        let data = tooltip.data;
        let x = 0;
        let y = 0;

        if (tooltip.display === true) {
            let position = tooltip.pos;
            x = position.x;
            y = position.y;
        } 
        const style = {
            position: "absolute",
            top: y, 
            left: x,
            visibility: tooltip.display ? "visible" : "hidden"
        }
        return(
            <div 
                onMouseOut={hideToolTip}  
                style={style}
                className="tooltip"                
            >
                <p className="poetry-name">{data.name}</p>
                <p className="poetry-info">{data.info}</p>
                <p className="poetry-value">诗作数量：{data.value}</p>
            </div>
        )
    }
}