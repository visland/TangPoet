import React from 'react'
import ChartNote from './ChartNote'
import Title from './Title'
import ChartPoetry from '../ChartPoetry/ChartPoetry'
import ChooseFun from './Choose'
import AllPoetry from '../AllPoetry'
import Aside from './Aside'
import FemaleData from './data/femaledata.json'
import StateList from './data/stateList.json'

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
        //json数据导入
        this.flows = FemaleData    
        this.statusList = StateList
        this.info =[ 
            { "index": "1", "title": "唐代诗人创作一览", "chartnote": "纵观唐代文学史，男性诗人仍占领着绝对优势，女诗人的所有诗作，数量加起来不及白居易的三分之一，不足总量的千分之一。“女子作诗，其工也，难于男子；闺秀之名，其传也，亦难于才士。”写诗不易，存诗愈难。女性诗人平均每人作诗四首，多数仅有一篇诗作流传下来，其中写诗小能手薛涛一人独做九十三首，为唐代女诗人之首。" },
            { "index": "2", "title": "不同时期女诗人创作全景图" },
        ]
        this.aside = [
            { "src": "1", "style": { right: "-9%", top: "5%" } },
            { "src": "1", "style": { left: "-9%", bottom: "10%"}}
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
                    <Aside asideSrc={require("./style/" + this.aside[0].src + ".png")} asideStyle={this.aside[0].style}/>
                    <Title title={this.info[0].title} titleLayout={svgLayout}/>
                    <AllPoetry bigChartStyle="chart-style" dotLayout={Layout} svgLayout={svgLayout}/>
                    <ChartNote chartnote={this.info[0].chartnote} noteStyle="note-style" />
                </div>

                <div className="part-style" style={screenStyle}>
                    <Aside asideSrc={require("./style/" + this.aside[0].src + ".png")} asideStyle={this.aside[1].style}/>
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
                        statusList={this.statusList}

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
