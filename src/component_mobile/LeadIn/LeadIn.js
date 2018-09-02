import React from 'react';
import * as d3 from 'd3'
import './style/LeadIn.css'
import flower from './img/flower.png'
import tree from './img/redTree.png'
import pic from './img/1.jpg'
import ink from './img/ink.png'

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
					viewBox="0 0 1920 2480"
					preserveAspectRatio="xMinYMin meet">

					<image 
          	xlinkHref={ pic } 
						width = "4920"
						height = "2080"
						x="-1450"
						y ="200">
					</ image>
				</svg>
		</div>
	)
	}
}