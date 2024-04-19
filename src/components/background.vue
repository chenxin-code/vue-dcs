<template>
  <div class="bg" :style="{height:bgHeight+'px'}"/>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";

const bgHeight = ref(0);
onMounted(() => {
  bgHeight.value = document.body.clientHeight;
});
</script>

<style lang="less" scoped>
.bg {
  position: absolute;
  left: -2vw;
  top: 0;
  width: 104vw;
  height: 100vh;
  z-index: 100;
  background: url(./../assets/img/background.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

@media screen and (min-width: 600px) {
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh !important;
    z-index: 100;
    background: url(./../assets/img/background_pc.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
