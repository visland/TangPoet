import React from 'react'
import OneFlow from './OneFlow'
import * as d3 from 'd3'
import Period from './Period'

export default class DrawArea extends React.Component{
    render(){
        const { flows, transform, Pimg, showToolTip, btnstatus, areaWidth, areHeight, statusList } = this.props
        
        const width = areaWidth * 0.9
        const height = areHeight 
        
        //设置花瓣的半径范围
        this.xScale = d3.scaleLinear().range([8, 25]).domain(d3.extent(flows, d => d.value));

        const MaxY = d3.max(flows, d => this.xScale(d.value))
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
                        key={i} width={this.xScale(d.value)}
                        index={d.index}
                        name={d.name}
                        value={d.value}
                        symbol={this.Filter(statusList, d.state)}
                        xFlow={width - Fwide * (Math.floor((i) / a + 1)) + MaxX - this.xScale(d.value)}
                        yFlow={Flong * (i - a * Math.floor((i) / a)) + MaxY - this.xScale(d.value)}
                        showToolTip={showToolTip}

                        btnstatus={btnstatus}
                        flowstate={d.state}
                        MaxX={MaxX}
                        // isBreath={ d.value > breData ? true : false}
                    />
                    
                )}
            </g>
        )
    }
    Filter(data, status, d){
        for(d of data){ 
            if(d.state === status) { 
                return d.symbol
            } 
            return "#sym01"
        }
    }
    
}