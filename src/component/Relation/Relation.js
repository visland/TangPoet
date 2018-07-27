import React from 'react';
import Xtrelationships from './data/xtRelation.json';
import Lyrelationships from './data/LyRelation.json';
import Allrelationships from './data/AllRelation.json';
import XtRelation from './XtRelation';
import LyRelation from './LyRelation';
import AllRelation from './AllRelation';
import './style/Relation.css'

export default class Relation extends React.Component {
	render() {
		return (
			<div>
			<AllRelation relationships= {Allrelationships}/>
			<XtRelation relationships= { Xtrelationships }/>
			<LyRelation relationships= { Lyrelationships}/>
			</div>
		)
	}
}