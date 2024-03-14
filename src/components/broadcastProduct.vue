<template>
  <div class="broadcastDialog">
    <img class="closeBtn" src="@/assets/img/backtohome.png" @click="closeWindow" />
    <div class="header">
      <div class="classtitle">
        <div :class="{active:selectType=='01'}" @click="jumpread('01')">
          业务介绍
          <div></div>
        </div>
        <div :class="{active:selectType=='02'}" @click="jumpread('02')">
          办理流程
          <div></div>
        </div>
        <div :class="{active:selectType=='03'}" @click="jumpread('03')">
          典型案例
          <div></div>
        </div>
      </div>
    </div>
    <div class="productPictureWindow">
      <img class="productPicture" :src="selectPicture" v-if="selectPicture&&selectPicture!=''" />
      <img class="biggerbtn" src="@/assets/img/bigger.png" @click="showPictrue" />
    </div>
    <div class="footer">
      <div class="lastbtn" @click="readcontext(-1)">
        <img src="@/assets/img/lastbtn.png" />
        <p>上一页</p>
      </div>
      <div class="progress">
        <van-progress
          class="progress_bar"
          :percentage="percentage"
          color="transparent"
          pivot-color="#4368EB"
        />
      </div>
      <div class="nextbtn" @click="readcontext(1)">
        <p>下一页</p>
        <img src="@/assets/img/nextbtn.png" />
        <!-- <img src="@/assets/img/bofang.png">
        <img src="@/assets/img/kaishi.png">-->
      </div>

    </div>
    <!-- <div class="player">
        <img src="@/assets/img/lastbtn.png"  @click="readcontext(-1)"/>
        <img src="@/assets/img/nextbtn.png"  @click="readcontext(1)"/>
    </div> -->
    <div class="biggerWindow" v-if="biggerShow">
      <img class="productPicture" :src="selectPicture" v-if="selectPicture&&selectPicture!=''" />
      <img class="closeBtn" src="@/assets/img/backtohome.png" @click="closeBigger" v-if="!isPc" />
      <img class="closeBtn" src="@/assets/img/closebigger.png" @click="closeBigger" v-if="isPc" />
      <div class="lastbtn" @click="readcontext(-1)">
        <img src="@/assets/img/lastbtn.png" />
        <p>上一页</p>
      </div>
      <div class="nextbtn" @click="readcontext(1)">
        <img src="@/assets/img/nextbtn.png" />
        <p>下一页</p>
      </div>
      <div class="classtitle">
        <div :class="{active:selectType=='01'}" @click="jumpread('01')">业务介绍</div>
        <div :class="{active:selectType=='02'}" @click="jumpread('02')">办理流程</div>
        <div :class="{active:selectType=='03'}" @click="jumpread('03')">典型案例</div>
      </div>
      <div class="muteButton">
        <img src="@/assets/img/ttsaVoiceBtn.png" v-show="!isMute" @click="changemute" />
        <img src="@/assets/img/ttsaVoiceBtnClose.png" v-show="isMute" @click="changemute" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, ref, defineProps, computed } from "vue";
import httpszzt from "@/api/reqszzt";
import { encryptGcm } from "@/utils/aes.js";
import isPc from "@/utils/isPc.js";
interface Inprops {
  productInfo: any;
  isStatic: boolean;
}
const props = defineProps<Inprops>();
onMounted(() => {
  document.getElementById("rightBtnList").style.zIndex = 3;
  console.error("menu proInfo:", props.productInfo);
  // if (!props.isStatic) {
  //   let yewu = [];
  //   let liucheng = [];
  //   let anli = [];

  //   props.productInfo.pdCmdpAtch.forEach((ele: any) => {
  //     console.log(999999,ele);
      
  //     // let data = divideClass(ele);
  //     // if (data?.type == "业务介绍") {
  //     //   yewu.push(data);
  //     // }
  //     // if (data?.type == "办理流程") {
  //     //   liucheng.push(data);
  //     // }
  //     // if (data?.type == "典型案例") {
  //     //   anli.push(data);
  //     // }
  //     if (ele.atch_CLCD=="01") {
  //       yewu.push(ele);
  //     }
  //     if (ele.atch_CLCD=="02") {
  //       liucheng.push(ele);
  //     }
  //     if (ele.atch_CLCD=="03") {
  //       anli.push(ele);
  //     }
  //   });
  //   yewu = setArray(yewu, "index");
  //   liucheng = setArray(liucheng, "index");
  //   anli = setArray(anli, "index");
  //   let result = [];
  //   for (let i = 0; i < yewu.length; i++) {
  //     result.push(yewu[i]);
  //   }
  //   for (let i = 0; i < liucheng.length; i++) {
  //     result.push(liucheng[i]);
  //   }
  //   for (let i = 0; i < anli.length; i++) {
  //     result.push(anli[i]);
  //   }
  //   readList.value = result;
  //   console.log(88888, result);
  // } else {
    readList.value = props.productInfo.pdCmdpAtch;
  // }

  selectContext.value = readList.value[selectIndex.value]?.pd_ATTR_TX_VAL;
  console.log("最终展示的是：", readList.value);
  readcontext(0);
});

