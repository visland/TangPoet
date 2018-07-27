import React from 'react'
import DrawArea from './DrawArea'
import Flow from './Flow'
import * as d3 from 'd3'
import bgimg from '../Part/style/bg.png'


export default class ChartPoetry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tooltip: { display: false, data: { key: '', name: '', value: ''}},
            status: "女冠",
            flowsdata: this.props.flows
        }
    }
    componentWillMount(){
        this.period = [
            { "time": "初唐", "index": 1, "imgsrc": "1", "value": 10 },
            { "time": "盛唐", "index": 2, "imgsrc": "2", "value": 16 },
            { "time": "中唐", "index": 3, "imgsrc": "3", "value": 14 },
            { "time": "晚唐", "index": 4, "imgsrc": "4", "value": 30 },
        ]

    }
    compute(data) {
        let transform = 0;
        for (let i = 0; i < data.length; i++) {
            data[i].transform = transform
            let a = data[i].width
            transform = transform + a 
        }
        return data
    }
    render(){    
        const {  btnstatus, statusList, viewbox, gstyle} = this.props  
        let boxWidth = 2355,
            boxHeight = 1054

        let svgWidth = boxWidth * 0.5,
            svgHeight = boxHeight * 0.5

        let areaWidth = svgWidth / 4,
            areHeight = svgHeight * 0.85

        
        const flowsdata = this.state.flowsdata

        const xScale = d3.scaleLinear().range([18, 32]).domain(d3.extent(flowsdata, d => d.value));

        const MaxY = d3.max(flowsdata, d => xScale(d.value)),  padding = 3

        let Flong = MaxY * 2 + padding,  Fwide = Flong
        
        let a = Math.floor( areHeight / Flong )
        let compD1 = this.period.map(d => ({ data: d, rowN: Math.ceil( d.value / a ) + 1})),
            compD2 = compD1.map( d => ({data: d.data, width: d.rowN * Fwide}))

        let marginTop =  (areHeight -  Flong * a) / 2 

        this.periodD = this.compute(compD2)
        this.flowdata = this.state.flowsdata.map(d => ({ data: d, value: xScale(d.value) }))        

        return(
        <div className="chart-style">
            <svg viewBox={viewbox} preserveAspectRatio="xMinYMin meet">
                <image xlinkHref={bgimg} width="100%" height="100%"></image>
                <g style={gstyle}>
                    <Flow />
                    {this.periodD.map((item, i) =>
                        <DrawArea 
                            key={i} 
                            flows={this.choosedata(item.data.time)} 
                            Pimg={require("./img/" + item.data.imgsrc + ".png")}
                            transform={`translate(${item.transform}, ${marginTop})`} 
        
                            btnstatus={btnstatus}
                            areaWidth={areaWidth}
                            areHeight={areHeight}
                            statusList={statusList}
                            MaxY={MaxY}
                            Flong={Flong}
                            width={item.width}  
                        />
                    )}                
                </g>
            </svg>
            <p className="note">花朵越大，诗作数量越多，鼠标悬浮可查看每位女诗人的具体信息</p>
        </div>
        )
    }
    choosedata(time) {
        let data = this.flowdata.filter(d => d.data.time === time)
        return data
    }

}
