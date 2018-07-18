import React from 'react';
import * as d3 from 'd3';
import relationships from '../../data/xtRelation.json';
import female from './img/female.png';
import male from './img/male.png'

export default class Relation extends React.Component {
	constructor() {
	 	super();
		this.state = {};
	}

	componentDidMount() {
    const width = 1000;
    const height = 1000;
    d3.select(".chart").attr('width', width).attr('height', height);

    const img_w = 50;
    const img_h = 50;
    const radius = 30;
	  const imgs = [female, male];

	  const force = d3.forceManyBody().strength(-1800);

		const simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", force)
		    .force("center", d3.forceCenter(width / 2, height / 2));

		const link = d3.select(".chart").append("g")
		    .attr("class", "links")
		    .selectAll("line")
		    .data(relationships.links)
		    .enter().append("line")
		      .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
		      .attr("stroke", function(d) { return d.value === 10? 'maroon' : '#999';});

		const nodes = d3.select(".chart").append("g")
		    .attr("class", "nodes")
		    .selectAll("g")
		    .data(relationships.nodes)
		    .enter().append("g");
		    	
		const nodeCircle = nodes.append("circle")
					.attr("calss", "nodeCircle")
	  			.attr("r", radius)
	  			.attr("fill", function(d) { return d.group === 0? 'maroon' : '#999';})
  				.call(d3.drag()
          	.on("start", dragstarted)
          	.on("drag", dragged)
          	.on("end", dragended))

		const node = nodes.append("image")
	      .attr("width", img_w)
	      .attr("height", img_h)
	      .attr("xlink:href", function(d) { return imgs[d.group];})
	      .call(d3.drag()
	          .on("start", dragstarted)
	          .on("drag", dragged)
	          .on("end", dragended))

		const nodetext = nodes.append("text")
		      .attr("class", "nodetext")
		      .attr("dx", 8)
          .attr("dy", 50)
          .attr("font-size", 14)
		      .text(function(d) { return d.id;});

		  node.append("title")
		      .text(function(d) { return d.id; });

		  simulation
		      .nodes(relationships.nodes)
		      .on("tick", ticked);

		  simulation.force("link")
		      .links(relationships.links)
		      .distance(150);

		   node.data()[0].x = width / 2;
		   node.data()[0].y = height / 2;

		  function ticked() {
		    link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    node
		    		.attr("x", function(d) { return d.x - img_w / 2; })
		        .attr("y", function(d) { return d.y - img_h / 2; });
		   
		    nodetext
		    		.attr("x", function(d) { return d.x - img_w / 2; })
		        .attr("y", function(d) { return d.y - img_h / 2; });

		    nodeCircle
		    		.attr("cx", function(d) { return d.x; })
		        .attr("cy", function(d) { return d.y; });
		  }

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
					<svg className='chart' />
			</div>
		)
	}
}