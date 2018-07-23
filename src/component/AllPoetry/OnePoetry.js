import React from 'react'

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
                    <g className="poetry-style">
                        
                        <circle
                            key = {i}
                            className=""
                            cx={oneWide * ( i - Math.floor( i / numW) * numW)}
                            cy={height - oneWide * Math.floor(i / numW)}
                            r={dotR}
                            fill={d.sex === "female" ? color.femaleC : color.maleC}
                        >
                        </circle>
                        <g className="tooltip" 
                            x={oneWide * (i - Math.floor(i / numW) * numW) - 45}
                            y={height - oneWide * Math.floor(i / numW) + dotR}>
                            <rect 
                                height = {oneWide * 4}
                                width = "90"
                                rx = "10"
                                ry = "10"
                                x={oneWide * (i - Math.floor(i / numW) * numW) - 45}
                                y={height - oneWide * Math.floor(i / numW) + dotR}></rect>
                            <text
                                x={oneWide * (i - Math.floor(i / numW) * numW)}
                                y={height - oneWide * Math.floor(i / numW) + oneWide * 2}>{d.name}</text>
                            <text
                                x={oneWide * (i - Math.floor(i / numW) * numW)}
                                y={height - oneWide * Math.floor(i / numW) + oneWide * 3.5}>诗作数量：{d.value}</text>
                            
                        </g>
                    </g>
                )}
                <text
                    dx={ width / 2}
                    dy={ height + height * 0.08}
                >{name}</text>
            </g>
        )
    }

}