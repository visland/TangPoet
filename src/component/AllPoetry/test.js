import React from 'react'
import * as d3 from 'd3'
// import {beeswarm} from "d3-beeswarm";

export default class AllPoetry extends React.Component{
    componentWillMount(){
        this.data = [
            { "name": "one", "index":"1", "value": 20, "sex": "male" },
            { "name": "one", "index":"2", "value": 1, "sex": "male" },
            { "name": "one", "index":"3", "value": 1, "sex": "male" },
            { "name": "one", "index":"4", "value": 1, "sex": "male" },
            { "name": "one", "index":"5", "value": 20, "sex": "male" },
            { "name": "one", "index":"6", "value": 20, "sex": "male" },
            { "name": "one", "index":"7", "value": 20, "sex": "male" },
            { "name": "one", "index":"8", "value": 5, "sex": "male" },
            { "name": "one", "index":"9", "value": 5, "sex": "male" },
            { "name": "one", "index":"10", "value": 5, "sex": "female" },
            { "name": "one", "index":"11", "value": 20, "sex": "female" },
            { "name": "one", "index":"12", "value": 20, "sex": "female" },
            { "name": "one", "index":"13", "value": 20, "sex": "female" },
            { "name": "one", "index":"14", "value": 20, "sex": "female" },
        ]
        this.otherdata = [ 
            { "male": [{ "name": "one" }, { "name": "one" }, { "name": "one" }, { "name": "one" },] }, 
            { "female": [{ "name": "one" }, { "name": "one" }, { "name": "one" }, { "name": "one" },] }, 
        ]
        let maledata = this.data
        this.radius = 5
        this.padding = 3

        this.xScale = d3.scaleLinear().range([10, 500]).domain(d3.extent(this.data, d => d.value));

        // 直接计算
        let height = 500;

        this.compute = this.simpos(this.data.sort((a, b) => a.value - b.value), height)
        this.alldata = this.compute.map( d => ({ name: d.name, x : this.xScale(d.value), y: d.n
            // y : height - d.index * (this.radius*2 + this.padding) 
        }))
        console.log(this.compute)
        console.log(this.alldata)

        // 分类打包算法
        this.male = d3.packSiblings(maledata.map(d => ({ name: d.name, r: this.radius + this.padding })))
        // console.log(male)
        this.handleClick = this.handleClick.bind(this)

        
        // beeswarm算法
        // this.swarm = d3.beeswarm()
        //         .data(this.data)
        //         // .distributeOn(function(d) {return xScale})
        //         .radius(5)
        //         .oritention('horizontal')
        //         .side("symetric")
        //         .arrange();
    }
    componentDidMount(){
        let height = 300
        d3.select(".allpoetry")
            // .append("g")
            .attr("transform", "translate(300, 0)")
            .selectAll("circle")
            .data(this.alldata)
            .enter()
            .append("circle")
            .attr("class", "poetry")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", this.radius)
            // .style("opacity", 0)
    }
    render(){
        return (
            <div>
                {/* <button onClick={this.handleClick}>  测试 </button> */}
                <svg className="allpoetry" width="600" height="500"></svg>
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
    simpos(data, edge) {
    const epsilon = 1e-3;
    let head = null, tail = null;
    let radius = this.radius
    let padding = this.padding
    // Place each circle sequentially.
    for (const b of data) {

        // Remove data from the queue that can’t intersect the new circle b.
        while (head && head.m < b.m - (radius * 2 + padding)) head = head.next;

        // Choose the minimum non-intersecting tangent.
        if (intersects(b.m = b.value, b.n = 0)) {
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
    for (let b of data) {
        let m = b.value
        if (b.n > edge && b.n < edge * 2) {
           m = m + radius * 2 + padding;
            b.n = b.n - edge - padding / 2;
        } else if (b.n > edge * 2 && b.n < edge * 3) {
           m = m + radius * 4 + padding * 2;
            b.n = b.n - edge * 2 - padding;
        } else if (b.n > edge * 3 && b.n < edge * 4) {
           m = m + radius * 6 + padding * 3;
            b.n = b.n - edge * 3 - padding;
        } else if (b.n > edge * 4 && b.n < edge * 5) {
           m =m + radius * 8 + padding * 4;
            b.n = b.n - edge * 4 - padding * 2;
        } else if (b.n > edge * 5 && b.n < edge * 6) {
           m =m + radius * 10 + padding * 5;
            b.n = b.n - edge * 5 - padding * 2;
        }
    }
    return data;
};  
}
