import Base from "./base";
import Moss from "@/public/Moss";

export default class Pc extends Base {
  static match() {
    return true;
  }
  SdkOptions() {
    /**
     * tagId: String，机器名（或客户唯一标识）
     * sys：系统类型
     * platform：平台类型
     * software：软件名
     * version：版本
     * custType: 渠道类型
     * lang: 语种 1-简体；2-繁体；3-英文
     */
    // return ["pcClient"];
    return [sessionStorage.getItem('userid'), "0000", "pc", sessionStorage.getItem('software'), "1.0.0", sessionStorage.getItem('CustType2'), 1];
  }
  LoadHistory(...params) {
    return Moss.Inst.GetHistory(...params);
  }
}
