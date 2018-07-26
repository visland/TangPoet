import React from 'react';
import * as d3 from 'd3'
import '../../index.css'
import Js2WordCloud from 'js2wordcloud'
import shape from './img/shape.png'
import _FC from './data/femaleCi.json'
import _FZ from './data/femaleZi.json'
import _TZ from './data/totalZi.json'
import _TC from './data/totalCi.json'
import Radio from 'antd/lib/radio';
import 'antd/lib/radio/style/css';
import './CiCloud.less';

export default class CiCloud extends React.Component {
  constructor() {
    super();
    this.state = {value: 0};
    this.ColorRuler = [
     '#c39143', '#98623c','#98623c', '#8a3b00','#773c30', '#752100'
    ]
    this.ci_freq = [[_TC, _FC], [_TZ, _FZ]]
    this.hasLoad = false;
  }

  static defaultProps = {
    width: 1300,
    height: 600,
  }
  
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
        minFontSize: 26 / cnt, 
        maxFontSize: 96 / cnt,    
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
    this.renderCLoud(this.ci_freq[0])
  }

  componentDidUpdate(){
    switch(this.state.value){
      case 0: //词频
        this.renderCLoud(this.ci_freq[0])
        break

      case 1: //字频
        this.renderCLoud(this.ci_freq[1])
        break
    }
  }

  render() {
    return (
      <div style={{
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
          }}>
        </div>
        <p style={{
            width: '20%',
            float:'left',
            height: 50,
            fontSize:30,
            fontFamily:'W1',
            color:'maroon',
            position:'relative',
            left:'24%',
            top:'-10%',
            bottom:'20%'
          }}>全部诗人</p>
        <p  style={{
            width: '20%',
            height: 50,
            fontSize:30,
            fontFamily:'W1',
            float:'right',
            color:'maroon',
            position:'relative',
            left:'-14%',
            top:'-10%',
            bottom:'20%'
          }}>女性诗人</p>
        <div 
          className="radio"
          style = {{
            position:'relative',
            left: '24%',
            fontSize: '18px',
            fontFamily:'W1',
            top:'5%',
            bottom:'10%'
          }}> 
        <Radio.Group style={{
          backgroundColor: 'transparent',
          fontFamily:'W9',
        }}
        onChange={this.onRadioChange} value={this.state.value} buttonStyle="solid">
          <Radio.Button value={0}>词频</Radio.Button>
          <Radio.Button value={1}>字频</Radio.Button>
        </Radio.Group>
        </div>    
      </div>
    );
  }
}