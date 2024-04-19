<template>
  <div id="app">
    <div id="ttsa" v-if="ttasDomShow">
      <div class="canvasWindow" id="canvasWindow">
        <!-- 视频截图 -->
        <canvas id="c1" :width="bodywidth" :height="bodyheight" style="display:none;"></canvas>
        <!-- 贴图至背景图上方 -->
        <canvas id="c3" :width="bodywidth" :height="bodyheight" :style="{height:canvasC3height+'px'}"></canvas>
        <background/>
        <talk
            :fluentWelcome="addWelcomeConversation"
            :bodyheight="bodyheight"
            :bodywidth="bodywidth"
            @stopAllVideo="stopAllVideo"
            ref="talkRef"
        ></talk>
      </div>
    </div>
    <!--本地视频-->
    <localVideo @localPlay="localPlay" ref="lv"></localVideo>
    <right-button-bar
        @changeMuted="changeMuted"
        @showChangeSize="ChangeSizeSwitch"
        :muted="muted"
    ></right-button-bar>
    <font-size-change
        v-show="changeSizeWindowShow"
        @close="ChangeSizeSwitch"
    ></font-size-change>
    <firstScreen @enter="enter" v-if="showFirstScreen"/>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, nextTick} from 'vue';
import Talk from '@/components/talk.vue';
import LocalVideo from '@/components/localVideo.vue';
import RightButtonBar from '@/components/rightButtonBar.vue';
import FontSizeChange from '@/components/fontSizeChange.vue';
import FirstScreen from '@/components/firstScreen.vue';
import Background from '@/components/background.vue';
import isPc from '@/utils/isPc.js';

const muted = ref(false);
const ttasDomShow = ref(false);

onMounted(() => {
  canvasC3height.value = document.body.clientHeight;
  bodyheight.value = document.body.clientHeight * 2;
  bodywidth.value = isPc ? document.body.clientWidth * 2 * 0.30 : document.body.clientWidth * 2;
});

const lv = ref();
const stopAllVideo = () => {
  lv.value.stopAllVideo();
};

const talkRef = ref();
const localPlay = (vdid: string) => {
  talkRef.value.localPlay(vdid);
};

const changeMuted = () => {
  muted.value = !muted.value;
  console.log('muted', muted.value);
  lv.value.changeMuted(muted.value);
};

const changeSizeWindowShow = ref(false);
const ChangeSizeSwitch = () => {
  changeSizeWindowShow.value = !changeSizeWindowShow.value;
};

const bodywidth = ref(0);
const bodyheight = ref(0);
const canvasC3height = ref(0);
const addWelcomeConversation = ref(false);
const showFirstScreen = ref(true);
const enter = () => {
  ttasDomShow.value = true;
  showFirstScreen.value = false;
  nextTick(() => {
    addWelcomeConversation.value = true;
  });
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-size: 20px;

  #ttsa {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 200px;

    .canvasWindow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      //background: url(./assets/img/appBackground.png);

      #c3 {
        position: absolute;
        width: 104%;
        z-index: 2000;
        left: -25%;
        top: 0;
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
}

@media screen and (min-width: 600px) {
  #app {
    #ttsa {
      .canvasWindow {
        #c3 {
          width: 30%;
          left: 2.5%;
          top: 5%;
          bottom: 0;
        }
      }
    }
  }
}
</style>
