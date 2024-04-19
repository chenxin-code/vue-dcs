<template>
  <div class="first-screen">
    <div class="middle-box">
      <img class="xiaowei" src="@/assets/img/head.png" alt=""/>
      <img class="ringin" src="@/assets/img/ringin.png" alt=""/>
      <img class="ringout" src="@/assets/img/ringout.png" alt=""/>
      <div class="msg">我是小微，您的专属助理。我将为您提供贴心的服务帮助。</div>
      <button @click="enter()">立即进入</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits} from 'vue';

const emit = defineEmits(['enter']);
const enter = () => {
  emit('enter');
};
</script>

<style lang="less" scoped>
.first-screen {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  //background: url(./../assets/img/appBackground.png);
  background: linear-gradient(to bottom, lightskyblue, rgba(255, 255, 255, 1));

  .middle-box {
    position: absolute;
    top: 20%;
    left: 27%;
    width: 46%;
    height: 46vw;

    .msg {
      text-align: center;
      //font-weight: bold;
      font-size: 0.8rem;
      position: absolute;
      bottom: -5vh;
    }

    > button {
      position: absolute;
      bottom: -20vh;
      width: 100%;
      border-radius: 50vw;
      cursor: pointer;
      font-size: 0.95rem;
      line-height: 2.8;
      background: linear-gradient(to right, rgba(35, 107, 255, 1), rgba(192, 21, 217, 1));
      color: #fff;
      border: none;
    }

    > img {
      position: absolute;
      object-fit: contain;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .xiaowei {
      width: 54%;
      z-index: 3;
    }

    .ringin {
      width: 73%;
      z-index: 2;
      animation: biggerin 2s linear infinite;
    }

    .ringout {
      width: 100%;
      z-index: 1;
      animation: biggerout 2s linear infinite;
    }

    @keyframes biggerin {
      from {
        width: 54%;
      }
      to {
        width: 73%;
      }
    }
    @keyframes biggerout {
      from {
        width: 54%;
      }
      to {
        width: 100%;
      }
    }
  }
}

@media screen and (min-width: 600px) {
  .first-screen {
    .middle-box {
      top: 20%;
      left: 42%;
      width: 16%;
      height: 16vw;
    }
  }
}
</style>
