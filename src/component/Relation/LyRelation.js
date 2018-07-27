import React from 'react';
import * as d3 from 'd3';
import ink from './img/ink.png';
import cloud from './img/cloud.png';
import c from './img/c.png';
import RelationText from './LyText';

export default class LyRelation extends React.Component {
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
    const height = 1080;
    const center_x = width / 2.2;
    const center_y = height / 2;
	  const force = d3.forceManyBody().strength(-2600);
	  this.setState({name: this.props.relationships.nodes[0].id});

		const simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", force)
		    .force("center", d3.forceCenter(center_x, center_y));

		const link = d3.select(".lychart").append("g")
		    .attr("class", "links")
		    .selectAll("line")
		    .data(this.props.relationships.links)
		    .enter().append("line")
		      .attr("stroke-width", function(d) { return 2.1 * Math.sqrt(d.value); })
		      .attr("stroke", function(d) { return d.value === 10? 'maroon' : '#ca6924';});

		const nodes = d3.select(".lychart").append("g")
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
	  			.attr("r", function(d) { return d.group === 0? 65 : (d.group=== 1? 50 : 30);})
	  			.attr("stroke", '#e29c45')
	  			.attr("stroke-width", 5)
	  			.attr("fill", function(d) { return d.group === 0? 'maroon' : (d.group=== 1? '#a88462' : '#999');})

		// const nodeImg = nodes.append("image")
	 //      .attr("width", img_w)
	 //      .attr("height", img_h)
	 //      .attr("xlink:href", function(d) { return imgs[d.group];})

		const nodeText = nodes.append("text")
		      .attr("class", "nodetext")
		      .attr("dx", 0)
          .attr("dy", 8)
          .attr("font-size", 23)
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
		      .distance(200);

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
		const text_y = 370;

		return (
			<div>
					<svg className='lychart'
								width='100%'
								height='100%'
								viewBox='0 0 1920 1080'
								preserveAspectRatio="xMinYMin meet">
					
					<image 
						x='10'
						y='-320'
						width='20%'
						height='100%'
						xlinkHref= { ink } />

					<image 
						x='1000'
						y='160'
						width='14%'
						height='14%'
						xlinkHref= { cloud } />

					<image 
						x='520'
						y='660'
						width='16%'
						height='16%'
						xlinkHref= { cloud } />

					<image 
						x='1200'
						y='460'
						width='11%'
						height='11%'
						xlinkHref= { cloud } />

					<image 
						x='420'
						y='560'
						width='12%'
						height='12%'
						xlinkHref= { c } />

					<image 
						x='80'
						y='860'
						width='12%'
						height='12%'
						xlinkHref= { c } />

					<RelationText className = 'ly'
							maleName={ this.state.maleName }
							from={ this.state.from }
							des={ this.state.des }
							to={ this.state.to }
							rel={ this.state.rel }
							fromname={ this.state.fromname }
							toname={ this.state.toname }/>
					
					<text className='femaleName'
						x='130'
						y='80'>
						{ this.state.name }社交关系图
					</text>

					<text className='description'>
          	<tspan           	
          		x="190" 
          		y={ text_y }>“美姿容，神情萧散。专心翰墨，善弹琴，尤工格律”。
          	</ tspan>
            <tspan           	
          		x="230" 
          		y={ text_y }>刘长卿赞其为“诗中女豪”。《唐才子传》评价其为：
          	</tspan>
            <tspan           	
          		x="270" 
          		y={ text_y }>被认为是“唐代四大女诗人”中诗文最了得的，
          	</tspan>
          	<tspan           	
          		x="310" 
          		y={ text_y }>李冶，字季兰，乌程人（今浙江吴兴），后为女道士，
          	</ tspan>
						<tspan           	
          		x="1385" 
          		y={ 80 }>连线越粗，关系越紧密。深红色连线代表相传有过恋爱关系。
          	</ tspan>
          </text>
					
					</svg>
			</div>
		)
	}

 }
