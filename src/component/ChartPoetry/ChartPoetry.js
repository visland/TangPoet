import React from 'react'
import DrawArea from './DrawArea'
import ToolTip from './Tooltip'
// import ChooseFun from '../Part/Choose'


export default class ChartPoetry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tooltip: { display: false, data: { key: '', name: '', value: ''}},
            status: "女冠",
            // symbolinfo: { color: "#92CEF7", IsHelight: false, status: "女冠"},
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
        let Pwidth = 220
        const { enableStackTooltip, btnstatus } = this.props    

        return(
        <div>
            {/* <ChooseFun handleClick={this.handleClick} hoverHelight={this.hoverHelight} /> */}

            <ToolTip 
                tooltip={this.state.tooltip} 
                hideToolTip={this.hideToolTip}
            />
            <svg width="1000" height="400">
                {this.period.map((item) =>
                    <DrawArea 
                        key={item.index} 
                        flows={this.choosedata(item.time)} 
                        Pimg={require("./img/" + item.imgsrc + ".jpg")}
                        transform={`translate(${(item.index - 1 )* Pwidth}, 0)`} 
                        showToolTip={this.showToolTip}
                        isInteractive={enableStackTooltip}

                        btnstatus={btnstatus}
                    />
                )}                
            </svg>
        </div>
        )
    }
    showToolTip(e){       
        // const i = e.target.getAttribute('data-index')
        let xWin = e.clientX
        let yWin = e.clientY
        this.setState(
            {tooltip: {
                display: true,
                data: {
                    key: e.target.getAttribute('data-index'),
                    name: e.target.getAttribute('data-name'),
                    // info: d.value,
                    value: e.target.getAttribute('data-value')
                },
                pos: {
                    // x: e.target.getAttribute('x'),
                    // y: e.target.getAttribute('y'),
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
        let data = this.state.flowsdata.filter(d => d.time === time)
        return data
    }


}
