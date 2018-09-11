import React from 'react'
import './style/style.less'
import zju from './style/zju.png'
import xhw from './style/xhw.png'
import logo from './style/logo.png'

export default class Footer extends React.Component{
    render(){
        return (
            <div className="footer">
                <div className="footer-icon">
                    <img src={logo} width="40%"/>  
                </div>
                <div className="resources">
                    <p><strong>数据来源：</strong></p> 
                    <p><a href="https://github.com/chinese-poetry/chinese-poetry">1.chinese-poetry，Github上的中华古诗词数据库，收录唐朝超过3500位诗人约5.5万首诗。</a></p> 
                    <p>2.由哈佛大学编纂的《中国历代人物传记资料库》（CBDB）</p> 
                    <p><a href="http: //www.shicimingju.com/">3.诗词名句网</a></p> 
                    <p><strong>关系数据处理方式：</strong></p> 
                    <p>从CBDB中共提取两层人物关系，删去后人为前人作传记这类关系，仅保留唐代人物。后根据百度百科资料增添几条数据库未记载完全的关系。</p> 
                    <p><strong>参考文献：</strong></p> 
                    <p>1. 吕靖. 唐代女性诗歌之女性意识研究[D].安徽大学,2014.</p> 
                    <p>2. 郭海文. 唐五代女性诗歌研究[D].陕西师范大学,2004.</p> 
                    <p>3. 苏竹梅. 唐代女冠诗人创作心理研究[D].云南师范大学,2014.</p> 

                </div>
                <div className="copyright">
                    <p>
                        监制：陈为 马轶群
                    </p>
                    <p>
                        统筹：马倩 张玮
                    </p >
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