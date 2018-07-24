import React from 'react'
import Bimg from '../ChartPoetry/img/1.png'
import * as d3 from 'd3'
// import $ from ''

export default class OnePoetry extends React.Component{
    render(){
        const { data, dotR, numW, oneWide, transform, height, name, width } = this.props
        const color = {
            "femaleC": "rgba(194, 55, 55, 0.959)",
            "maleC": "#947d4e",
            "male": "rgba(117, 79, 21, 0.959)"
        }
        function pick(name){ 
            let dis = name === "白居易" ? "block" : "false" 
            let style = { display: dis}
            return style
        }

        return(
            <g
                className="group-style"
                transform={transform}         
            >
                {data.map((d, i) => 
                    <g className="poetry-style" key={i}>           
                        <circle
                            className=""
                            cx={oneWide * ( i - Math.floor( i / numW) * numW)}
                            cy={height - oneWide * Math.floor(i / numW)}
                            r={dotR}
                            id={d.name}
                            ref={circle => { this.circle = circle }}
                            fill={d.sex === "female" ? color.femaleC : color.maleC}
                        >
                        </circle>
                        <g className="tooltip" 
                            x={oneWide * (i - Math.floor(i / numW) * numW) - 45}
                            y={height - oneWide * Math.floor(i / numW) + dotR}>
                            <image
                                xlinkHref={Bimg}
                                width="60"
                                height="60"
                            ></image>
                            <circle
                                r="30"
                                cx={oneWide * (i - Math.floor(i / numW) * numW)}
                                cy={height - oneWide * Math.floor(i / numW)}></circle>
                            {/* <rect
                                height={oneWide * 4}
                                width="90"
                                rx="10"
                                ry="10"
                                x={oneWide * (i - Math.floor(i / numW) * numW) - 45}
                                y={height - oneWide * Math.floor(i / numW) + dotR}></rect>*/}
                            <text 
                                x={oneWide * (i - Math.floor(i / numW) * numW)}
                                y={height - oneWide * Math.floor(i / numW)}>{d.name}</text>
                            <text
                                x={oneWide * (i - Math.floor(i / numW) * numW)}
                                y={height - oneWide * Math.floor(i / numW) + oneWide * 3.5}>诗作数量：{d.value}</text>
                        </g>
                    </g>
                )}
                <text
                    dx={ width / 2}
                    dy={ height + height * 0.06}
                >{name}</text>
                <g>
                    <text> aaa </text>
                </g>
                
            </g>
        )
    }
    componentDidMount(){
        // function pic(name) {
        //     d3.selectAll(".poetry-style")
        //         .select(`[data-name = ${name}]`)
        //         .style("visibility", "visible")
        // }
    
        // let a = ["白居易", '薛涛']
        
        // for(let d of a){
        //     pic(d)
        // }
        let e = document.getElementById("白居易")
        let a = e.getBoundingClientRect()
        let top = a.x
        let left = a.y
        // var x = 0, y =0
        // while (e != null) {
        //     x += e.offsetLeft;
        //     y += e.offsetTop;
        //     e = e.offsetParent;
        // }

        let msgv = d3.select(".bg").append("div").attr("id", "msgv")
            .append("div").style("width", 100).style("height", 100)
            .text("白居易").style("position", "absolute")
            .style("left", `${left}px`).style("top", `${top}px`)

        // console.log(e)
        // console.log(a)  
        // console.log(top)
        // console.log(left)
        // // console.log(y)
        // console.log(msgv)


    }
}