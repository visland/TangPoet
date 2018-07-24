import React from 'react'
import OneFlow from './OneFlow'
import * as d3 from 'd3'
import Period from './Period'

export default class DrawArea extends React.Component{
    render(){
        const { flows, transform, Pimg, showToolTip, btnstatus, areaWidth, areHeight, statusList, MaxY, Flong } = this.props
        
        // let width = areaWidth * 0.9,
        // let height = areHeight  
        // console.log(flows.length)
        //设置花瓣的半径范围
        this.xScale = d3.scaleLinear().range([12, 28]).domain(d3.extent(flows, d => d.value));

        // const MaxY = d3.max(flows, d => this.xScale(d.value))
        const MaxX = MaxY
        // const padding = 3
        // const Flong = MaxY * 2 + padding
        const Fwide = Flong
        const a = Math.floor( areHeight / Flong )
        // console.log(a)
        let b = Math.ceil( flows.length / a)
        // console.log(b)
        const width = (b + 1)  * Fwide
        // console.log(flows.length)

        // let breData = 60

        return (
            <g 
                width={width} 
                // height={height}
                transform={transform}     
                // transform={`translate(${width}, 0)`} 
       
            >    
                <Period Pimg={Pimg} />
                {flows.map((d, i) =>
                    <OneFlow
                        key={i} width={d.value}
                        index={d.data.index}
                        name={d.data.name}
                        value={d.data.value}
                        symbol={this.Filter(statusList, d.data.state)}
                        xFlow={width - Fwide * (Math.floor((i) / a + 1)) + MaxX - d.value}
                        yFlow={Flong * (i - a * Math.floor((i) / a)) + MaxY - d.value + MaxY}
                        // showToolTip={showToolTip}

                        btnstatus={btnstatus}
                        flowstate={d.data.state}
                        // MaxX={MaxX}
                        // isBreath={ d.value > breData ? true : false}
                    />
                    
                )}
            </g>
        )
    }
    Filter(data, status, d){
        let a = ""
        for(d of data){ 
            if(d.state === status) { 
                return a = d.symbol;
                // console.log()
            } 
            // return "#sym01"
            // console.log(d.symbol)
        }
        // console.log(a)
        if( a === ""){ return a = "#sym01"; }
        // console.log(a)
    }
    
}