<template>
<div>
<div class="voicePressBtn" @touchstart.prevent="gotouchstart" @touchend="gotouchend">
      <p>按住说话</p>
    </div>
    <div v-show="talking" class="talkingWindow"><img src="@/assets/img/talking.gif"></div>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted,defineEmits,computed } from "vue";
import IFlyIatSession from "@/public/iat.all.js";
import { call_client_pub } from "@/api";
// import { getQueryVariable } from "@/utils/utils.js";
const session = ref("");
const pgsResult = ref("");
const talking = ref(false);
/*global iat_result,*/
onMounted(() => {
  window.recorderCallBack = (eventId:any,str:any)=>{
      let data = JSON.parse(eventId)
      pgsResult.value = data.results
      
      sendChat(pgsResult.value);
  }
  window.CCB_event_publish = (eventId:any,str:any)=>{
      pgsResult.value = str
      sendChat(pgsResult.value);
  }
  session.value = new IFlyIatSession({
    callback: {
      uaps_ret: function (msg) {
        iat_result.innerHTML = msg;
      },
      onResult: function (err, result, pgs, end) {
        /* 若回调的err为空或错误码为0，则会话成功，可提取识别结果进行显示*/
        if (err == null || err == undefined || err == 0) {
          if (result == "" || result == null) {
            //iat_result.innerHTML = "没有获取到识别结果";
          } else {
            if (pgs == 1) {
                pgsResult.value = pgsResult.value + result;
            } else {
              // _this.addConversation(pgsResult.value + result);
            }
          }
          /* 若回调的err不为空且错误码不为0，则会话失败，可提取错误码 */
        } else {
          iat_result.innerHTML = "error code : " + err;
          // volumeEvent.stop();
        }
        if (end) {
              sendChat(pgsResult.value);
          // volumeEvent.stop();
        }
      },
      onVolume: function (volume) {
        //
      },
      onError: function () {
        //   _this.mic_pressed = false;
      },
      onProcess: function (status) {
        switch (status) {
          case "onStart":
            // _this.addConversation("服务初始化...")
            break;
          case "normalVolume":
            break;
          case "started":
            break;
          case "onStop":
            //   _this.talking = false;
            // _this.addConversation("等待结果...")
            break;
          case "onEnd":
              pgsResult.value = "";
              session.value.kill();
            break;
          case "lowVolume":
            // _this.addConversation("倾听中...(声音过小)")
            break;
          default:
            // tip.innerHTML = status;
            break;
        }
      },
    },
  });
});
const emit = defineEmits(["sendChat","interrupt"])
const sendChat = (str:string)=>{
  emit("sendChat",str)
}
const u = navigator.userAgent;
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// const platform = computed(()=>{
//   let name = getQueryVariable('platform')
//     return name
// })
const gotouchstart = ()=>{
  stopMusic();
  emit("interrupt");
  if (talking.value) {
    return
  }
  talking.value = true
  console.log("startrecodr",isiOS);
  // if (platform.value!="qyjd") {
  //   session.value.start({});
  // }
  // else{
    if (isiOS&&(document.getElementById("ttsa")).getElementsByTagName('video')[0]) {
          (document.getElementById("ttsa")).getElementsByTagName('video')[0].pause()
        }
        // session.value.start({});
    call_client_pub("startRecorder", "");
  // }
}
const gotouchend = async()=>{
  if (!talking.value) return;
      talking.value = false;
      console.log("stoprecodr",isiOS);
      startMusic();
      // if (platform.value!="qyjd") {
      //   session.value.stop();
      // }
      // else{
        // session.value.stop();
        call_client_pub("stopRecorder", "");
        if (isiOS&&(document.getElementById("ttsa")).getElementsByTagName('video')[0]) {
          (document.getElementById("ttsa")).getElementsByTagName('video')[0].play()
        }
      // }
}
const stopMusic = ()=>{
  if ((document.getElementById("ttsa")).getElementsByTagName('video').length) {
            if (isiOS) {
              (document.getElementById("ttsa")).getElementsByTagName('video')[0].muted = true
            }
            else{
              (document.getElementById("ttsa")).getElementsByTagName('video')[0].volume = 0
            }
            
        }
}
const startMusic = ()=>{
  if ((document.getElementById("ttsa")).getElementsByTagName('video').length) {
            if (isiOS) {
              (document.getElementById("ttsa")).getElementsByTagName('video')[0].muted= false
            }
            else{
              (document.getElementById("ttsa")).getElementsByTagName('video')[0].volume = 1
            }
        }
}
</script>

<style lang="less" scoped>
  .voicePressBtn{
    position: absolute;
    left: 17%;
    bottom:48%;
    width: 79%;
    height: 45%;
    background: linear-gradient(180deg, #88B6FF 0%, #4368EB 100%);
      border-radius: 50vh;
      display: flex;
      align-items: center;
      >p{
        position: relative;
        width: 100%;
        text-align: center;
        color: #FFFFFF;
        margin: 0%;
        font-size: 1rem;
      }
  }
      .talkingWindow{
      position: fixed;
      z-index: 99;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 88%;
      background: rgba(0, 0, 0, 0.500);
      >img{
        position: absolute;
        top: 45%;
        left: 33%;
        width: 34%;
        object-fit: contain;
      }
    }
</style>
