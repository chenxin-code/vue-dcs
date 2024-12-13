<template>
  <div class="bg" v-show="!showCreditCardPopup">
    <div class="talk-box" ref="talkBox">
      <msg
          :bItem="bItem"
          :bIndex="bIndex"
          v-for="(bItem,bIndex) in msgData"
          :key="bIndex"
          @localPlay="localPlay"
          @reply="reply"
          @scrollBarTo="scrollBarTo"
          @openPopup="openPopup"
          @sendQuestion="sendQuestion"
          @handleAnswerJsonTalk="handleAnswerJsonTalk"
          :fluentWelcome="props.fluentWelcome"
          :msgData="msgData"
          :isShake="findIndex === bIndex"/>
    </div>
  </div>
  <bubble :bubbleStr="bubbleStr" v-if="showCreditCardPopup"/>
  <!--信用卡弹出层-->
  <creditCardPopup
      @closePopup="showCreditCardPopup = false;localPlay('wait')"
      @inputFocus="sendQuestion('inputForInstallmentAmount')"
      @noChecked="sendQuestion('noCheckWarmReminder')"
      @isChecked="sendQuestion('applyForCreditCardInstallmentPayments')"
      @confirmHandle="showCreditCardPopup = false;sendQuestion('confirmProcess')"
      v-if="showCreditCardPopup"/>
</template>

<script lang="ts" setup>
import {ref, defineEmits, onMounted, nextTick, defineProps, defineExpose} from 'vue';
import Msg from './msg.vue';
import Bubble from './bubble.vue';
import demoTalkTree from '@/demoTalkTree.ts';
import QA from '@/QA.json';
import CreditCardPopup from '@/components/creditCardPopup.vue';
import {store} from '@/store';

const msgData = ref([]);

onMounted(() => {
  if (store.useDemoTalk) {
    msgData.value = demoTalkTree;
  } else {
    // 3种情况   myCreditCardExceeds300 myCreditCardLess300 noCreditCard
    sendQuestion('myCreditCardExceeds300');
  }
});

const sendQuestion = (question: string) => {
  let answerJson;
  QA.map((item) => {
    if (item.question.id === question) {
      answerJson = item.answer;
    }
  });
  handleAnswerJson(answerJson);
  if (question === 'otherInstallmentPlans') {
    // 信用卡弹出层
    openPopup('creditCard');
  }
};
const answerJsonTalk = ref([]);
const bubbleStr = ref('');
const handleAnswerJson = (answerJson) => {
  console.log('answerJson--->', answerJson);
  if (answerJson && answerJson.talk) {
    answerJsonTalk.value = answerJson.talk;
    if (answerJsonTalk.value.length !== 0) {
      handleAnswerJsonTalk(0);
    }
  }
  if (answerJson && answerJson.video && answerJson.video.id) {
    localPlay(answerJson.video.id);
  }
  if (answerJson && answerJson.bubble) {
    bubbleStr.value = answerJson.bubble;
  } else {
    bubbleStr.value = '';
  }
};

const handleAnswerJsonTalk = (index: number) => {
  if (answerJsonTalk.value[index]) {
    msgData.value.map((item, index2) => {
      console.log(
          'jsonStringify对比样本1',
          item.jsonStringify,
          'jsonStringify对比样本2',
          JSON.stringify(answerJsonTalk.value[index])
      );
      if (item && (item.jsonStringify === JSON.stringify(answerJsonTalk.value[index]))) {
        findIndex.value = index2;
      }
    });
    console.log('findIndex', findIndex.value);
    if (findIndex.value) {
      console.log('需要抖动的消息', msgData.value[findIndex.value]);
    } else {
      // 模仿 demoTalkTree 格式
      msgData.value.push(Object.assign({
        jsonStringify: JSON.stringify(answerJsonTalk.value[index]), // 仅用于 findIndex
        title: answerJsonTalk.value[index].title,
        btn: answerJsonTalk.value[index].btn
      }, answerJsonTalk.value[index].msg ? {msg: replaceMsg(answerJsonTalk.value[index].msg)} : {}));
      nextTick(() => {
        console.log('滚动条自动到底部');
        talkBox.value.scrollTop = talkBox.value.scrollHeight;
      });
    }
    console.log('msgData', msgData.value);
    nextTick(() => {
      findIndex.value = null;
    });
  }
};

