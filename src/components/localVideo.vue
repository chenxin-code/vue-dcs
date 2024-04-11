<template>
  <video src="@/assets/video/wait.webm" id="wait" style="display: none; width: 100%; height: 100%;" controls :muted="muted"
         loop></video>
  <video :src="require('@/assets/video/'+item.name+'.webm')" :id="item.id"
         style="display: none; width: 100%; height: 100%;" controls :muted="muted"
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
  {id: 'sp8', name: 'sp8'},
  {id: 'sp9', name: 'sp9'},
  {id: 'sp10', name: 'sp10'},
  {id: 'sp11', name: 'sp11'},
  {id: 'sp12', name: 'sp12'},
  {id: 'sp13', name: 'sp13'},
  {id: 'sp14', name: 'sp14'},
  {id: 'sp15', name: 'sp15'},
  {id: 'sp16', name: 'sp16'},
  {id: 'sp17', name: 'sp17'},
  {id: 'sp18', name: 'sp18'},
]);
const muted = ref(false);

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

const changeMuted = (val: boolean) => {
  muted.value = val;
};

defineExpose({
  stopAllVideo,
  changeMuted,
});

</script>

<style scoped>

</style>
