import Utils from "@/utils/customerutils.js";
import { store } from "@/store/store";
export default class CustInfo {
  static TestObject() {
    let ret = new CustInfo();
    ret
      .CustType(sessionStorage.getItem('CustType2'))
      .CustNo(sessionStorage.getItem('userid'))
      .CustAcc("")
      .CustName("")
      .CustIP("")
      .RouterPoint("180000")
      .CustBranch("")
      .IMType("")
      .Sessionid("")
      .Lang("1")
      .EncryptStr("")
      .ComeFrom("00000")
      .CustLevel("")
      .OSType(navigator.userAgent.includes('iPhone') ? 'iOS' : 'Android')
      .BrowseType("")
      .RobotId(sessionStorage.getItem('sessionid'))
      .CWDM("")
      .CZLJ("")
      .BCXX("")
      .YXID("")
      .CustAccType("")
      .Ecif("320890000000512015")
      .IsLogined("")
      .Platform("app")
      .Mobile("");
    return ret;
  }

  static LabelJson() {
    return {
      custType: "客户类型",
      custNo: "客户号",
      custAcc: "客户账号",
      custName: "客户姓名",
      custIP: "客户IP",
      routerPoint: "路由点",
      custBranch: "客户所在一级分行",
      imType: "IM业务类型",
      sessionid: "网银客户登陆网银的Sessionid",
      lang: "语种",
      encryptStr: "加密串",
      comeFrom: "发起页面",
      custLevel: "客户等级",
      osType: "客户操作系统类型",
      browseType: "客户浏览器类型",
      robotId: "与机器人的会话Id",
      cwdm: "错误代码",
      czlj: "操作路径",
      bcxx: "报错信息",
      yxId: "客户的银信ID",
      custAccType: "账户类型/证件类型",
      ecif: "客户的ecif客户号",
      isLogined: "是否已登录手机银行",
      domainFlag: "客户所属中心",
      serversServlet: "所属实体",
      agentManager: "客户经理工号",
      platform: "操作平台/版本类型",
      mobile: "手机号码",
      channelId: "网银通道编号",
      attr1: "备用域",
      custCity: "所在城市",
      chosenCity: "页面所选择城市",
      transferReason: "转人工原因",
    };
  }

  FromJson(json) {
    Object.keys(json).forEach((key) => {
      this[key] = json[key];
    });
    return this;
  }

  ToJson() {
    return {
      custType: this.custType || "",
      custNo: this.custNo || "",
      custAcc: this.custAcc || "",
      custName: this.custName || "",
      custIP: this.custIP || "",
      routerPoint: this.routerPoint || "",
      custBranch: this.custBranch || "",
      imType: this.imType || "",
      sessionid: this.sessionid || "",
      lang: this.lang || "",
      encryptStr: this.encryptStr || "",
      comeFrom: this.comeFrom || "",
      custLevel: this.custLevel || "",
      osType: this.osType || "",
      browseType: this.browseType || "",
      robotId: this.robotId || "",
      cwdm: this.cwdm || "",
      czlj: this.czlj || "",
      bcxx: this.bcxx || "",
      yxId: this.yxId || "",
      custAccType: this.custAccType || "",
      ecif: this.ecif || "",
      isLogined: this.isLogined || "",
      domainFlag: this.domainFlag || "",
      serversServlet: this.serversServlet || "",
      agentManager: this.agentManager || "",
      platform: this.platform || "",
      mobile: this.mobile || "",
      channelId: this.channelId || "",
      attr1: this.attr1 || "",
      custCity: this.custCity || "",
      chosenCity: this.chosenCity || "",
      transferReason: this.transferReason || "",
    };
  }

