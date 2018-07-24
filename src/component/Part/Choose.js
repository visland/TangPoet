import React from 'react'
import ChooseBtn from './ChooseBtn'

export default class ChooseFun extends React.Component{
    render(){
        const { handleClick, hoverHelight, statusList, chooseStyle, chobtnStyle, choLayout  } = this.props
        const Layout = { right : choLayout.left}

        return(
            <div className={chooseStyle} style={Layout}> 
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