const readList = ref([]);
const selectType = computed(() => {
  if (
    readList.value &&
    readList.value[selectIndex.value] &&
    readList.value[selectIndex.value].atch_CLCD
  ) {
    return readList.value[selectIndex.value].atch_CLCD;
  } else return false;
});
const selectContext = ref("");
const selectIndex = ref(0);
const biggerShow = ref(false);
const selectPicture = ref("");
const percentage = computed(() => {
  if (readList.value && readList.value.length > 1) {
    return (selectIndex.value / (readList.value.length - 1)) * 100;
  } else {
    return 0;
  }
});

const getProductPicture = (id: string) => {
  let word = "foreign-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
  let url = "";
  // if (process.env.NODE_ENV === "production") {
  url = process.env.VUE_APP_BASE_TOBANKURL;
  // }
  // else{
  //   url = "/crossapi"
  // }
  httpszzt
    .get(url + "/qyBank/fileFormXk?businessId=" + id, token)
    .then((res: any) => {
      console.log("图片", res);
      readList.value[selectIndex.value].url = res.data.msg;
      selectPicture.value = readList.value[selectIndex.value].url;
    });
};

const readcontext = (index: number) => {
  if (
    selectIndex.value + index >= 0 &&
    selectIndex.value + index < readList.value.length
  ) {
    selectIndex.value = selectIndex.value + index;
    selectContext.value = readList.value[selectIndex.value].pd_ATTR_TX_VAL;
    // console.log(999999,readList.value[selectIndex.value]);
    if (!readList.value[selectIndex.value].url) {
      getProductPicture(readList.value[selectIndex.value].atch_ADR);
    } else {
      selectPicture.value = readList.value[selectIndex.value].url;
    }
    emit("play", selectContext.value);
  }
};
const jumpread = (id: string) => {
  let jumpIndex = readList.value.findIndex(item => {
    return item.atch_CLCD == id;
  });
  if (selectIndex.value != jumpIndex) {
    selectIndex.value = jumpIndex;
    selectContext.value = readList.value[selectIndex.value].pd_ATTR_TX_VAL;
    if (!readList.value[selectIndex.value].url) {
      getProductPicture(readList.value[selectIndex.value].atch_ADR);
    } else {
      selectPicture.value = readList.value[selectIndex.value].url;
    }
    emit("play", selectContext.value);
  }
};
const showPictrue = () => {
  document.getElementById("backtohomeBtn").style.display = "none";
  document.getElementById("rightBtnList").style.display = "none";
  biggerShow.value = true;
  // console.log(9999999,document.getElementById("backtohomeBtn"));
};
const closeBigger = () => {
  document.getElementById("backtohomeBtn").style.display = "block";
  document.getElementById("rightBtnList").style.display = "block";
  biggerShow.value = false;
};
const emit = defineEmits(["close", "play", "interrupt", "changemute"]);
const closeWindow = () => {
  document.getElementById("rightBtnList").style.zIndex = "unset";
  emit("interrupt");
  emit("close");
};

