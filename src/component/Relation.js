import React from 'react';
import * as d3 from 'd3';
import relationships from '../data/miserables.json';
import female from './img/female.png';
import male from './img/male.png'

export default class Relation extends React.Component {
	constructor() {
	 	super();
		this.state = {};
	}

	componentDidMount() {
    const svg = d3.select("svg");
    const width = 700;
    const height = 600;
    svg.attr('width', width).attr('height', height);

    const img_w = 50;
    const img_h = 50;
	  const imgs = [female, male];

	  const force = d3.forceManyBody().strength(-230).distanceMax(400)
                     .distanceMin(160);

		const simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", force)
		    .force("center", d3.forceCenter(width / 2, height / 2));

		const link = svg.append("g")
		    .attr("class", "links")
		    .selectAll("line")
		    .data(relationships.links)
		    .enter().append("line")
		      .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
		      .attr("stroke", function(d) { return d.value === 10? 'maroon' : '#999';});

		const nodes = svg.append("g")
		    .attr("class", "nodes")
		    .selectAll("g")
		    .data(relationships.nodes)
		    .enter().append("g");
		    	
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
		      .attr("dx", 5)
          .attr("dy", 5)
		      .text(function(d) { return d.id;});

		  // node.append("title")
		  //     .text(function(d) { return d.id; });

		  simulation
		      .nodes(relationships.nodes)
		      .on("tick", ticked);

		  simulation.force("link")
		      .links(relationships.links)
		      .distance(170);

		   node.data()[0].x = width / 2;
		   node.data()[0].y = height / 2;

		  function ticked() {
		    link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    node.attr("x", function(d) { return d.x - img_w / 2; })
		        .attr("y", function(d) { return d.y - img_h / 2; });
		   
		    nodetext.attr("x", function(d) { return d.x - img_w / 2; })
		        .attr("y", function(d) { return d.y - img_h / 2; });
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
			<div className='relation'>
					<svg 
						className='chart'
						width="900"
						height="700">
					</svg>
			</div>
		)
	}
}