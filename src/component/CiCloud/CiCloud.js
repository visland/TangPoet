import React from 'react';
import * as d3 from 'd3'
import '../../index.css'
import Js2WordCloud from 'js2wordcloud'
import shape from './img/shape.png'
import _FC from './data/femaleCi.json'
import _FZ from './data/femaleZi.json'
import _TZ from './data/totalZi.json'
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class CiCloud extends React.Component {
  constructor() {
    super();
    this.state = {value: 0};
    this.ColorRuler = [
     '#c39143', '#98623c','#98623c', '#8a3b00','#773c30', '#752100'
    ]
    this.ci_freq = [_FC, [_TZ, _FZ]]
    this.hasLoad = false;
  }

  static defaultProps = {
    width: 1300,
    height: 600,
  }
sx
  onRadioChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  renderSingleCloud(list, cnt, container){
    let ColorRuler = this.ColorRuler
    let min_weight = list.map(item=>item[1]).reduce((x,y)=>x<y?x:y)
    let max_weight = list.map(item=>item[1]).reduce((x,y)=>x>y?x:y)  
    let len = ColorRuler.length - 1
    let basic_domain = new Array(len + 1).fill(0).map((d,i)=>(i / len))
    let domain = basic_domain.map(d=>(min_weight+d*(max_weight-min_weight)))
    let ciColor = d3
      .scaleLinear()
      .clamp(true)
      .domain(domain)
      .range(ColorRuler)
    const options = {
        fontFamily: 'W9',
        minFontSize: 40 / cnt, 
        maxFontSize: 120 / cnt,    
        tooltip: {
            show: true,
            formatter: function(item) {
                return '\"' + item[0] + '\"'+ '的词频: ' + item[1]
            }
        },
        list: list,
        color: (word, weight, fontSize, distance, theta)=>ciColor(weight),
        backgroundColor: 'rgba(0,0,0,0)',
        imageShape: shape,
        rotateRatio: 0
    }

    let wc = new Js2WordCloud(container)
    wc.showLoading({
        backgroundColor: 'rgba(0,0,0,0)',
        text: '渲染中',
        fontFamily:'W2',
        effect: 'spin'
    })
    let _this = this;
    setTimeout(function() {
      if (!_this.hasLoad) _this.hasLoad = true;
      wc.hideLoading()
      wc.setOption(options)
    }, this.hasLoad? 100: 1000),
    window.onresize = ()=>{
      wc.resize()
    }
  }

  renderCLoud(List){
    this.container.innerHTML = ""
    List.forEach(()=>{
      this.container.appendChild(document.createElement("div"))
    })
    this.container.style.display = 'flex'
    this.container.style.flexDirection = 'row'
    this.container.style.flexWrap = 'wrap'
    this.container.style.justifyContent = 'spaceAround'
    this.container.style.alignItems = 'center'
    List.forEach(((list,i)=>{
      let container = this.container.childNodes[i]
      let scale
      switch(List.length){
        case 2:
          container.style.height = "80%"
          container.style.width = "50%"
          scale = 0.7
          break
      }
    this.renderSingleCloud(list, List.length*scale, container)
    }))
  }

  componentDidMount() {
    this.renderSingleCloud(this.ci_freq[0], 1, this.container)
  }

  componentDidUpdate(){
    switch(this.state.value){
      case 0: //词频
        this.renderSingleCloud(this.ci_freq[0], 1, this.container)
        break

      case 1: //字频
        this.renderCLoud(this.ci_freq[1])
        break
    }

  }

  render() {
    return (
      <div  style={{
            width: '100%',
            height: '100%'
          }}>
        <div
          className="ciCloud"
          ref={ref => {
              this.container = ref;
          }}
          style={{
            width: '90%',
            height: '90%',            
            position:'relative',
            left: '5%',
          }}
        >
        </div> 
        <div 
          className="radio"
          style = {{
            position:'relative',
            left: '40%',
            fontSize: '18px',
          }}> 
        <RadioGroup onChange={this.onRadioChange} value={this.state.value}>
          <Radio value={0}>女诗人词频&nbsp;&nbsp;</Radio>
          <Radio value={1}>总体字频和女诗人字频&nbsp;&nbsp;</Radio>
        </RadioGroup>
        </div>    
      </div>
    );
  }
}