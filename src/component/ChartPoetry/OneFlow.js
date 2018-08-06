import React from 'react'
import * as d3 from 'd3'

export default class OneFlow extends React.Component{
    render(){
        const { width, xFlow, yFlow, symbol, index, name, value, flowstate, btnstatus } = this.props
        let breData = 50
        let btnTrans = {
            symcolor: btnstatus === flowstate || btnstatus === "所有诗人" ? "#c33d3c" : "#d8bf82",
            // 动画与css样式
            isAnimate: flowstate === btnstatus ? true : false,
            isStroke: value > breData ? "#ab4948" : ""
        }

        return(
            <g className="flow-style">
                <circle
                    className="backgroud"
                    cx={xFlow + width} cy={yFlow + width}
                    r={ width + 10}
                    // stroke={btnTrans.isStroke}
                ></circle>
                <text 
                    className="number"
                    x={xFlow + width}
                    y={yFlow + width * 2 + 20 }
                >{flowstate}
                </text>
                <text
                    className="number"
                    x={xFlow + width}
                    y={yFlow + width * 2 + 36}
                >作诗{value}首
                </text>
                <use 
                    xlinkHref={symbol}
                    x={xFlow} y={yFlow} 
                    data-index={index}
                    data-name={name}
                    data-value={value}
                    width={ width*2 } height={ width*2 } 
                    fill={btnTrans.symcolor}
                />
                <text fill="#645e52"
                    className="name"
                    x={ xFlow + width} 
                    y={ yFlow + width - 33 }
                >{name}
                </text>
                <circle
                    className="hover"
                    cx={xFlow + width} cy={yFlow + width}
                    r={width + 10}
                ></circle>
            </g>
        )
    }
    componentDidMount(){
        d3.selectAll(".flow-style")
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut)
        // let ease = d3.easeSin;
        
        function mouseOver(d){
            const el = d3.select(this)
            const t = d3.transition().duration(1000)

            //append a new group
            let outer = el.node();
            outer.parentNode.appendChild(outer);

            el.select("circle.backgroud")
                .style("filter", "url(#shadow)")
                .transition(t)
                .attr("fill", "rgba(255, 255, 255, 1)")
                .attr("r", 80)
                .style("fill-opacity", 1)
                
            el.select("text.name").transition(t)
                .style("font-size", "24px")
                .attr("fill", "#c33d3c")
                .style("opacity", 1)

            el.selectAll("text.number").transition(t)
                .style("opacity", 1)
        }
        function mouseOut(d){
            const el = d3.select(this)
            const t = d3.transition().duration(2000)
            const t2 = d3.transition().duration(1000)

            el.select("circle.backgroud").transition(t).attr("r", 40)
                .style("fill-opacity", 0).style("filter", "")

            el.select("text.name").transition(t).style("font-size", "12px")
                .attr("transform", "translate(0, -4)").style("opacity", 0)

            el.selectAll("text.number").transition(t2).style("opacity", 0)


        }
    }
}