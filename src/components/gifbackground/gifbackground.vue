<template>
  <div class="gifWindow" :style="{height:gifWindowheight+'px'}">
<!--    <div class="runninglogo">
      <img class="runningImg" id="runningImg" src="../../../public/static/images/logo-move.png" alt=""/>
    </div>-->
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";

//const logodom = ref();
const gifWindowheight = ref(0);

onMounted(() => {
  gifWindowheight.value = document.body.clientHeight;
  // logodom.value = document.getElementById('runningImg');
  // let num = 0;
  // setInterval(() => {
  //   if (num < -2700) {
  //     num = 0;
  //   } else {
  //     num = num - 100;
  //   }
  //   logodom.value.style.top = num + '%';
  // }, 3400 / 29);
});

</script>

<style lang="less">
.gifWindow {
  position: absolute;
  left: -2vw;
  top: 0;
  width: 104vw;
  height: 100vh;
  z-index: 100;
  background: url(../../../public/static/images/runningbackground.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .runninglogo {
    position: absolute;
    left: 0;
    top: 11.3%;
    width: 100%;
    height: calc(100vw / 1080 * 260);
    overflow: hidden;

    .runningImg {
      position: relative;
      width: 100%;
      object-fit: cover;
      top: 0;
      // animation: upward 1s linear infinite;
    }

    @keyframes upward {
      from {
        top: 0;
      }
      to {
        top: -2900%;
      }
    }
  }

}

@media screen and (min-width: 600px) {
  .gifWindow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh !important;
    z-index: 100;
    background: url(../../../public/static/images/runningbackground_pc.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
