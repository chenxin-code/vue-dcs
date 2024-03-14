<template>
<div class="noticeWindow">
  <div class="noticeDialog">
    <img class="closeBtn" src="@/assets/img/iframeclose.png" @click="closeWindow">
    <div class="dialogHead">
      <p class="selectTag" :class="{readed:ReadedTag}" @click="getReadList">已读</p>
      <p class="selectTag" :class="{readed:!ReadedTag}" @click="getUnreadList">未读</p>
    </div>
    <div class="dialogContent" v-show="ReadedTag&&!loading">
      <div class="nomessage" v-if="!readList||!readList.length">
        <img src="@/assets/img/please_wait.png" >
        <p>暂无消息</p>
      </div>
      <div class="noticeInfo" v-for="(item,index) in readList" :key="index">
        <div class="header">
          <div class="title">
            <img src="@/assets/img/noticeIcon.png" >
            <p>{{item.msgTtl}}</p>
          </div>
          <p class="time">{{item.crtTm}}</p>
        </div>
        <div class="detailInfo">
          <p>{{item.msgCntnt}}</p>
        </div>
      </div>
    </div>
    <div class="dialogContent" v-show="!ReadedTag&&!loading">
      <div class="nomessage" v-if="!unreadList||!unreadList.length">
        <img src="@/assets/img/please_wait.png" >
        <p>暂无消息</p>
      </div>
      <div class="allread" v-if="!unreadList||unreadList.length">
        <div class="allreadBtn" @click="allchangeread">
          <img src="@/assets/img/readIcon.png" >
          <p>全部已读</p>
        </div>
      </div>
      <div class="noticeInfo" v-for="(item,index) in unreadList" :key="index">
        <div class="header">
          <div class="title">
            <img src="@/assets/img/noticeIcon.png" >
            <p>{{item.msgTtl}}</p>
          </div>
          <p class="time">{{item.crtTm}}</p>
        </div>
        <div class="detailInfo">
          <p>{{item.msgCntnt}}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
    
</template>

<script lang="ts" setup>
import { defineEmits,onMounted,ref,computed ,watch} from "vue";
import httpszzt from "@/api/reqszzt";
import { store } from "@/store/store";
import { encryptGcm } from "@/utils/aes.js";
import isPc from "@/utils/isPc.js";
onMounted(()=>{
  if (localStorage.getItem('readnotice')&&localStorage.getItem('readnotice')=='read') {
    allchangeread();
  }
})
watch(()=>store.platformInfo.userId,()=>{
  getUnreadList();
})

const ReadedTag = ref(false);
const readList = ref([]);
const unreadList = ref([]);
const addnotice = {msgTtl:'中国建设银行',msgCntnt:"夏日炎炎，中国建设银行提醒您：注意防暑降温。",crtTm:"2023-07-01",status:'addnotice'}
const loading = ref(false)

const getUnreadList = ()=>{
  loading.value = true
  ReadedTag.value = false
  let requestdata = {
    alrdyRedSt:"0",
    ccbFlag:"0",
    // method:"",
    msgTp:"08",
    // stmMsgid:"",
    usrId:store.platformInfo.userId,
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
      process.env.VUE_APP_BASE_TOBANKURL+"/transferData/sysMsgListForCompanyBank",
      requestbody,token
    )
    .then((res: any) => {
      loading.value = false
      if (res.data.msg&&res.data.msg!='') {
        unreadList.value = JSON.parse(res.data.msg).data.pageInfo.list
        if (unreadList.value&&unreadList.value.length&&unreadList.value.findIndex(item=>{return item.status=='addnotice'})>=0) {
          emit("changetip")
        }
        else{
          console.log(888,unreadList.value);
          if (!unreadList.value) {
            unreadList.value=[]
            unreadList.value.push(addnotice)
          }
          else{
            unreadList.value.push(addnotice)
          }
        }
      }
      console.log(999,unreadList.value);
      
      if (!unreadList.value||!unreadList.value.length) {
        if (unreadList.value&&unreadList.value.length&&unreadList.value.findIndex(item=>{return item.status=='addnotice'})>=0) {
          emit("changetip")
        }
        else{
          unreadList.value=[]
          unreadList.value.push(addnotice)
        }
        emit("changetip")
      }
      // else{
      //   if (unreadList.value&&unreadList.value.length&&unreadList.value.findIndex(item=>{return item.status=='addnotice'})>=0) {
      //     return
      //   }
      //   else{
      //     unreadList.value.push(addnotice)
      //   }
      // }
    })
    .catch((err) => {
      console.log('--------err-------',err);
      
    });
}
const getReadList = ()=>{
  loading.value = true
  ReadedTag.value = true
  let requestdata = {
    alrdyRedSt:"1",
    ccbFlag:"0",
    msgTp:"08",
    usrId:store.platformInfo.userId,
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
      process.env.VUE_APP_BASE_TOBANKURL+"/transferData/sysMsgListForCompanyBank",
      requestbody,token
    )
    .then((res: any) => {
      loading.value = false
      if (res.data.msg&&res.data.msg!='') {
      readList.value = JSON.parse(res.data.msg).data.pageInfo.list
      }
      if (!unreadList.value||!unreadList.value.length) {
        
        if (unreadList.value&&unreadList.value.length&&unreadList.value.findIndex(item=>{return item.status=='addnotice'})>=0) {
          return
        }
        else{
          unreadList.value=[]
          unreadList.value.push(addnotice)
        }
      }
    })
    .catch(() => {
    });
}
const allchangeread = ()=>{
  for (let i = 0; i < unreadList.value.length; i++) {
    const item = unreadList.value[i];
    let requestdata = {
    alrdyRedSt:"1",
    crtPsnId:"",
    delId:"0",
    method:"",
    mosPsnId:"",
    modTm:"",
    msgCntnt:"",
    msgSndTm:"",
    msgTp:"08",
    rdTm:"",
    stmMsgid:"",
    usrId:store.platformInfo.userId,
  }
  if (item.crtPsnId!=undefined) {
    requestdata.crtPsnId = item.crtPsnId
  requestdata.stmMsgid = item.stmMsgid
  let word = "foreign-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
  let requestbody = {
    paramStr:"",
    bodyStr:JSON.stringify(requestdata)
  }
  httpszzt
    .changestate(
      process.env.VUE_APP_BASE_TOBANKURL+"/transferData/updateSysMsgForCompanyBank",
      requestbody,token
    )
    .then((res: any) => {
      if (!unreadList.value[i+1]||!unreadList.value[i+1].crtPsnId) {
        getUnreadList();
      }
    })
  }
  }
}

