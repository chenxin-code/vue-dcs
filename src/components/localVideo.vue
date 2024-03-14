<template>
  <video src="@/assets/video/wait.webm" id="wait" style="display: none; width: 100%; height: 100%;" controls
         loop></video>
  <video :src="require('@/assets/video/'+item.name+'.webm')" :id="item.id"
         style="display: none; width: 100%; height: 100%;" controls
         v-for="(item,index) in videos"
         :key="index"
         @ended="ended"
  ></video>
</template>

<script lang="ts" setup>
import {ref, defineEmits, defineExpose} from "vue";

const videos = ref([
  {id: 'sp1', name: 'sp1'},
  {id: 'sp2', name: 'sp2'},
  {id: 'sp3', name: 'sp3'},
  {id: 'sp4', name: 'sp4'},
  {id: 'sp5', name: 'sp5'},
  {id: 'sp6', name: 'sp6'},
  {id: 'sp7', name: 'sp7'},
]);

const emits = defineEmits([
  'localPlay',
]);

const ended = (e) => {
  console.log('当前视频' + e.target.id + '播放完了，准备播放等候状态视频: wait');
  emits('localPlay', 'wait');
};

const stopAllVideo = () => {
  console.log('停止所有视频播放');
  document.getElementById('wait').load();
  videos.value.map(item => {
    document.getElementById(item.id).load();
  });
};

defineExpose({
  stopAllVideo,
});

</script>

<style scoped>

</style>
