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
        let h=400;
        return(
            <g className="group-style" transform={transform}>
                <g dx={width / 2} dy={height * 0.06} className="stastic">
                    <text dx={500} dy={-810-h}><tspan className="male">{stastic.mnum}</tspan>位男诗人</text>
                    <text dx={800} dy={-810-h}><tspan className="female">{stastic.fnum}</tspan>位女诗人</text>
                </g>
                <g transform="translate(0, 40)">       
                    {data.map((d, i) => 
                        <g className="poetry-style" key={i}>           
                            <circle
                                cx={height - oneWide * Math.floor(i / numW) - 40}
                                cy={oneWide * ( i - Math.floor( i / numW) * numW) - 800 - h}
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
                    dx="10%"
                    dy="-31.5%"
                >{name}</text>
            </g>
        )
    }
}