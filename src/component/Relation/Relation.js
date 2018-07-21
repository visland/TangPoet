import React from 'react';
import * as d3 from 'd3';
import relationships from './data/xtRelation.json';
import Allrelationships from './data/AllRelation.json';
import SingleRelation from './SingleRelation';
import AllRelation from './AllRelation';
import './style/Relation.css'

export default class Relation extends React.Component {
	render() {
		return (
			<div>
			<AllRelation relationships= {Allrelationships}/>
			<SingleRelation relationships= {relationships}/>
			</div>
		)
	}
}