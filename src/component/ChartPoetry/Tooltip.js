import React from 'react'

import './style/tooltip.less'

export default class Tooltip extends React.Component{
    render(){
        const { tooltip, hideToolTip } = this.props;
        let data = tooltip.data;
        // let position = tooltip.pos;
        

        let visibility = 'hidden';
        let x = 0;
        let y = 0;
        let width = 150;
        let height = 150;
        // let x = position.x;
        // let y = position.y;

        if (tooltip.display === true) {
            let position = tooltip.pos;
            x = position.x;
            y = position.y;
            visibility = 'visible';

        } else {
            visibility = 'hidden';

        }
        const style = {
            position: "absolute",
            // top: y - height / 2, 
            top: y - height / 2, 
            left: x - width ,
            // left: x - width / 2,
        }
        return(
            <div 
                width={width} height={height} 
                visibility={visibility}
                
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