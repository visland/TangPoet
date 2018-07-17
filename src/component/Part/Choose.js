import React from 'react'
import ChooseBtn from './ChooseBtn'

export default class ChooseFun extends React.Component{
    render(){
        const { handleClick, hoverHelight  } = this.props

        let wcho = 100
        let hcho = 30
        let a = 4
        let wpic = wcho / a
        let hpic = hcho
        const statusList = [
            { "state": "全部", "picsrc": "0" },
            { "state": "女冠诗人", "picsrc": "1" },
            { "state": "士大夫妻女", "picsrc": "2" },
            { "state": "民间女子", "picsrc": "3" },
            { "state": "其他", "picsrc": "4" },
        ]

        return(
            <div> 
                {statusList.map( (d, i) => 
                    <ChooseBtn 
                        key={i}
                        alt={d.state}
                        wpic={wpic}
                        hpic={hpic}
                        // data={status}
                        btnpic={require("../ChartPoetry/img/" + d.picsrc + ".jpg")}
                        handleClick={handleClick}
                        hoverHelight={hoverHelight}

                    />
                )}
            </div>
        )
    }
} 