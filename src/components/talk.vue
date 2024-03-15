<template>
  <div class="bg">
    <div class="talk-box" ref="talkBox">
      <msg
          :bItem="bItem"
          v-for="(bItem,bIndex) in curBranch"
          :key="bIndex"
          @sendtomedia="sendtomedia"
          @localPlay="localPlay"
          @reply="reply"
          @scrollBarTo="scrollBarTo"
          :fluentWelcome="props.fluentWelcome"
          :curBranch="curBranch"
          :isShake="findIndex === bIndex"
      >
      </msg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, defineEmits, nextTick, defineProps, watch, defineExpose} from "vue";
import msg from "./msg.vue";
//import branches from '@/branches.ts';//多分支
import singleBranch from '@/singleBranch.ts';//单分支

const talkBox = ref();
const findIndex = ref(null);//实际上最多找到1个
const reply = (reply: { title: string; vdid: string; msg: string; btn: never; }) => {
  let temp = {msg: reply.msg, vdid: reply.vdid};
  if (reply.title) {
    temp = Object.assign(temp, {title: reply.title});
  }
  if (reply.btn) {
    temp = Object.assign(temp, {btn: reply.btn});
  }
  curBranch.value.map((item, index) => {
    if (item.vdid === temp.vdid) {
      findIndex.value = index;
    }
  });
  console.log('findIndex', findIndex.value);
  if (findIndex.value) {
    console.log('需要抖动的消息', curBranch.value[findIndex.value]);
  } else {
    curBranch.value.push(temp);
    nextTick(() => {
      console.log('滚动条自动到底部');
      talkBox.value.scrollTop = talkBox.value.scrollHeight;
    });
  }
  console.log('curBranch', curBranch.value);
  nextTick(() => {
    findIndex.value = null;
  });
};

//滚动条至此
const scrollBarTo = (offsetTop: number) => {
  talkBox.value.scrollTop = offsetTop;
};

//当前对话分支
const curBranch = ref(singleBranch);

interface Inprops {
  fluentWelcome: boolean;
  bodyheight: number;
  bodywidth: number;
  //ttsaWork: boolean;
  //ttasDomShow: boolean;
}

const props = defineProps<Inprops>();
const video = ref('');
const ctx1 = ref('');
const ctx3 = ref('');
const picturewidth = ref(0);
const pictureheight = ref(0);

const emits = defineEmits([
  'sendtomedia',
  'stopAllVideo',
]);

//传给ttsa播报
const sendtomedia = (str: string) => {
  emits('sendtomedia', str);
};

//本地播放
const localPlay = (vdid: string) => {
  console.log('开始播放视频:', vdid);
  emits("stopAllVideo");
  console.log('ctx1', ctx1.value, 'ctx3', ctx3.value);
  if (ctx1.value) {
    ctx1.value = '';
  }
  if (ctx3.value) {
    ctx3.value = '';
  }
  video.value = document.getElementById(vdid);
  console.log('当前video', video.value);
  video.value.style.display = 'none';
  var playPromise = video.value.play();
  console.log('playPromise', playPromise);
  if (playPromise !== undefined) {
    //注意用then回调
    playPromise.then(() => {
      ctx1.value = (document.getElementById('c1')).getContext('2d');
      ctx3.value = (document.getElementById('c3')).getContext('2d');
      console.log('ctx1', ctx1.value, 'ctx3', ctx3.value);
      picturewidth.value = video.value.videoWidth / 1920 * props.bodyheight;
      pictureheight.value = video.value.videoHeight / 1920 * props.bodyheight;
      computeFrame();
      render();
    }).catch((e: never) => {
      console.log('play()捕获异常:', e);
    });
  }
};

const render = () => {
  computeFrame();
  requestAnimationFrame(render);
};

const computeFrame = () => {
  //console.log('ctx1', ctx1.value, 'ctx3', ctx3.value);
  ctx1.value.drawImage(video.value, 0, 0, picturewidth.value, pictureheight.value);
  let frame = ctx1.value.getImageData((video.value.videoWidth / 1920 * props.bodyheight - props.bodywidth) / 2, 0, picturewidth.value, pictureheight.value);
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
}

defineExpose({
  localPlay,
});

</script>

<style lang="less" scoped>
.bg {
  position: fixed;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  //background-color: #62BBF9;
  z-index: 3000;

  .talk-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: translate(0, -50%);
    position: absolute;
    top: 50%;
    right: 5%;
    z-index: 100;
    //background: lightgrey;
    max-height: 70vh;
    width: 50vw;
    overflow-y: auto;
    padding: 5vh 0;
  }
}
</style>
