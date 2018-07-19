import React, { Component } from 'react';
import Relation from '../component/Relation/Relation';
import CiCloud from '../component/CiCloud';
import LeadIn from '../component/LeadIn'
import PartOne from '../component/Part'
import Title from '../component/Title'
import Footer from '../component/Footer'

import './style/style.less'

export default class Home extends Component {

  componentWillMount(){
    this.titleContent = [
      { "title": "第一部分", "info": "元人辛文房《唐才子传》：历观唐以雅道奖士类，而闺阁英秀，亦能熏染，锦心绣口，蕙情兰性，足可尚矣。中间如李季兰、鱼玄机，皆跃出方外，修清静之教，陶写幽怀，留连光景，逍遥闲暇之功，无非云水之念，与名儒比隆，珠往琼复。”" },
      { "title": "第二部分", "info": "清代章学诚《文史通义》：今就一代计之，篇什最富，莫如李冶、薛涛、鱼玄机三人。其他莫能并焉。是知女冠坊妓，多文因酬接之繁，礼法名门，篇简自非义之诫，此亦其明征矣。" },
      { "title": "第三部分", "info": "黄周星曰：“嗟乎！世间至难得者佳人也，若佳人而才，岂非难中之难？乃往往怫郁流离，多愁鲜欢，甚至横被刑戮，不得其死。如张丽华、上官昭容，皆斩于军前；王韫秀、鱼幼微具毙于杖下。白刃血蝤蛴之领，赤棒肉凝脂之肤，人生惨辱，至此已极。”" },
      { "title": "总结", "info": "黄周星曰：“嗟乎！世间至难得者佳人也，若佳人而才，岂非难中之难？乃往往怫郁流离，多愁鲜欢，甚至横被刑戮，不得其死。如张丽华、上官昭容，皆斩于军前；王韫秀、鱼幼微具毙于杖下。白刃血蝤蛴之领，赤棒肉凝脂之肤，人生惨辱，至此已极。”" },
    ]
  }

  render() {
    return (
      <div className="bg">
        <LeadIn />

        {/* 第一部分 */}
        <Title titleText={this.titleContent[0].title} titleInfo={this.titleContent[0].info}/>
        <PartOne />

        {/* 第二部分 */}
        <Title titleText={this.titleContent[1].title} titleInfo={this.titleContent[1].info}/>
        <div id="ci-cloud">
          <CiCloud />
        </div>
        
        {/* 第三部分 */}
        <Title titleText={this.titleContent[2].title} titleInfo={this.titleContent[2].info}/>
        <div id="relation">
          <Relation />
        </div>

        {/* 总结 */}
        <Title titleText={this.titleContent[3].title} titleInfo={this.titleContent[3].info} />

        {/* 脚注 */}
        <Footer />


      </div>

        
    )
  }
}

