<template>
  <div class="msg-box" :class="{op: op,shake: shake}" ref="msgBox">
    <div class="title" v-if="props.bItem.title">{{ props.bItem.title }}</div>
    <!--    <div class="msg" v-if="props.bItem.msg" v-html="props.bItem.msg"></div>-->
    <TypedComponent :options="options" v-if="props.bItem.msg">
      <div class="typing msg"></div>
    </TypedComponent>
    <div class="btn-box" v-if="props.bItem.btn">
      <button
          @click="clickAction(btnItem)"
          :class="btnItem.type"
          v-for="(btnItem,btnIndex) in props.bItem.btn"
          :key="btnIndex">
        {{ btnItem.text }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, defineEmits, defineProps, onMounted, watch, nextTick, defineExpose} from "vue";
import {store} from "@/store/store";
import {TypedComponent, TypedOptions} from "typed-vue3";

const op = ref(false);
setTimeout(() => {
  op.value = true;
}, 0);
const shake = ref(false);
const msgBox = ref();

interface Inprops {
  bItem: never;
  bIndex: number;
  fluentWelcome: boolean;
  msgData: never;
  isShake: boolean;
}

const props = defineProps<Inprops>();

watch(
    () => props.isShake,
    (val) => {
      console.log('子组件的isShake', val);
      if (val) {
        console.log('开始抖动');
        shake.value = true;
        setTimeout(() => {
          shake.value = false;
        }, 100);
        console.log('滚动条至此', msgBox.value.offsetTop);
        emits('scrollBarTo', msgBox.value.offsetTop);
      }
    },
    {immediate: true}
);

watch(
    () => props.fluentWelcome,
    (val) => {
      console.log('fluentWelcome---->', val);
      if (val) {
        doWay(props.bItem);
      }
    }
);

watch(() => props.msgData, () => {
  doWay(props.bItem);
})

const emits = defineEmits([
  'sendtomedia',
  'reply',
  'localPlay',
  'scrollBarTo',
  'openPopup',
  'sendQuestion',
  'handleAnswerJsonTalk',
]);

const doWay = (o: { msg: string; vdid: string; }) => {
  console.log('doWay:  msg ------>', o.msg, ' vdid ------>', o.vdid);
  if (store.ttsaOnline) {
    emits('sendtomedia', o.msg);
  } else {
    if (o.vdid) {
      emits('localPlay', o.vdid);
    }
  }
};

const clickAction = (btnItem: { questionId: string; reply: { msg: string; vdid: string; }; popup: string; }) => {
  if (!store.useDemoTalk) {
    if (btnItem.questionId) {
      emits('sendQuestion', btnItem.questionId);
    }
  } else {
    if (btnItem.reply) {
      console.log('回复', btnItem.reply);
      emits('reply', btnItem.reply);
      doWay(btnItem.reply);
    }
    if (btnItem.popup) {
      emits('openPopup', btnItem.popup);
    }
  }
};

const options: TypedOptions = {
  strings: [props.bItem.msg],
  typeSpeed: 0,
  //backSpeed: 0,
  cursorChar: '',
  onComplete(self) {
    console.log('onComplete', self);
    emits('handleAnswerJsonTalk', props.bIndex + 1);
  }
};

</script>

<style lang="less" scoped>
.msg-box {
  border-radius: 0 2vw 2vw 2vw;
  background-color: #fff;
  //min-height: 3vh;
  font-size: 0.7rem;
  text-align: center;
  margin: 0.2rem;
  //padding: 0.2rem 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: opacity 1.5s ease;
  opacity: 0;

  &.op {
    opacity: 1;
  }

  &.shake {
    animation-name: shake;
    animation-duration: 0.1s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 3;
    animation-direction: normal;
  }

  @keyframes shake {
    0% {
      margin-left: 0;
      margin-right: 0.2rem;
      margin-top: 0;
    }
    100% {
      margin-left: 0.2rem;
      margin-right: 0;
      margin-top: 0.2rem;
    }
  }

  .title {
    border-radius: 0 2vw 0 0;
    padding: 0.3rem 0;
    font-size: 0.72rem;
    color: #fff;
    line-height: 1.5;
    background: linear-gradient(to right, rgba(35, 107, 255, 0.5), rgba(192, 21, 217, 0.5));
  }

  //&:before{
  //  content: '';
  //  width: 0;
  //  height: 0;
  //  border: 20px solid;
  //  position: absolute;
  //  bottom: -41px;
  //  left: 80px;
  //  border-color:  #62BBF9 transparent transparent;
  //}
  //&:after{
  //  content: '';
  //  width: 0;
  //  height: 0;
  //  border: 20px solid;
  //  position: absolute;
  //  bottom: -35px;
  //  left: 80px;
  //  border-color:  #fff transparent transparent;
  //}
  /deep/ .msg {
    padding: 0.5rem 1rem;
    text-align: left;

    > span {
      color: red;
    }
  }

  .btn-box {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;

    button {
      margin: 0.2rem 0.5rem;
      border-radius: 50vw;
      cursor: pointer;
      font-size: 0.72rem;
      line-height: 1.8;

      &.primary {
        background: linear-gradient(to right, rgba(35, 107, 255, 1), rgba(192, 21, 217, 1));
        color: #fff;
        border: none;
      }

      &.general {
        background: #fff;
        color: rgba(35, 108, 255, 1);
        border: 0.02rem solid rgba(35, 107, 255, 1);
      }
    }

  }
}
</style>
