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
                    <circle
                        key = {i}
                        className="poetry-style"
                        cx={oneWide * ( i - Math.floor( i / numW) * numW)}
                        cy={height - oneWide * Math.floor(i / numW)}
                        r={dotR}
                        fill={d.sex === "female" ? color.femaleC : color.maleC}
                    >
                    </circle>
                )}
                <text
                    dx={ width / 2 - 35}
                    dy={ height + height * 0.08}

                >{name}</text>
            </g>
        )
    }

}