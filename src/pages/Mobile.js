import React, { Component } from 'react';
import Relation from '../component_mobile/Relation/Relation';
import CiCloud from '../component_mobile/CiCloud/CiCloud';
import LeadIn from '../component_mobile/LeadIn/LeadIn'
import PartOne from '../component_mobile/Part'
import Title from '../component/Title'
import Footer from './Footer'
import TextAnalyze from '../component/TextAnalyze/TextAnalyze'
import './style/style.less'

export default class Home extends Component {
  constructor() {
    super();
    this.info = ["天下物事，山川河流，迎来送往，春花秋月，皆可入诗。女性诗人同男诗人一般，诗中常见：“山”、“风”、“花”、“月”，然女子独有的体验经历，让她们更偏爱“芙蓉”、“芳菲”、“歌舞”，记录“思”君，求“良人”之事，抒发“相思”、“寂寞”之情。", 
    "诗中月不是天上月，眼前人并非心上人。意象是古诗中寄托诗人情感的事物，同一事物可以蕴含多种情感。明月更惹相思意，女诗人青睐的“明月”、“梧桐”、“花落”等意象则更多用来寄托思念之情。"]
  }
  componentWillMount(){
    this.titleContent = [
      { "title": "一抹倩影，写就传奇", "info": "悠悠千年间，文人墨客为抒其志，挥笔写就众多名作佳篇，然其佼佼者，多为男子。女性或锁于深闺，缺少见闻，或屏息敛气，惟命是从，囿于米盐琐屑。中国千年的文学长河中，难以寻觅女性身影。<br>然唐历盛世之治，世风开放，文化繁荣，女子允许识经史，作诗文，加之初唐时期武则天颁布一系列政令措施，肯定女性价值，使得唐朝的女性诗歌创作达到了前所未有的高度。她们中有女皇、后妃、女官、宫娥、娟尼、蟀妾、名媛、闺秀，尽管身份不同，地位不同，却构成了一个五光十色、争奇斗艳的女性诗苑。<br>纵观唐代文学史，男性诗人仍占领着绝对优势，女诗人的所有诗作，数量加起来不及白居易的三分之一，不足总量的千分之一。“女子作诗，其工也，难于男子；闺秀之名，其传也，亦难于才士。”写诗不易，存诗愈难。女性诗人平均每人作诗四首，多数仅有一篇诗作流传下来，其中写诗小能手薛涛一人独做九十三首，为唐代女诗人之首。" },
      { "title": "一声轻叹，倾诉相思", "info": "“诗缘情而绮靡”，她们以笔书情、以诗言志。<br>她们在诗中书写对真挚爱情的渴望、对自主婚姻的追求；抒发对时事政治的所思所感，对自身怀才不遇的哀叹。<br>那些诗行，不仅浸润了她们的缱绻柔情，亦写就了她们的豪情壮志。"},
      { "title": "一次相逢，铭刻回忆", "info": "在唐代之前的女性诗歌作品中，两性关系往往具体表现在爱情与婚姻的相关诗歌主题之中，而在唐代，女诗人们不仅在诗中抒发相思之意，她们还以赠答酬唱的诗歌形式，在诗歌交流和思想表达中与文人贤士们建立相对平等的诗友关系。<br>以唐代三大女诗人为中心，我们可以勾勒出一幅别样的女诗人社交关系图。她们以诗歌为媒介结交贤雅文士，不再将自己视作依附于男性的软弱存在，与男性以平等的地位和视角往来，并在这种交往中拓展了视野和胸怀。她们的人生态度、价值观念、以及文采风度受到男性诗人潜移默化的影响，她们甚至开始用心审视和思索自己的人生命运和生存价值。" },
      { "title": "万千诗行，唱尽悲欢", "info": "拂去历史厚重的灰尘，她们从诗中自千年而来，惜花怜月触动我们的心房。然“世间至难得者佳人也，若佳人而才，岂非难中之难？”她们的命运大多悲惨凄凉，或是一生颠沛流离、心生郁结，忧愁多于欢愉；或是被意外行刑杀戮，蒙受耻辱。<br>在或长或短的人生里，她们用诗句记录点滴感悟，书写情思志趣；她们大胆而热烈地追求爱情，不卑不亢地寻求平等的友情；她们用笔书写了“她们”的历史。<br>“塞纳河水悠悠，亲爱的，我们能不能让河水停止，时光倒流？”<br>一千年过去了，她们仍在过往岁月中静静等待着，等着我们的驻足与聆听。" },
    ];
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
        <p className="subtitle">诗人诗作字频词频图</p>
        <p className='title-info'>{ this.info[0] }</p>
        <div id="ci-cloud">
          <CiCloud />
        </div>
        <p className="subtitle">女诗人高频意象分析</p>
        <p className='title-info'>{ this.info[1] }</p>
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

