export default {
  // App
  navBrand: 'vChain',
  blocksLink: '區塊',
  statusLink: '狀態',
  dashboardLink: '儀表板',
  memberLink: '會員',
  searchbarPlaceHolder: '搜尋區塊、交易、地址哈希',

  // pages.AddressDetailPage
  addressTitleDetailPage: '地址',
  addressSubtitle: '地址',
  summaryAddressDetailPage: '內容',
  colorAddressDetailPage: '資產類型',
  colorNameAddressDetailPage: '資產名稱',
  balanceAddressDetailPage: '餘額',
  numberOfTransactionsAddressPage: '交易次數',
  transactionsTitle: '交易',

  // pages.BlockDetailPage
  blockTitle: '區塊',
  blockHash: '區塊哈希值',
  summaryBlockDetailPage: '內容',
  numberOfTransactionsBlockDetailPage: '交易次數',
  heightBlockDetailPage: '區塊高度',
  timestampBlockDetailPage: '時間戳',
  merkleRoot: '二進制哈希樹根',
  previousBlock: '上一區塊',
  difficultyBlockDetailPage: '難度',
  bits: '字元',
  sizeBlockDetailPage: '大小（字元組）',
  versionBlockDetailPage: '區塊版本',
  nonce: '隨機數',
  nextBlock: '下一區塊',
  transactionsTitleBlockDetailPage: '交易',

  // pages.BlocksPage
  blocks: '區塊',
  byDate: '依日期',

  // pages.ColorDetailPage
  issuedLicenseColorDetailPage: '資產類型',
  colorSubtitle: '資產類型',
  summaryColorDetailPage: '內容',
  assetNameColorDetailPage: '資產名稱',
  assetDescriptionColorDetailPage: '資產描述',
  metadataHash: '元數據哈希值',
  feeRate: '交易費率',
  feeType: '交易費類型',
  feeCollector: '收費員',
  totalAmout: '發行總量',
  versionColorDetailPage: '版本',
  ownerColorDetailPage: '所有人',
  assetIssuerColorDetailPage: '發行商',
  website: '網站',
  transactionsTitleColorDetailPage: '交易',

  // pages.DashboardPage
  bestBlock: '最新區塊',
  lastBlock: '上一區塊',
  seconds: '前',
  difficultyDashboardPage: '難度',
  hashrate: '哈希率',
  activeNodes: '上線節點數',

  // pages.HomePage
  homeTitle: '最新區塊',

  // pages.MemberPage
  fixedAddress: '代表地址',
  walletAddressTitle: '錢包地址',
  alliances: '聯盟成員',
  issuedLicenses: '核發資產憑證',

  // pages.NotFoundPage
  oops: '哎喲..',
  notFoundMessage: '404 此頁面不存在 :(',

  // pages.SettingPage
  clientHost: '主機',
  clientPort: ' 埠口',
  clientControl: '操縱',
  useTheClient: '採用',
  deleteTheClient: '刪除',
  newRPCHost: '主機',
  newRPCPort: '埠口',
  newUsername: '用戶名',
  newPassword: '密碼',
  confirmNewRPC: '提交',
  resetNewRPCForm: '重設',
  requiredHint: '這不應該是空的',
  numberTypeErrorHint: '這應該是一個數字',

  // pages.StatusPage
  information: 'vChain 信息',
  versionStatusPage: '版本',
  protocolVersion: '協議版本',
  blocksStatusPage: '區塊',
  timeOffset: '時間偏移',
  connectedNodes: '連接的節點數',
  miningDifficulty: '挖礦難度',
  proxySetting: '代理設定',
  infoErrors: '錯誤信息',

  // pages.TransactionDetailPage
  titleTransactionDetailPage: '交易',
  subtitleTransactionDetailPage: '交易',
  summaryTransactionDetailPage: '內容',
  transactionType: '交易類型',
  sizeTransactionDetailPage: '大小',
  timestampTransactionDetailPage: '接收時間',
  blockTime: '區塊生成時間',
  includedInBlock: '所在區塊',
  details: '更多',

  // components.AllianceControl
  titleAllianceControl: '編輯聯盟成員',
  alliancePublickeyPlaceHolder: '輸入新成員公鑰',
  allianceControlConfirm: '確認',
  allianceControlCancel: '取消',

  // components.AllianceList
  allianceAddress: '地址',
  alliancePublickey: '公鑰',

  // components.BlockList
  heightBlockList: '高度',
  timestampBlockList: '時間戳',
  transactionsBlockList: '交易次數',
  sizeBlockList: '大小',

  // components.ErrorMessageModal
  errorTitle: '錯誤',
  errorConfirm: '確認',

  // components.LicenseList
  colorLicenseList: '資產類型',
  ownerLicenseList: '所有人',
  amountLicenseList: '資產發行總額',

  // components.MessageModal
  messageAddressTitle: '新地址',
  messageKeepSigningTitle: '簽名尚未完成，請其他聯盟成員繼續簽名',
  messageReadToSendTitle: '簽名完成，請拷貝以下數據送至區塊鏈才算完成',
  messageConfirm: '確認',

  // components.MinerControl
  minerControlTitle: '編輯礦工',
  startMining: '開始',
  stopMining: '結束',
  minersTitle: '全網礦工',
  changeMinerTitle: '變更本地礦工',
  addMinerTitle: '添加礦工',
  revokeMinerTitle: '移除礦工',
  addMinerPlaceHolder: '輸入地址添加礦工',
  revokeMinerPlaceHolder: '輸入並移除礦工地址',
  btnAddMiner: '增加',
  btnRevokeMiner: '移除',
  minerControlCancel: '關閉',

  // components.MintModal
  mintTitle: '發行資產',
  colorMintModal: '資產類型',
  amountMintModal: '資產數量',
  colorNumberPlaceHolderMintModal: '資產數字代號，例：2',
  amountPlaceHolderMintModal: '資產發行數量，例：999999',
  licenseLabel: '產生證書燃料',
  mintForLicense: '產生',
  minerLabel: '產生礦工燃料',
  mintForMiner: '產生',
  mintConfirm: '確認',
  mintCancel: '取消',

  // components.PeerList
  nodeName: '節點名稱',
  versionPeerList: '版本',
  nodeLatency: '節點延遲時間',
  addressPeerList: 'IP 地址',

  // components.SendLicenseModal
  issueLicenseTitle: '核發資產憑證',
  assetName: '資產名稱',
  licenseNamePlaceHolder: 'vChainCoin',
  assetDescription: '資產描述',
  licenseDescriptionPlaceHolder: '互聯幣',
  assetIssuer: '發行商',
  issuerPlaceHolder: 'VNET',
  assetLimit: '上限',
  limitPlaceHolder: '最大值請填0',
  assetWebsite: '網站',
  websitePlaceHolder: 'http://example.com',
  assetColor: '資產類型',
  colorPlaceHolder: '資產數字代號，例：2',
  licenseToAddress: '發行地址',
  licenseAddressPlaceHolder: '想要發行的地址',
  sendLicenseConfirm: '確認',
  sendLicenseCancel: '取消',

  // components.SendTransactionModal
  sendRawTransactionTitle: '送出交易',
  rawTransactionToSend: '交易數據',
  sendTransactionConfirm: '確認',
  sendTransactionCancel: '取消',

  // components.SignTransactionModal
  signTransactionTitle: '為交易簽名',
  rawTransactionToSign: '交易數據',
  signTransactionConfirm: '確認',
  signTransactionCancel: '取消',

  // components.SuccessTransactionModal
  successTitle: '成功',
  successTxHash: '交易ID',
  successTxConfirm: '確認',

  // components.TradeModal
  sendTransactionTitle: '發送交易',
  fromAddress: '從',
  colorTradeModal: '資產類型',
  colorNumberPlaceHolderTradeModal: '資產數字代號，例：1',
  amountTradeModal: '資產數目',
  amountPlaceHolderTradeModal: '例：10',
  toAddress: '至',
  toAddressPlaceHolder: '要發送到哪個地址呢？',
  tradeConfirm: '確認',
  tradeCancel: '取消',

  // components.TransactionList
  coinbase: 'Coinbase',
  fee: '交易費',
  confirmations: '確認',
  satoshi: '聰',
  loadingTransactions: '加載交易'
}
