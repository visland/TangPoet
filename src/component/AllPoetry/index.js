import React from 'react'
// import * as d3 from 'd3'
import AllData from '../Part/data/alldata2.json'
import OnePoetry from './OnePoetry'
// import {beeswarm} from "d3-beeswarm";

export default class AllPoetry extends React.Component{

    componentWillMount(){      
        // console.log(AllData)
        this.data  = AllData
        this.radius = 5
        this.padding = 2
        
        this.group = [
            { "group": "1", "value": 943, "name": "留诗一首" },
            { "group": "2", "value": 323, "name": "小作两曲" },
            { "group": "3-5", "value": 294, "name": "留诗一首" },
            { "group": "5-10", "value": 198, "name": "留诗一首" },
            { "group": "10-50", "value": 208, "name": "留诗一首" },
            { "group": "50+", "value": 155, "name": "名留千古" },
        ]

        const { svgLayout } = this.props
        
        let svgHeight = svgLayout.height

        this.margin = ( this.radius + this.padding )* 2
        this.svgHeight = svgLayout.height
        // this.areaWidth = svgWidth / 6
        this.areaHeight = svgHeight * 0.8
        this.oneWide = this.radius * 2 + this.padding
        let a = Math.floor(this.areaHeight / this.oneWide)

        let comData1 = this.group.map(d => ({ group: d.group, name: d.name, b : Math.ceil(d.value / a) }))
        let comData2 = comData1.map(d => ({ group: d.group, name: d.name, b: d.b, groupWidth: d.b * this.oneWide}))
        this.groupdata = this.compute(comData2)
        // console.log(this.groupdata)

        
    }
    compute(data){
        let padding = this.oneWide * 2
        let transform = this.oneWide;
        for (let i = 0; i < data.length; i ++){
            data[i].transform = transform 
            let a = data[i].groupWidth
            transform = transform + a + padding
        }
        return data
    }
    render(){
        const { bigChartStyle, dotLayout, svgLayout, viewbox} = this.props
        let Layout = { width: svgLayout.widthP, height: svgLayout.heightP, left: svgLayout.left, top: svgLayout.top }
        console.log(viewbox)
        return (
            <div className={bigChartStyle} style={dotLayout}>
                <svg id="allpoetry" style={Layout} viewBox={viewbox}>
                    {this.groupdata.map((d, i) => 
                        <OnePoetry 
                            key={i}
                            transform={`translate(${d.transform}, ${this.areaHeight * 0.1})`} 
                            data={this.choosedata(d.group)}
                            dotR={this.radius}
                            numW={d.b}
                            oneWide={this.oneWide}
                            height={this.areaHeight}
                            name={d.name}
                            width={d.groupWidth}
                        />
                    )}
                </svg>
            </div>
        )
    }
    choosedata(group) {
        let data = this.data.filter(d => d.group === group)
        return data
    }
}
