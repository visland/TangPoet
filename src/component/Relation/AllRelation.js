import React from 'react';
import * as d3 from 'd3';
import './style/Relation.css'
import ink from './img/ink.png';
import cloud from './img/cloud.png';
import c from './img/c.png';

export default class AllRelation extends React.Component {
	componentDidMount() {
    const width = 1920;
    const height = 1080;
    const center_x = width / 1.8;
    const center_y = height / 2;
	const force = d3.forceManyBody().strength(-480);
	  // this.setState({name: this.props.relationships.nodes[0].id});

		const simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", force)
		    .force("center", d3.forceCenter(center_x, center_y));

		const link = d3.select(".all").append("g")
		    .attr("class", "links")
		    .selectAll("line")
		    .data(this.props.relationships.links)
		    .enter().append("line")
		      .attr("stroke-width", function(d) { return d.value === 10? 4 : (d.value === 5? 2 : 1);})
		      .attr("opacity", function(d) { return d.value})
		      .attr("stroke", function(d) { return d.value === 10? '#98623c' : '#ca6924';});

		const nodes = d3.select(".all").append("g")
		    .attr("class", "nodes")
		    .selectAll("g")
		    .data(this.props.relationships.nodes)
		    .enter().append("g")
		    .call(d3.drag()
          	.on("start", dragstarted)
          	.on("drag", dragged)
          	.on("end", dragended))
		    	
		const nodeCircle = nodes.append("circle")
					.attr("calss", "nodeCircle")
	  			.attr("r", function(d) { return d.group === 0? 35 : 28;})
	  			.attr("stroke", '#e29c45')
	  			.attr("stroke-width", 3)
	  			.attr("fill", function(d) { return d.group === 0? 'maroon' : '#a88462';})

		const nodeText = nodes.append("text")
		      .attr("class", "nodetext")
		      .attr("dx", 0)
          .attr("dy", 8)
          .attr("font-size", 17)
          .attr("fill", 'white')
          .attr("text-anchor", "middle")
		      .text(function(d) { return d.id;});

		  nodes.append("title")
		      .text(function(d) { return d.id; });

		  simulation
		      .nodes(this.props.relationships.nodes)
		      .on("tick", ticked);

		  simulation.force("link")
		      .links(this.props.relationships.links)
		      .distance(70);

		   nodeCircle.data()[0].x = 1650;
		   nodeCircle.data()[0].y = 400;

		   // nodeCircle.data()[1].x = 1500;
		   // nodeCircle.data()[1].y = 750;

		   nodeCircle.data()[2].x = 1000;
		   nodeCircle.data()[2].y = 100;

		  /* Load positions of each element. */
		  function ticked() {
		    link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });
		   
		    nodeText
		    		.attr("x", function(d) { return d.x; })
		        .attr("y", function(d) { return d.y; });

		    nodeCircle
		    		.attr("cx", function(d) { return d.x; })
		        .attr("cy", function(d) { return d.y; });
		  }

		/* Drag function */
		function dragstarted(d) {
		  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		  d.fx = d.x;
		  d.fy = d.y;
		}

		function dragged(d) {
		  d.fx = d3.event.x;
		  d.fy = d3.event.y;
		}

		function dragended(d) {
		  if (!d3.event.active) simulation.alphaTarget(0);
		  d.fx = null;
		  d.fy = null;
		}
	}
	
	render() {
		return (
			<div>
					<svg className='all'
								width='100%'
								height='100%'
								viewBox='0 0 1920 1080'
								preserveAspectRatio="xMinYMin meet">
					<circle cx='1800' cy='80' r='20'
						style={{
							stroke:'#e29c45',
							strokeWidth: '3',
							fill:'#a88462'
						}}/>

					<circle cx='1850' cy='80' r='23'
						style={{
							stroke:'#e29c45',
							strokeWidth: '3',
							fill:'maroon'
						}}/>
					
					<text className='noteText'
						x='1800'
						y='110'>男性诗人</text>
					
					<text className='noteText'
						x='1850'
						y='110'>女性诗人</text>
					
					<line x1='1830' y1='290' x2='1860' y2='250' style={{
						stroke : '#98623c',
						strokeWidth: '4'
					}} />
					
					<text className='noteText'
						x='1800'
						y='310'>男诗人之间的社交关系</text>
					
					<line x1='1780' y1='290' x2='1810' y2='250' style={{
						stroke : '#ca6924',
						strokeWidth: '2'
					}} />
					
					<text className='noteText'
						x='1850'
						y='310'>女诗人直接参与的社交关系</text>

					<image 
						x='20'
						y='-380'
						width='20%'
						height='100%'
						xlinkHref= { ink } />

					<image 
						x='1520'
						y='860'
						width='12%'
						height='12%'
						xlinkHref= { c } />

					<image 
						x='300'
						y='540'
						width='12%'
						height='12%'
						xlinkHref= { c } />

					<image 
						x='600'
						y='160'
						width='14%'
						height='14%'
						xlinkHref= { cloud } />

					<image 
						x='420'
						y='660'
						width='16%'
						height='16%'
						xlinkHref= { cloud } />

					<image 
						x='1300'
						y='460'
						width='11%'
						height='11%'
						xlinkHref= { cloud } />

					<text className='socialTitle'
						x='200'
						y='80'>
						唐代女诗人社交图
					</text>
					</svg>
			</div>
		)
	}

 }
