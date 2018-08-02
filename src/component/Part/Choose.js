import React from 'react'
import ChooseBtn from './ChooseBtn'

export default class ChooseFun extends React.Component{
    render(){
        const { btnstatus, handleClick, hoverHelight, statusList  } = this.props

        return(
            <div className="choose-style" > 
                {statusList.map( (d, i) => 
                    <ChooseBtn 
                        key={i}
                        alt={d.state}
                        btnpic={require("../ChartPoetry/img/" + d.picsrc + ".svg")}
                        handleClick={handleClick}
                        hoverHelight={hoverHelight}
                        btnstatus={btnstatus}
                    /> 
                )}
            </div>
        )
    }
} 