import React from 'react';
import * as d3 from 'd3'
import '../index.css'
import flower from './img/flower.png'

export default class Title extends React.Component {
	constructor() {
	 	super();
		this.state = {};
	}

	componentDidMount() {
		const flowers = d3.select(".subTitle")
			 .append("g")
			 .append("image")
			 .attr("x", 50)
			 .attr("y", 50)
			 .attr("width", 50)
			 .attr("height", 50)
			 .attr("xlink:href", flower)

		let trans = flowers.transition()
											 .delay(1)
											 .duration(10000)
											 .attr("y", 2000);
	}

render() {
		return (
			<div className='title'>
					<svg className='subTitle'
						width='1920px'
						height='1080px'>
					</svg>
			</div>
		)
	}
}