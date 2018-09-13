import React from 'react';
import * as d3 from 'd3'
import './style/LeadIn.css'
import flower from './img/flower.png'
import pic from './img/1.jpg'

export default class LeadIn extends React.Component {
	constructor() {
	 	super();
		this.state = {};
		this.linePath = d3.line().curve(d3.curveCardinal.tension(0.01));
		this.lines = [[[90,225],[383, 569],[515, 728], [772, 960]],
								  [[331, 141], [429, 224], [528, 432], [661, 563]],
								  [[842, 198], [988, 331], [1254, 469],[1583, 853]],
								  [[16, 620], [161, 873], [364, 980]],
								  [[1409, 89], [1594, 284],[1839, 590]],
								  [[449, 103], [872, 258],[1232, 379]]];
	}

	componentDidMount() {
	}

render() {
	return (
		<div>
				<svg className='subTitle'
					width='100%'
					height='100%'
					viewBox="0 0 1920 1080"
					preserveAspectRatio="xMinYMin meet">
					<image 
          	xlinkHref={ pic } 
						width = "1920"
						height = "1080">
					</ image>
					<image xlinkHref={ flower } height='90' width='90'>
						<animateMotion
							path= { this.linePath(this.lines[0]) }
							dur="20s" 
							fill="freeze"
							rotate="auto" />							
							<animate attributeName="opacity" 
	        		from="1" to="0" 
	        		begin="15s" dur="5s" 
	        		fill="freeze"
	        		repeatCount="0" />
					</ image>

					<image xlinkHref={ flower } height='90' width='90'>
						<animateMotion
							path= { this.linePath(this.lines[1]) }
							dur="20s" 
							fill="freeze"
							rotate="auto" />
						<animate attributeName="opacity" 
	        		from="1" to="0" 
	        		begin="15s" dur="5s" 
	        		fill="freeze"
	        		repeatCount="0" />
					</ image>

					<image xlinkHref={ flower } height='90' width='90'>
						<animateMotion
							path= { this.linePath(this.lines[2]) }
							dur="20s" 
							fill="freeze"
							rotate="auto" />
							<animate attributeName="opacity" 
	        		from="1" to="0" 
	        		begin="15s" dur="5s" 
	        		fill="freeze"
	        		repeatCount="0" />
					</ image>

					<image xlinkHref={ flower } height='90' width='90'>
						<animateMotion
							path= { this.linePath(this.lines[3]) }
							dur="20s" 
							fill="freeze"
							rotate="auto" />
							<animate attributeName="opacity" 
	        		from="1" to="0" 
	        		begin="15s" dur="5s" 
	        		fill="freeze"
	        		repeatCount="0" />
					</ image>

					<image xlinkHref={ flower } height='90' width='90'>
						<animateMotion
							path= { this.linePath(this.lines[4]) }
							dur="20s" 
							fill="freeze"
							rotate="auto" />
							<animate attributeName="opacity" 
	        		from="1" to="0" 
	        		begin="15s" dur="5s" 
	        		fill="freeze"
	        		repeatCount="0" />
					</ image>

					<image xlinkHref={ flower } height='90' width='90'>
						<animateMotion
							path= { this.linePath(this.lines[5]) }
							dur="20s" 
							fill="freeze"
							rotate="auto" />
							<animate attributeName="opacity" 
	        		from="1" to="0" 
	        		begin="15s" dur="5s" 
	        		fill="freeze"
	        		repeatCount="0" />
					</ image>
				</svg>
		</div>
	)
	}
}