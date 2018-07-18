import React from 'react';
import * as d3 from 'd3';
import relationships from '../../data/xtRelation.json';
import RelationText from './RelationText';
import female from './img/female.png';
import male from './img/male.png'

export default class Relation extends React.Component {
	constructor() {
	 	super();
		this.state = {};
	}

	componentDidMount() {
    const width = 1920;
    const height = 1080;

    const img_w = 50;
    const img_h = 50;
    const radius = 30;
	  const imgs = [female, male];

	  const force = d3.forceManyBody().strength(-2400);

		const simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", force)
		    .force("center", d3.forceCenter(width / 2, height / 2));

		const link = d3.select(".chart").append("g")
		    .attr("class", "links")
		    .selectAll("line")
		    .data(relationships.links)
		    .enter().append("line")
		      .attr("stroke-width", function(d) { return 2.1 * Math.sqrt(d.value); })
		      .attr("stroke", function(d) { return d.value === 10? 'maroon' : '#ca6924';});

		const nodes = d3.select(".chart").append("g")
		    .attr("class", "nodes")
		    .selectAll("g")
		    .data(relationships.nodes)
		    .enter().append("g")
		    .call(d3.drag()
          	.on("start", dragstarted)
          	.on("drag", dragged)
          	.on("end", dragended))
		    	
		const nodeCircle = nodes.append("circle")
					.attr("calss", "nodeCircle")
	  			.attr("r", function(d) { return d.group === 0? 65 : 40;})
	  			.attr("stroke", '#e29c45')
	  			.attr("stroke-width", 5)
	  			.attr("fill", function(d) { return d.group === 0? 'maroon' : '#a88462';})

		// const nodeImg = nodes.append("image")
	 //      .attr("width", img_w)
	 //      .attr("height", img_h)
	 //      .attr("xlink:href", function(d) { return imgs[d.group];})

		const nodeText = nodes.append("text")
		      .attr("class", "nodetext")
		      .attr("dx", -8)
          .attr("dy", -10)
          .attr("font-size", 20)
          .attr("fill", 'white')
		      .text(function(d) { return d.id;});

		  nodes.append("title")
		      .text(function(d) { return d.id; });

		  simulation
		      .nodes(relationships.nodes)
		      .on("tick", ticked);

		  simulation.force("link")
		      .links(relationships.links)
		      .distance(180);

		   nodeCircle.data()[0].x = width / 2;
		   nodeCircle.data()[0].y = height / 2;

		  /* Interactions. */
			nodes.on('click', (n) => {
			    nodeCircle.style('fill', (d) => {if (d.id === n.id && d.group != 0) {return '#d9b611';}});
			})

		  /* Load positions of each element. */
		  function ticked() {
		    link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    // nodeImg
		    // 		.attr("x", function(d) { return d.x - img_w / 2; })
		    //     .attr("y", function(d) { return d.y - img_h / 2; });
		   
		    nodeText
		    		.attr("x", function(d) { return d.x - radius / 2; })
		        .attr("y", function(d) { return d.y + radius / 2; });

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
					<svg className='chart'
								width='100%'
								height='100%'
								viewBox='0 0 1920 1080'
								preserveAspectRatio="xMinYMin meet">
					<RelationText />
					</ svg>
			</div>
		)
	}
}