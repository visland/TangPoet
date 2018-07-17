import React, { Component } from 'react';
import Relation from '../component/Relation';
import CiCloud from '../component/CiCloud';
import Title from '../component/Title'

export default class Home extends Component {
  componentDidMount(){
  }

  render() {
    const bg = {
      background: `url(${require("../component/img/background.png")})`,
      width:'1920px',
      height:'5400px',
    }

    //shows coordiante
    function mousePosition(ev){
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }

    function mouseMove(ev){
        ev = ev || window.event;
        var mousePos = mousePosition(ev);
        document.getElementById('xxx').value = mousePos.x;
        document.getElementById('yyy').value = mousePos.y;
    }
    document.onmousemove = mouseMove;
    function mousePosition(ev){
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
     
    function mouseMove(ev){
        ev = ev || window.event;
        var mousePos = mousePosition(ev);
        document.getElementById('xxx').value = mousePos.x;
        document.getElementById('yyy').value = mousePos.y;
    }
    document.onmousemove = mouseMove;

    return (
      <div style = { bg } >
      <input id="xxx" type="text" />
      <input id="yyy" type="text" />
       <div id="title" style={{
            position:'absolute',
            height:"1080px",
            width:"1920px"
          }}>
          <Title />
        </div>

        <div id="relation" style={{
            position:'absolute',
            top: '1220px',
          }}>
          <Relation />
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

