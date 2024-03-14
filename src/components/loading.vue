<template>
  <div class="m-view-loadingpage" @click="clickWindow">
    <!-- <div class="m-loadingpage-container" v-show="!ttsaready||percentage<100">
      <div class="progress_load">
        <div class="loading-topprogress-img" :style="{
            left: `calc(${percentage+2}% - ${
              isPc ? TopLoadingImgPcWidth : TopLoadingImgWidth
            })`,
          }"></div>
        <van-progress
          class="progress-loading-el"
          :stroke-width="strokewidth"
          :percentage="percentage"
          :show-pivot="showPivot"
        />
        <div class="progress_load_title">{{ progressLoadTitle }}</div>
      </div>
    </div> -->
    <!-- <div v-show="!ttsaready||percentage<100" class="loading_icon">
      <img class="unready" src="@/assets/img/loadingIcon.png">
    </div> -->
    <div  class="readyIcon">
        <img src="@/assets/img/ttsareadyIcon.png">
        <div class="ring1"></div>
        <div class="ring2"></div>
        <div class="ring3"></div>
    </div>
    <div class="confirmBtn">
      <!-- <p>点击呼叫客户经理</p> -->
      <img src="@/assets/img/callBtn.png" v-show="ttsaready"  @click="closeloading">
      <div class="progress_load_title" v-show="!ttsaready">{{ progressLoadTitle }}</div>
    </div>
  </div>
</template>

<script>
import isPc from "@/utils/isPc.js";
export default {
  data() {
    return {
      // progressTopLoadingImg: require("@/assets/img/loadingpage/dingwei.png"), // loading加载移动图片
      TopLoadingImgWidth: "5.2vw", // loading加载移动图片宽度
      TopLoadingImgPcWidth: "2.03vw", // loading加载移动图片宽度
      percentage: 100, // loading加载条
      showPivot: false, // 是否显示进度文字
      strokewidth: 10, // 进度条粗细，默认单位为px
      // progressLoadStyle: {
      //   top: '68.93vw',
      //   left: '50%',
      //   transform: 'translateX(-50%)',
      //   width: '70.8vw'
      // }, // progressLoadStyle 设置进度条的位置
      progressLoadTitle: "正在连接……", // 加载文字显示
      isPc: isPc,
    };
  },
  mounted(){
    // console.log(8888998897987,document.getElementById("ttsa").click);
    // let timer = setInterval(() => {
    //   this.percentage++
    //   if (this.percentage>=100) {
    //     clearInterval(timer);

    //   }
    // }, 50);
  },
  props:{
    ttsaready:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    getLoading(percentage) {
      this.percentage = percentage;
    },
    closeloading(){
      this.$emit("close");
        let timer = setInterval(() => {
          if (this.ttsaready) {
        if ((document.getElementById("ttsa")).getElementsByTagName('video').length) {
          (document.getElementById("ttsa")).getElementsByTagName('video')[0].play()
        }
        clearInterval(timer)
          }
        }, 50);
    },
  },
  // watch: {
  //   percentage(val) {
  //     if (val >= 100) {
  //       // this.$emit("close");
  //     }
  //   },
  // },
};
</script>

<style lang="less">
.m-view-loadingpage {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9;
  background: url(../assets/img/appBackground.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .van-progress__portion {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background: #4469EB;
  }
  .m-loadingpage-container {
    height: 100%;
    .progress_load {
      position: absolute;
      top: 27.19vw;
      left: 50%;
      transform: translateX(-50%);
      width: 17.17vw;
      // .progress-loading-el {
      //   width: 100%;
      //   background: url("../assets/img/loadingpage/loading_icon_active.png");
      //   background-size: 100% 100%;
      //   background-repeat: no-repeat;
      // }
      .loading-topprogress-img {
        width: 2.03vw;
        height: 2.34vw;
        background: #4469EB;
        display: block;
        position: absolute;
        top: -1.5vw;
        z-index: 2;
        // top: -3vw;
      }
      .van-progress__pivot {
        left: auto;
      }
      .progress_load_title {
        // width: 9.48rem;
        // height: 1.88rem;
        font-size: 0.6rem;
        font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
        font-weight: normal;
        color: #68707F;
        // line-height: 1.88rem;
        text-align: center;
        margin-top: 1.82vw;
      }
    }
  }
  .loading_icon{
    position: absolute;
    top: 15%;
    left: 15%;
    width: 70%;
    height: 45%;
    .unready{
      position: absolute;
      width: 100%;
      object-fit: contain;
    }
  }
  .readyIcon{
      position: absolute;
      width: 60%;
      left: 20%;
      top: 15%;
      height: 60vw;
      >img{
        position: absolute;
        top: 25%;
        left: 25%;
        width: 50%;
        object-fit: contain;
      }
      >div{
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        animation: ringone 3s linear infinite;
        border: 2px solid #ffffff;
        border-radius: 50vw;
        width: 0%;
        height: 0%;
      }
      .ring2{
        animation-delay:1s;
-webkit-animation-delay:1s;
      }
      .ring3{
        animation-delay:2s;
-webkit-animation-delay:2s;
      }
      @keyframes ringone {
          from {
            opacity: 1;
            width: 30%;
            height: 30%;
          }
          to {
            opacity: 0.3;
            width: 100%;
            height: 100%;
          }
        }
    }
    .confirmBtn{
      position: absolute;
      top: 55%;
      left: 26%;
      width: 48%;
      // height: 6%;
      // background: linear-gradient(180deg, #88B6FF 0%, #4368EB 100%);
      // border-radius: 50vh;
      >img{
        width: 100%;
        object-fit: contain;
      }
      >p{
        width: 100%;
        text-align: center;
        font-size: 16px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #FFFFFF;
line-height: 16px;
      }
      .progress_load_title {
        font-size: 0.6rem;
        font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
        font-weight: normal;
        color: #68707F;
        text-align: center;
        margin-top: 1.82vw;
      }
    }
}
@media screen and (max-width: 600px) {
  .m-view-loadingpage {
    .m-loadingpage-container {
      height: 100%;
      .progress_load {
        position: absolute;
        top: 71%;
        left: 50%;
        transform: translateX(-50%);
        width: 70.8vw;

        .loading-topprogress-img {
          width: 4vw;
          height: 6vw;
          display: block;
          position: absolute;
          border-radius: 3vw;
          // top: -7.6vw;
        }
        .van-progress__pivot {
          left: auto;
        }
        .progress_load_title {
          font-size: 0.6rem;
          margin-top: 4.67vw;
        }
      }
    }
  }
}
</style>
