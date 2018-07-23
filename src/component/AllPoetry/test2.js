import React from 'react'
import * as d3 from 'd3'
import AllData from '../Part/data/alldata.json'
// import {beeswarm} from "d3-beeswarm";

export default class AllPoetry extends React.Component{

    componentWillMount(){      
        // console.log(AllData)
        this.data  = AllData
        this.radius = 3
        this.padding = 1

        this.color = {
            "femaleC": "rgba(194, 55, 55, 0.959)",
            "maleC": "rgba(117, 79, 21, 0.959)"
        }

        const { svgLayout } = this.props
        
        let svgWidth = svgLayout.width
        let svgHeight = svgLayout.height
        this.margin = ( this.radius + this.padding )* 2


        //需要计算 range值
        this.xScale = d3.scaleLinear().range([this.margin, svgWidth - this.margin * 2]).domain(d3.extent(this.data, d => d.value));
        this.yScale = d3.scaleLinear().range([this.margin, svgHeight - this.margin * 2]).domain(d3.extent(this.data, d => d.value));

        // const alldata = this.data.map( d => ({ name: d.name, m : this.xScale(d.value), value: d.value, sex: d.sex})).sort((a, b) => a.m - b.m)
        const alldata = this.data.map( d => ({ name: d.name, m : this.yScale(d.value), value: d.value, sex: d.sex})).sort((a, b) => a.m - b.m)
        this.compute = this.simpos(alldata)

        this.svgHeight = svgLayout.height


    }
    componentDidMount(){
        // const areaHeight = 400 
        d3.select("#allpoetry")
            // .append("g")
            // .attr("transform", "translate(300, 0)")
            .selectAll("circle")
            .data(this.compute)
            .enter()
            .append("circle")
            .attr("class", "poetry")
            .attr("fill", d => d.sex === "female" ? this.color.femaleC : this.color.maleC)
            // .attr("stroke", d => d.sex === "female" ? this.color.femaleC : this.color.maleC)
            // .attr("cx", d => d.m)
            .attr("cx", d => this.margin + d.n)
            // .attr("cy", d => areaHeight - d.n)
            .attr("cy", d => d.m)
            .attr("r", this.radius)
            // .style("opacity", 0)
    }
    render(){
        const { bigChartStyle, dotLayout, svgLayout} = this.props
        return (
            <div className={bigChartStyle} style={dotLayout}>
                {/* <button onClick={this.handleClick}>  测试 </button> */}
                <svg id="allpoetry" style={svgLayout}></svg>
            </div>
        )
    }
    handleClick(){
        console.log("点击")
        d3.selectAll(".poetry")
            .transition()
            .duration(3000)
            .delay( d => d.x * 200)
            .style("opacity", 1)
    }
    simpos(data) {
        const epsilon = 1e-3;
        let head = null, tail = null;
        let radius = this.radius
        let padding = this.padding
        // Place each circle sequentially.
        for (const b of data) {

            // Remove data from the queue that can’t intersect the new circle b.
            while (head && head.m < b.m - (radius * 2 + padding)) head = head.next;

            // Choose the minimum non-intersecting tangent.
            if (intersects(b.m, b.n = 0)) {
                let a = head;
                b.n = Infinity;
                do {
                    let n = a.n + Math.sqrt((radius * 2 + padding) ** 2 - (a.m - b.m) ** 2);
                    if (n < b.n && !intersects(b.m, n)) b.n = n;

                    a = a.next;
                } while (a);
            };
            // Add b to the queue.
            b.next = null;
            if (head === null) head = tail = b;
            else tail = tail.next = b;
        }
        // Returns true if circle ⟨m,n⟩ intersects with any circle in the queue.
        function intersects(m, n) {
            let a = head;
            while (a) {
                if ((radius * 2 + padding - epsilon) ** 2 > (a.m - m) ** 2 + (a.n - n) ** 2) {
                    return true;
                }
                a = a.next;
            }
            return false;
        }
        // for (let b of data){
        //     b.n = b.n 
        // }
        // for (let b of data) {
        //     let m = b.value
        //     if (b.n > edge && b.n < edge * 2) {
        //     m = m + radius * 2 + padding;
        //         b.n = b.n - edge - padding / 2;
        //     } else if (b.n > edge * 2 && b.n < edge * 3) {
        //     m = m + radius * 4 + padding * 2;
        //         b.n = b.n - edge * 2 - padding;
        //     } else if (b.n > edge * 3 && b.n < edge * 4) {
        //     m = m + radius * 6 + padding * 3;
        //         b.n = b.n - edge * 3 - padding;
        //     } else if (b.n > edge * 4 && b.n < edge * 5) {
        //     m =m + radius * 8 + padding * 4;
        //         b.n = b.n - edge * 4 - padding * 2;
        //     } else if (b.n > edge * 5 && b.n < edge * 6) {
        //     m =m + radius * 10 + padding * 5;
        //         b.n = b.n - edge * 5 - padding * 2;
        //     }
        // }
        return data;
    };  
}
