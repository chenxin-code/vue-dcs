<template>
  <div id="app">
    <talk-content
        :ttsaWork="ttsaWork"
        :fluentWelcome="addWelcomeConversation"
        @sendchattomedia="sendchattomedia"
        @interruptVoice="interruptVoice"
        v-show="false"
    ></talk-content>
    <div id="ttsa" v-show="ttasDomShow">
      <div class="canvasWindow" id="canvasWindow">
        <!-- 视频截图 -->
        <canvas id="c1" :width="bodywidth" :height="bodyheight" style="display:none;"></canvas>
        <!-- 贴图至背景图上方 -->
        <canvas id="c3" :width="bodywidth" :height="bodyheight" :style="{height:canvasC3height+'px'}"></canvas>
        <!--        <gifbackground :questionforlogo="questionforlogo" :useName="useName"></gifbackground>-->
        <talk-content2
            :fluentWelcome="addWelcomeConversation"
            :bodyheight="bodyheight"
            :bodywidth="bodywidth"
            @sendtomedia="sendchattomedia"
            @stopAllVideo="stopAllVideo"
            ref="tc2"
        ></talk-content2>
      </div>
    </div>
    <!--本地视频-->
    <localVideo @localPlay="localPlay" ref="lv"></localVideo>
    <!--    <div class="background">
          <div class="ringwindow" v-if="!isPc">
            <img class="backgroundIcon" src="@/assets/img/appBackgroundicon.png"/>
            <img class="ringin" src="@/assets/img/ringin.png"/>
            <img class="ringout" src="@/assets/img/ringout.png"/>
          </div>
          <img v-if="isPc" class="person" src="@/assets/img/person.png"/>
        </div>-->
    <!-- <loading
      @close="startVisit"
      v-show="loadingShow"
      :ttsaready="ttsaready"
    ></loading> -->
    <right-button-bar
        @changemute="changemute"
        @showChangeSize="ChangeSizeSwitch"
        @closeFluent="backtohome"
        :ttsaWork="ttsaWork"
        :mute="ttsaMute"
    ></right-button-bar>
    <font-size-change
        v-show="changeSizeWindowShow"
        @close="ChangeSizeSwitch"
    ></font-size-change>
    <img
        id="backtohomeBtn"
        class="backtohomeBtn"
        src="@/assets/img/backtohome.png"
        @click="backtohome"
    />
    <!--    <div class="prodtitle" v-if="!isPc">数字客户经理</div>-->
    <div class="tips" v-show="errorTipsShow">{{ errorTips }}</div>
    <!-- <show-frame v-if="iframeShow" :url="iframeUrl" @close="closeiframe"></show-frame> -->
    <circle-loading v-if="circleLoadingShow" :progressNum="cicleRate" @loadingover="loadingover"></circle-loading>
    <!--    <transfer-to-sound ref="transferToSoundNode"></transfer-to-sound>
        <disconnectKefu ref="onDisconnectKefu" v-show="false"/>
        <history-time-select v-if="showHistoryDate" @close="closeHistoryCalender"></history-time-select>-->
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUnmounted, nextTick, computed} from "vue";
import talkContent from "@/components/talkContent.vue";
import talkContent2 from "@/components/talkContent2.vue";
import localVideo from "@/components/localVideo.vue";
//import historyTimeSelect from "@/components/historyTimeSelect.vue";
import rightButtonBar from "@/components/rightButtonBar.vue";
import fontSizeChange from "@/components/fontSizeChange.vue";
//import showFrame from "@/components/showFrame.vue";
import circleLoading from "@/components/circleLoading.vue";
//import gifbackground from "@/components/gifbackground/gifbackground.vue";
//import transferToSound from "@/components/transfertosound/transferToSound.vue";
import httpszzt from "@/api/reqszzt";
import {store} from "@/store/store";
import {encryptGcm} from "@/utils/aes.js";
// import httpszzt from "@/api/reqszzt";
import {call_client_pub} from "@/api";
import isPc from "@/utils/isPc.js";

const instanceTTSA = ref("");
const ttsaready = ref(false);
const ttsaWork = ref(false);
const ttsaMute = ref(false);
const ttasDomShow = ref(false);
const ttsaInterval = ref('');

onMounted(() => {
  canvasC3height.value = document.body.clientHeight
  bodyheight.value = document.body.clientHeight * 2
  bodywidth.value = isPc ? document.body.clientWidth * 2 * 0.30 : document.body.clientWidth * 2
  //startVisit();
  // window.$newiframe = openiframe
  ttsaready.value = true;
  ttsaWork.value = false;
  if (!store.online) {
    ttasDomShow.value = true;
    addWelcomeConversation.value = true;
    return;
  }
  fluentinit().then(() => {
    //ttsapreload.value = false
  });
  fluentsetup();
});

