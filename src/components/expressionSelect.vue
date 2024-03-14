<template>
<div class="expressionWindow">
  <div class="select_zone">
    <div class="emoj_list">
      <div class="emoj_item" v-for="(item,index) in emojList" :key="index" @click="outputEmoj(item)">
      <img :src="item" >
    </div>
    </div>
    <div class="operate_slot" v-show="!isPc">
      <!-- <div class="backSpace_btn" @click="backspace"><img src="@/assets/img/backSpace.png" /></div> -->
      <div class="send_btn" @click="sendContent"><p>发送</p></div>
    </div>
  </div>
  <div class="close_zone" @click="close"></div>
</div>
</template>

<script lang="ts" setup>
import { defineEmits,ref,defineProps,onMounted,computed } from "vue";
import isPc from "@/utils/isPc.js";
// interface Inprops {
//     progressNum:number
// }
// const props = defineProps<Inprops>()
const emit = defineEmits(["close","outputemoj","sendContent","backspace"]);

onMounted(()=>{
    getEmojList();
})
const emojList = ref([]);
const getEmojList = ()=>{
const path = require("path");
//读取文件的路径 是否遍历文件的子目录 匹配文件正则表达式
const files = require.context("../../public/static/phone_emots", false, /\.(png|jpg|gif|jpeg|webp|ico)$/);
//files(key).default拿到该模块的vue对象
files.keys().forEach(key => {
  const name = path.basename(key);
  emojList.value.push("./static/phone_emots/"+name)
});
}
const outputEmoj = (url:string)=>{
  console.log(url);
  let outputstr = '<img src="'+url+'" >'
  // emit("outputemoj",outputstr)
  emit("outputemoj",url)
}
const close = ()=>{
  emit("close")
}
const sendContent = ()=>{
  emit("sendContent")
}
const backspace = ()=>{
  emit("backspace")
}
</script>

<style lang="less">
.expressionWindow{
  position: fixed;
  left: 0%;
  top: 0%;
  height: 100vh;
  width: 100vw;
  z-index: 0;
  .select_zone{
    position: absolute;
    left: 0%;
    width: 100%;
    top: 62%;
    height: 38%;
    overflow: hidden;
    
background: #EFF0F4;
.emoj_list{
  position: absolute;
  width: 90%;
  height: 82%;
  padding: 0% 5%;
  padding-top: 2%;
  padding-bottom: 16%;
  display: grid;
  overflow: scroll;
    justify-content: space-around;
    grid-template-columns: repeat(auto-fill, 6vw);
    grid-gap: 10px;
  .emoj_item{
      position: relative;
      width: fit-content;
      height: fit-content;
      // margin-left: 3px;
      // margin-right: 3px;
    }
}
.emoj_list::-webkit-scrollbar{
    width: 0%;
    height: 0%;
  }
.operate_slot{
  position: absolute;
  left: 80%;
  bottom: 0vh;
  width: 20%;
  height: 25%;
  background: #EFF0F4;
      display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  .backSpace_btn{
    position: relative;
    width: 40%;
    height: 40%;
    border-radius: 5px;
    background: #FFFFFF;
    >img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 38%;
      max-height: 50%;
      object-fit: contain;
    }
  }
  .send_btn{
    position: relative;
    width: 80%;
    height: 40%;
    border-radius: 5px;
    background: #4368EB;
    >p{
      position: absolute;
      font-size: 12px;
      color: #FFFFFF;
      text-align: center;
      margin: auto;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
}
  }
  .close_zone{
    position: absolute;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 62%;
  }
}
@media screen and (min-width: 600px) {
  .expressionWindow{
    left: 34%;
    width: 60%;
    .select_zone{
      top: 49%;
      border-radius: 10px;
      background: #FFFFFF;
      .operate_slot{
      background: #FFFFFF;
    }
    .emoj_list{
      grid-template-columns: repeat(auto-fill, 4vw);
    }
    }
    .close_zone{
      height: 100%;
      z-index: -1;
    }
    
}
}
</style>
