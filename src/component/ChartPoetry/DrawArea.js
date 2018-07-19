import React from 'react'
import OneFlow from './OneFlow'
import * as d3 from 'd3'
import Period from './Period'

export default class DrawArea extends React.Component{
    render(){
        const { flows, transform, Pimg, showToolTip, btnstatus, areaWidth, areHeight } = this.props
        
        const width = areaWidth * 0.8
        const height = areHeight * 0.9
        
        const MaxY = d3.max(flows, d => d.value)
        const MaxX = MaxY
        const padding = 3
        const Flong = MaxY * 2 + padding
        const Fwide = Flong
        const a = Math.floor( height / Flong )

        // let breData = 60

        return (
            <g 
                width={width} 
                height={height}
                transform={transform}            
            >    
                <Period Pimg={Pimg} />
                {flows.map((d, i) =>
                    <OneFlow
                        key={i} width={d.value}
                        index={d.index}
                        name={d.name}
                        value={d.value}
                        symbol="#sym01"
                        xFlow={width - Fwide * (Math.floor((i) / a + 1)) + MaxX - d.value}
                        yFlow={Flong * (i - a * Math.floor((i) / a)) + MaxY - d.value}
                        showToolTip={showToolTip}

                        btnstatus={btnstatus}
                        flowstate={d.state}
                        // isBreath={ d.value > breData ? true : false}
                    />
                )}
            </g>
        )
    }
    
}