import React from 'react';
import * as d3 from 'd3'
import './style/LeadIn.css'
import flower from './img/flower.png'
import tree from './img/redTree.png'
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
		d3.select(".subTitle")
		 .append("image")
		 .attr("x", 0)
		 .attr("y", 60)
		 .attr("height", 528 / 1.6)
		 .attr("width", 658 / 1.6)
		 .attr("xlink:href", tree)
	}

render() {
	return (
		<div>
				<svg className='subTitle'
					width='100%'
					height='100%'
					viewBox="0 0 1920 1080"
					preserveAspectRatio="xMinYMin meet">
          <image className='ink'
          	xlinkHref={ ink } 
          	height='700' 
          	width='700'
          	x="520"
          	y="220">
          <animate attributeName="opacity" 
	        		from="0" to="0.5" 
	        		begin="3s" dur="3s" 
	        		fill="freeze"
	        		repeatCount="0" />
					</ image>

					<text className='titleText'>
					  <animate attributeName="opacity" 
          		from="0" to="1" 
          		begin="4s" dur="3s" 
          		fill="freeze"
          		repeatCount="0" />
          	<tspan           	
          		x="980" 
          		y="80">我有柔情似水
          	</ tspan>
          	<tspan           	
          		x="850" 
          		y="250">亦有豪情万丈
          		</ tspan>
          </text>

          <text className='subtitleText' 
          	x="720" 
          	y="450">
           <animate attributeName="opacity" 
	        		from="0" to="1" 
	        		begin="5s" dur="3s" 
	        		fill="freeze"
	        		repeatCount="0" />
          	唐代女诗人群像
          </text>

          <text className='appendText'>
            <animate attributeName="opacity" 
	        		from="0" to="1" 
	        		begin="1s" dur="5s" 
	        		fill="freeze"
	        		repeatCount="0" />
            <tspan           	
          		x="1850" 
          		y="50">历观唐以雅道奖士类，而闺阁英秀，
          	</ tspan>
          	<tspan           	
          		x="1800" 
          		y="50">亦能熏染，锦心绣口，蕙情兰性，足可尚矣。
          	</ tspan>
            <tspan           	
          		x="1750" 
          		y="50">中间如李季兰、鱼玄机，
          	</ tspan>
            <tspan           	
          		x="1700" 
          		y="50">皆跃出方外，修清静之教，陶写幽怀，留连光景，
          	</ tspan>
          	<tspan           	
          		x="1650" 
          		y="50">逍遥闲暇之功，无非云水之念。
          	</ tspan>
          </text>

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