<template>
    <div style="display:none;">
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineExpose, defineProps,watch,computed, reactive } from "vue";
import httpszzt from "@/api/reqszzt";
import isPc from "@/utils/isPc.js";
import { store } from "@/store/store";
import { getQueryVariable } from "@/utils/utils.js";
import { encryptGcm,decrypt } from "@/utils/aes.js";

const infoData = ref('')
onMounted(()=>{
     let testkeyStr = "JXU5NkM2JXU1NkUy";
        let result = decrypt("zHptfjlmznZcdTRW6nJCDjEg2miCzmJIJOee1OOMuTJArtQtAQzKOoxMGj++xVkSscW6tPnqJqorhw2YMWazMQ592vVlCU/1J3rqMucupIMmCmt0fuHGzyQFe105xv51g2/HeQXDBjTLLWV4abDj3sLld8HwIbTcWcDc6jtkVs4jUzhd3n32nXQS/m6tBRetyM3wN2Z1IHzIRhN8PY4uFr5j1oYHvoYvG67PYYq4pcD2rVboNigZxbuny3Bo5PtZGLsHaAwLm2Rqrv82JAp3pBq/Fh/fDCBWLJuX4AoGw8t/I+eDmcHormziG9wSj+TFqLcyjzOD7pYEljjrm5e3ss7Awe9PKeH4Pu518NqfvxwKlF1kOptDhAZDb08HTDx+07xbHB6WLrpJxk6rKrDZD1LrV7acF3nBFW6i4KE8oiBMKsbCZgW+PM6UmKoKkny+bckbQoZqEDOfbsKMEQ1DqQ==",testkeyStr)
        let resultData = JSON.parse(result)
        console.error("showresultD-----------",resultData);
    infoData.value =  store.getplatformInfo()
   infoData.value.platform = getQueryVariable("platform")
   infoData.value.auth_code = getQueryVariable("auth_code")
   console.log('infoData innit:',getQueryVariable("platform"))
   getRequestDomain();
     //切换语音接口并用不同人声，20240322需求
   switch (infoData.value.platform) {
    case 'qyjd':
      infoData.value.qiyeshoujiyinhang = true
      sessionStorage.setItem("CustType2", '31');
      sessionStorage.setItem("software", 'qysjszkhjl');
      infoData.value.custType2 = '31'
      
      console.log('hahaha 31')
      infoData.value.location = 'SZKHJL'
      infoData.value.hadCusInfo = true
      break;
    case 'qywy':
      infoData.value.qiyewangyin = true
      infoData.value.location = 'SZKHJL'
      infoData.value.askplatform = 'webdg'
      sessionStorage.setItem("CustType2", '19');
      sessionStorage.setItem("software", 'qywyszkhjl');
      infoData.value.custType2 = '19'
      break;
   case 'fcej':
      infoData.value.feichiejia = true
      infoData.value.location = 'SZJLFC'
      infoData.value.userId = getQueryVariable("cstId") ||  getQueryVariable("user")
      infoData.value.fcejUserId = getQueryVariable("user")
      infoData.value.userName = decodeURI(getQueryVariable("usrNm") || '')
      infoData.value.custType2 = '83'
      sessionStorage.setItem("CustType2", '83');
      sessionStorage.setItem("software", 'fczbszkhjl');
      infoData.value.hadCusInfo = true
      break;
  case 'fcez':
      infoData.value.feichiejia = true
      infoData.value.feichiez = true
      infoData.value.location = 'SZJLFC'
      infoData.value.userId = getQueryVariable("cstId") ||  getQueryVariable("user")
      infoData.value.fcejUserId = getQueryVariable("user")
      infoData.value.userName = decodeURI(getQueryVariable("usrNm") || '')
      infoData.value.custType2 = '83'
      sessionStorage.setItem("CustType2", '83');
      sessionStorage.setItem("software", 'fczbszkhjl');
      infoData.value.hadCusInfo = true
      break;
    default:
      break;
   }
   
    
   
})

