import React from 'react'
import ChartNote from './ChartNote'
import Title from './Title'
import ChartPoetry from '../ChartPoetry/ChartPoetry'
// import './style.less'
import ChooseFun from './Choose'

export default class Part extends React.Component{
    constructor(props){
        super(props);
        this.info = {
            "title": "唐代女诗人情况",
        }
        this.statusList = [
            { "state": "全部", "picsrc": "0", "chartnote":"元人辛文房《唐才子传》：历观唐以雅道奖士类，而闺阁英秀，亦能熏染，锦心绣口，蕙情兰性，足可尚矣。" },
            { "state": "女冠诗人", "picsrc": "1", "chartnote":"女冠诗人" },
            { "state": "士大夫妻女", "picsrc": "2", "chartnote":"士大夫妻女" },
            { "state": "民间女子", "picsrc": "3", "chartnote":"民间女子" },
            { "state": "其他", "picsrc": "4", "chartnote":"其他" },
        ]
        this.state = { 
            status: '全部', 
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
        this.flows = [
            { "name": "薛涛", "value": 20, "index": 1, "time": "初唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 2, "time": "初唐", "state": "女冠" },
            { "name": "薛涛", "value": 30, "index": 3, "time": "初唐", "state": "其他" },
            { "name": "薛涛", "value": 20, "index": 4, "time": "盛唐", "state": "其他" },
            { "name": "薛涛", "value": 20, "index": 5, "time": "盛唐", "state": "女冠" },
            { "name": "薛涛", "value": 20, "index": 6, "time": "盛唐", "state": "士大夫妻女" },
            { "name": "薛涛", "value": 20, "index": 7, "time": "中唐", "state": "士大夫妻女" },
            { "name": "薛涛", "value": 30, "index": 8, "time": "中唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 9, "time": "中唐", "state": "女冠" },
            { "name": "薛涛", "value": 10, "index": 10, "time": "晚唐", "state": "女冠" },
            { "name": "薛涛", "value": 30, "index": 11, "time": "晚唐", "state": "女冠" },
        ]       
    }
    render(){        
        return(
            <div id="part1">
                <Title title={this.info.title}/>
                <ChooseFun 
                    handleClick={this.handleClick} hoverHelight={this.hoverHelight} 
                    statusList={this.statusList}
                />

                <ChartPoetry 
                    flows={this.flows} 
                    enableStackTooltip="true" 
                    btnstatus={this.state.status}
                />
                <ChartNote chartnote={this.Filter(this.statusList, this.state.status)}/>
            </div>
        )
    }
    handleClick(e) {
        console.log("点击")
        let status = e.target.getAttribute('alt')
        this.setState({ 
            status: status
        })
    }
    Filter(data, status, d) { 
        for (d of data) {if (d.state === status) { return d.chartnote }}
    }
  
}
