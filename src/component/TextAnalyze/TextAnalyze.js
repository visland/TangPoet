import React from 'react'
import './style/style.less'
import textData from '../Part/data/textData.json'
import Poem from './Poem'
import * as d3 from 'd3'
import { Carousel } from 'antd';
import 'antd/lib/carousel/style/css';
import bgPic from './style/ink.png'
import word from '../Part/data/word.json'

export default class TextAnalyze extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideIndex: 0,
            updateCount: 0
        }
        this.click = this.click.bind(this)
    }
    componentWillMount(){
        const ColorRuler = ['rgb(190, 113, 51)',  'rgb(141, 35, 35)', 'rgb(151, 31, 31)']
        this.ciColor = d3
            .scaleLinear()
            .clamp(true)
            .domain(d3.extent(word, d => d.value))
            .range(ColorRuler)
    }
    render(){
        var settings = {
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            swipeToSlide: true,
            afterChange: () =>
                this.setState(state => ({ updateCount: state.updateCount + 1 })),
            beforeChange: (current, next) => this.setState({ slideIndex: next })
        };

        return(
            <div className="Analyze-style">
                <div className="cloud-pic"> 
                    {word.map((d, i) =>
                        <span 
                            key={i} 
                            onClick={this.click}
                            style={this.wordcolor(d)} 
                            id={"word" + i} 
                            className="word-style"
                            index={d.index}
                        >{d.name}</span>
                    )} 
                    <img src={bgPic} alt="" />
                </div>
                <Carousel ref={slider => (this.slider = slider)} {...settings}>
                    {textData.map((d, i) =>
                        <Poem key={i} data={d} />
                    )}              
                </Carousel>
               
            </div>
        )
    }
    click(e){
        this.slider.goTo(e.target.getAttribute("index"))
    }
    wordcolor(d) {
        let a = this.ciColor(d.value),
            i = d.index
        const current = this.state.slideIndex

        if (i === current || current === 0) {
            a = this.ciColor(d.value)   
        } else if (i !== current) { a = "rgb(184, 162, 116)"}

        let style = { color: a }
        return style
    }
}

