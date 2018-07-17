import React, { Component } from 'react';
import Relation from '../component/Relation';
import CiCloud from '../component/CiCloud';
import Title from '../component/Title'
import PartOne from '../component/Part'

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
       {/* <div id="title-title" style={{
            position:'absolute',
            top:'10px',
            height:"1080px",
            width:"1920px"
          }}>
          <Title />
      </div> */}

        <div id="relation" style={{
            position:'absolute',
            top: '1220px',
          }}>
          <Relation />
        </div>

        <div>
          <PartOne />
        </div>

        <div id="ci-cloud" style={{
            position:'absolute',
            top:'2220px',
            left:'250px'
          }}>
          <CiCloud />
        </div>
      </div>
    )
  }
}

