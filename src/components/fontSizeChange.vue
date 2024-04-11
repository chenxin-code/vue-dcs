<template>
  <div class="changeFontSizeWindow">
    <div class="controlWindow">
      <div class="title">
        <p>字号选择</p>
      </div>
      <img class="close" src="@/assets/img/close.png" @click="closeWindow" alt=""/>
      <div class="select_bar">
        <p class="selectTitle" v-for="item in choseList" :key="item">{{ item }}</p>
        <div class="chooseBar">
          <div class="chooseItem" :class="{selected:item===selectedStandard}" v-for="item in choseList" :key="item" @click="changeSize(item)">
            <p>{{ item === selectedStandard ? item : "|" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, onMounted, ref} from "vue";

const choseList = ref(["小号", "标准", "大号"]);
const selectedStandard = ref("标准");
const u = navigator.userAgent;
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
onMounted(() => {
  if (localStorage.getItem("baseSize")) {
    changeSize(localStorage.getItem("baseSize"));
  } else {
    changeSize('标准');
  }
});
const changeSize = (str: string) => {
  selectedStandard.value = str;
  switch (str) {
    case "小号":
      if (isiOS) {
        document.getElementsByTagName("html")[0].style.fontSize = "16px";
      } else {
        document.getElementsByTagName("html")[0].style.fontSize = "14px";
      }
      localStorage.setItem('baseSize', '小号');
      break;
    case "标准":
      if (isiOS) {
        document.getElementsByTagName("html")[0].style.fontSize = "18px";
      } else {
        document.getElementsByTagName("html")[0].style.fontSize = "16px";
      }
      localStorage.setItem('baseSize', '标准');
      break;
    case "大号":
      if (isiOS) {
        document.getElementsByTagName("html")[0].style.fontSize = "24px";
      } else {
        document.getElementsByTagName("html")[0].style.fontSize = "22px";
      }
      localStorage.setItem('baseSize', '大号');
      break;
    default:
      break;
  }
};
const emit = defineEmits(["close"]);
const closeWindow = () => {
  emit("close");
};

</script>

<style lang="less">
.changeFontSizeWindow {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(255, 255, 255, 0.600);

  .controlWindow {
    position: absolute;
    top: 30%;
    left: 10%;
    width: 80%;
    height: 30%;
    background: #FFFFFF;
    border-radius: 10px;

    .title {
      position: absolute;
      top: 5%;
      left: 30%;
      width: 40%;

      > p {
        position: relative;
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3C3C3C;
        margin: 0;
      }
    }

    .close {
      position: absolute;
      top: 5%;
      right: 4%;
      width: 6%;
      object-fit: contain;
      cursor: pointer;
    }

    .select_bar {
      position: absolute;
      top: 28%;
      left: 5%;
      width: 90%;
      height: 28%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      font-size: 12px;
    }

    .selectTitle {
      width: 30%;
      text-align: center;
      color: #B1B2B4;
    }

    .chooseBar {
      position: relative;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      border-radius: 10px;
      background: #F4F5FB;
      height: 50%;

      .chooseItem {
        width: 30%;
        text-align: center;
        color: #B1B2B4;
        height: 100%;
        cursor: pointer;

        > p {
          line-height: 12px;
        }
      }

      .chooseItem.selected {
        background: #557CF0;
        border-radius: 5px;
        color: #FFFFFF;
      }
    }
  }
}

@media screen and (min-width: 600px) {
  .changeFontSizeWindow {
    .controlWindow {
      position: absolute;
      top: 30%;
      left: 30%;
      width: 40%;
      height: 30%;

      .close {
        cursor: pointer;
        top: 5%;
        right: 4%;
        width: 4%;
      }
    }
  }
}
</style>
