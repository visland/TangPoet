import React, { Component } from 'react';
import Relation from '../component/Relation';
import FemaleCi from '../component/FemaleCiCloud'

export default class Home extends Component {
  componentDidMount(){
  }

  render() {
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
        test
        </p>
      </div>
        <div 
          id="relation"
          style={{
            position:'absolute',
            top:'20px',
          }}
          >
          <Relation />
        </div>
        <div 
          id="female-ci"
          style={{
            position:'absolute',
            top:'200px',
            left:'400px'
          }}
          >
          <FemaleCi />
        </div>
      </div>
    )
  }
}

