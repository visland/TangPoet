import React from 'react'
import ChooseBtn from './ChooseBtn'

export default class ChooseFun extends React.Component{
    render(){
        const { handleClick, hoverHelight, statusList, chooseStyle, chobtnStyle  } = this.props

        return(
            <div className={chooseStyle} > 
                {statusList.map( (d, i) => 
                    <ChooseBtn 
                        key={i}
                        alt={d.state}
                        btnpic={require("../ChartPoetry/img/" + d.picsrc + ".svg")}
                        handleClick={handleClick}
                        hoverHelight={hoverHelight}
                        chobtnStyle={chobtnStyle}
                    />
                )}
            </div>
        )
    }
} 