  ToString() {
   // console.error('123:',this.ecif)
    return Utils.IsMobile()
      ? `${this.custType}#${this.custNo}#${this.custAcc}#${this.custName}#${this.custIP}#${this.routerPoint}#${this.custBranch}#${this.imType}#${this.sessionid}#${this.lang}#${this.encryptStr}#${this.comeFrom}#${this.custLevel}#${this.osType}#${this.browseType}#${this.robotId}#${this.cwdm}#${this.czlj}#${this.bcxx}#${this.yxId}#${this.custAccType}#${this.ecif}#${this.isLogined}#${this.platform}#${this.mobile}#${this.custCity}#${this.chosenCity}`
      : `${this.custType}#${this.custNo}#${this.custAcc}#${this.custName}#${this.custIP}#${this.routerPoint}#${this.custBranch}#${this.imType}#${this.sessionid}#${this.lang}#${this.encryptStr}#${this.comeFrom}#${this.custLevel}#${this.osType}#${this.browseType}#${this.robotId}#${this.cwdm}#${this.czlj}#${this.bcxx}#${this.domainFlag}#${this.serversServlet}#${this.channelId}#${this.isLogined}#${this.platform}#${this.mobile}#${this.attr1}#${this.custCity}#${this.chosenCity}#${this.transferReason}`;
  }

