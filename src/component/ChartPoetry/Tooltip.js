import React from 'react'
import '../Part/style.css'

export default class Tooltip extends React.Component{
    render(){
        const { tooltip, hideToolTip } = this.props;
        let data = tooltip.data;
        // let display = tooltip.display?'block':'none';

        let visibility = 'hidden';
        let x = 0;
        let y = 0;
        let width = 150;
        let height = 150;

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
            top: y - height / 2,
            left: x - width / 2,
            // display: display
        }
        return(
            <div 
                width={width} height={height} visibility={visibility}
                className="tooltip"
                onMouseOut={hideToolTip}  
                style={style}      
            >
                <p>{data.name}</p>
                <p>{data.info}</p>
                <p>诗作数量：{data.value}</p>

            </div>
        )
    }
}