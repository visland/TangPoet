import React from 'react'
import ChooseBtn from './ChooseBtn'

export default class ChooseFun extends React.Component{
    render(){
        const { handleClick, hoverHelight, statusList, chooseStyle, chobtnStyle  } = this.props

        // let wcho = 100
        // let hcho = 30
        // let a = 4
        // let wpic = 25
        // let hpic = 25
        

        return(
            <div className={chooseStyle}> 
                {statusList.map( (d, i) => 
                    <ChooseBtn 
                        key={i}
                        alt={d.state}
                        // wpic={wpic}
                        // hpic={hpic}
                        btnpic={require("../ChartPoetry/img/" + d.picsrc + ".jpg")}
                        handleClick={handleClick}
                        hoverHelight={hoverHelight}

                        chobtnStyle={chobtnStyle}
                    />
                )}
            </div>
        )
    }
} 