import React from 'react'
import ChooseBtn from './ChooseBtn'

export default class ChooseFun extends React.Component{
    render(){
        const { handleClick, hoverHelight, statusList  } = this.props

        let wcho = 100
        let hcho = 30
        let a = 4
        let wpic = wcho / a
        let hpic = hcho
        

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