const lv = ref();
const stopAllVideo = () => {
  lv.value.stopAllVideo();
};

const tc2 = ref();
const localPlay = (vdid: string) => {
  tc2.value.localPlay(vdid);
};

//请求后台打开推流
// const requestToJudgeFluent = ()=>{
//   let word = "foreign-" + Date.parse(new Date());
//   let keyStr = "szzhforeignqwert";
//   let str = encrypt(word, keyStr);
//   let data = {
//     tokenStr: str,
//     paramStr: "digital_webrtc_status",
//   };
//   httpszzt
//     .post(
//       "https://manager.match.ccb.com/prod-api/fair/foreignApi/systemStatus",
//       data
//     )
//     .then((res: any) => {
//       if (res.data.data.status === "1") {
//   fluentinit();
//       } else {
//         ttsaready.value = true;
//         ttsaWork.value = false;
//       }
//     })
//     .catch(() => {
//       ttsaready.value = true
//         ttsaWork.value = false
//     });
// }

const fluentinit = (): any => {
  let promise = new Promise<void>((resolve, reject) => {
    let fluentWidth = document.body.clientWidth;
    let fluentHeight = document.body.clientHeight;
    // eslint-disable-next-line no-undef
    instanceTTSA.value = new FTC_TTSA({
      janusDebug: false,
      container: "#ttsa",
      width: fluentWidth,
      height: fluentHeight,
      // account: {
      //   username: "husunqiang", // 用户名
      //   app_id: "oe@njW8nseAcI(bwnqkKTPo4", // app id
      //   app_secret: "51rnf^qot0jswGoGhtZK4CS2uhE8Qs", // app secret
      //   role_id: "9a76667120254178b45551f5e45d2913", // role id
      // },
      widgetCallback: function (d) {
        // console.log("dddddddddddddddd内容回调", d);
      },
      onVideoLoadedData: function () {
        console.log("视频出现");
        video.value = (document.getElementById("ttsa")).getElementsByTagName('video')[0]
        video.value.style.display = 'none'
        ctx1.value = (document.getElementById("c1")).getContext("2d")
        ctx3.value = (document.getElementById("c3")).getContext("2d")
        picturewidth.value = video.value.videoWidth / 1920 * bodyheight.value;
        pictureheight.value = video.value.videoHeight / 1920 * bodyheight.value;
        timerCallback()
      },
      errorCallback(error, errorType) {
        console.log('异常具体信息', error); // 异常具体信息
        circleLoadingShow.value = false
        switch (errorType) {
          case "open_error":
            ttasDomShow.value = false;
            ttsaWork.value = false;
            instanceTTSA.value.closeRoom();
            showTips('当前人数较多，请稍后再试')
            break;
          case "widgetSocket_error":
            ttasDomShow.value = false;
            ttsaWork.value = false;
            instanceTTSA.value.closeRoom();
            showTips('数字人连接中断，已为您切换省流模式')
            break;
          case "webrtcState_error":
            ttasDomShow.value = false;
            ttsaWork.value = false;
            instanceTTSA.value.closeRoom();
            showTips('数字人连接中断，已为您切换省流模式')
            break;
          default:
            ttasDomShow.value = false;
            ttsaWork.value = false;
            instanceTTSA.value.closeRoom();
            showTips('数字人连接中断，已为您切换省流模式')
        }
      },
      server: "https://opm.tech.ccb.com",
      appServer: "https://opm.tech.ccb.com",
      janusServer: "https://opm.tech.ccb.com/janus",
      config: {
        auto_action: false,
        fps: 24,
        max_bitrate: 2,
        offline: false,
        tag: "",
      },
    });
    resolve(instanceTTSA.value)
  })
  return promise
};

//const ttsapreload = ref(true);
const fluentsetup = () => {
  if (instanceTTSA.value) {
    circleLoadingShow.value = true
    cicleRate.value = 99
    let keyStr = "szzhforeignqwert";
    let token = encryptGcm("foreign-" + new Date().getTime(), keyStr);
    httpszzt.get(
        process.env.VUE_APP_szzhnew + "/dh-internal/infoGenerator/createToken",
        token
    )
        .then((res: any) => {
          console.log("getttsacode-----", res);
          let account = {
            username: res.data.data.username, // 用户名
            app_id: res.data.data.appId, // app id
            access_token: res.data.data.token, // token
            role_id: "9a76667120254178b45551f5e45d2913", // role id
            now_time: res.data.data.ts // 符合要求的时间戳
          }
          instanceTTSA.value
              .setup(account)
              .then(() => {
                ttsaready.value = true;
                ttsaWork.value = true;
                cicleRate.value = 100;
                console.log("数字人连接成功");
              })
              .catch(() => {
                ttsaready.value = true;
                ttsaWork.value = false;
                circleLoadingShow.value = false;
                showTips("当前人数较多，请稍后再试");
              });
        })
        .catch(() => {
        });
  } else {
    fluentinit().then(() => {
      fluentsetup();
    })
  }
}
const errorTips = ref('网络连接超时，请检查您的网络');
const errorTipsShow = ref(false)
const showTips = (str: string) => {
  errorTips.value = str
  errorTipsShow.value = true
  setTimeout(() => {
    errorTipsShow.value = false
  }, 2000);
}