const initUser = ()=>{
  if (infoData.value.auth_code) {
      //建行员工体系增加测试部分代码
      // let testkeyStr = "JXU5NkM2JXU1NkUy";
      //   let result = decrypt("zHptfjlmznZcdTRW6nJCDjEg2miCzmJIJOee1OOMuTJArtQtAQzKOoxMGj++xVkSscW6tPnqJqorhw2YMWazMQ592vVlCU/1J3rqMucupIMmCmt0fuHGzyQFe105xv51g2/HeQXDBjTLLWV4abDj3sLld8HwIbTcWcDc6jtkVs4jUzhd3n32nXQS/m6tBRetyM3wN2Z1IHzIRhN8PY4uFr5j1oYHvoYvG67PYYq4pcD2rVboNigZxbuny3Bo5PtZGLsHaAwLm2Rqrv82JAp3pBq/Fh/fDCBWLJuX4AoGw8t/I+eDmcHormziG9wSj+TFqLcyjzOD7pYEljjrm5e3ss7Awe9PKeH4Pu518NqfvxwKlF1kOptDhAZDb08HTDx+07xbHB6WLrpJxk6rKrDZD1LrV7acF3nBFW6i4KE8oiBMKsbCZgW+PM6UmKoKkny+bckbQoZqEDOfbsKMEQ1DqQ==",testkeyStr)
      //   let resultData = JSON.parse(result)
      //   infoData.value.cst_info = resultData
      //   infoData.value.userId = infoData.value.cst_info.userid
      //   console.error("showresultD-----------",resultData);
      //   checkhistory();
      //截断authcode企业网银用
      // if (store.platformInfo.qiyeshoujiyinhang) {
      //   console.log('authCode',infoData.value.auth_code);
      //   return
      // }  http://43.139.125.138/dh-internal/qyBank/userInfo?data=9efcbfb5-6b2d-4850-a450-4f676834ae47
    let word = "foreign-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
    httpszzt
    .get(
      //'http://43.139.125.138/dh-internal/qyBank/userInfo?data="+infoData.value.auth_code,
      // "http://43.139.125.138/dh-internal/qyBank/userInfo?data="+infoData.value.auth_code,
      process.env.VUE_APP_BASE_TOBANKURL+"/qyBank/userInfo?data="+infoData.value.auth_code,
     // 'https://dh.match.ccb.com/dh-internal'+"/qyBank/userInfo?data="+infoData.value.auth_code,
      token
    )
    .then((res: any) => {
      if (res.data.code==200) {
        let keyStr = "JXU5NkM2JXU1NkUy";
        let result = decrypt(res.data.data.aesjm,keyStr)
        let resultData = JSON.parse(result)
        infoData.value.cst_info = resultData
        console.error('接口返回的 cst_info：',infoData.value.cst_info)
        infoData.value.isLogin = true
        if (infoData.value.cst_info.cst_id) {
          infoData.value.userId = infoData.value.cst_info.cst_id
        }
        else if (infoData.value.cst_info.userid) {
          infoData.value.userId = infoData.value.cst_info.userid
        }
        infoData.value.userName = infoData.value.cst_info?.fullname || infoData.value.cst_info?.fullname || ''
       

        console.log('store',store.platformInfo);
        checkhistory()
      }
    })
    
   }
   else if(!store.platformInfo.feichiejia){
    store.platformInfo.userId=getRandomString(15);
    console.log('randomName',store.platformInfo.userId);
    
   }
   else{
    if (store.platformInfo.feichiejia&&store.platformInfo.userId!='guest') {
      infoData.value.isLogin = true
      checkhistory()
    }
    else if(store.platformInfo.feichiejia&&store.platformInfo.userId=='guest'){
      store.platformInfo.userId=getRandomString(15);
    console.log('randomName',store.platformInfo.userId);
    }
   }
}

const getRequestDomain = () => {
  httpszzt
    .postRobot(
      process.env.VUE_APP_REQUESTDOMAIN +
        "/dwr/domainNameQuery.do?isRoute=true"
    )
    .then(res => {
      console.log("domainNameQuery", res.data);
      let result = res.data;
      // let result = "vchat1.ccb.com_9527"
      if (result.search("_") != -1) {
        infoData.value.isBigMode = true;
        // console.log(result,result.split("_")[1]);
        infoData.value.requestDomain = result.split("_")[0];
        //测试环境不通改写成映射地址让chianuicom能用
        if (infoData.value.requestDomain == "icss.ccb.com:8101"||infoData.value.requestDomain =="128.192.182.232:8101") {
          if (process.env.NODE_ENV=='test'||process.env.NODE_ENV=='development') {
            infoData.value.requestDomain = "124.127.94.41:18101";
          }
          infoData.value.requestHead = "http://";
          sessionStorage.setItem("userid", "CCB123456789");
          sessionStorage.setItem("userid2", "");
        }
        infoData.value.bigModeRouteId = result.split("_")[1];
      } else {
        infoData.value.requestDomain = result;
      }
      initUser();
    })
    .catch(err => {
      console.log("domainNameQueryERROR", err);
    });
};

const checkhistory = ()=>{
  console.log("fcej--------",store.platformInfo.askplatform+store.platformInfo.location+"_"+store.platformInfo.userId);
  
  let encryptParam = encryptGcm("selTime="+dateFormat(new Date())+"&tagId="+store.platformInfo.askplatform+store.platformInfo.location+"_"+store.platformInfo.userId+"&page="+"1"+"&dataType=json",'QZPM1029WXON3847')
  let data = {
    custType:sessionStorage.getItem("CustType2"),
    wParam:encryptParam
  }
  httpszzt
    .getrequest(
      store.platformInfo.requestHead +
      store.platformInfo.requestDomain +"/dwr/webChatHis",
      data
    )
    .then((res: any) => {
      
      let data = res.data.msgList
      if (data) {
        infoData.value.historyRecord = true
      }
    })
}

const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
const RandomIndex=(min:any, max:any, i:any)=>{
    let index = Math.floor(Math.random()*(max-min+1)+min),
        numStart = _charStr.length - 10;
    //如果字符串第一位是数字，则递归重新获取
    if(i==0&&index>=numStart){
        index = RandomIndex(min, max, i);
    }
    //返回最终索引值
    return index;
}
    const getRandomString= (len:number)=>{
    let min = 0, max = _charStr.length-1, _str = '';
    //判断是否指定长度，否则默认长度为15
    len = len || 15;
    //循环生成字符串
    for(let i = 0, index; i < len; i++){
        index = RandomIndex(min, max, i);
        _str += _charStr[index];
    }
    return _str;
}

function dateFormat(time:Date) {
                var date=new Date(time);
                var year=date.getFullYear();
                /* 在日期格式中，月份是从0开始的，因此要加0
                 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                 * */
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                // 拼接
                return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
            }
</script>

<style lang="less" scoped>
</style>
