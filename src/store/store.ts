import { reactive, ref } from "vue";
import { getQueryVariable } from "@/utils/utils.js";
interface platformInfo {
  platform?: any;
  userId?: string;
  location: any;
  askplatform: string;
  qiyewangyin?: boolean;
  qiyeshoujiyinhang?: boolean;
  feichiejia?: boolean;
  feichiez?:boolean;
  historyRecord?:boolean;
  custType?:string;
  auth_code?:any;
  cst_info?:any;
  custType2?:any;//人工坐席的客户渠道号
  hadCusInfo?:any;
  connectStage?:boolean;
  userName?:string;
  isLogin?:boolean;
  fcejUserId?:string;
  isBigMode?:boolean;
  bigModeRouteId?:string;
  requestDomain:string;
  requestHead:string;
  searchingHistory:boolean;
  voiceType:string;
  searchTime:string;
  searchTimeList:Array<string>;
}
const store = {
  platformInfo: reactive<platformInfo>({
    userId:'guest',
    location: 110000000,
    askplatform: 'cci',
    qiyewangyin: false,
    qiyeshoujiyinhang: false,
    feichiejia: false,
    feichiez:false,
    historyRecord:process.env.NODE_ENV=="development"?true:false,
    auth_code:false,
    connectStage:false,
    userName:'',
    isLogin:false,
    fcejUserId:'',
    isBigMode:false,
    bigModeRouteId:"",
    requestDomain:"",
    requestHead:"https://",
    voiceType:'62420',
    searchingHistory:false,
    searchTime:"",
    searchTimeList:[],
  }),

  setplatformInfo(newValue: any): void {
    this.platformInfo = newValue;
  },
  getplatformInfo(): any {
    return this.platformInfo;
  },

  //线上 true 本地 false
  online: false,
};
export { store };