// const loadingShow = ref(true);
// const startVisit = () => {
//   loadingShow.value = false;
//   if (ttsaWork.value) {
//     instanceTTSA.value.sendText('您好，有什么小薇可以帮到您', "pause");
//   }
// };
const changemute = (val?: boolean) => {
  ttsaMute.value = !ttsaMute.value;
  if (ttsaWork.value) {
    instanceTTSA.value.mute(ttsaMute.value);
  }
  console.log(typeof val);
  if (typeof val == 'boolean') {
    transferToSoundNode.value.soundControlMute(val);
    return
  }
  transferToSoundNode.value.soundControlMute(ttsaMute.value);
};
const sendchattomedia = (str: string, type?: string) => {
  if (str.split('问题:<br>1.').length > 1) {
    str = str.split('问题:<br>1.')[0] + '问题'
  }
  if (str.split('您还可能关注以下问题').length > 1) {
    str = str.split('您还可能关注以下问题')[0]
  }
  if (str.split('您可能关注下列相关问题').length > 1) {
    str = str.split('您可能关注下列相关问题')[0]
  }
  if (ttsaWork.value) {
    let sendStr = (((((str.replace(/\s*/g, "")).replace(/(<\/?a.*?>)/g, '')).replace(/(<\/?img.*?>)/g, '')).replace(/(<\/?font.*?>)/g, '')).replace(/(<\/?A.*?>)/g, '')).replace(/(<\/?div.*?>)/g, '').replace(/(<\/?span.*?>)/g, "");
    sendStr = sendStr.replaceAll('✔', ',')
    console.log(87777, sendStr);
    instanceTTSA.value.interrupt();
    instanceTTSA.value.sendText(sendStr, "pause");
  } else {
    if (type == "product") {
      let sendStr = (((((str.replace(/\s*/g, "")).replace(/(<\/?a.*?>)/g, '')).replace(/(<\/?img.*?>)/g, '')).replace(/(<\/?font.*?>)/g, '')).replace(/(<\/?A.*?>)/g, '')).replace(/(<\/?div.*?>)/g, '')
      sendStr = sendStr.replaceAll('✔', ',')
      console.log('ttsound', sendStr);
      transferToSoundNode.value.playSound(sendStr);
    }
  }
};
const interruptVoice = () => {
  if (ttsaWork.value) {
    instanceTTSA.value.interrupt();
  }
  transferToSoundNode.value.stopSound();
}

const changeSizeWindowShow = ref(false);
const ChangeSizeSwitch = () => {
  changeSizeWindowShow.value = !changeSizeWindowShow.value;
};

// const showHistoryDate = ref(false)
// const searchHistoryByDate = () => {
//   showHistoryDate.value = true
// }
// const closeHistoryCalender = () => {
//   showHistoryDate.value = false
// }

// const iframeShow = ref(false)
// const iframeUrl = ref('')
// const openiframe = (url:str)=>{
//   iframeUrl.value = url
//   iframeShow.value = true
// }
// const closeiframe = ()=>{
//   iframeShow.value = false
// }

const bodywidth = ref(0)
const bodyheight = ref(0)
const ctx1 = ref('');
const ctx3 = ref('');
const canvasC3height = ref(0)
const video = ref('');
const picturewidth = ref(0);
const pictureheight = ref(0);
const timerCallback = () => {
  if (!ttsaWork.value || !ttasDomShow.value) {
    setTimeout(function () {
      timerCallback();
    }, 1000 / 24);
    return;
  }
  computeFrame();
  setTimeout(function () {
    timerCallback();
  }, 1000 / 24);
}
const computeFrame = () => {
  ctx1.value.drawImage(video.value, 0, 0, picturewidth.value, pictureheight.value);
  let frame = ctx1.value.getImageData((video.value.videoWidth / 1920 * bodyheight.value - bodywidth.value) / 2, 0, picturewidth.value, pictureheight.value);
  let l = frame.data.length / 4;

  for (let i = 0; i < l; i++) {
    let r = frame.data[i * 4 + 0];
    let g = frame.data[i * 4 + 1];
    let b = frame.data[i * 4 + 2];
    //rgb(8 204 4)
    if (r < 150 && g > 140 && b < 150) {
      frame.data[i * 4 + 3] = 0;
    }
  }
  ctx3.value.putImageData(frame, 0, 0);
  return;
}
const addWelcomeConversation = ref(false)
const loadingover = () => {
  ttasDomShow.value = true
  circleLoadingShow.value = false
  nextTick(() => {
    addWelcomeConversation.value = true
    nextTick(() => {
      addWelcomeConversation.value = false
    })
  })
}

