import React from 'react';
// import ReactDOM from 'react-dom';
import { Carousel } from 'antd';

// import './style/style.less'

import 'antd/lib/carousel/style/css';

// import Slider from "react-slick";
import textData from '../component/Part/data/textData.json'
import Poem from '../component/TextAnalyze/Poem'

export default class SimpleSlider extends React.Component {
    render() {
        var settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange: onChange,
            // effect: "fade"
        };
        function onChange(a, b, c) {
            console.log(a, b, c);
        }
        return (
            <div width="100%" height="700px">
            
                <Carousel {...settings}>
                    {textData.map((d, i) =>
                        <Poem key={i} data={d} />
                    )}
                </Carousel>
            </div>
        );
    }
}
