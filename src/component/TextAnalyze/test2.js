import React from 'react'
import './style/style.less'
import textData from '../Part/data/textData.json'
// import Poem from './Poem'

export default class TextAnalyze extends React.Component {
    render() {
        return (
            <div className="Analyze-style">
                <div className="cloud-pic">
                    <img src="" alt="" />
                </div>
                <div>
                    {textData.map((d, i) =>
                        <Poem key={i} data={d} />
                    )}
                </div>
            </div>
        )
    }
}
