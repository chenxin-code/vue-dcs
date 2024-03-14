import MsgHandler from "./MsgHandler";
import { PictureUpload } from "@/service/customerservice";
import { reactive } from "vue";

export default class Base {
  constructor(sdk, sdkPath, ...sdkOpts) {
    this.sdk = sdk;
    this.listeners = {};
    this.resFun = []
    this.msgHandler = new MsgHandler();
    this.reactive = reactive({});
    this.reactive.role = ""; // 当前角色
    this.reactive.valid = false; // 是否可用，对于客户来说是connect，对于经理来说是login
    this.reactive.callInfo = reactive({}); // 客户 - 会话信息

    Object.defineProperties(this, {
      MsgHandler: {
        enumerable: true,
        configurable: false,
        get() {
          return this.msgHandler;
        },
      },
      Role: {
        enumerable: true,
        configurable: false,
        get() {
          return this.reactive.role;
        },
      },
      Valid: {
        enumerable: true,
        configurable: false,
        get() {
          return this.reactive.valid;
        },
      },
      CallInfo: {
        enumerable: true,
        configurable: false,
        get() {
          return this.reactive.callInfo;
        },
      },
    });

    sdk._path = sdkPath;
    /**
     * tagId: String，机器名（或客户唯一标识）
     * sys：系统类型
     * platform：平台类型
     * software：软件名
     * version：版本
     * custType: 渠道类型
     * lang: 语种 1-简体；2-繁体；3-英文
     */
    console.log(
      `onPageLoad << tagId: ${sdkOpts[0]},sys: ${sdkOpts[1]},platform: ${sdkOpts[2]},software: ${sdkOpts[3]},version: ${sdkOpts[4]},custType: ${sdkOpts[5]},lang: ${sdkOpts[6]}`
    );
    console.log("pangeload",sdkOpts);
    sdk.onPageLoad(...sdkOpts);

    this.On("IMClosed", (...params) => {
      this.reactive.valid = false;
      this.reactive.callInfo = reactive({});
    });

    return reactive(this);
  }

  // 服务器回复事件
  dispatch(optype, ...params) {
    let listeners = this.listeners[optype];
    console.log("事件", optype, "回调", listeners, "参数", ...params);
    if (!listeners) return;
    listeners.forEach((listener) => listener(...params));
  }

  // 创建sdkPromise
  createPromise(func, options, ...params) {
    return new Promise((resolve, reject) => {
      if (typeof func != "function") return reject(new Error("方法不存在"));
      // 调用前判断是否不需要调用或者报错
      if (
        options?.preRes == true ||
        (options?.preRes && options?.preRes?.call(undefined))
      )
        return resolve(options?.preResReturn);
      if (
        options?.preRej == true ||
        (options?.preRej && options?.preRej?.call(undefined))
      )
        return reject(options?.preRejReturn);
      // 判断使用参数还是使用事件还是Axios，默认使用参数
      if (options?.promiseEvent) {
        // 通过条件传入的成功事件和失败事件
        if (options?.successEvents!=undefined&&!(options.successEvents instanceof Array)) {
          options.successEvents = [options.successEvents]
        }
        let successEvents = options?.successEvents;
        let failedEvents = options?.failedEvents;
        // 添加回调，在收到事件后取消回调
        const failed = (...params) => {
          successEvents?.forEach((e) => this.Off(e, success));
          failedEvents?.forEach((e) => this.Off(e, failed));
          reject(...params);
        };
        const success = (...params) => {
          console.log("-----sucess------",params);
          failedEvents?.forEach((e) => this.Off(e, success));
          successEvents?.forEach((e) => this.Off(e, failed));
          resolve(...params);
        };
        successEvents?.forEach((e) => {this.On(e, success)});
        failedEvents?.forEach((e) => this.On(e, failed));
        console.log(123)
        func.call(this.sdk, ...params);
      } else if (options?.promiseAxios) {
        // console.log("eventresult------------");
        resolve(func.call(this.sdk, ...params));
      } else {
        params.push({
          callback(...p) {
            resolve(...p);
          },
          errorHandler(...p) {
            reject(...p);
          },
        });
        console.log(99999,params);
        func.call(this.sdk, ...params);
      }
    });
  }
    // 创建sdkPromise
  createPromise2(func, options, ...params) {
      return new Promise((resolve, reject) => {
        if (typeof func != "function") return reject(new Error("方法不存在"));
        // 调用前判断是否不需要调用或者报错
        if (
          options?.preRes == true ||
          (options?.preRes && options?.preRes?.call(undefined))
        )
          return resolve(options?.preResReturn);
        if (
          options?.preRej == true ||
          (options?.preRej && options?.preRej?.call(undefined))
        )
          return reject(options?.preRejReturn);
        // 判断使用参数还是使用事件还是Axios，默认使用参数
        if (options?.promiseEvent) {
          // 通过条件传入的成功事件和失败事件
          if (options?.successEvents!=undefined&&!(options.successEvents instanceof Array)) {
            options.successEvents = [options.successEvents]
          }
          let successEvents = options?.successEvents;
          let failedEvents = options?.failedEvents;
          // 添加回调，在收到事件后取消回调
          const failed = (...params) => {
            successEvents?.forEach((e) => this.Off(e, success));
            failedEvents?.forEach((e) => this.Off(e, failed));
            reject(...params);
          };
          const success = (...params) => {
            console.log("-----sucess------",params);
            failedEvents?.forEach((e) => this.Off(e, success));
           // successEvents?.forEach((e) => this.Off(e, failed));
            this.resFun.push(...params)
         
          };
          const success2 = (...params) => {
            console.log("-----sucess2------",params);
            this.resFun.push(...params)
            resolve(this.resFun);
          };
          successEvents?.forEach((e) => {this.On(e, success)});
          for(let i = 0; i<successEvents.length;i++){
            
            if(i === successEvents.length-1){
              this.On(successEvents[i], success2)
            }else{
              this.On(successEvents[i], success)
            }
          }
          failedEvents?.forEach((e) => this.On(e, failed));
          console.log(123)
          // this.resFun.length ? resolve(this.resFun) : null         
          func.call(this.sdk, ...params);
        } else if (options?.promiseAxios) {
          // console.log("eventresult------------");
          resolve(func.call(this.sdk, ...params));
        } else {
          params.push({
            callback(...p) {
              resolve(...p);
            },
            errorHandler(...p) {
              reject(...p);
            },
          });
          console.log(99999,params);
          func.call(this.sdk, ...params);
        }
      });
    }