const divideClass = (element: any) => {
  if (element.atch_NM.search("（业务介绍") != -1) {
    if (element.atch_NM.split("（业务介绍")[1]) {
      let id = element.atch_NM.split("（业务介绍")[1].split("）")[0];
      if (id == "") {
        id = "01";
      }
      return {
        index: id,
        element: element.pd_ATTR_TX_VAL,
        type: "业务介绍",
        typeId: "1",
        atch_ADR: element.atch_ADR,
        url: false
      };
    }
  } else if (element.atch_NM.search("（办理流程") != -1) {
    if (element.atch_NM.split("（办理流程")[1]) {
      let id = element.atch_NM.split("（办理流程")[1].split("）")[0];
      if (id == "") {
        id = "01";
      }
      return {
        index: id,
        element: element.pd_ATTR_TX_VAL,
        type: "办理流程",
        typeId: "2",
        atch_ADR: element.atch_ADR,
        url: false
      };
    }
  } else if (element.atch_NM.search("（典型案例") != -1) {
    if (element.atch_NM.split("（典型案例")[1]) {
      let id = element.atch_NM.split("（典型案例")[1].split("）")[0];
      if (id == "") {
        id = "01";
      }
      return {
        index: id,
        element: element.pd_ATTR_TX_VAL,
        type: "典型案例",
        typeId: "3",
        atch_ADR: element.atch_ADR,
        url: false
      };
    }
  }
};
const u = navigator.userAgent;
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const stopMusic = () => {
  if (document.getElementById("ttsa").getElementsByTagName("video").length) {
    if (isiOS) {
      document
        .getElementById("ttsa")
        .getElementsByTagName("video")[0].muted = true;
    } else {
      document
        .getElementById("ttsa")
        .getElementsByTagName("video")[0].volume = 0;
    }
  }
};
const startMusic = () => {
  if (document.getElementById("ttsa").getElementsByTagName("video").length) {
    if (isiOS) {
      document
        .getElementById("ttsa")
        .getElementsByTagName("video")[0].muted = false;
    } else {
      document
        .getElementById("ttsa")
        .getElementsByTagName("video")[0].volume = 1;
    }
  }
};
const isMute = ref(false);
const changemute = () => {
  isMute.value = !isMute.value;
  emit("changemute", isMute.value);
};
const setArray = (c: any, key: string) => {
  c.sort(compare(key));
  return c;
};
const compare = (property: string) => {
  return function(a: any, b: any) {
    return Number(a[property]) - Number(b[property]);
  };
};
</script>

