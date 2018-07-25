import React, { Component } from 'react';
import Relation from '../component/Relation/Relation';
import CiCloud from '../component/CiCloud/CiCloud';
import LeadIn from '../component/LeadIn/LeadIn'
import PartOne from '../component/Part'
import Title from '../component/Title'
import Footer from '../component/Footer'
import TextAnalyze from '../component/TextAnalyze/TextAnalyze'
import ChartTitle from '../component/Part/Title'

import './style/style.less'

export default class Home extends Component {

  componentWillMount(){
    this.titleContent = [
      { "title": "一抹倩影，写就传奇", "info": "悠悠千年间，文人墨客为抒其志，挥笔写就众多名作佳篇，然其皎皎者，多为男子。女性或锁于深闺，缺少见闻，或屏息敛气，惟命是从，囿于米盐琐屑。中国千年的文学长河中，难以寻觅女性身影。<br>然唐历盛世之治，世风开放，文化繁荣，女子允许识经史，作诗文，加之初唐时期武则天颁布一系列政令措施，肯定女性价值，使得唐朝的女性诗歌创作达到了前所未有的高度。她们中有女皇、后妃、女官、宫娥、娟尼、蟀妾、名媛、闺秀，尽管身份不同，地位不同，却构成了一个五光十色、争奇斗妍的女性诗苑。让我们重新翻开历史的画卷，去寻那一抹丽色，品一品千年前的别样传奇。" },
      { "title": "一声轻叹，倾诉相思", "info": "“诗缘情而绮靡”，她们以笔书情、以诗言志；她们在诗中书写对真挚爱情的渴望、对自主婚姻的追求；抒发对时事政治的所思所感，对自身怀才不遇的哀叹。<br>那些诗行，不仅浸润了她们的缱绻柔情，亦写就了她们的豪情壮志。"},
      { "title": "一次相逢，铭刻回忆", "info": "黄周星曰：“嗟乎！世间至难得者佳人也，若佳人而才，岂非难中之难？乃往往怫郁流离，多愁鲜欢，甚至横被刑戮，不得其死。如张丽华、上官昭容，皆斩于军前；王韫秀、鱼幼微具毙于杖下。白刃血蝤蛴之领，赤棒肉凝脂之肤，人生惨辱，至此已极。”" },
      { "title": "总结", "info": "黄周星曰：“嗟乎！世间至难得者佳人也，若佳人而才，岂非难中之难？乃往往怫郁流离，多愁鲜欢，甚至横被刑戮，不得其死。如张丽华、上官昭容，皆斩于军前；王韫秀、鱼幼微具毙于杖下。白刃血蝤蛴之领，赤棒肉凝脂之肤，人生惨辱，至此已极。”" },
    ]
  }

  render() {
    return (
      <div className="bg">
        <LeadIn />

        {/* 第一部分 */}
        <Title titleText={this.titleContent[0].title} titleInfo={this.titleContent[0].info}/>
        {/* <AllPoetry /> */}
        <PartOne />

        {/* 第二部分 */}
        <Title titleText={this.titleContent[1].title} titleInfo={this.titleContent[1].info}/>
        <div id="ci-cloud">
          <ChartTitle title="诗人诗作字频词频图"/>
          <CiCloud />
        </div>
        <ChartTitle title="诗人诗作字频词频图" />
        <TextAnalyze />
        

        
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

