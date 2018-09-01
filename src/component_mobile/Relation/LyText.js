import React from 'react';
import * as d3 from 'd3';
import frame from './img/frame.png'

export default class RelationText extends React.Component {
	componentDidMount() {
		d3.select('.frame')
		.select("image")
		.attr("x", -30)
		.attr("y", 1700)
		.attr("width", 2000)
		.attr("height", 1100) 
		.attr("xlink:href", frame)

		d3.select('.frame')
		.select('text')
		.attr("x", 150)
		.attr("y", 1950)
		.attr("font-size", 80)
		.attr("font-family", 'W2')
		.text(this.props.des)

	}

	componentDidUpdate() {
		//title
		d3.select('.maleN')
			.text(this.props.maleName)

		// from poem
		const fromUpdate = d3.select('.fromLy').selectAll('text')
				.data(this.props.from.split('。'))
				.text(function (d) {
				return d;
			});

		fromUpdate.enter()
			.append('text')
			.attr('font-size', 52)
			.attr('font-family', 'W1')
			.attr('text-anchor', 'middle')
			.attr("x", 1400)
			.attr("y", function (d, i) {
				return 2100 + i * 80;
			})
			.text(function (d) { return d;})

		 fromUpdate.exit().remove();
		}

	render() {
		return(
			<g className='frame'>
				<image></image>
				<text className='maleN'></text>
				<text className='relation' x='150' y='2050' width='200' height='100'
					style={{
						fontSize: '53px',
        		fontFamily:'W1',
        		fill:'maroon'
					}}>
					{this.props.rel}</text>
				
					<text className='title' x='1400' y='2000' width='200' height='200'
					style={{
						fontSize: '60px',
        		fontFamily:'W1',
        		textAnchor:'middle'
					}}>
					{this.props.fromname}</text>		

				<svg>
				<foreignObject width="800" height="1000" x='150' y='2100'>
	        	<p style={{
	        		fontSize: '50px',
	        		fontFamily:'W1'
	        	}}>
	        		{ this.props.des }
	        	</p>
    			</foreignObject>
				</svg>

				<g className='fromLy'></g>
			</g>
			)
	}
}