import React from 'react';
import * as d3 from 'd3';
import frame from './img/frame.png'

export default class RelationText extends React.Component {
	componentDidMount() {
		d3.select('.framePic')
			.select("image")
			.attr("x", 10)
			.attr("y", 50)
			.attr("width", 560)
			.attr("height", 933) 
			.attr("xlink:href", frame)

		d3.select('.framePic')
			.select('text')
			.attr("x", 60)
			.attr("y", 190)
			.attr("font-size", 70)
			.attr("font-family", 'W2')
			.text(this.props.des)

	}

	componentDidUpdate() {
		//title
		d3.select('.maleName')
			.text(this.props.maleName)

		// from poem
		const fromUpdate = d3.select('.from').selectAll('text')
				.data(this.props.from.split('。'))
				.text(function (d) {
				return d;
			});

		fromUpdate.enter()
			.append('text')
			.attr('font-size', 25)
			.attr('font-family', 'W1')
			.attr('text-anchor', 'middle')
			.attr("x", 270)
			.attr("y", function (d, i) {
				return 550 + i * 37;
			})
			.text(function (d) { return d;})

		 fromUpdate.exit().remove();

		// to poem
		const toUpdate = d3.select('.to').selectAll('text')
				.data(this.props.to.split('。'))
				.text(function (d) {
				return d;
			});

		toUpdate.enter()
			.append('text')
			.attr('font-size', 25)
			.attr('font-family', 'W1')
			.attr('text-anchor', 'middle')
			.attr("x", 270)
			.attr("y", function (d, i) {
				return 790 + i * 37;
			})
			.text(function (d) { return d; })

		 toUpdate.exit().remove();
	}

	render() {
		return(
			<g className='framePic'>
				<image></image>
				<text className='maleName'></text>
				<text className='relation' x='65' y='230' width='200' height='100'
					style={{
						fontSize: '25px',
        		fontFamily:'W1',
        		fill:'maroon'
					}}>
					{this.props.rel}</text>
				
				<text className='title' x='270' y='510' width='200' height='200'
					style={{
						fontSize: '30px',
        		fontFamily:'W1',
        		textAnchor:'middle'
					}}>
					{this.props.fromname}</text>	

				<text className='title2' x='270' y='750' width='200' height='200'
					style={{
						fontSize: '30px',
        		fontFamily:'W1',
        		textAnchor:'middle'
					}}>
					{this.props.toname}</text>	

				<svg>
  				<foreignObject width="420" height="600" x='65' y='240'>
	        	<p style={{
	        		fontSize: '23px',
	        		fontFamily:'W1'
	        	}}>
	        		{ this.props.des }
	        	</p>
    			</foreignObject>
				</svg>

				<g className='from'></g>
				<g className='to'></g>
			</g>
			)
	}
}