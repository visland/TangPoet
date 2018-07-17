import React from 'react'

export default class OneFlow extends React.Component{

    render(){
        const { width, xFlow, yFlow, symbol, showToolTip, index, name, value, flowstate, btnstatus } = this.props

        let btnTrans = {
            symcolor: btnstatus === flowstate || btnstatus === "全部" ? "#92CEF7" : "#EBEEFF",
            // 动画与css样式
            isAnimate: flowstate === btnstatus ? true : false

        }

        return(
                <use 
                    xlinkHref={symbol}
                    x={xFlow} y={yFlow} 
                    data-index={index}
                    data-name={name}
                    data-value={value}
                    width={ width*2 } height={ width*2 } 
                    onMouseOver={showToolTip}

                    fill={btnTrans.symcolor}
                />
        )
    }
}