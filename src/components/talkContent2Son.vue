<template>
  <div class="msg-box">
    <div class="msg">{{ props.bItem.msg }}</div>
    <div class="btn-box" v-if="props.bItem.btn">
      <van-button
          size="mini"
          plain
          type="primary"
          hairline
          @click="clickAction(btnItem)"
          v-for="(btnItem,btnIndex) in props.bItem.btn"
          :key="btnIndex">
        {{ btnItem.text }}
      </van-button>
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
  'gotoBranch',
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

const clickAction = (btnItem: { gotoBranch: number; reply: never; }) => {
  if (btnItem.gotoBranch) {
    console.log('去新分支', btnItem.gotoBranch);
    emits('gotoBranch', btnItem.gotoBranch);
  } else if (btnItem.reply) {
    console.log('回复', btnItem.reply);
    emits('reply', btnItem.reply);
    if (btnItem.reply) {
      doWay(btnItem.reply);
    }
  }
};

</script>

<style lang="less" scoped>
.msg-box {
  border-radius: 5%;
  background-color: #fff;
  //min-height: 15vh;
  font-size: 0.8rem;
  text-align: center;
  margin: 0.2rem;
  padding: 0.2rem 1rem;
  position: relative;

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

  }

  .btn-box {
    .van-button {
      margin: 0 0.5rem;
    }

  }
}
</style>