const replaceMsg = (msg: string) => {
  return msg
      .replace(/{{name}}/g, '<span id="name">王先生</span>')
      .replace(/{{bill}}/g, '<span id="bill">8569.23</span>')
      .replace(/{{period}}/g, '<span id="period">12</span>')
      .replace(/{{repay}}/g, '<span id="repay">25.86</span>')
      .replace(/{{interest}}/g, '<span id="interest">33.14</span>')
      .replace(/{{money}}/g, '<span id="money">88.55</span>')
      .replace(/\[\[/g, '<span>')
      .replace(/]]/g, '</span>')
      .replace(/\/br\//g, '<br/>')
      ;
};

const talkBox = ref();
const findIndex = ref(null);// 实际上最多找到1个
const reply = (reply: { title: string; vdid: string; msg: string; btn: never; }) => {
  let temp = {msg: reply.msg, vdid: reply.vdid};
  if (reply.title) {
    temp = Object.assign(temp, {title: reply.title});
  }
  if (reply.btn) {
    temp = Object.assign(temp, {btn: reply.btn});
  }
  msgData.value.map((item, index) => {
    if (item.vdid === temp.vdid) {
      findIndex.value = index;
    }
  });
  console.log('findIndex', findIndex.value);
  if (findIndex.value) {
    console.log('需要抖动的消息', msgData.value[findIndex.value]);
  } else {
    msgData.value.push(temp);
    nextTick(() => {
      console.log('滚动条自动到底部');
      talkBox.value.scrollTop = talkBox.value.scrollHeight;
    });
  }
  console.log('msgData', msgData.value);
  nextTick(() => {
    findIndex.value = null;
  });
};

// 滚动条至此
const scrollBarTo = (offsetTop: number) => {
  talkBox.value.scrollTop = offsetTop;
};

interface Inprops {
  fluentWelcome: boolean;
  bodyheight: number;
  bodywidth: number;
}

const props = defineProps<Inprops>();
const video = ref('');
const ctx1 = ref('');
const ctx3 = ref('');
const picturewidth = ref(0);
const pictureheight = ref(0);

const emits = defineEmits([
  'stopAllVideo',
]);

// 本地播放
const localPlay = (vdid: string) => {
  console.log('开始播放视频:', vdid);
  emits('stopAllVideo');
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
    // 注意用then回调
    playPromise.then(() => {
      ctx1.value = (document.getElementById('c1')).getContext('2d');
      ctx3.value = (document.getElementById('c3')).getContext('2d');
      console.log('ctx1', ctx1.value, 'ctx3', ctx3.value);
      picturewidth.value = video.value.videoWidth / 1920 * props.bodyheight;
      pictureheight.value = video.value.videoHeight / 1920 * props.bodyheight;
      console.log('picturewidth', picturewidth.value, 'pictureheight', pictureheight.value);
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
  // console.log('ctx1', ctx1.value, 'ctx3', ctx3.value);
  ctx1.value.drawImage(video.value, 0, 0, picturewidth.value, pictureheight.value);
  let frame = ctx1.value.getImageData((video.value.videoWidth / 1920 * props.bodyheight - props.bodywidth) / 2, 0, picturewidth.value, pictureheight.value);
  let l = frame.data.length / 4;
  for (let i = 0; i < l; i++) {
    let r = frame.data[i * 4 + 0];
    let g = frame.data[i * 4 + 1];
    let b = frame.data[i * 4 + 2];
    // rgb(8 204 4)
    if (r < 150 && g > 140 && b < 150) {
      frame.data[i * 4 + 3] = 0;
    }
  }
  ctx3.value.putImageData(frame, 0, 0);
};

defineExpose({
  localPlay,
});

const showCreditCardPopup = ref(false);
const openPopup = (popup: string) => {
  console.log('popup类型', popup);
  if (popup === 'creditCard') {
    showCreditCardPopup.value = true;
  }
};
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
