// pages/xieyi/xieyi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:0,
    chongzhi:`充值说明
  用户在享受免费领取以外的产品时，需充值余额方可购买喜欢的眼镜或其他产品。
  充值余额请点击APP，进入“我的”后再进入“我的钱包”，点击充值，充值支持“微信支付”。
  关于充值余额的提示：充值余额后，用于支付购买相关眼镜及产品，不设失效期，不能提  现、转移、转赠；麦拜官方赠送您的优惠金额只能用于购买支付，此部分金额不能提现。
  如遇到余额其他相关问题请联系我们的在线客服或拨打客服电话：4006701808。`,
    fuwu:`
一、特别提示
    1.1、本《麦拜眼镜服务协议》（以下简称 《协议》）是服务使用人（以下简称"用户"）与广州麦拜信息科技有限公司（以下简称"本公司"或者"我们"）之间关于用户下载、安装、使用“麦拜”软件（包括但不限于PC版及移动电话、PDA版等各种无线手持终端版本的“麦拜”软件），注册、使用、管理“麦拜”软件账号，以及使用本公司提供的相关服务所订立的协议。

    1.2、“麦拜”软件甶广州麦拜信息科技有限公司研发，并将按照本协议的规定及其不时发布的操作规则提供基于互联网以及移动网的相关服务（包括眼镜租用软件的网络服务和眼镜购买服务，以下也称“本服务”或“麦拜”）。为获得本服务，用户应认真阅读、充分理解本《协议》中各条款，特别涉及免除或者限制本公司责任的免责条款、限制用户权利的条款、约定争议解决方式、司法管辖、法律适用的条款。请您审慎阅读，一经点击"开始"按键，即表示同意接受本《协议》；如您不接受本《协议》的部分或全部内容，请您不要点击"开始"按键。（无民事行为能力人谢绝使用本服务、限制民事行为能力人应在法定监护人监护下阅读、理解及使用本服务）。除非您接受本《协议》 所有条款，否则您无权使用本软件及其相关服务。您的账号获取、登录和使用本服务等行为将视为对本《协议》的接受以及接受本《协议》各顼条款的约束。

    1.3、用户注册成功后，本公司将给予每个用户一个用户账号，该账号归本公司所有，用户完成申请注册手续后，获得账号的使用权。账号使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。用户承担账号与密码的保管责任，并就其账号及密码项下之一切活动负全部责任。

二、知识产权声明
    2.1、本“麦拜”软件是由本公司开发。“麦拜”软件的一切著作权、商标权、专利权、商业秘密等知识产权，以及相关的所有信息内容，包括但不限于：文字表述及其组合、图标、图饰、图表、色彩、界面设计、版面框架、有关数据、印刷 材料、或电子文档等均受中华人民共和国著作权法、商标法、专利法、反不正当竞争法和相应的国际条约以及其他知识产权法律法规的保护，除涉及第三方授权的软件或技术外，本公司享有上述知识产权。

    2.2、未经本公司书面同意，用户不得为任何营利性或非营利性的目的自行实施、利用、转让或许可任何第三方实施、利用、转让上述知识产权，本公司保留追究上述未经许可使用责任的权利。

三、授权范围

    3.1、用户可以为非商业目的在单一台终端设备上安装、使用、显示、运行“麦拜”软件。用户不得为商业运营目的安装、使用、运行“麦拜”软件，不可以对本软件或者本软件运行过程中释放到任何计算机终端内存中的数据及本软件运行过程中客户端与服务器端的交互数据进行复制、更改、修改、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经授权的第三方工具/服务接入本软件和相关系统。

    3.2、未经本公司书面同意，用户不得将“麦拜”软件安装在未经本公司明示许可的其他终端设备上，包括但不限于机顶盒、无线上网机、游戏机、电视机等。

    3.3、保留权利：未明示授权的其他一切权利仍归本公司所有，用户行使其他权利时须另外取得本公司的书面同意。

四、服务内容

    4.1、“麦拜”服务的具体内容甶本公司根据实际情况提供，主要包括用户的注册登录、预约验光、验光车导航、免费领取、购买视光产品、评价及举报投诉、查询及分享爱心等。

    4.2、“麦拜”提供的部分服务为收费的服务，用户使用收费服务需要向本公司支付一定的费用。对于收费的服务，我们会尽量在用户使用之前给予用户明确的提示，只有用户根据提示确认其愿意支付相关费用，用户才能使用该等收费服务。如用户拒绝支付相关费用，则本公司有权不向用户提供该等收费服务。

    4.3、用户理解，本公司仅提供相关的本服务，除此之外与相关网络服务有关的设备（如个人电脑、手机、其他与接入互联网或移动网有关的装置）及第三方收取的相关费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由用户自行负担。

五、服务变更、中断或终止

    5.1、鉴于本服务的特殊性，用户同意本公司有权合理随时变更、中断或终止部分或全部的本服务 (包括收费服务及免费服务）。如变更、中断或终止的本服务属于免费服务，本公司无需通知用户，也无需对任何用户或任何第三方承担任何相应法律责任；如变更、中断或终止的网络服务属于收费服务，本公司应当在变更、中断或终止之前事先通知用户，并应向受影响的用户提供等值的替代性的收费服务，如用户不愿意接受替代性的收费服务，就该用户已经向本公司支付的服务费，本公司应当按照该用户实际使用相应收费服务的情况扣除相应 服务费之后将剩余的服务费退还给该用户。

    5.2、用户理解，本公司需要定期或不定期地对提供本服务的平台（如互联网网站、移动网络等）或相关的设备进行检修或者维护，如因此类情况而造成收费服务在合理时间内的中断，本公司无需为此承担任何责任，但除特殊情况外应当事先进行通告。

    5.3、如发生下列任何一种情形，本公司有权随时中断或终止向用户提供本协议项下的服务【包括但不限于收费及免费的本服务（其中包括基于广告商业模式的免费服务）】而无需对用户或任何第三方承担任何法律相关责任：

        (1)用户提供的个人资料的真实性、完整性、准确性、合法性、有效性存在问题；

        (2)用户违反本协议中规定的使用规则；

        (3)用户在使用收费服务时未按规定向本公司支付相应的服务费。

    5.4、如用户注册的免费服务的账号在任何连续90日内未实际使用，或者用户注册的收费服务的账号在其订购的收费服务的服务期满之后连续180日内未实际使用，则本公司有权删除该账号并停止为该用户提供相关的本服务。在执行账号删除之前，本公司会向该用户发送通知。

    5.5、用户注册的免费账号昵称和姓名如存在违反法律法规或国家政策要求，或侵犯任何第三方合法权益的情况，本公司有权禁止用户继续使用该账号、昵称。

六、使用规则

    6.1、用户在申请使用“麦拜”服务时，必须向本公司提供准确、真实的个人相关资料，且需要通过本公司的认证后方能开始使用软件。如个人资料有任何变动，必须及时更新。更新过程中，本公司有权暂停该用户的使用权，经过本公司对更新信息的再次认证后用户方能继续使用软件。

    6.2、用户不应将其账号、密码转让或借予他人使用。如用户发现其账号遭他人非法使用，应立即通知本公司。因黑客行为或用户的保管疏忽导致账号、密码遭他人非法使用的，本公司不因此承担法律任何相关责任。

    6.3、用户同意本公司有权在提供本服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息，并且，用户同意接受本公司通过电子邮件或其他方式向用户发送商品促销或其他相关商业信息。

    6.4、用户在使用“麦拜”服务过程中，必须遵循以下原则：

        (1)遵守中国有关的法律和法规；

        (2)遵守所有与本服务有关的网络协议、规定和程序；

        (3)不得为任何非法目的而使用本服务；

        (4)不得以任何形式使用“麦拜”服务侵犯本公司的商业利益，包括但不限于发布非经本公司许可的商业或非商业广告；

        (5)不得利用“麦拜”服务系统进行任何可能对互联网或移动网正常运转造成不利影响的行为；

        (6)不得利用本产品提供的服务上传、展示或传播任何虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的、或者其他任何违反公序良俗或非法的信息资料；

        (7)不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；

        （8）不得利用“麦拜”服务系统进行任何不利于本公司的行为；

        （9）本公司针对某些特定的“麦拜”服务的使用行为，通过各种方式（包括但不限于网页公告、电子邮 件、短信提醒等）作出的任何声明、通知、警示等内容视为本协议的一部分，用户如使用本服务，视为用户同意该等声明、通知、警示的内容，如用户不同意该等声明、通知或警示，应当立即停止使用本服务。

    6.5、本公司有权对用户使用“麦拜”服务，包括但不限于收费及免费服务（其中包括基于广告商业模式的免费服务）的情况进行审查和监督(包括但不限于对用户存储在本公司的内容进行审核)，如用户在使用本服务时违反任何上述规定，本公司有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容等、暂停或终止用户使用本服务的权利）以减轻用户不当行为造成的影响。因用户自身行为需向第三人承担责任的，甶用户自行承担，与本公司无关。

    6.6、本公司有权基于其独立判断，在经本公司 合理判断其认为可能发生危害麦拜或本公司等的情形时（包括但不限于用户违反本协议第6.4条项下的原则），本公司保留在不另行通知的情况下，不经事前通知用户而先行暂停、中断或终止向用户提供本协议项下的全部或部分用户服务的权利，且无需对用户或任何第三方承担法律相关任何责任。 当用户因本条原因被暂停、中断或终止服务时，用户应按照本公司指示行事，否则将被视为违约并应承担本协议第10.2条项下的违约责任，并且本公司保留追究用户法律责任的权利。

七、“麦拜”服务使用及管理规定

    7.1、用户应保证向本公司提供的所有注册资料 是真实、完整、准确、合法、有效的。

    7.2、本公司拥有“麦拜”眼镜的所有权、 使用权、以及许可用户使用该眼镜的权利，并负责该眼镜的验光、保养、维修。同时，“麦拜”服务系统的所有权及一切知识产权归本公司所有。

    7.3、本协议7.2的规定并不表示本公司具有实时保障所有眼镜均处于无故障状态的义务，用户在实际收取眼镜前仍应尽到充分的注意及检查义务，确认眼镜各部件的完整有效，对于发现质量问题的眼镜 ，可及时联系客服进行处理。

    7.4、光学眼镜属特殊产品，用户所预订并收取的眼镜仅限该用户自己使用，严禁转租或转借于他人使用，否则由此造成的损伤由用户承担。

    7.5、用户不得利用本服务从事违法活动，不得恶意损坏、故意涂污、擅自拆解眼镜及其相关设施，否则因此造成的损失及责任由用户承担。

八、隐私保护

    8.1、保护用户隐私是本公司的一项基本政策，本公司保证不对外公开或向第三方提供单个用户的注册资料及用户在使用本服务时存储在“麦拜”软件中的非公开内容，但下列情况除外：

        (1)事先获得用户的明确同意；

        (2)根据有关的法律法规要求；

        (3)按照相关政府主管部门的要求；

        (4)为维护社会公众的利益；

        (5)为维护本公司的合法权益。

    8.2、“麦拜”可能会与第三方合作向用户提供相关的服务，在此情况下，如该第三方同意承担与本公司同等的保护用户隐私的责任，则本公司有权将用户的注册资料等提供给该第三方。

    8.3、在不透露单个用户隐私资料的前提下，本公司有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。本公司《麦拜隐私政策》作为本协议的有效组成部分，且用户同意并接受本公司不定时的更新隐私政策，如用户不接受现行的或更新后的隐私政策，则应立即停止使用本服务。

九、免责声明

    9.1、用户已明确知晓本协议的内容，用户不按本协议约定同意其使用本服务所存在的存在的风险，风险将完全由其自己承担；及因不按本协议及 app端相关说明及提示，使用因其使用本服务所而产生的不利一切后果均也甶其本人自己承担，除本协议另有约定外，本公司对用户上述行为不承担法律相关任何责任。

    9.2、本公司对本服务不作任何类型的担保，包括但不限于本服务的及时性、安全性、准确性，对在任何情况下因使用或不能使用本服务所产生的直接、间接、偶然、特殊及后续的损害及风险，本公司不承担任何责任。

    9.3、对于不可抗力、计算机病毒、黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何网络、技术、通信线路等原因造成的服务中断或不能满足用户要求的风险，均由用户自行承担，本公司不承担相应法律任何相关责任。

    9.4、用户同意，对于本公司向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本公司无需承担任何法律相关责任：

        (1)本公司向用户免费提供的各项服务；

        (2)本公司向用户赠送的任何产品或者服务；

        (3)本公司向收费网络服务用户附赠的各种产品或者服务。

十、违约赔偿

    10.1、如因本公司违反有关法律、法规或本协议项下的任何条款而给用户造成损失，本公司同意承担由此造成的损害赔偿责任。

    10.2、用户同意保障和维护本公司及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给本公司或任何其他第三人造成损失，用户同意承担甶此造成的损害赔偿责任，包括但不限于赔偿本公司所有直接和间接损失。

十一、协议修改

    11.1、本公司有权随时修改本协议的任何条款，一旦本协议的内容发生变动，本公司将会直接在本公司网站以及“麦拜”软件上公布修改之后的协议内容，该公布行为视为本公司已经通知用户修改内容。同时本公司也可通过其他适当方式向用户提示修改内容。

    11.2、如果不同意本公司对本协议相关条款所做的修改，用户应当停止使用本服务。如果用户继续使用本服务，则视为用户同意并接受本公司对本协议相关条款所做的修改。

十二、通知送达

    12.1、本协议项下本公司对于用户所有的通知均可通过网页公告、软件内公告、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为送达收件人。

    12.2、用户对于本公司的通知应当通过本公司对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。该等通知以本公司实际收到日为送达日。

十三、争议解决与适用法律

    13.1、本协议的订立、执行和解释及争议的解决均应适用中国法律并受中国法院管辖。

    13.2、如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向本公司所在地的人民法院提起诉讼。

十四、其他规定

    14.1、如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。

    14.2、协议中的标题仅为方便而设，在解释本协议时不应受该标题的限制。
  `
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})