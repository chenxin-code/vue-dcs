<template>
  <div class="new-iframe">
    <div
      class="frameWindow"
      :class="{
        notice: type == 'xiaoxidaiban',
        product: type == 'chanpingmulu',
        nomal:type=='kuaijiebanli'
      }"
    >
      <div class="title" v-if="type == 'zixunfuwu'">资讯服务</div>
      <div class="title" v-if="type == 'kuaijiebanli'">{{props.usetitle}}</div>
      <iframe
        id="template-iframe"
        class="template-iframe"
        :class="{
          notice: type == 'xiaoxidaiban',
          product: type == 'chanpingmulu',
          nomal:type=='kuaijiebanli'
        }"
        frameborder="0"
        ref="iframe"
        :src="props.url"
        @load="loaded"
      >
      </iframe>
      <div
        id="back"
        @click="closeWindow"
        class="back"
        v-if="type == 'zixunfuwu'"
      >
        <img v-if="!isPc" class="backImg" src="@/assets/img/iframeclose.png" />
        <img v-if="isPc" class="backImg" src="@/assets/img/backtohome.png" />
      </div>
      <img
        v-if="(type != 'zixunfuwu'&&type!='chanpingmulu')"
        class="closeBtn"
        src="@/assets/img/iframeclose.png"
        @click="closeWindow"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, onMounted, ref } from "vue";
import isPc from "@/utils/isPc.js";
import { call_client_pub } from "@/api";
interface Inprops {
  url: string;
  type: string;
  usetitle:string;
}
const props = defineProps<Inprops>();
onMounted(() => {
  document.getElementById("backtohomeBtn").style.display = "none"
  window.addEventListener('message', dealMessage, false)
});
const emit = defineEmits(["close","recordHistory"]);
const closeWindow = () => {
  window.removeEventListener('message', dealMessage, false)
  document.getElementById("backtohomeBtn").style.display = "block"
  emit("close");
};
function dealMessage(event:any) {
    if (event.data.data.messagetype) {
      if (event.data.data.messagetype=="closeProduct") {
        closeWindow();
      }
    }
    else if (event.data.data.message&&event.data.data.message.eventId=="callToCommonMini") {
      console.log(888888,event.data.data.message.eventId,event.data.data.message.data);
      call_client_pub(event.data.data.message.eventId,JSON.stringify(event.data.data.message.data))
    }
    else if (event.data.data.action="RECORD") {
      // console.log(88888,event.data.data.message.ask);
      emit('recordHistory',event.data.data.message.ask)
    }
    else{
      console.log("---------------信息2",event.data);
      
    }
  }
</script>

<style lang="less" scoped>
.new-iframe {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  top: 0px;
  left: 0px;
  .frameWindow {
    position: absolute;
    top: 12%;
    left: 0%;
    width: 100%;
    height: 88%;
    background: #ffffff;
    border-radius: 10px 10px 0px 0px;
    overflow: hidden;
    .title {
      position: absolute;
      left: 0%;
      width: 100%;
      line-height: 1rem;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      top: 3%;
    }
    .template-iframe {
      position: absolute;
      left: 0%;
      top: 8%;
      width: 100%;
      height: 88%;
      z-index: 200;
    }
    .template-iframe.notice {
      top: 0%;
      height: 100%;
    }
    .template-iframe.product {
      top: 0%;
      height: 100%;
    }
    .template-iframe.nomal{
      top: 8%;
      height: 88%;
    }
    .back {
      position: absolute;
      right: 3%;
      top: 3%;
      width: 5%;
      z-index: 201;
      cursor: pointer;
      .backImg {
        position: relative;
        width: 100%;
        object-fit: contain;
      }
    }
    .closeBtn {
      position: absolute;
      right: 2.7%;
      top: 3.5%;
      width: 4%;
      object-fit: contain;
      cursor: pointer;
      z-index: 201;
    }
  }
  .frameWindow.notice {
    top: 32%;
    height: 68%;
  }
  .frameWindow.product {
    top: 0%;
    height: 100%;
    background: transparent;
    border-radius: unset;
  }
  .frameWindow.nomal {
    top: 8%;
    height: 92%;
    // background: transparent;
    // border-radius: unset;
  }
}
@media screen and (min-width: 600px) {
  .new-iframe {
    .frameWindow {
      top: 3.5%;
      left: 7.5%;
      width: 85%;
      height: 93%;
      border-radius: 10px;
      .title {
        color: #4368eb;
        font-size: 1.2rem;
      }
      .back {
        right: unset;
        top: 2.8%;
        left: 1%;
        width: 1.8%;
      }
      .closeBtn {
        width: 3%;
      }
    }
    .frameWindow.notice {
      left: 35%;
      top: 6%;
      width: 59%;
      height: 76%;
    }
    .frameWindow.product {
      left: 35%;
      top: 6%;
      width: 59%;
      height: 76%;
    }
  }
}
</style>
