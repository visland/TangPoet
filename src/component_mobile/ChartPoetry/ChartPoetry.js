import React from 'react'
import DrawArea from './DrawArea'
import Flow from './Flow'
import * as d3 from 'd3'
import bgimg from './img/bg.png'


export default class ChartPoetry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tooltip: { display: false, data: { key: '', name: '', value: ''}},
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
        const { btnstatus, statusList, viewbox, gstyle, handleClick} = this.props  
        let boxWidth = 7355,
            boxHeight = 954

        let svgWidth = boxWidth,
            svgHeight = boxHeight

        let areaWidth = svgWidth / 4,
            areHeight = svgHeight * 0.56

        
        const flowsdata = this.state.flowsdata

        const xScale = d3.scaleLinear().range([20, 32]).domain(d3.extent(flowsdata, d => d.value));

        const MaxY = d3.max(flowsdata, d => xScale(d.value)),  padding = 3

        let Flong = MaxY * 2 + padding,  Fwide = Flong
        
        let a = Math.floor( areHeight / Flong )
        let compD1 = this.period.map(d => ({ data: d, rowN: Math.ceil( d.value / a ) + 1})),
            compD2 = compD1.map( d => ({data: d.data, width: d.rowN * Fwide}))

        let marginTop =  (areHeight -  Flong * a) / 2 - 62

        this.periodD = this.compute(compD2)
        this.flowdata = this.state.flowsdata.map(d => ({ data: d, value: xScale(d.value) }))        

        return(
        <div className="chart-style">
            <svg viewBox="0 0 550 1300" preserveAspectRatio="xMinYMin meet"> 
                <image xlinkHref={bgimg} width="115%" height="115%" x="-7%" y="2%"></image>
                <text x="200"y='190'font-size="1.4em">点击花朵查看每位女诗人的具体信息</text>
                <Flow />                   
                {this.periodD.map((item, i) =>
                    <DrawArea 
                        key={i} 
                        flows={this.choosedata(item.data.time)} 
                        // Pimg={require("./img/" + item.data.imgsrc + ".png")}
                        transform={`translate(${marginTop + 40},${item.transform + 130})`} 
                        btnstatus={btnstatus}
                        areaWidth={areaWidth}
                        areHeight={areHeight}
                        statusList={statusList}
                        MaxY={MaxY}
                        Flong={Flong}
                        width={item.width}  
                    />
                )}         
                {statusList.map((d, i) =>
                    <g
                        key={i}
                        transform={`translate(${i * 110 + 50}, 60)`}
                        fill={d.state === btnstatus ? "#c33e3c" : "#cca851"}
                        className="btn-style"
                    >  
                        <use xlinkHref={d.symbol} width="40" height="40" />
                        <text x="20" y="60" font-size="1.4em">{d.state}</text>
                        <rect
                            x1="-5" x2="60" y1="-5" y2="60"
                            fill="white" data-status={d.state} onClick={handleClick}></rect>
                    </g>
                )}     
            </svg>
        </div>
        )
    }
    choosedata(time) {
        let data = this.flowdata.filter(d => d.data.time === time)
        return data
    }

}
