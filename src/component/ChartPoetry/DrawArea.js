import React from 'react'
import OneFlow from './OneFlow'

export default class DrawArea extends React.Component{
    render(){
        const { flows, transform, Pimg, btnstatus, areHeight, statusList, MaxY, Flong } = this.props
        
        const MaxX = MaxY
        const Fwide = Flong
        const a = Math.floor( areHeight / Flong )
        let b = Math.ceil( flows.length / a)
        const width = (b + 1)  * Fwide

        return (
            <g 
                width={width} 
                transform={transform}            
            >    
                <image
                    xlinkHref={Pimg}
                    width="50"
                    height="50"
                />
                {flows.map((d, i) =>
                    <OneFlow
                        key={i} width={d.value}
                        index={d.data.index}
                        name={d.data.name}
                        value={d.data.value}
                        symbol={this.Filter(statusList, d.data.state)}
                        xFlow={width - Fwide * (Math.floor((i) / a + 1)) + MaxX - d.value}
                        yFlow={Flong * (i - a * Math.floor((i) / a)) + MaxY - d.value + MaxY}
                        btnstatus={btnstatus}
                        flowstate={d.data.state}
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
            } 
        }
        if( a === ""){ return a = "#sym06"; }
    }
}