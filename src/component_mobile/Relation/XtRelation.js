import React from 'react';
import * as d3 from 'd3';
import ink from './img/ink.png';
import cloud from './img/cloud.png';
import c from './img/c.png';
import RelationText from './XtText';

export default class XtRelation extends React.Component {
	constructor() {
	 	super();
		this.state = {
			maleName: '',
			name: '',
			rel: '点击诗人名字获取关系信息',
			from: '',
			to:'',
			fromname:'',
			toname:'',
			des:''
		};
	}

	componentDidMount() {
    const width = 1920;
    const height = 2080;
    const center_x = width / 2;
    const center_y = height / 2;
	  const force = d3.forceManyBody().strength(-5300);
	  this.setState({name: this.props.relationships.nodes[0].id});

		const simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", force)
		    .force("center", d3.forceCenter(center_x, center_y));

		const link = d3.select(".chart").append("g")
		    .attr("class", "links")
		    .selectAll("line")
		    .data(this.props.relationships.links)
		    .enter().append("line")
		      .attr("stroke-width", function(d) { return 5 * Math.sqrt(d.value); })
		      .attr("stroke", function(d) { return d.value === 10? 'maroon' : '#ca6924';});

		const nodes = d3.select(".chart").append("g")
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
	  			.attr("r", function(d) { return d.group === 0? 120 : (d.group=== 1? 80 : 120);})
	  			.attr("stroke", '#e29c45')
	  			.attr("stroke-width", 5)
	  			.attr("fill", function(d) { return d.group === 0? 'maroon' : (d.group=== 1? '#a88462' : '#999');})


		const nodeText = nodes.append("text")
		      .attr("class", "nodetext")
		      .attr("dx", 0)
          .attr("dy", 8)
          .attr("font-size", 48)
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
		      .distance(180);

		   nodeCircle.data()[0].x = center_x;
		   nodeCircle.data()[0].y = center_y;

		  /* Interactions. */
			nodes.on('click', (n) => {
			    nodeCircle.style('fill', (d) => {if (d.id === n.id && d.group !== 0) {return '#d9b611';}});
			    this.setState({
			    	maleName : n.id, 
			    	des : n.des,
			    	from : n.from,
			    	to : n.to,
			    	rel : n.rel,
			    	fromname: n.fromname,
			    	toname: n.toname});
			})

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
					<svg className='chart'
								width='100%'
								height='100%'
								viewBox='0 0 1920 2880'
								preserveAspectRatio="xMinYMin meet">
					
					<image 
						x='1520'
						y='-320'
						width='20%'
						height='100%'
						xlinkHref= { ink } />

					<image 
						x='600'
						y='160'
						width='14%'
						height='14%'
						xlinkHref= { cloud } />

					<image 
						x='620'
						y='660'
						width='16%'
						height='16%'
						xlinkHref= { cloud } />

					<image 
						x='1400'
						y='460'
						width='11%'
						height='11%'
						xlinkHref= { cloud } />

					<image 
						x='520'
						y='560'
						width='12%'
						height='12%'
						xlinkHref= { c } />

					<image 
						x='1520'
						y='860'
						width='12%'
						height='12%'
						xlinkHref= { c } />

					<RelationText className='xt'
							maleName={ this.state.maleName }
							from={ this.state.from }
							des={ this.state.des }
							to={ this.state.to }
							rel={ this.state.rel }
							fromname={ this.state.fromname }
							toname={ this.state.toname }/>
					
					<text className='femaleNameM'
						x='650'
						y='350'>
						{ this.state.name }社交关系图
					</text>

					<text className='descriptionM'>
						<tspan           	
          		x="400" 
							y='1750'>连线越粗，关系越紧密。深红色连线代表相传有过恋爱关系。
          	</ tspan>
          </text>
					
					</svg>
			</div>
		)
	}

 }