  /**
   * 客户类型
   * @param {string} value
   * @returns this custInfo object
   */
  CustType(value) {
    if (typeof value == "undefined") return this.custType;
    this.custType = value;
    return this;
  }
  /**
   * 客户号
   * @param {string} value
   * @returns this custInfo object
   */
  CustNo(value) {
    if (typeof value == "undefined") return this.custNo;
    this.custNo = value;
    return this;
  }
  /**
   * 客户账号
   * @param {string} value
   * @returns this custInfo object
   */
  CustAcc(value) {
    if (typeof value == "undefined") return this.custAcc;
    this.custAcc = value;
    return this;
  }
  /**
   * 客户姓名
   * @param {string} value
   * @returns this custInfo object
   */
  CustName(value) {
    if (typeof value == "undefined") return this.custName;
    this.custName = value;
    return this;
  }
  /**
   * 客户IP
   * @param {string} value
   * @returns this custInfo object
   */
  CustIP(value) {
    if (typeof value == "undefined") return this.custIP;
    this.custIP = value;
    return this;
  }
  /**
   * 路由点
   * @param {string} value
   * @returns this custInfo object
   */
  RouterPoint(value) {
    if (typeof value == "undefined") return this.routerPoint;
    this.routerPoint = value;
    return this;
  }
  /**
   * 客户所在一级分行
   * @param {string} value
   * @returns this custInfo object
   */
  CustBranch(value) {
    if (typeof value == "undefined") return this.custBranch;
    this.custBranch = value;
    return this;
  }
  /**
   * IM业务类型
   * @param {string} value
   * @returns this custInfo object
   */
  IMType(value) {
    if (typeof value == "undefined") return this.imType;
    this.imType = value;
    return this;
  }
  /**
   * 网银客户登陆网银的Sessionid
   * @param {string} value
   * @returns this custInfo object
   */
  Sessionid(value) {
    if (typeof value == "undefined") return this.sessionid;
    this.sessionid = value;
    return this;
  }
  /**
   * 语种
   * @param {string} value
   * @returns this custInfo object
   */
  Lang(value) {
    if (typeof value == "undefined") return this.lang;
    this.lang = value;
    return this;
  }
  /**
   * 加密串
   * @param {string} value
   * @returns this custInfo object
   */
  EncryptStr(value) {
    if (typeof value == "undefined") return this.encryptStr;
    this.encryptStr = value;
    return this;
  }
  /**
   * 发起页面
   * @param {string} value
   * @returns this custInfo object
   */
  ComeFrom(value) {
    if (typeof value == "undefined") return this.comeFrom;
    this.comeFrom = value;
    return this;
  }
  /**
   * 客户等级
   * @param {string} value
   * @returns this custInfo object
   */
  CustLevel(value) {
    if (typeof value == "undefined") return this.custLevel;
    this.custLevel = value;
    return this;
  }
  /**
   * 客户操作系统类型
   * @param {string} value
   * @returns this custInfo object
   */
  OSType(value) {
    if (typeof value == "undefined") return this.osType;
    this.osType = value;
    return this;
  }
  /**
   * 客户浏览器类型
   * @param {string} value
   * @returns this custInfo object
   */
  BrowseType(value) {
    if (typeof value == "undefined") return this.browseType;
    this.browseType = value;
    return this;
  }
  /**
   * 与机器人的会话Id
   * @param {string} value
   * @returns this custInfo object
   */
  RobotId(value) {
    if (typeof value == "undefined") return this.robotId;
    this.robotId = value;
    return this;
  }
  /**
   * 错误代码
   * @param {string} value
   * @returns this custInfo object
   */
  CWDM(value) {
    if (typeof value == "undefined") return this.cwdm;
    this.cwdm = value;
    return this;
  }
  /**
   * 操作路径
   * @param {string} value
   * @returns this custInfo object
   */
  CZLJ(value) {
    if (typeof value == "undefined") return this.czlj;
    this.czlj = value;
    return this;
  }
  /**
   * 报错信息
   * @param {string} value
   * @returns this custInfo object
   */
  BCXX(value) {
    if (typeof value == "undefined") return this.bcxx;
    this.bcxx = value;
    return this;
  }
  /**
   * 客户的银信ID
   * @param {string} value
   * @returns this custInfo object
   */
  YXID(value) {
    if (typeof value == "undefined") return this.yxId;
    this.yxId = value;
    return this;
  }
  /**
   * 账户类型/证件类型
   * @param {string} value
   * @returns this custInfo object
   */
  CustAccType(value) {
    if (typeof value == "undefined") return this.custAccType;
    this.custAccType = value;
    return this;
  }
  /**
   * 客户的ecif客户号
   * @param {string} value
   * @returns this custInfo object
   */
  Ecif(value) {
    if (typeof value == "undefined") return this.ecif;
    this.ecif = value;
    return this;
  }
  /**
   * 是否已登录手机银行
   * @param {string} value
   * @returns this custInfo object
   */
  IsLogined(value) {
    if (typeof value == "undefined") return this.isLogined;
    this.isLogined = value;
    return this;
  }
  /**
   * 客户所属中心
   * @param {string} value
   * @returns this custInfo object
   */
  DomainFlag(value) {
    if (typeof value == "undefined") return this.domainFlag;
    this.domainFlag = value;
    return this;
  }
  /**
   * 所属实体
   * @param {string} value
   * @returns this custInfo object
   */
  ServersServlet(value) {
    if (typeof value == "undefined") return this.serversServlet;
    this.serversServlet = value;
    return this;
  }
  /**
   * 客户经理工号
   * @param {string} value
   * @returns this custInfo object
   */
  AgentManager(value) {
    if (typeof value == "undefined") return this.agentManager;
    this.agentManager = value;
    return this;
  }
  /**
   * 操作平台/版本类型
   * @param {string} value
   * @returns this custInfo object
   */
  Platform(value) {
    if (typeof value == "undefined") return this.platform;
    this.platform = value;
    return this;
  }
  /**
   * 手机号码
   * @param {string} value
   * @returns this custInfo object
   */
  Mobile(value) {
    if (typeof value == "undefined") return this.mobile;
    this.mobile = value;
    return this;
  }
  /**
   * 网银通道编号
   * @param {string} value
   * @returns this custInfo object
   */
  ChannelId(value) {
    if (typeof value == "undefined") return this.channelId;
    this.channelId = value;
    return this;
  }
  /**
   * 备用域
   * @param {string} value
   * @returns this custInfo object
   */
  Attr1(value) {
    if (typeof value == "undefined") return this.attr1;
    this.attr1 = value;
    return this;
  }
  /**
   * 所在城市
   * @param {string} value
   * @returns this custInfo object
   */
  CustCity(value) {
    if (typeof value == "undefined") return this.custCity;
    this.custCity = value;
    return this;
  }
  /**
   * 页面所选择城市
   * @param {string} value
   * @returns this custInfo object
   */
  ChosenCity(value) {
    if (typeof value == "undefined") return this.chosenCity;
    this.chosenCity = value;
    return this;
  }
  /**
   * 转人工理由
   * @param {string} value
   * @returns this custInfo object
   */
  TransferReason(value) {
    if (typeof value == "undefined") return this.transferReason;
    this.transferReason = value;
    return this;
  }
}