const emit = defineEmits(["close","changetip"])
const closeWindow = ()=>{
  document.getElementById("backtohomeBtn").style.display = "block"
  emit("close")
}

</script>

<style lang="less" scoped>
.noticeWindow{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index:200;
    top: 0px;
    left: 0px;
    .noticeDialog{
      position: absolute;
      left: 0%;
      top: 38%;
      width: 100%;
      height: 62%;
      background: #ffffff;
      border-radius: 10px 10px 0px 0px;
      overflow: hidden;
      .closeBtn{
        position: absolute;
        right: 2.7%;
        top: 3.5%;
        width: 4%;
        object-fit: contain;
        cursor: pointer;
        z-index: 2;
      }
    }
    .dialogHead{
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 12.5%;
      background: linear-gradient(0deg, rgba(255,255,255,0), #C2D7F5);
      border-radius: 10px 10px 0px 0px;
      display: flex;
      justify-content: center;
    flex-direction: row;
    align-items: center;
      .selectTag{
        width: fit-content;
        text-align: center;
        font-size: 1rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        margin: 20px;
        padding-bottom: 5px;
        border-bottom: 2px solid transparent;
        cursor: pointer;
      }
      .selectTag.readed{
        font-weight: bold;
color: #4368EB;
border-bottom: 2px solid #4368EB;
      }
    }
    .dialogContent{
      position: absolute;
      top: 12.5%;
      left: 0%;
      width: 100%;
      height: 100%;
      .nomessage{
        position: absolute;
        left: 50%;
        top: 20%;
        width: 35%;
        height: fit-content;
        transform: translate(-50%,-20%);
        >img{
          position: relative;
          width: 100%;
          object-fit: contain;
        }
        >p{
          font-size: 0.9rem;
font-family: PingFang SC;
font-weight: unset;
color: #333333;
text-align: center;
        }
      }
      .allread{
        position: relative;
        width: 90%;
        margin-left: 5%;
            display: flex;
    justify-content: flex-end;
        .allreadBtn{
          display: flex;
          background: #F4F6FA;
          border-radius: 50vh;
              width: fit-content;
    padding: 0px 10px;
    align-items: center;
    cursor: pointer;
          >img{
            width: 16px;
            object-fit: contain;
            margin-right: 8px;
          }
          >p{
            font-size: 0.6rem;
          }
        }
      }
      .noticeInfo{
        position: relative;
        width: 90%;
        margin-left: 5%;
        border-bottom: 1px solid #E6E6E6;
        .header{
          display: flex;
              align-items: center;
        justify-content: space-between;
    flex-direction: row;
          .title{
            display: flex;
            align-items: center;
            >img{
              width: 30px;
              object-fit: contain;
              margin-right: 5px;
            }
            >p{
              font-size: 1rem;
              font-family: PingFang SC;
font-weight: bold;
color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 55vw;
            }
          }
          .time{
            font-size: 0.8rem;
            font-family: PingFang SC;
color: #7F8082;
          }
        }
        .detailInfo{
          font-family: PingFang SC;
color: #474747;
font-size: 0.8rem;
>p{
  margin: 0%;
margin-bottom: 15px;
}
        }
      }
    }
}
@media screen and (min-width: 600px) {
.noticeWindow{
  .noticeDialog{
    left: 35%;
    top: 6%;
    width: 59%;
    height: 76%;
    border-radius: 10px 10px 10px 10px;
    .closeBtn{
      width: 3%;
    }
  }
  .dialogHead{
  }
  .dialogContent{
  }
}
}
</style>
