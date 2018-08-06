import React from 'react'

export default class Poem extends React.Component{
    render(){
        const {data} = this.props
        let poemS = data.poem.split("。")

        return(
            <div className="Info-style">
                <div className="poem">
                    <p className="poem_1">{data.poemName}</p>
                    <p className="poem_3">{data.poetry}</p>
                    {poemS.map((d, i) =>
                        <p key={i} className="poem_2">{d}</p>
                    )}
                </div>

                <p className="info">{data.info}</p>
            </div>
        )
    }
}