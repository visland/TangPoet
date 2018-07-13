import React from 'react';
import * as d3 from 'd3';
import relationships from '../data/miserables.json';

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

		const color = d3.scaleOrdinal(d3.schemeCategory10);


		var simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", d3.forceManyBody())
		    .force("center", d3.forceCenter(width / 2, height / 2));

		  var link = svg.append("g")
		      .attr("class", "links")
		    .selectAll("line")
		    .data(relationships.links)
		    .enter().append("line")
		      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

		  var node = svg.append("g")
		      .attr("class", "nodes")
		    .selectAll("circle")
		    .data(relationships.nodes)
		    .enter().append("circle")
		      .attr("r", 20)
		      .attr("fill", function(d) { return color(d.group); })
		      .call(d3.drag()
		          .on("start", dragstarted)
		          .on("drag", dragged)
		          .on("end", dragended));

		  node.append("title")
		      .text(function(d) { return d.id; });

		  simulation
		      .nodes(relationships.nodes)
		      .on("tick", ticked);

		  simulation.force("link")
		      .links(relationships.links)
		      .distance(180);

		  function ticked() {
		    link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    node
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