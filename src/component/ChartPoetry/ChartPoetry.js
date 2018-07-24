import React from 'react'
import DrawArea from './DrawArea'
import ToolTip from './Tooltip'
import Flow from './Flow'
import * as d3 from 'd3'


export default class ChartPoetry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tooltip: { display: false, data: { key: '', name: '', value: ''}},
            status: "女冠",
            flowsdata: this.props.flows
        }
        
        this.showToolTip = this.showToolTip.bind(this)
        this.hideToolTip = this.hideToolTip.bind(this)
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
        const {  btnstatus, chartStyle, chartLayout, svgLayout, statusList, viewbox } = this.props  

        let svgWidth = svgLayout.width,
            svgHeight = svgLayout.height

        let areaWidth = svgWidth / 4,
            areHeight = svgHeight * 0.8


        let flowsdata = this.state.flowsdata
        this.xScale = d3.scaleLinear().range([12, 28]).domain(d3.extent(flowsdata, d => d.value));

        const MaxY = d3.max(flowsdata, d => this.xScale(d.value)),
            padding = 3

        let Flong = MaxY * 2 + padding,
            Fwide = Flong
        
        let a = Math.floor( areHeight / Flong )
        let compD1 = this.period.map(d => ({ data: d, rowN: Math.ceil( d.value / a ) + 1})),
            compD2 = compD1.map( d => ({data: d.data, width: d.rowN * Fwide + MaxY}))

        this.periodD = this.compute(compD2)
        this.flowdata = this.state.flowsdata.map(d => ({ data: d, value: this.xScale(d.value) }))

        let Layout = { width: svgLayout.widthP, height: svgLayout.heightP, left: svgLayout.left, top: svgLayout.top  }

        return(
        <div className={chartStyle} style={chartLayout}>
            <ToolTip 
                tooltip={this.state.tooltip} 
                hideToolTip={this.hideToolTip}
            />
            <svg style={Layout} viewBox={viewbox}>
                <Flow />
                {this.periodD.map((item, i) =>
                    <DrawArea 
                        key={i} 
                        flows={this.choosedata(item.data.time)} 
                        Pimg={require("./img/" + item.data.imgsrc + ".png")}
                        transform={`translate(${item.transform }, 0)`} 
                        // showToolTip={this.showToolTip}
                        // isInteractive={enableStackTooltip}
                        btnstatus={btnstatus}
                        areaWidth={areaWidth}
                        areHeight={areHeight}
                        statusList={statusList}
                        MaxY={MaxY}
                        Flong={Flong}
                        width={item.width}
                        
                    />
                )}                
            </svg>
        </div>
        )
    }
    showToolTip(e){       
        let xWin = e.clientX
        let yWin = e.clientY
        this.setState(
            {tooltip: {
                display: true,
                data: {
                    key: e.target.getAttribute('data-index'),
                    name: e.target.getAttribute('data-name'),
                    value: e.target.getAttribute('data-value')
                },
                pos: {
                    x: xWin,
                    y: yWin
                }
            }}
        ) 
    }
    hideToolTip(){
        this.setState({tooltip: { display: false, data: { key: '', name: '', value: ''}}});
    }
    choosedata(time) {
        // console.log("data", this.flowdata)
        let data = this.flowdata.filter(d => d.data.time === time)
        return data
    }

}