  On(optype, listener) {
    
    let listeners = this.listeners[optype];
    if (!listeners) this.listeners[optype] = listeners = [];
    if (listeners.find((l) => l === listener)) return;
    listeners.push(listener);
  }

  Off(optype, listener) {
    let listeners = this.listeners[optype];
    if (!listeners) return;
    let index = listeners.find((l) => l === listener);
    if (index < 0) return;
    listeners.splice(index, 1);
  }

  Once(optype, listener) {
    const temp = (...params) => {
      this.Off(optype, temp);
      listener(...params);
    };
    this.On(optype, temp);
  }

  ReceiveMessages(...params) {
    return this.msgHandler.Add(...params);
  }

  UpdateMessages(...params) {
    return this.msgHandler.Set(...params);
  }

  Messages(...params) {
    if (!params?.length) return this.msgHandler.Messages;
    return this.msgHandler.Get(...params);
  }

  RemoveMessages(...params) {
    return this.msgHandler.Del(...params);
  }

  // 客户 - 连接人工；经理 - 开始离线消息
  Connect(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 取消服务连接请求
  CancelIM(...params) {
    throw new Error("接口未实现");
  }
  // 断开连接
  ReleaseIM(releaseType, callId) {
    console.log("ReleaseIM", releaseType, callId);
    return this.createPromise(
      this.sdk.releaseIM,
      { preRes: !this.reactive.valid, preResReturn: "连接已关闭" },
      releaseType,
      callId
    );
  }
  // 发送文字消息
  SendMsg(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 客户留言
  LeaveMsg(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 消息接收到
  MsgReceived(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 连接机器人
  ConRobot(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 连接机器人4新UI
  ConRobotNew(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 咨询机器人
  AskQuestion(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 咨询机器人带location
  AskQuesWithLocation(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 咨询带inputType
  AskQuesWithInputType(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 咨询带有贴尾
  AskQuesForTW(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 语音转译标注
  SendVoiceTranMsg(...params) {
    throw new Error("接口未实现");
  }
  // 经理 - 客服经理登陆
  Login(...params) {
    throw new Error("接口未实现");
  }
  // 经理 - 客服经理就绪
  SetReady(...params) {
    throw new Error("接口未实现");
  }
  // 经理 - 客服经理小休
  SetNotReady(...params) {
    throw new Error("接口未实现");
  }
  // 发送控制码
  SetCtrlInfo(ctrlInfo) {
    console.log("SetCtrlInfo", ctrlInfo);
    return this.createPromise(
      this.sdk.setCtrlInfo,
      { preRej: !this.reactive.valid, preRejReturn: new Error("连接未建立") },
      ctrlInfo
    );
  }
  // 经理 - 会话转接
  TransferCall(...params) {
    throw new Error("接口未实现");
  }
  // 经理 - 客服经理退出
  Logout(...params) {
    throw new Error("接口未实现");
  }
  // 图片上传
  PictureUpload(screenSnapFile) {
    console.log("PictureUpload", screenSnapFile);
    return this.createPromise(
      PictureUpload,
      {
        preRej: !this.reactive.valid,
        preRejReturn: new Error("连接未建立"),
        promiseAxios: true,
      },
      screenSnapFile
    );
  }
  // 语音转译标注
  CaptureEnd(...params) {
    throw new Error("接口未实现");
  }
  // 经理 - 离线消息获取
  GetOffLineMsg(...params) {
    throw new Error("接口未实现");
  }
  // 页面加载
  OnPageLoad(tagId, sys, platform, software, version, custType, lang) {
    console.log(
      "OnPageLoad",
      tagId,
      sys,
      platform,
      software,
      version,
      custType,
      lang
    );
    return this.createPromise(
      this.sdk.onPageLoad,
      {},
      tagId,
      sys,
      platform,
      software,
      version,
      custType,
      lang
    );
  }
  // 客户 - 满意度调查
  SatisfactionSurvey(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 客户提交短信验证码
  SendSmsPin(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 连接人工
  ConnectDN(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 客户查询聊天历史
  GetHistory(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 客户查询聊天历史 - 微应用
  GetHistoryNew(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 客户查询聊天历史 - 手机银行微应用
  GetHistoryByTM(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 客户发送文件上传完成的消息
  FileSent(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 客户留言
  LeaveMsgAndImg(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 连接原座席
  ConnectAgt(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 获取排队信息
  GetQueueInfo(...params) {
    throw new Error("接口未实现");
  }
  // 客户 - 上送场景关键字列表
  Keywordlist(...params) {
    throw new Error("接口未实现");
  }
}
