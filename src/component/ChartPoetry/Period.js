import React from 'react'
// import jpg from './2.jpg'

export default class Period extends React.Component{
    render() {
        const { Pimg } = this.props
        return(
            <image 
                xlinkHref={Pimg}
                width="50" 
                height="50"
            />
        )
    }
}