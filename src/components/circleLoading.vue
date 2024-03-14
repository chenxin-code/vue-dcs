<template>
<div class="cicleloadingwindow">
  <div class="cicle" v-show="currentRate<100">
    <van-circle
  v-model:current-rate="currentRate"
  :rate="progressNum"
  :speed="24"
  :stroke-width="80"
  color="#566CF2"
  :text="text"
/>
  </div>
  <div v-show="currentRate<100" class="cicleTips">即将体验数字人互动功能...</div>
  <div class="enterButton" v-show="currentRate>=100"  @click="closeloading">
    <img class="btn" src="@/assets/img/cicleloadingtenter.png">
    <img class="ringin" src="@/assets/img/cicleloadingringin.png">
    <img class="ringout" src="@/assets/img/cicleloadingringout.png">
  </div>
</div>
</template>

<script lang="ts" setup>
import { defineEmits,ref,defineProps,onMounted,computed } from "vue";
interface Inprops {
    progressNum:number
}
const props = defineProps<Inprops>()
const emit = defineEmits(["loadingover","showguesslist"]);

onMounted(()=>{
    // askItem(0);
})
const currentRate = ref(0);
const text = computed(() => currentRate.value.toFixed(0) + '%');
const closeloading = ()=>{
  if ((document.getElementById("ttsa")).getElementsByTagName('video')[0]) {
    (document.getElementById("ttsa")).getElementsByTagName('video')[0].play();
  }
  emit("loadingover")
}
</script>

<style lang="less">
.cicleloadingwindow{
  position: fixed;
  left: 0%;
  top: 0%;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background: rgba(255, 255, 255, 0.78);
  .cicle{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,0);
    width: 100px;
    height: 100px;
  }
  .cicleTips{
    position: absolute;
    top: 55%;
    left: 0px;
    width: 100%;
    text-align: center;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: 400;
    color: #2B2A26;
    font-size: 0.8rem;
  }
  .enterButton{
    position: absolute;
    top: 36%;
    left: 27%;
    width: 46%;
    height: 46vw;
    >img{
      position: absolute;
      object-fit: contain;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .btn{
      width: 54%;
      z-index: 3;
    }
    .ringin{
      width: 73%;
      z-index: 2;
      animation: biggerin 2s linear infinite;
    }
    .ringout{
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
  .cicleloadingwindow{
  .enterButton{
    top: 36%;
    left: 42%;
    width: 16%;
    height: 16vw;
  }
}
}
</style>
