import React from 'react'
import DrawArea from './DrawArea'
import ToolTip from './Tooltip'
import Flow from './Flow'


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
            { "time": "初唐", "index": 1, "imgsrc": "1" },
            { "time": "盛唐", "index": 2, "imgsrc": "2" },
            { "time": "中唐", "index": 3, "imgsrc": "3" },
            { "time": "晚唐", "index": 4, "imgsrc": "4" },
        ]

    }
    render(){
        let bgWidth = 2746
        let bgHeight = 1372
        let scalewValue = 0.45 * 0.89
        let scalehValue = 0.45 * 0.75
        let areaWidth = bgWidth * scalewValue / 4 
        let areHeight = bgHeight * scalehValue
        
        const { enableStackTooltip, btnstatus, chartStyle } = this.props    

        return(
        <div className={chartStyle}>
            <ToolTip 
                tooltip={this.state.tooltip} 
                hideToolTip={this.hideToolTip}
            />
            <svg>
                <Flow />
                {this.period.map((item) =>
                    <DrawArea 
                        key={item.index} 
                        flows={this.choosedata(item.time)} 
                        Pimg={require("./img/" + item.imgsrc + ".png")}
                        transform={`translate(${(item.index - 1) * areaWidth}, 0)`} 
                        showToolTip={this.showToolTip}
                        isInteractive={enableStackTooltip}

                        btnstatus={btnstatus}
                        areaWidth={areaWidth}
                        areHeight={areHeight}
                        
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
        console.log("hide")
        this.setState({tooltip: { display: false, data: { key: '', name: '', value: ''}}});
    }
    choosedata(time) {
        let data = this.state.flowsdata.filter(d => d.time === time)
        return data
    }


}