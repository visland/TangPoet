import React, { Component } from 'react';
import * as d3 from 'd3';
import Relation from '../../component/Relation';

export default class Home extends Component {
  render() {
    const bg = {

    }
    return (
      <div>
      <div id="title-text" style = {{
        position:'absolute',
        // top: '50px',
        left: '200px',
        width: '340px', 
        paddingLeft: '500px',
        textAlign: 'justify'
        }}>
        <p>
        社交网络
        </p>
      </div>
        <div 
          id="relation"
          style={{
            position:'relative',
            // top:'1200px'
          }}>
          <Relation />
        </div>
      </div>
    )
  }
}

