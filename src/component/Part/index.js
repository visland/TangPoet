import React from 'react'
import ChartNote from './ChartNote'
import Title from './Title'
import ChartPoetry from '../ChartPoetry/ChartPoetry'
import ChooseFun from './Choose'
import AllPoetry from '../AllPoetry'

import './style/style.less'

export default class Part extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            status: '全部', 
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
        this.flows = [
            { "name": "薛涛", "value": 20, "index": 1, "time": "初唐", "state": "女冠" },
            { "name": "薛涛", "value": 20, "index": 12, "time": "初唐", "state": "女冠" },
            { "name": "薛涛", "value": 20, "index": 13, "time": "初唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 2, "time": "初唐", "state": "女冠" },
            { "name": "薛涛", "value": 30, "index": 3, "time": "初唐", "state": "其他" },
            { "name": "薛涛", "value": 20, "index": 4, "time": "盛唐", "state": "其他" },
            { "name": "薛涛", "value": 30, "index": 5, "time": "盛唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 14, "time": "盛唐", "state": "女冠" },
            { "name": "薛涛", "value": 20, "index": 15, "time": "盛唐", "state": "女冠" },
            { "name": "薛涛", "value": 20, "index": 6, "time": "盛唐", "state": "士大夫妻女" },
            { "name": "薛涛", "value": 10, "index": 7, "time": "中唐", "state": "士大夫妻女" },
            { "name": "薛涛", "value": 30, "index": 8, "time": "中唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 9, "time": "中唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 10, "time": "晚唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 16, "time": "晚唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 17, "time": "晚唐", "state": "女冠" },
            { "name": "薛涛", "value": 30, "index": 11, "time": "晚唐", "state": "女冠" },
        ]       
        this.statusList = [
            { "state": "全部", "picsrc": "0", "chartnote": "元人辛文房《唐才子传》：历观唐以雅道奖士类，而闺阁英秀，亦能熏染，锦心绣口，蕙情兰性，足可尚矣。" },
            { "state": "女冠诗人", "picsrc": "1", "chartnote": "女冠诗人" },
            { "state": "士大夫妻女", "picsrc": "2", "chartnote": "士大夫妻女" },
            { "state": "民间女子", "picsrc": "3", "chartnote": "民间女子" },
            { "state": "其他", "picsrc": "4", "chartnote": "其他" },
        ]
        this.info =[ 
            { "index": "1", "title": "唐代所有诗人", "chartnote": "唐代所有诗人" },
            { "index": "2", "title": "唐代女诗人作品数" },
        ]
    }
    render(){        
        let screenHeight = document.documentElement.clientHeight,
            screenWidth = document.documentElement.clientWidth

        let chartHeight = screenHeight * 0.75,
            chartWidth = screenWidth * 0.85

        let bgWidth = 2746,
            bgHeight = 1372,
            boxWidth = 2355,
            boxHeight = 1054,

            hboxScale = boxHeight / bgHeight,
            wboxScale = boxWidth / bgWidth;

        let svgWidth = chartWidth * wboxScale,
            svgHeight = chartHeight * hboxScale
        
        let margin = { left: (chartWidth - svgWidth) / 2, top: (chartHeight - svgHeight) / 2}

        let screenStyle = { height: screenHeight },
            Layout = { height: chartHeight },
            svgLayout = { height: svgHeight, width: svgWidth, left: margin.left, top: margin.top} 

        return(
            <div id="part1">
                <div className="part-style" style={screenStyle}>
                    <Title title={this.info[0].title} titleLayout={svgLayout}/>
                    <AllPoetry bigChartStyle="chart-style" dotLayout={Layout} svgLayout={svgLayout}/>
                    <ChartNote chartnote={this.info[0].chartnote} noteStyle="note-style" />
                </div>

                <div className="part-style" style={screenStyle}>
                    <Title title={this.info[1].title} titleLayout={svgLayout}/>
                    <ChooseFun 
                        handleClick={this.handleClick} hoverHelight={this.hoverHelight} 
                        statusList={this.statusList}
                        chooseStyle="choose-style"
                        chobtnStyle="chobtn-style"
                        choLayout={svgLayout}
                    />

                    <ChartPoetry 
                        flows={this.flows} 
                        enableStackTooltip="true" 
                        btnstatus={this.state.status}
                        chartStyle="chart-style"
                        chartLayout={Layout}
                        svgLayout={svgLayout}
                    />
                    <ChartNote chartnote={this.Filter(this.statusList, this.state.status)} noteStyle="note-style" />
                </div>
            </div>
        )
    }
    handleClick(e) {
        console.log("点击")
        let status = e.target.getAttribute('alt')
        this.setState({ 
            status: status
        })
    }
    Filter(data, status, d) { 
        for (d of data) {if (d.state === status) { return d.chartnote }}
    }
  
}
