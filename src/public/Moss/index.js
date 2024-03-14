import Utils from "@/utils/customerutils.js";

import CustInfo from "./CustInfo.js";
import Message, { MessageState, MessageType } from "./Message";

import Agent from "./Agent.js";
import Custm from "./Custm.js";

import { GetRedirIp } from "@/service/customerservice";

class Moss {
  static Init(sdkOpts, role) {
    let ip;
    return Promise.resolve()
      .then(() => {
        return GetRedirIp();
      })
      .then((res) => {
        console.log('res ip为：',res)
        const rest = process.env.NODE_ENV === 'production' ?  res.data : res
       //let data = '124.127.94.41:18101'
        // 获取到真实ip
        ip = `${window.location.protocol}//${rest}/dwr/dwr`;
        console.log('111ip为：', ip)
        return Utils.LoadScript(`${ip}/engine.js`);
      })
      .then(() => {
        return Utils.LoadScript(`${ip}/util.js`);
      })
      .then(() => {
        // 只加载客户经理
        if (role == "agent")
          return Utils.LoadScript(`${ip}/interface/SoftPhone.js`);
        // 只加载客户（默认）
        return Utils.LoadScript(`${ip}/interface/MosPhone.js`);
      })
      .then(() => {
        window.dwr.engine._pathToDwrServlet = ip;
        window.dwr.engine.setActiveReverseAjax(true);
        window.dwr.engine.setNotifyServerOnPageUnload(true);
        if (role == "agent")
          Moss.Inst = new Agent(window.SoftPhone, ip, ...sdkOpts);
        else Moss.Inst = new Custm(window.MosPhone, ip, ...sdkOpts);

        window.callJs8Flash = function (optype, ...params) {
          Moss.Inst.dispatch(optype, ...params);
        };
        return Moss;
      });
  }
}

export default Moss;
export { CustInfo, Message, MessageState, MessageType };
