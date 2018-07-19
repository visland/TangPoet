import React from 'react';
import * as d3 from 'd3';
import frame from './img/frame.png'

export default class RelationText extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		d3.select('.framePic')
			.append("image")
			.attr("x", 10)
			.attr("y", 50)
			.attr("width", 560)
			.attr("height", 933) 
			.attr("xlink:href", frame)

		d3.select('.framePic')
			.append('text')
			.attr("x", 80)
			.attr("y", 180)
			.text(this.props.des)
	}

	componentDidUpdate() {		
		d3.select('.framePic')
			.append("image")
			.attr("x", 10)
			.attr("y", 50)
			.attr("width", 560)
			.attr("height", 933) 
			.attr("xlink:href", frame)

		d3.select('.framePic')
			.append('text')
			.attr("x", 80)
			.attr("y", 180)
			.text(this.props.des)
	}

	render() {
		return(
			<g className='framePic' />
			)
	}
}