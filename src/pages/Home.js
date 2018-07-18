import React, { Component } from 'react';
import Relation from '../component/Relation';
import CiCloud from '../component/CiCloud';
import LeadIn from '../component/LeadIn'
import PartOne from '../component/Part'
import './style/style.less'

export default class Home extends Component {
  componentDidMount(){
  }

  render() {
    const bg = {
      background: `url(${require("../component/img/background.png")})`
    }

    return (
      <div style = { bg } >
       <div id="title-title" style={{
            top:'10px',
            height:"1080px",
            width:"1920px"
          }}>
          <LeadIn />
      </div>
        <PartOne />

        <div id="ci-cloud" style={{
          paddingTop: 100,
        }}>
          <CiCloud />
        </div>
        

        <div id="relation" style={{
            paddingTop: 100,
          }}>
          <Relation />
        </div>

      </div>

        
        

        
    )
  }
}

