import React from 'react';
import * as d3 from 'd3';
import frame from './img/frame.png'

export default class RelationText extends React.Component {
	componentDidMount() {
		d3.select('.framePic')
			.append("image")
			.attr("x", 1200)
			.attr("y", 0)
			.attr("width", 1000)
			.attr("height", 1000)
			.attr("xlink:href", frame)
	}

	render() {
		return(
				<svg className='framePic'
					width='100%'
					height='100%'
					viewBox='0 0 1920 1080'
					preserveAspectRatio="xMinYMin meet">
				</ svg>
			)
	}
}