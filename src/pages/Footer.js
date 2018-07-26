import React from 'react'
import './style/style.less'
import zju from './style/zju.png'
import xhw from './style/xhw.png'

export default class Footer extends React.Component{
    render(){
        return (
            <div className="footer">
                <div className="footer-icon">
                    < img src={ xhw } />  
                    <p>&nbsp;</p>   
                    < img src={zju } width='10%' syle={{
                        position:'relative',
                        left:'20%'
                    }}/>
                </div>
                <div className="copyright">
                    <p>
                        监制：陈为 马秩群
                    </p>
                    <p>
                        技术指导：潘如晟
                    </p >
                    <p>
                        文案：熊玉兰
                    </p >
                    <p>
                        设计：朱筱涵
                    </p >
                    <p>
                        数据分析：周于思
                    </p >
                    <p>
                        前端：熊玉兰 朱筱涵
                    </p >&nbsp;<p>
                    </p >
                    <p>
                        制作单位：浙江大学CAD&CG国家重点实验室 新华网
                    </p >
                    <p>
                        版权所有：浙江大学CAD&CG国家重点实验室 新华网股份有限公司
                    </p >
                    <p>
                        Copyright&copy;2000 - 2018 XINHUANET.com&nbsp;&nbsp;All Rights Reserved
                    </p >
                </div>
            </div>
        )
    }
}