export default {
  // App
  navBrand: 'vChain',
  blocksLink: '区块',
  statusLink: '状态',
  dashboardLink: '仪表板',
  memberLink: '会员',
  searchbarPlaceHolder: '搜寻区块、交易、地址哈希',

  // pages.AddressDetailPage
  addressTitleDetailPage: '地址',
  addressSubtitle: '地址',
  summaryAddressDetailPage: '内容',
  colorAddressDetailPage: '资产类型',
  colorNameAddressDetailPage: '资产名称',
  balanceAddressDetailPage: '余额',
  numberOfTransactionsAddressPage: '交易次数',
  transactionsTitle: '交易',

  // pages.BlockDetailPage
  blockTitle: '区块',
  blockHash: '区块哈希值',
  summaryBlockDetailPage: '内容',
  numberOfTransactionsBlockDetailPage: '交易次数',
  heightBlockDetailPage: '区块高度',
  timestampBlockDetailPage: '时间戳',
  merkleRoot: '二进制哈希树根',
  previousBlock: '上一区块',
  difficultyBlockDetailPage: '难度',
  bits: '比特',
  sizeBlockDetailPage: '大小（字节）',
  versionBlockDetailPage: '区块版本',
  nonce: '随机数',
  nextBlock: '下一区块',
  transactionsTitleBlockDetailPage: '交易',

  // pages.BlocksPage
  blocks: '区块',
  byDate: '依日期',

  // pages.ColorDetailPage
  issuedLicenseColorDetailPage: '资产类型',
  colorSubtitle: '资产类型',
  summaryColorDetailPage: '内容',
  assetNameColorDetailPage: '资产名称',
  assetDescriptionColorDetailPage: '资产描述',
  metadataHash: '元数据哈希值',
  feeRate: '交易费率',
  feeType: '交易费类型',
  feeCollector: '收费员',
  totalAmout: '发行总量',
  versionColorDetailPage: '版本',
  ownerColorDetailPage: '所有主',
  assetIssuerColorDetailPage: '发行商',
  website: '网站',
  transactionsTitleColorDetailPage: '交易',

  // pages.DashboardPage
  bestBlock: '最新区块',
  lastBlock: '上一区块',
  seconds: '前',
  difficultyDashboardPage: '难度',
  hashrate: '哈希率',
  activeNodes: '上线节点数',

  // pages.HomePage
  homeTitle: '最新区块',

  // pages.MemberPage
  fixedAddress: '代表地址',
  walletAddressTitle: '钱包地址',
  alliances: '联盟成员',
  issuedLicenses: '核发资产凭证',

  // pages.NotFoundPage
  oops: '哎哟..',
  notFoundMessage: '404 此页面不存在 :(',

  // pages.SettingPage
  clientHost: '主机',
  clientPort: '端口',
  clientControl: '操纵',
  useTheClient: '采用',
  deleteTheClient: '删除',
  newRPCHost: '主机',
  newRPCPort: '端口',
  newUsername: '用户名',
  newPassword: '密码',
  confirmNewRPC: '提交',
  resetNewRPCForm: '重设',
  requiredHint: '这不应该是空的',
  numberTypeErrorHint: '这应该是一个数字',

  // pages.StatusPage
  information: 'vChain 信息',
  versionStatusPage: '版本',
  protocolVersion: '协议版本',
  blocksStatusPage: '区块',
  timeOffset: '时间偏移',
  connectedNodes: '连接的节点数',
  miningDifficulty: '挖矿难度',
  proxySetting: '代理设定',
  infoErrors: '错误信息',

  // pages.TransactionDetailPage
  titleTransactionDetailPage: '交易',
  subtitleTransactionDetailPage: '交易',
  summaryTransactionDetailPage: '内容',
  transactionType: '交易类型',
  sizeTransactionDetailPage: '大小',
  timestampTransactionDetailPage: '接收时间',
  blockTime: '区块生成时间',
  includedInBlock: '所在区块',
  details: '更多',

  // components.AllianceControl
  titleAllianceControl: '编辑联盟成员',
  alliancePublickeyPlaceHolder: '输入新成员公钥',
  allianceControlConfirm: '确认',
  allianceControlCancel: '取消',

  // components.AllianceList
  allianceAddress: '地址',
  alliancePublickey: '公钥',

  // components.BlockList
  heightBlockList: '高度',
  timestampBlockList: '时间戳',
  transactionsBlockList: '交易次数',
  sizeBlockList: '大小',

  // components.ErrorMessageModal
  errorTitle: '错误',
  errorConfirm: '确认',

  // components.LicenseList
  colorLicenseList: '资产类型',
  ownerLicenseList: '所有主',
  amountLicenseList: '资产发行总额',

  // components.MessageModal
  messageAddressTitle: '新地址',
  messageKeepSigningTitle: '签名尚未完成，请其他联盟成员继续签名',
  messageReadToSendTitle: '签名完成，请拷贝以下数据送至区块链才算完成',
  messageConfirm: '确认',

  // components.MinerControl
  minerControlTitle: '编辑矿工',
  startMining: '开始',
  stopMining: '结束',
  minersTitle: '全网矿工',
  changeMinerTitle: '变更本地矿工',
  addMinerTitle: '添加矿工',
  addMinerPlaceHolder: '输入地址添加矿工',
  revokeMinerTitle: '移除矿工',
  revokeMinerPlaceHolder: '输入并移除矿工地址',
  btnAddMiner: '添加',
  btnRevokeMiner: '移除',
  minerControlCancel: '关闭',

  // components.MintModal
  mintTitle: '发行资产',
  colorMintModal: '资产类型',
  amountMintModal: '资产数量',
  colorNumberPlaceHolderMintModal: '资产数字代号，例：2',
  amountPlaceHolderMintModal: '资产发行数量，例：999999',
  licenseLabel: '产生证书燃料',
  mintForLicense: '产生',
  minerLabel: '产生矿工燃料',
  mintForMiner: '产生',
  mintConfirm: '确认',
  mintCancel: '取消',

  // components.PeerList
  nodeName: '节点名称',
  versionPeerList: '版本',
  nodeLatency: '节点延迟时间',
  addressPeerList: 'IP 地址',

  // components.SendLicenseModal
  issueLicenseTitle: '核发资产凭证',
  assetName: '资产名称',
  licenseNamePlaceHolder: 'vChainCoin',
  assetDescription: '资产描述',
  licenseDescriptionPlaceHolder: '互联币',
  assetIssuer: '发行商',
  issuerPlaceHolder: 'VNET',
  assetLimit: '上限',
  limitPlaceHolder: '最大值请填0',
  assetWebsite: '网站',
  websitePlaceHolder: 'http://example.com',
  assetColor: '资产类型',
  colorPlaceHolder: '资产数字代号，例：2',
  licenseToAddress: '发行地址',
  licenseAddressPlaceHolder: '想要发行的地址',
  sendLicenseConfirm: '确认',
  sendLicenseCancel: '取消',

  // components.SendTransactionModal
  sendRawTransactionTitle: '送出交易',
  rawTransactionToSend: '交易数据',
  sendTransactionConfirm: '确认',
  sendTransactionCancel: '取消',

  // components.SignTransactionModal
  signTransactionTitle: '为交易签名',
  rawTransactionToSign: '交易数据',
  signTransactionConfirm: '确认',
  signTransactionCancel: '取消',

  // components.SuccessTransactionModal
  successTitle: '成功',
  successTxHash: '交易标识符',
  successTxConfirm: '确认',

  // components.TradeModal
  sendTransactionTitle: '发送交易',
  fromAddress: '从',
  colorTradeModal: '资产类型',
  colorNumberPlaceHolderTradeModal: '资产数字代号，例：1',
  amountTradeModal: '资产数目',
  amountPlaceHolderTradeModal: '例：10',
  toAddress: '至',
  toAddressPlaceHolder: '要发送到哪个地址呢？',
  tradeConfirm: '确认',
  tradeCancel: '取消',

  // components.TransactionList
  coinbase: 'Coinbase',
  fee: '交易费',
  confirmations: '确认',
  satoshi: '聪',
  loadingTransactions: '加载交易'
}
