import React, { Component } from 'react';
import Relation from '../component/Relation';
import CiCloud from '../component/CiCloud'

export default class Home extends Component {
  componentDidMount(){
  }

  render() {
    const bg = {
      background: `url(${require("../component/img/background.png")})`,
      width:'1920px',
      height:'5400px',
    }

    return (
      <div style = { bg } >
      <div id="title-text" style = {{
        position:'absolute',
        top: '50px',
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
            left:'300px'
          }}
          >
          <Relation />
        </div>
        <div 
          id="female-ci"
          style={{
            position:'absolute',
            top:'500px',
            left:'100px'
          }}
          >
          <CiCloud />
        </div>
      </div>
    )
  }
}