// const useName = ref('');
// const questionforlogo = ref('');
// const changebackgroundandlogo = (str?: string) => {
//   if (str) {
//     questionforlogo.value = str
//     useName.value = str
//     if (str == "投资理财") {
//       showTips('即将为您切换至投资理财大厅…')
//     }
//   }
// }

const circleLoadingShow = ref(false);
const cicleRate = ref(0);

const backtohome = () => {
  console.log('kefu state', store.platformInfo.connectStage)
  if (store.platformInfo.connectStage) {
    window.$closeKefu()
  }
  if (ttsaWork.value) {
    stopMusic();
    ttasDomShow.value = false
    clearInterval(ttsaInterval.value);
    instanceTTSA.value.interrupt();
    instanceTTSA.value.closeRoom();
    //ttsapreload.value = true
    ttsaWork.value = false
    // setTimeout(() => {
    //   ttsapreload.value = false
    // }, 5000);
    return
  } else {
    call_client_pub("closeWebView", "");
    instanceTTSA.value.interrupt();
    instanceTTSA.value.closeRoom();
  }
};

const transferToSoundNode = ref(null);

const u = navigator.userAgent;
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const stopMusic = () => {
  if ((document.getElementById("ttsa")).getElementsByTagName('video').length) {
    if (isiOS) {
      (document.getElementById("ttsa")).getElementsByTagName('video')[0].muted = true
    } else {
      (document.getElementById("ttsa")).getElementsByTagName('video')[0].volume = 0
    }
  }
}
onUnmounted(() => {
  if (!store.online) {
    return;
  }
  instanceTTSA.value.closeRoom();
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-size: 20px;

  #ttsa {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 200px;

    .canvasWindow {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100vw;
      height: 100vh;
      background: url(./assets/img/appBackground.png);

      #c3 {
        position: absolute;
        width: 104%;
        z-index: 2000;
        left: -25%;
        top: 0px;
      }
    }

    > video {
      position: absolute;
      z-index: 10;
      min-width: 100%;
      height: 100%;
      object-fit: cover;
      display: none;
    }
  }

  .background {
    position: fixed;
    top: 0%;
    left: 0%;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    background: url(./assets/img/appBackground.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .ringwindow {
      position: absolute;
      left: 25%;
      top: 8%;
      width: 50%;
      height: 50vw;
      z-index: 1;

      > img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        object-fit: contain;
      }

      .backgroundIcon {
        width: 60%;
        z-index: 3;
      }

      .ringin {
        width: 80%;
        z-index: 2;
        animation: biggerin 2s linear infinite;
        animation-direction: alternate;
      }

      .ringout {
        width: 100%;
        z-index: 1;
        animation: biggerout 2s linear infinite;
        animation-direction: alternate;
      }

      @keyframes biggerin {
        from {
          width: 60%;
        }
        to {
          width: 80%;
        }
      }
      @keyframes biggerout {
        from {
          width: 60%;
        }
        to {
          width: 100%;
        }
      }
    }
  }

  .backtohomeBtn {
    position: fixed;
    left: 4%;
    top: 3.2%;
    width: 4%;
    object-fit: contain;
    z-index: 18;
  }

  .prodtitle {
    position: fixed;
    top: 3%;
    left: 25%;
    width: 50%;
    text-align: center;
    font-size: 1rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
  }

  .tips {
    position: fixed;
    z-index: 20;
    top: 74%;
    left: 20%;
    width: 60%;
    height: 32px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 16px;
    font-size: 0.7rem;
    text-align: center;
    color: #ffffff;
    line-height: 32px;
  }
}

@media screen and (min-width: 600px) {
  #app {
    #ttsa {
      .canvasWindow {
        #c3 {
          width: 30%;
          left: 2.5%;
          top: 5%;
          bottom: 0%;
        }
      }
    }

    .background {
      background: url(./assets/img/appBackground.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .person {
        position: absolute;
        left: 12%;
        height: 82%;
        top: 16%;
        object-fit: contain;
      }
    }

    .backtohomeBtn {
      left: 1.4%;
      top: 1.6%;
      width: 1.6%;
    }
  }
}
</style>
