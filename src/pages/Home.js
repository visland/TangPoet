import React, { Component } from 'react';
import Relation from '../component/Relation';
import CiCloud from '../component/CiCloud';
import LeadIn from '../component/LeadIn'
import PartOne from '../component/Part'

export default class Home extends Component {
  componentDidMount(){
  }

  render() {
    const bg = {
      background: `url(${require("../component/img/background.png")})`
    }

    //shows coordiante
    // function mousePosition(ev){
    //     if(ev.pageX || ev.pageY){
    //         return {x:ev.pageX, y:ev.pageY};
    //     }
    //     return {
    //         x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
    //         y:ev.clientY + document.body.scrollTop - document.body.clientTop
    //     };
    // }

    // function mouseMove(ev){
    //     ev = ev || window.event;
    //     var mousePos = mousePosition(ev);
    //     document.getElementById('xxx').value = mousePos.x;
    //     document.getElementById('yyy').value = mousePos.y;
    // }
    // document.onmousemove = mouseMove;
    // function mousePosition(ev){
    //     if(ev.pageX || ev.pageY){
    //         return {x:ev.pageX, y:ev.pageY};
    //     }
    //     return {
    //         x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
    //         y:ev.clientY + document.body.scrollTop - document.body.clientTop
    //     };
    // }
     
    // function mouseMove(ev){
    //     ev = ev || window.event;
    //     var mousePos = mousePosition(ev);
    //     document.getElementById('xxx').value = mousePos.x;
    //     document.getElementById('yyy').value = mousePos.y;
    // }
    // document.onmousemove = mouseMove;

    return (
      <div style = { bg } >
       <div id="title-title" style={{
            position:'relative',
            top:'10px',
            height:"1080px",
            width:"1920px"
          }}>
          <LeadIn />
      </div>
        <PartOne />

        <div id="ci-cloud" style={{
          position: 'relative',
          paddingTop: 100,
        }}>
          <CiCloud />
        </div>
        

        <div id="relation" style={{
            position:'relative',
            paddingTop: 100,
          }}>
          <Relation />
        </div>

      </div>

        
        

        
    )
  }
}

