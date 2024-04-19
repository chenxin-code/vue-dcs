<template>
  <div class="gifWindow" :style="{height:gifWindowheight+'px'}">
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";

const gifWindowheight = ref(0);
onMounted(() => {
  gifWindowheight.value = document.body.clientHeight;
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
  background: url(./../../assets/img/runningbackground.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

@media screen and (min-width: 600px) {
  .gifWindow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh !important;
    z-index: 100;
    background: url(./../../assets/img/runningbackground_pc.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
