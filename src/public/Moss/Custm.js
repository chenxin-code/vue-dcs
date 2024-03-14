import { SatisfactionSurvey } from "@/service/customerservice.js";
import Base from "./Base.js";
import Utils from "@/utils/index.js";

// TODO: 目前只需调通收发消息
export default class Custm extends Base {
  constructor(sdk, sdkPath, on, off, ...sdkOpts) {
    super(sdk, sdkPath, on, off, ...sdkOpts);
    this.reactive.role = "customer";
  }

  // 客户 - 连接人工
  Connect(custInfo,callback) {
    return this.createPromise(
      this.sdk.connect,
      {
        preRes: this.reactive.valid,
        preResReturn: "连接已建立",
        promiseEvent: true,
        // promiseAxios: true,
        // successEvents: ["IMEstablished", "onAgentTalking","SurveyType"],
        successEvents: ["IMEstablished","OnAgentTalking"],
        failedEvents: ["ConnectError", "AgentBusy", "onUaImAgentBusy", "NonAgentLogined","NonWorkTime", "DecryptError"],
      },
      custInfo,
      callback
    ).then((...params) => {
      console.log("---------sucess123--------",params);
      this.reactive.valid = true;
      let [
        welcome_Msg,
        callId,
        // agent_type,
        // agent_Id,
        // agent_name,
        // new_call_id,
        // agent_dn,
        // offLineMsg,
        // tellerid,
        // dstnum,
      ] = params[0].split("#");
      console.log("连接信息", params[0].split("#"));
      this.reactive.callInfo.welcome_Msg = welcome_Msg;
      this.reactive.callInfo.callId = callId;
      // this.reactive.callInfo.agent_type = agent_type;
      // this.reactive.callInfo.agent_Id = agent_Id;
      // this.reactive.callInfo.agent_name = agent_name;
      // this.reactive.callInfo.new_call_id = new_call_id;
      // this.reactive.callInfo.agent_dn = agent_dn;
      // this.reactive.callInfo.offLineMsg = offLineMsg;
      // this.reactive.callInfo.tellerid = tellerid;
      // this.reactive.callInfo.dstnum = dstnum;
      params[0] = { ...this.reactive.callInfo };
      console.log("连接信息格式化", params[0]);
      return Promise.resolve(...params);
    }).catch((err)=>{
      console.log(888889,err);
      return Promise.reject(err);
    });
  }
  // 客户 - 取消服务连接请求
  CancelIM() {
    console.log("CancelIM");
    return this.createPromise(this.sdk.cancelIM, {});
  }
  // 发送文字消息
  SendMsg(msg, seq) {
    console.log("SendMsg", msg, seq);
    return this.createPromise(
      this.sdk.sendMsg,
      {
        preRej: !this.reactive.valid,
        preRejReturn: new Error("连接未建立"),
        // promiseEvent: true,
        successEvent: "MsgDelivered",
        failedEvents: ["SendMsgFail"],
      },
      msg,
      seq
    );
  }
  // 客户 - 留言
  LeaveMsg(custInfo, messageType, relyType, msg, address, ImType) {
    console.log(
      "LeaveMsg",
      custInfo,
      messageType,
      relyType,
      msg,
      address,
      ImType
    );
    return this.createPromise(
      this.sdk.leaveMsg,
      {
        preRej: !this.reactive.valid,
        preRejReturn: new Error("连接未建立"),
        promiseEvent: true,
        successEvent: "leaveMsgSuccess",
        failedEvents: ["leaveMsgFailed"],
      },
      custInfo,
      messageType,
      relyType,
      msg,
      address,
      ImType
    );
  }
  // 客户 - 收到消息（通知）
  MsgReceived(msgId, callId) {
    console.log("MsgReceived", msgId, callId);
    return this.createPromise(
      this.sdk.msgReceived,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      msgId,
      callId
    );
  }
  // 客户 - 链接机器人
  ConRobot(custType, custNo) {
    console.log("ConRobot", custType, custNo);
    return this.createPromise(
      this.sdk.conRobot,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      custType,
      custNo
    );
  }
  // 客户 - 连接机器人4新UI
  ConRobotNew(custType, custNo, version) {
    console.log("ConRobotNew", custType, custNo, version);
    return this.createPromise(
      this.sdk.conRobotNew,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      custType,
      custNo,
      version
    );
  }
  // 客户 - 咨询机器人
  AskQuestion(question) {
    console.log("AskQuestion", question);
    return this.createPromise(
      this.sdk.askQuestion,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      question
    );
  }
  // 客户 - 咨询机器人
  AskQuesWithLocation(question, location) {
    console.log("AskQuesWithLocation", question, location);
    return this.createPromise(
      this.sdk.askQuesWithLocation,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      question,
      location
    );
  }
  // 客户 - 咨询带inputType
  AskQuesWithInputType(question, location, inputType) {
    console.log("AskQuesWithInputType", question, location, inputType);
    return this.createPromise(
      this.sdk.askQuesWithInputType,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      question,
      location,
      inputType
    );
  }
  // 客户 - 咨询带有贴尾
  AskQuesForTW(selResult, command) {
    console.log("AskQuesForTW", selResult, command);
    return this.createPromise(
      this.sdk.askQuesForTW,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      selResult,
      command
    );
  }
  // 客户 - 语音转译标注
  SendVoiceTranMsg(userInput, tranMsg) {
    console.log("SendVoiceTranMsg", userInput, tranMsg);
    return this.createPromise(
      this.sdk.sendVoiceTranMsg,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      userInput,
      tranMsg
    );
  }
  // 图片消息
  CaptureEnd(url) {
    console.log("CaptureEnd", url);
    return this.createPromise(
      this.sdk.CaptureEnd,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      url
    );
  }
  // 客户 - 满意度调查
  SatisfactionSurvey(type, msg, untype, callid) {
    console.log("SatisfactionSurvey", type, msg, untype, callid);
    return this.createPromise(
      // this.sdk.customSurvey,
      SatisfactionSurvey,
      {
        preRej: !this.reactive.valid,
        preRejReturn: new Error("连接未建立"),
        promiseAxios: true,
      },
      type,
      msg,
      untype,
      callid
    );
  }
  // 客户 - 客户提交短信验证码
  SendSmsPin(smspin, seq) {
    console.log("SendSmsPin", smspin, seq);
    return this.createPromise(
      this.sdk.sendSmsPin,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      smspin,
      seq
    );
  }
  // 客户 - 连接人工
  ConnectDN(custInfo) {
    console.log("ConnectDN", custInfo);
    return this.createPromise(
      this.sdk.connectDN,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      custInfo
    );
  }
  // 客户 - 客户查询聊天历史
  GetHistory(pages) {
    console.log("GetHistory", pages);
    return this.createPromise(
      this.sdk.getHistory,
      {
        preRej: !this.reactive.valid,
        preRejReturn: new Error("连接未建立"),
        promiseEvent: true,
        successEvent: "ChatHistory",
      },
      pages
    ).then((xmlStr) => {
      let { xml, json } = Utils.LoadXml(xmlStr);
      console.log("xml", xml, "json", json);
      return json;
    });
  }
  // 客户 - 客户查询聊天历史 - 微应用
  GetHistoryNew(pages) {
    console.log("GetHistoryNew", pages);
    return this.createPromise(
      this.sdk.getHistoryNew,
      {
        preRej: !this.reactive.valid,
        preRejReturn: new Error("连接未建立"),
        promiseEvent: true,
        successEvent: "ChatHistoryNew",
      },
      pages
    ).then((jsonStr) => {
      return JSON.parse(jsonStr);
    });
  }
  // 客户 - 客户查询聊天历史 - 手机银行微应用
  GetHistoryByTM(selTime) {
    console.log("GetHistoryByTM", selTime);
    return this.createPromise(
      this.sdk.getHistoryByTM,
      {
        preRej: !this.reactive.valid,
        preRejReturn: new Error("连接未建立"),
        promiseEvent: true,
        successEvent: "ChatHistoryTM",
      },
      selTime
    ).then((jsonStr) => {
      return JSON.parse(jsonStr);
    });
  }
  // 客户 - 客户发送文件上传完成的消息
  FileSent(url) {
    console.log("FileSent", url);
    return this.createPromise(
      this.sdk.FileSent,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      url
    );
  }
  // 客户 - 客户留言
  LeaveMsgAndImg(
    custInfo,
    message_type,
    replyType,
    msg,
    address,
    lmType,
    screenFile
  ) {
    console.log(
      "LeaveMsgAndImg",
      custInfo,
      message_type,
      replyType,
      msg,
      address,
      lmType,
      screenFile
    );
    return this.createPromise(
      this.sdk.leaveMsgAndImg,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      custInfo,
      message_type,
      replyType,
      msg,
      address,
      lmType,
      screenFile
    );
  }
  // 客户 - 连接原座席
  ConnectAgt(custInfo) {
    console.log("ConnectAgt", custInfo);
    return this.createPromise(
      this.sdk.connectAgt,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      custInfo
    );
  }
  // 客户 - 获取排队信息
  GetQueueInfo() {
    console.log("GetQueueInfo");
    return this.createPromise(this.sdk.getQueueInfo, {
      preRej: !this.reactive.valid,
      preRejReturn: new Error("连接未建立"),
    });
  }
  // 客户 - 上送场景关键字列表
  Keywordlist() {
    console.log("Keywordlist");
    return this.createPromise(this.sdk.keywordlist, {
      preRej: !this.reactive.valid,
      preRejReturn: new Error("连接未建立"),
    });
  }
}
