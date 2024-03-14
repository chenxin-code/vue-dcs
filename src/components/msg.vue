<template>
  <div class="msg-box">
    <div class="title" v-if="props.bItem.title">{{props.bItem.title}}</div>
    <div class="msg">{{ props.bItem.msg }}</div>
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
import {ref, defineEmits, defineProps, onMounted, watch, nextTick} from "vue";
import {store} from "@/store/store";

interface Inprops {
  bItem: never;
  fluentWelcome: boolean;
  curBranch: never;
}

const props = defineProps<Inprops>();

watch(
    () => props.fluentWelcome,
    (val) => {
      console.log('fluentWelcome---->', val);
      if (val) {
        doWay(props.bItem);
      }
    }
);

watch(() => props.curBranch, () => {
  console.log('子组件监听到去新分支');
  doWay(props.bItem);
})

const emits = defineEmits([
  'sendtomedia',
  'reply',
  'localPlay',
]);

const doWay = (o: { msg: string; vdid: string; }) => {
  console.log('doWay:  msg ------>', o.msg, ' vdid ------>', o.vdid);
  if (store.online) {
    emits('sendtomedia', o.msg);
  } else {
    if (o.vdid) {
      emits('localPlay', o.vdid);
    }
  }
};

const clickAction = (btnItem: { reply: never; }) => {
  if (btnItem.reply) {
    console.log('回复', btnItem.reply);
    emits('reply', btnItem.reply);
    doWay(btnItem.reply);
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

  .title {
    border-radius: 0 2vw 0 0;
    padding: 0.2rem 0;
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
  .msg {
    padding: 0.2rem 1rem;
  }

  .btn-box {
    padding: 0.2rem 1rem;
    display: flex;
    flex-direction: column;
    button {
      margin: 0.2rem 0.5rem;
      border-radius: 50vw;
      cursor: pointer;
      font-size: 0.72rem;
      line-height: 1.8;
      &.primary{
        background: linear-gradient(to right, rgba(35, 107, 255, 1), rgba(192, 21, 217, 1));
        color: #fff;
        border: none;
      }
      &.general{
        background: #fff;
        color: rgba(35, 108, 255, 1);
        border: 0.02rem solid rgba(35, 107, 255, 1);
      }
    }

  }
}
</style>
