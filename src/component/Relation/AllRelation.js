import React from 'react';
import * as d3 from 'd3';

export default class AllRelation extends React.Component {
	constructor() {
	 	super();
	}

	componentDidMount() {
    const width = 1920;
    const height = 1080;
    const center_x = width / 1.8;
    const center_y = height / 2;
	const force = d3.forceManyBody().strength(-220);
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
		      .attr("stroke-width", function(d) { return 3})
		      .attr("stroke", function(d) { return d.value === 10? 'maroon' : '#ca6924';});

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
	  			.attr("r", function(d) { return d.group === 0? 40 : 30;})
	  			.attr("stroke", '#e29c45')
	  			.attr("stroke-width", 5)
	  			.attr("fill", function(d) { return d.group === 0? 'maroon' : '#a88462';})

		// const nodeImg = nodes.append("image")
	 //      .attr("width", img_w)
	 //      .attr("height", img_h)
	 //      .attr("xlink:href", function(d) { return imgs[d.group];})

		const nodeText = nodes.append("text")
		      .attr("class", "nodetext")
		      .attr("dx", 0)
          .attr("dy", 8)
          .attr("font-size", 20)
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
		      .distance(120);

		   // nodeCircle.data()[0].x = center_x;
		   // nodeCircle.data()[0].y = center_y;

		  /* Interactions. */
			// nodes.on('click', (n) => {
			//     nodeCircle.style('fill', (d) => {if (d.id === n.id && d.group != 0) {return '#d9b611';}});
			//     this.setState({
			//     	maleName : n.id, 
			//     	des : n.des,
			//     	from : n.from,
			//     	to : n.to,
			//     	rel : n.rel,
			//     	fromname: n.fromname,
			//     	toname: n.toname});
			// })

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
		const text_y = 400;

		return (
			<div>
					<svg className='all'
								width='100%'
								height='100%'
								viewBox='0 0 1920 1080'
								preserveAspectRatio="xMinYMin meet">
					
					</svg>
			</div>
		)
	}

 }
