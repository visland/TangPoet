import React from 'react'
import './style/style.less'
import textData from '../Part/data/textData.json'

export default class TextAnalyze extends React.Component{
    render(){
        let info = textData[0].info,
            poem = textData[0].poem,
            poemName = textData[0].poemName

        let poemS = poem.split("。")


        return(
            <div className="Analyze-style">
                <div className="cloud-pic">
                    <img src="" alt="" />
                </div>
                
                <div className="Info-style">
                    <div className="poem">
                        <p className="poem_1">{poemName}</p>
                        {poemS.map((d, i) =>
                            <p key={i} className="poem_2">{d}</p>
                        )}
                    </div>

                    <p className="info">{info}</p>
                </div>


            </div>
        )
    }
}