<style lang="less" >
.broadcastDialog {
  position: absolute;
  left: 0%;
  top: 38%;
  width: 100%;
  height: 62%;
  background: #ffffff;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
  .closeBtn {
    position: absolute;
    left: 2.7%;
    top: 3.5%;
    width: 4%;
    object-fit: contain;
    cursor: pointer;
    z-index: 2;
  }
  .header {
    position: relative;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0), #c2d7f5);
    width: 100%;
    height: 13%;

    .classtitle {
      position: relative;
      display: flex;
      width: 80%;
      height: 100%;
      margin-left: 10%;
      padding-top: 3.5%;
      justify-content: space-evenly;

      > div {
        position: relative;
        margin: 0%;
        height: fit-content;
        font-size: 0.9rem;
        > div {
          position: absolute;
          left: 25%;
          height: 100%;
          width: 50%;
          top: 50%;
        }
      }
      > div.active {
        color: #4368eb;
        font-weight: bold;
        > div {
          border-bottom: 2px solid #4368eb;
        }
      }
    }
  }
  .productPictureWindow {
    position: relative;
    margin-left: 2.5%;
    width: 95%;
    max-height: 70%;
    background: #ffffff;
    overflow: hidden;
    .productPicture {
      width: 100%;
      object-fit: contain;
    }
    .biggerbtn {
      position: absolute;
      right: 2.62%;
      bottom: 5.43%;
      width: 7%;
      object-fit: contain;
    }
  }
  .footer {
    position: relative;
    width: 90%;
    margin-left: 5%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    .lastbtn {
      display: flex;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b0b0b0;
      font-size: 0.9rem;
      cursor: pointer;
      > img {
        width: 24px;
        object-fit: contain;
        margin-right: 5px;
      }
    }
    .progress {
      width: 53%;
      .van-progress__pivot {
        height: 100%;
        width: 30px;
        font-size: 0px;
      }
    }
    .nextbtn {
      display: flex;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b0b0b0;
      font-size: 0.9rem;
      cursor: pointer;
      > img {
        width: 24px;
        object-fit: contain;
        margin-left: 5px;
      }
    }
  }
  .player{
      color: red;
  }
  .biggerWindow {
    position: fixed;
    z-index: 3;
    width: 100vh;
    height: 100vw;
    background: #ffffff;
    transform-origin: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    .productPicture {
      width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .closeBtn {
      position: absolute;
      left: 2.7%;
      top: 3.5%;
      width: 4%;
      object-fit: contain;
      cursor: pointer;
      z-index: 2;
    }
    .lastbtn {
      position: absolute;
      left: 3vh;
      top: 42vw;
      width: 8vh;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b0b0b0;
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      > img {
        width: 45px;
        object-fit: contain;
        margin-right: 5px;
      }
    }
    .nextbtn {
      position: absolute;
      right: 3vh;
      top: 42vw;
      width: 8vh;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b0b0b0;
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      > img {
        width: 45px;
        object-fit: contain;
        margin-right: 5px;
      }
    }
    .classtitle {
      position: absolute;
      left: 27vh;
      bottom: 7vw;
      width: 46vh;
      display: flex;
      justify-content: space-between;
      > div {
        font-size: 0.85rem;
        border: 1px solid #333333;
        border-radius: 50vh;
        padding: 5px 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        background: #edeff7;
      }
      > div.active {
        border: 1px solid #346af0;

        background: #346af0;
        color: #ffffff;
      }
    }
    .muteButton {
      position: absolute;
      right: 2.5vh;
      width: 5vh;
      bottom: 5vw;
      > img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
.dialogHead {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 12.5%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0), #c2d7f5);
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  .selectTag {
    width: fit-content;
    text-align: center;
    font-size: 1.1rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    margin: 20px;
    padding-bottom: 5px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }
  .selectTag.readed {
    font-weight: bold;
    color: #4368eb;
    border-bottom: 2px solid #4368eb;
  }
}
.dialogContent {
  position: absolute;
  top: 12.5%;
  left: 0%;
  width: 100%;
  height: 100%;
  .nomessage {
    position: absolute;
    left: 50%;
    top: 20%;
    width: 50%;
    height: fit-content;
    transform: translate(-50%, -20%);
    > img {
      position: relative;
      width: 100%;
      object-fit: contain;
    }
    > p {
      font-size: 1.2rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      text-align: center;
    }
  }
}
@media screen and (min-width: 600px) {
  .broadcastDialog {
    left: 35%;
    top: 6%;
    width: 59%;
    height: 76%;
    border-radius: 10px 10px 10px 10px;
    .closeBtn {
      width: 3%;
    }
    .biggerWindow {
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      transform: unset;
      transform-origin: unset;
      background: rgba(0, 0, 0, 0.4);
      .productPicture {
        position: absolute;
        left: 15%;
        top: 12%;
        width: 70%;
        max-height: 76%;
      }
      .closeBtn {
        left: 83%;
        top: 7.5%;
        width: 2%;
      }
      .lastbtn {
        left: 18%;
        top: 45%;
        width: 5%;
        font-size: 0.9rem;
        > img {
          width: 45px;
          object-fit: contain;
          margin-right: 5px;
        }
      }
      .nextbtn {
        right: 18%;
        top: 45%;
        width: 5%;
        font-size: 0.9rem;
        > img {
          width: 45px;
          object-fit: contain;
          margin-right: 5px;
        }
      }
      .classtitle {
        left: 35%;
        bottom: 16%;
        width: 30%;
        > div {
          font-size: 1rem;
          border: 1px solid #333333;
          border-radius: 50vh;
          padding: 5px 15px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
          background: #edeff7;
        }
        > div.active {
          border: 1px solid #346af0;

          background: #346af0;
          color: #ffffff;
        }
      }
      .muteButton {
        position: absolute;
        right: 18%;
        width: 3%;
        bottom: 16%;
        > img {
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }
  .dialogHead {
  }
  .dialogContent {
  }
}
</style>
