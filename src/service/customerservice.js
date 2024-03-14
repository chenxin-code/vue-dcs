import { EnvAdapter } from "@/adapters";
import Axios from "@/api/axiosobj.js";

const redAxios = new Axios({
  baseURL: EnvAdapter.Inst.RedirectionIp(),
});
// const redAxios2 = new Axios({
//   baseURL: EnvAdapter.Inst.PingjiaIp(),
// });
const reqAxios = new Axios();

export function GetRedirIp() {
  if (EnvAdapter.IsProd){
    return redAxios.Get("").then((res) => {
      let data = res.data;
      reqAxios.inst.defaults.baseURL = `${window.location.protocol}//${data}`;
      return res;
    });
  }
  else{
    let data = '124.127.94.41:18101'
    reqAxios.inst.defaults.baseURL = `${window.location.protocol}//${data}`;
    console.error('base URL123',reqAxios.baseURL)
    return Promise.resolve().then(() => '124.127.94.41:18101')

  } 
}

export function PictureUpload(screenSnapFile) {
  return reqAxios.Get("/ccimos/screenSnap/upload.do", {
    params: { screenSnapFile },
  });
}

export function SatisfactionSurvey(type, msg, untype, callid) {
  return reqAxios.Get("/online/survey4mobile", {
    params: { callid, type, msg, untype },
  });
}

export function sendKefuPingjia(pa) {
  return reqAxios.Get("/online/survey4mobile", {
    params: pa,
  });
}