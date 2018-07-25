import React from 'react'
// import Bimg from '../ChartPoetry/img/1.png'
// import * as d3 from 'd3'

export default class OnePoetry extends React.Component{
    render(){
        const { data, dotR, numW, oneWide, transform, height, name, width } = this.props
        const color = {
            "femaleC": "rgba(194, 55, 55, 0.959)",
            "maleC": "#947d4e",
            "male": "rgba(117, 79, 21, 0.959)"
        }
        return(
            <g
                className="group-style"
                transform={transform}         
            >
                {data.map((d, i) => 
                    <g className="poetry-style" key={i}>           
                        <circle
                            cx={oneWide * ( i - Math.floor( i / numW) * numW)}
                            cy={height - oneWide * Math.floor(i / numW)}
                            r={dotR}
                            id={d.name}
                            data-value={d.value}
                            data-sex={d.sex}
                            ref={circle => { this.circle = circle }}
                            fill={d.sex === "female" ? color.femaleC : color.maleC}
                        >
                        </circle>
                    </g>
                )}
                <text
                    dx={ width / 2}
                    dy={ height + height * 0.06}
                >{name}</text>
                {/* <g>
                    <text> aaa </text>
                </g> */}
                
            </g>
        )
    }
    componentDidMount(){

    }
}