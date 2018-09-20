import React from 'react'

export default class OnePoetry extends React.Component{
    render(){
        const { data, dotR, numW, oneWide, transform, height, name, width } = this.props
        const color = {
            "femaleC": "rgba(194, 55, 55, 0.959)",
            "maleC": "#947d4e",
            "male": "rgba(117, 79, 21, 0.959)"
        }
        const stastic = {
            length: data.length,
            mnum: data.filter(d => d.sex === "male").length,
            fnum: data.filter(d => d.sex === "female").length
        }
        let group = data[0].group
        return(
            <g className="group-style" transform={transform} >
                <g dx={width / 2} dy={height * 0.06} className="stastic">
                    <text dx={width / 2} dy={0}>{stastic.length}人作诗{group}首</text>
                    <text dx={width / 2} dy={height * 0.04}><tspan className="male">{stastic.mnum}</tspan>位男诗人</text>
                    <text dx={width / 2} dy={height * 0.08}><tspan className="female">{stastic.fnum}</tspan>位女诗人</text>
                </g>
                <g className="dotss">       
                    {data.map((d, i) => 
                        <g className="poetry-style" key={i}>           
                            <circle
                                cx={oneWide * ( i - Math.floor( i / numW) * numW)}
                                cy={height - oneWide * Math.floor(i / numW) + 50}
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
                </g>
                <text className="group"
                    dx={width / 2}
                    dy={height + height * 0.17}
                >{name}</text>
            </g>
        )
    }
}