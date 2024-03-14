<template>
    <div class="transfertoperson">
      <div class="cardcontent">
        <div class="answer">您可以点击拨打专属电话进一步咨询。</div>
        <div class="suggest"><div>对公业务在线客服：95533</div></div>
        <div class="clickphone" v-if="!isPc"><img @click="callphone" src="@/assets/img/callphone.png"></div>
        <div class="managerInfo" v-if="store.platformInfo.cst_info&&showInfo">
          <div class="title">你的专属对公客户经理</div>
          <div class="infozone">
            <div class="icon"><img src="@/assets/img/infoIcon.png"></div>
            <div class="detail">
              <div>{{bankName}}</div>
              <div>职位：{{position}}</div>
              <div>姓名：{{managerName}}</div>
              <div>联系方式：{{showPhone}}</div>
            </div>
          </div>
          <img @click="callnow(telphone)" src="@/assets/img/callnow.png">
          <p class="infotips">小微提醒：请您在工作时段联系客户经理哦。</p>
        </div>
        <div class="managerInfo" v-if="showBussinessInfo">
          <div class="title">对公网点电话</div>
          <div class="infozone">
            <div class="icon"><img src="@/assets/img/placeIcon.png"></div>
            <div class="detail">
              <div>网点名称：{{businessSiteName}}</div>
              <div>联系电话：{{businessTel}}</div>
              <!-- <div>地址：{{businessPosition}}</div> -->
            </div>
          </div>
          <p class="infotips">建议您在工作时段咨询哦。</p>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps,watch,computed } from "vue";
import httpszzt from "@/api/reqszzt";
import isPc from "@/utils/isPc.js";
import { getQueryVariable } from "@/utils/utils.js";
import { store } from "@/store/store";
import { encryptGcm } from "@/utils/aes.js";
import { call_client_pub } from "@/api";
const callphone = ()=>{
    call_client_pub("callPhone", "");
}
const callnow = (tel:string)=>{
  let data = {phoneNo:tel}
    call_client_pub("callPhoneByNo", JSON.stringify(data));
}
const telphone = ref('');
const managerName = ref('');
const bankName = ref('');
const position = ref('');
const showInfo = ref(false)
const showPhone = ref('');
const showBussinessInfo = ref(false);
const businessSiteName = ref('');
const businessTel = ref('');
const businessPosition = ref('');
onMounted(()=>{

  if (store.platformInfo.qiyewangyin) {
    let requestdata = {
    cstId:"837850473251018837",
  }
  if (store.platformInfo.cst_info&&store.platformInfo.userId) {
    requestdata.cstId = store.platformInfo.userId
  }
  let requestbody = {
    paramStr:"pageNum=1&pageSize=20",
    bodyStr:JSON.stringify(requestdata)
  }
  let word = "foreign-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
  httpszzt
    .post(
      process.env.VUE_APP_BASE_TOBANKURL+"/transferData/getCustomManageTeam",
      requestbody,token
    )
    .then((res: any) => {
      console.log(9999,JSON.parse(res.data.msg).data.obj.staffInfo[0]);
      if (JSON.parse(res.data.msg).data.obj.staffInfo&&JSON.parse(res.data.msg).data.obj.staffInfo[0]) {
        showBussinessInfo.value = true
        let resultData = JSON.parse(res.data.msg).data.obj.staffInfo[0]
        businessTel.value = resultData.fixTelno
        businessSiteName.value = resultData.wbtDeptNm
        businessPosition.value = resultData.empeBlngInstNm
      }
      
    })
    .catch(() => {
    });
  }
  if (store.platformInfo.cst_info) {
    console.log('info',store.platformInfo.cst_info);
    
  let word = "foreign-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
    httpszzt
    .get(
      process.env.VUE_APP_BASE_TOBANKURL+"/qyBank/khjlInfo?data="+store.platformInfo.userId,
      token
    )
    .then((res: any) => {
      console.log('客户经理信息',res);      
      if (res.data.code==200) {
        // let keyStr = "JXU5NkM2JXU1NkUy";
        // let result = decrypt(res.data.data.aesjm,keyStr)
        managerName.value = res.data.data.cstmgr_nm
        position.value = res.data.data.pst_rl_nm
        telphone.value = res.data.data.ctc_tel
        showPhone.value = geTel(telphone.value)
        bankName.value = res.data.data.empe_blng_inst_nm
        showInfo.value = true
      }
    })
  }
})
const geTel = (tel:string) => {
    var reg = /^(\d{3})\d{4}(\d{4})$/;  
    return tel.replace(reg, "$1****$2");
}
</script>

<style lang="less" scoped>
.transfertoperson{
  position: relative;
  .cardcontent{
    .answer{
      margin-bottom: 20px;
    }
    .suggest{
      display: flex;
      margin-bottom: 10px;
      &::before{
      content:'';
      display: block;
      width:5px;
      height:5px;
      background:#4368EB;
      border-radius: 50%;
      margin-right:6px;
      margin-top: 0.5rem;
    }
    .call{
      color: #4368EB;
    }
    }
    .clickphone{
      position: relative;
      margin-left: 5%;
      width: 90%;
      >img{
        width: 100%;
        object-fit: contain;
      }
    }
    .managerInfo{
      .title{
        display: flex;
        margin-bottom: 10px;
        &::before{
      content:'';
      display: block;
      width:5px;
      height:5px;
      background:#4368EB;
      border-radius: 50%;
      margin-right:6px;
      margin-top: 0.5rem;
    }
      }
      .infozone{
        position: relative;
        width: 92%;
        margin-left: 4%;
        display: flex;
        height: fit-content;
        .icon{
          position: relative;
          width: 25%;
          >img{
            width: 100%;
            object-fit: contain;
          }
        }
        .detail{
          position: relative;
          width: 73%;
          margin-left: 2%;
          display: flex;
          flex-direction: row;
    flex-wrap: wrap;
    >div{
      position: relative;
      width: 100%;
    }
        }
      }
      >img{
        position: relative;
        margin-top: 10px;
        margin-left: 5%;
        width: 90%;
        object-fit: contain;
      }
      .infotips{
        position: relative;
        margin-top: 10px;
        margin-left: 5%;
        width: 90%;
        text-align: center;
        font-size: 0.7rem;
font-family: PingFang SC;
font-weight: 500;
color: #4368EB;
      }
    }
  }
}
</style>
