import Base from "./Base.js";

// TODO: 暂时没有做经理端的需求
export default class Agent extends Base {
  constructor(sdk, sdkPath, on, off, ...sdkOpts) {
    super(sdk, sdkPath, on, off, ...sdkOpts);
    this.reactive.role = "agent";
  }

  // 发送文字消息
  SendMsg(msg, callId, seq) {
    return this.createPromise(
      this.sdk.sendMsg,
      {
        preRej: !this.reactive.valid,
        preRejReturn: new Error("用户未登录"),
        // promiseEvent: true,
        successEvent: "MsgDelivered",
        failedEvents: ["SendMsgFail"],
      },
      msg,
      callId,
      seq
    );
  }
  // 经理 - 客服经理登陆
  Login(userNo, yxId) {
    return this.createPromise(
      this.sdk.login,
      {
        preRes: this.reactive.valid,
        preResReturn: "用户已登录",
        promiseEvent: true,
        successEvent: "Login",
      },
      userNo,
      yxId
    ).then((...params) => {
      this.reactive.valid = true;
      return Promise.resolve(...params);
    });
  }
  // 经理 - 客服经理就绪
  SetReady() {
    return this.createPromise(this.sdk.setReady, {
      preRej: !this.reactive.valid,
      preRejReturn: new Error("用户未登录"),
    });
  }
  // 经理 - 客服经理小休
  SetNotReady() {
    return this.createPromise(this.sdk.setNotReady, {
      preRej: !this.reactive.valid,
      preRejReturn: new Error("用户未登录"),
    });
  }
  // 经理 - 会话转接
  TransferCall(transferDn, callId) {
    return this.createPromise(
      this.sdk.transferCall,
      { preRej: !this.reactive.valid, preRejReturn: new Error("用户未登录") },
      transferDn,
      callId
    );
  }
  // 经理 - 客服经理退出
  Logout() {
    return this.createPromise(this.sdk.transferCall, {
      preRes: !this.reactive.valid,
      preResReturn: new Error("用户已登出"),
      promiseEvent: true,
      successEvent: "Logout",
    }).then((...params) => {
      this.reactive.valid = false;
      return Promise.resolve(...params);
    });
  }
  // 图片消息
  CaptureEnd(url, callId) {
    return this.createPromise(
      this.sdk.CaptureEnd,
      { preRej: !this.reactive.valid, preRejReturn: new Error("用户未登录") },
      url,
      callId
    );
  }
  // 经理 - 开始离线消息
  Connect(custInfo) {
    return this.createPromise(
      this.sdk.connect,
      { preRej: !this.reactive.valid, preRejReturn: new Error("用户未登录") },
      custInfo
    );
  }
  // 经理 - 离线消息获取
  GetOffLineMsg() {
    return this.createPromise(this.sdk.getOffLineMsg, {
      preRej: !this.reactive.valid,
      preRejReturn: new Error("用户未登录"),
    });
  }
}
