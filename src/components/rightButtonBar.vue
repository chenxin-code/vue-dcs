<template>
  <div id="rightBtnList" class="rightBtnList">
    <div class="buttonWithText">
      <img src="@/assets/img/changeFontsizeBtn.png" @click="showChangeSize" alt=""/>
      <div class="name">字体调整</div>
    </div>
    <div class="buttonWithText">
      <img src="@/assets/img/ttsaVoiceBtn.png" @click="changeMuted" v-show="!props.muted" alt=""/>
      <img src="@/assets/img/ttsaVoiceBtnClose.png" @click="changeMuted" v-show="props.muted" alt=""/>
      <div class="name">音量</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps} from "vue";

interface Inprops {
  muted: boolean
}

const props = defineProps<Inprops>();
const changeMuted = () => {
  emit("changeMuted");
};
const emit = defineEmits(["changeMuted", "showChangeSize"]);
const showChangeSize = () => {
  emit("showChangeSize");
};
</script>

<style lang="less" scoped>
.rightBtnList {
  position: fixed;
  right: 4%;
  top: 2%;
  width: 8%;
  height: fit-content;

  > img {
    position: relative;
    width: 100%;
    object-fit: contain;
    margin-top: 5px;
    cursor: pointer;
  }

  > div {
    position: relative;
    width: 100%;
    height: fit-content;
    margin-top: 5px;
    min-height: 8vw;

    .name {
      position: absolute;
      font-size: 8px;
      color: #ffffff;
      white-space: nowrap;
      left: 50%;
      transform: translate(-50%, 0);
      text-shadow: 0 4px 4px #384664;
    }

    .open {
      position: absolute;
      top: -35%;
      left: -35%;
      width: 170%;
      height: 8*1.7vw;
      overflow: hidden;

      > img {
        position: relative;
        width: 100%;
        object-fit: cover;
      }
    }

    .waitting {
      position: absolute;
      width: 100%;
      height: 8vw;
      overflow: hidden;

      > img {
        position: relative;
        width: 100%;
        object-fit: cover;
      }
    }

    > img {
      position: relative;
      width: 100%;
      object-fit: contain;
    }

    .clip {
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

  .buttonWithText {
    // margin-top: 5px;
    margin-bottom: 18px;
  }
}

@media screen and (min-width: 600px) {
  .rightBtnList {
    right: 2%;
    top: 5%;
    width: 1.8%;

    > div {
      min-height: 1.8vw;

      .waitting {
        height: 1.8vw;
        cursor: pointer;
      }

      .open {
        height: 1.8*1.7vw;
        cursor: pointer;
      }
    }
  }
}
</style>
