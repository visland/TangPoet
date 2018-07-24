import React from 'react'
import * as d3 from 'd3'

export default class OneFlow extends React.Component{
    render(){
        const { width, xFlow, yFlow, symbol, showToolTip, index, name, value, flowstate, btnstatus } = this.props
        let breData =20
        let btnTrans = {
            symcolor: btnstatus === flowstate || btnstatus === "全部" ? "#c33d3c" : "#d8bf82",
            // 动画与css样式
            isAnimate: flowstate === btnstatus ? true : false,
            isBreath: value > breData ? true : false
        }
        let radius = 0
        // this.handleOver = this.handleOver.bind(this)
        // this.width = width
        return(
            <g className="flow-style">
                <circle
                    cx={xFlow + width} cy={yFlow + width}
                    r={width}
                ></circle>
                <use 
                    xlinkHref={symbol}
                    x={xFlow} y={yFlow} 
                    data-index={index}
                    data-name={name}
                    data-value={value}
                    width={ width*2 } height={ width*2 } 
                    // onMouseOver={showToolTip}
                    fill={btnTrans.symcolor}
                    className={ btnTrans.isBreath ? "breath-flow" : ""}
                    // onMouseOver={handleOver}
                />
                <text 
                    x={ xFlow + width} 
                    y={ yFlow + width * 2 + 15 }
                >{name}
                </text>
            </g>
        )
    }
    componentDidMount(){
        d3.selectAll(".flow-style")
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut)

        function mouseOver(d){
            const el = d3.select(this)
            const t = d3.transition().duration(1000)

            el.select("circle").transition(t).attr("r", 40).style("opacity", 1)
            el.select("text").transition(t)
                // .delay(1000)
                // .attr("transform", "translate(0, 10)")
                .style("font-size", "18px")
        }
        function mouseOut(d){
            const el = d3.select(this)
            const t = d3.transition().duration(2000)

            el.select("circle").transition(t).attr("r", 30).style("opacity", 0)
            el.select("text").transition(t).style("font-size", "12px")
                // .attr("transform", "translate(0, -10)")

        }
    }
}