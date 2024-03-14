<template>
    <div id="rightBtnList" class="rightBtnList">
      <div v-show="!props.ttsaWork">
        <!-- <img v-show="!ttsapreload" src="@/assets/img/openfluenticon.png" @click="openFluent"> -->
        <div v-show="!ttsapreload" class="open" @click="openFluent"><img id="openImg" src="../../public/static/images/openfluenticon_animation.png"></div>
        <!-- <img v-show="!ttsapreload" class="clip" src="@/assets/img/openfluenticon2.png"> -->
        <div v-show="ttsapreload" class="waitting"><img id="waitingImg" src="../../public/static/images/waitfluenticon-animation.png"></div>
      </div>
      <img v-show="props.ttsaWork" src="@/assets/img/openfluenticon.png" @click="closeFluent">
      <!-- <img src="@/assets/img/changeFontsizeBtn.png" @click="showChangeSize"> -->
      <!-- <img src="@/assets/img/ttsaVoiceBtn.png" @click="changeMute" v-show="!props.mute"> -->
      <!-- <img src="@/assets/img/ttsaVoiceBtnClose.png" @click="changeMute" v-show="props.mute"> -->
      <div class="buttonWithText"><img src="@/assets/img/changeFontsizeBtn.png" @click="showChangeSize"><div class="name">字体调整</div></div>
      <div class="buttonWithText">
        <img src="@/assets/img/ttsaVoiceBtn.png" @click="changeMute" v-show="!props.mute">
        <img src="@/assets/img/ttsaVoiceBtnClose.png" @click="changeMute" v-show="props.mute">
        <div class="name">音量</div>
      </div>
      <div class="buttonWithText" @click="searchHistoryByDate" ><img src="@/assets/img/searchHistory.png"><div class="name">历史记录</div></div>
      <div class="buttonWithText" @click="jumpToHall" v-show="store.platformInfo.qiyeshoujiyinhang" ><img src="@/assets/img/enterToHall.png"><div class="name">数字化展厅</div></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted,defineEmits,defineProps,watch } from "vue";
import { store } from "@/store/store";
interface Inprops {
    ttsaWork:boolean
    mute:boolean
    ttsapreload:boolean
}
const props = defineProps<Inprops>()
watch(()=>props.ttsapreload,(val)=>{
  if (val) {
    clearInterval(openfluentinterval.value)
    logodom.value = document.getElementById('waitingImg')
    let num = 0
    waitinginterval.value = setInterval(()=>{
        if (num<-5900) {
            num = 0
            clearInterval(waitinginterval.value)
        }
        else{
            num = num -100
        }
        logodom.value.style.top = num+'%'
    },5000/60)
  }
  else{
    clearInterval(waitinginterval.value)
    icondom.value = document.getElementById('openImg')
    let num = 0
    openfluentinterval.value = setInterval(()=>{
        if (num<-2700) {
            num = 0
            // clearInterval(openfluentinterval.value)
        }
        else{
          if(num<=-2500&&num>-2600){
          intervalstop.value = true
          num = num -100
          setTimeout(() => {
            intervalstop.value = false
          }, 3200);
        }
          if (!intervalstop.value) {
            num = num -100
            icondom.value.style.top = num+'%'
          }
        }
    },4000/30)
  }
})
const logodom = ref('');
const waitinginterval = ref('');
const icondom = ref('');
const openfluentinterval = ref('');
const intervalstop = ref(false);
// onMounted(()=>{
    
// })
const changeMute = ()=>{
  emit("changemute")
}
const emit = defineEmits(["changemute","showChangeSize","openFluent","closeFluent","searchHistoryByDate"])
const showChangeSize = ()=>{
  emit("showChangeSize")
}

const openFluent = ()=>{
  emit("openFluent")
}

const closeFluent = () =>{
  emit("closeFluent")
}

const jumpToHall = ()=>{
  console.log(process.env.NODE_ENV);
  let baseUrl =  process.env.NODE_ENV=="production"?"https://api.match.ccb.com/dh/zhanting/investmentBank/index.html?from=":"https://shuzizhanting.com/dh/zhanguan/investmentBank/index.html?from="
  window.location.href = (baseUrl+encodeURIComponent(window.location.href))
}
const searchHistoryByDate = ()=>{
  emit("searchHistoryByDate");
}


</script>

<style lang="less" scoped>
.rightBtnList{
  position: fixed;
  right: 4%;
  top: 2%;
  width: 8%;
  height: fit-content;
  >img{
    position: relative;
    width: 100%;
    object-fit: contain;
    margin-top: 5px;
    cursor: pointer;
  }
  >div{
    position: relative;
    width: 100%;
    height: fit-content;
    margin-top: 5px;
    min-height: 8vw;
    .name{
      position: absolute;
      font-size: 8px;
      color: #ffffff;
      white-space: nowrap;
      left: 50%;
      transform: translate(-50%,0);
      text-shadow: 0px 4px 4px #384664;
    }
    .open{
    position: absolute;
    top: -35%;
    left: -35%;
    width: 170%;
    height: 8*1.7vw;
    overflow:hidden;
    >img{
      position: relative;
      width: 100%;
      object-fit: cover;
    }
  }
    .waitting{
    position: absolute;
    width: 100%;
    height: 8vw;
    overflow:hidden;
    >img{
      position: relative;
      width: 100%;
      object-fit: cover;
    }
  }
    >img{
      position: relative;
    width: 100%;
    object-fit: contain;
    }
    .clip{
      position: absolute;
      width: 90%;
      object-fit: contain;
      top: -5%;
      left: 60%;
      animation: sway 4s linear infinite;
    }
    @keyframes sway {
          0% {
             -webkit-transform: rotate(0deg) scale(1); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg) scale(1); /* IE 9 */
    transform: rotate(0deg) scale(1); /* Firefox 16+, IE 10+, Opera */
          }
          5% {
            -webkit-transform: rotate(0deg) scale(0.8); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg) scale(0.8); /* IE 9 */
    transform: rotate(0deg) scale(0.8); /* Firefox 16+, IE 10+, Opera */
          }
          10% {
            -webkit-transform: rotate(-20deg) scale(0.9); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(-20deg) scale(0.9); /* IE 9 */
    transform: rotate(-20deg) scale(0.9); /* Firefox 16+, IE 10+, Opera */
          }
          15% {
            -webkit-transform: rotate(0deg) scale(1); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg) scale(1); /* IE 9 */
    transform: rotate(0deg) scale(1); /* Firefox 16+, IE 10+, Opera */
          }
          100% {
            -webkit-transform: rotate(0deg) scale(1); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg) scale(1); /* IE 9 */
    transform: rotate(0deg) scale(1); /* Firefox 16+, IE 10+, Opera */
          }
        }
  }
  .buttonWithText{
    // margin-top: 5px;
    margin-bottom: 18px;
  }
}
@media screen and (min-width: 600px) {
  .rightBtnList{
  right: 2%;
  top: 5%;
  width: 1.8%;
  >div{
    min-height: 1.8vw;
    .waitting{
    height: 1.8vw;
    cursor: pointer;
  }
  .open{
    height: 1.8*1.7vw;
    cursor: pointer;
  }
  }
}
}
</style>
