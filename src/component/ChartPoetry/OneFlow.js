import React from 'react'

export default class OneFlow extends React.Component{

    render(){
        const { width, xFlow, yFlow, symbol, showToolTip, index, name, value, flowstate, btnstatus, maxX } = this.props
        let breData =20
        let btnTrans = {
            symcolor: btnstatus === flowstate || btnstatus === "全部" ? "#c33d3c" : "#EBEEFF",
            // 动画与css样式
            isAnimate: flowstate === btnstatus ? true : false,
            isBreath: value > breData ? true : false

        }

        return(
            <g
                // x={xFlow} y={yFlow} 
            >
                <use 
                    xlinkHref={symbol}
                    x={xFlow} y={yFlow} 
                    data-index={index}
                    data-name={name}
                    data-value={value}
                    width={ width*2 } height={ width*2 } 
                    onMouseOver={showToolTip}
                    stroke="#EBEEFF"
                    strokeWidth="2"
                    fill={btnTrans.symcolor}
                    className={ btnTrans.isBreath ? "breath-flow" : ""}
                />
                {/* <text 
                    x={ xFlow + width - 15} 
                    y={ yFlow + width * 2 + 15 }
                >{name}
                </text> */}
            </g>
        )
    }
}