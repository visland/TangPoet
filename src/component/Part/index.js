import React from 'react'
import ChartNote from './ChartNote'
import Title from './Title'
import ChartPoetry from '../ChartPoetry/ChartPoetry'
import AllPoetry from '../AllPoetry'
import Aside from './Aside'
import FemaleData from './data/female_info.json'
import StateList from './data/stateList.json'
import * as d3 from 'd3'

import '../../component_mobile/Part/style/style1.less'

export default class Part extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            status: '所有诗人', 
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
        this.flows = FemaleData    
        this.statusList = StateList
        this.info =[ 
            { "index": "1", "title": "唐代诗人创作一览", "chartnote": "纵观唐代文学史，男性诗人占领着绝对优势，女诗人的所有诗作，数量加起来不及白居易的三分之一，不足总量的千分之一。“女子作诗，其工也，难于男子；闺秀之名，其传也，亦难于才士。”写诗不易，存诗愈难。女性诗人平均每人作诗四首，多数仅有一篇诗作流传下来，其中写诗小能手薛涛一人独做九十三首，为唐代女诗人之首。" },
            { "index": "2", "title": "唐代女诗人全景图" },
        ]
        this.aside = [
            { "src": "1", "style": { right: "-9%", top: "-1%" } },
            { "src": "2", "style": { left: "-9%", bottom: "20%"}}
        ]
    }
    render(){        
        let bgWidth = 2746,
            bgHeight = 1372,
            boxWidth = 2355,
            boxHeight = 1054

        let svgWidth = boxWidth * 0.5,
            svgHeight = boxHeight * 0.5,
            chartWidth = bgWidth * 0.5,
            chartHeight = bgHeight * 0.5

        let _per = d3.format("%")
        let mleft = _per((chartWidth - svgWidth) / 2 / chartWidth),
            mtop = _per((chartHeight - svgHeight) / 2 / chartHeight)

        let layout2 = { left: mleft, top: mtop }

        let viewbox = `0 0 ${chartWidth} ${chartHeight}`,
            gstyle = { transform: `translate(${layout2.left}, ${layout2.top})` }   

        return(
            <div id="part1">
                <div className="part-style" >
                    <Aside asideSrc={require("./style/" + this.aside[0].src + ".png")} asideStyle={this.aside[0].style}/>
                    <Title title={this.info[0].title} />
                    <AllPoetry viewbox={viewbox} gstyle={gstyle} svgHeight={svgHeight}/>
                    {/* <ChartNote chartnote={this.info[0].chartnote} /> */}
                </div>

                <div className="part-style" >
                    <Aside asideSrc={require("./style/" + this.aside[1].src + ".png")} asideStyle={this.aside[1].style}/>
                    <Title title={this.info[1].title}/>
                    <ChartPoetry 
                        flows={this.flows} 
                        btnstatus={this.state.status}
                        statusList={this.statusList}
                        handleClick={this.handleClick}
                        viewbox={viewbox}
                        gstyle={gstyle}
                    />
                    <ChartNote chartnote={this.Filter(this.statusList, this.state.status)} />
                </div>
            </div>
        )
    }
    handleClick(e) {
        console.log("click")
        let status = e.target.getAttribute('data-status')

        this.setState({ status: status})
    }
    Filter(data, status, d) { 
        for (d of data) {if (d.state === status) { return d.chartnote }}
    }
  
}
