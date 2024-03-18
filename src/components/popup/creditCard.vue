<template>
  <div class="popupWindow" @click="closePopup()">
    <div class="popupDialog" @click.stop>
      <div class="box1">
        <img src="@/assets/img/intoKefu.png"/>
        <span class="title">建设银行信用卡（3298）</span>
      </div>
      <div class="box2">
        <div class="tip">信用卡分期利息有7折优惠</div>
        <div class="sum">本期账单合计</div>
        <div class="rmb">¥1000.00</div>
      </div>
      <div class="box3">
        <div class="line-item arrow" @click="showPeriodBox = !showPeriodBox">
          <div>分期选择</div>
          <div>12期</div>
        </div>
        <div class="period-box" v-show="showPeriodBox">
          <div class="period">
            <span>3期</span>
          </div>
          <div class="period">
            <span>6期</span>
          </div>
          <div class="period">
            <span>10期</span>
          </div>
          <div class="period">
            <span>12期</span>
            <div class="discount">7折</div>
          </div>
          <div class="period">
            <span>18期</span>
            <div class="discount">7折</div>
          </div>
          <div class="period">
            <span>24期</span>
            <div class="discount">7折</div>
          </div>
          <div class="period">
            <span>36期</span>
            <div class="discount">7折</div>
          </div>
        </div>
        <div class="line-item">
          <div>每期应还</div>
          <div>¥100.00</div>
        </div>
        <div class="line-item">
          <div>每期利息</div>
          <div>¥10.00</div>
        </div>
      </div>
      <button @click="">办理信用卡分期</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, onMounted, ref, computed, watch} from "vue";

const emit = defineEmits(["closePopup"]);
const closePopup = () => {
  emit("closePopup");
};
const showPeriodBox = ref(false);
onMounted(() => {});

</script>

<style lang="less" scoped>
.popupWindow {
  opacity: 0.95;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  top: 0;
  left: 0;

  .popupDialog {
    position: absolute;
    left: 0;
    top: 38%;
    width: 100%;
    height: 62%;
    background-color: #fff;
    border-radius: 1rem 1rem 0 0;

    .box1 {
      padding: 1.1rem 1.4rem 0.7rem;
      position: relative;

      &::after {
        position: absolute;
        height: 1px;
        background-color: rgba(149, 149, 149, 1);
        content: '';
        right: 1.4rem;
        bottom: 0;
        left: 1.4rem;
        transform: scaleY(0.13);
      }

      .title {
        font-size: 0.85rem;
        font-weight: bold;
      }

      img {
        width: 1.5rem;
        height: 1.5rem;
        vertical-align: middle;
        margin-right: 0.2rem;
      }
    }

    .box2 {
      padding: 0.9rem 1.4rem;
      position: relative;

      .tip {
        display: inline-block;
        white-space: nowrap;
        margin-left: 50%;
        transform: translateX(-50%);
        padding: 0.15rem 0.7rem;
        border-radius: 50vw;
        font-size: 0.6rem;
        line-height: 1.5;
        background-color: rgba(215, 181, 137, 1);
        color: rgba(112, 71, 34, 1);
        border: none;
      }

      .sum {
        margin-top: 0.4rem;
        text-align: center;
        font-size: 0.75rem;
      }

      .rmb {
        margin-top: 0.4rem;
        text-align: center;
        font-size: 1.6rem;
        font-weight: bold;
      }

      &::after {
        position: absolute;
        height: 1px;
        background-color: rgba(149, 149, 149, 1);
        content: '';
        right: 1.4rem;
        bottom: 0;
        left: 1.4rem;
        transform: scaleY(0.13);
      }
    }

    .box3 {
      overflow-y: auto;
      height: 40%;

      .period-box {
        padding: 0 0.2rem;
        border-radius: 0.2rem;
        background-color: rgba(231, 235, 244, 1);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        .period {
          cursor: pointer;
          border-radius: 0.2rem;
          text-align: center;
          margin-top: 0.6rem;
          background-color: #fff;
          padding: 0.5rem 0;
          font-size: 0.9rem;
          width: 30%;
          position: relative;

          &:last-child {
            margin-bottom: 0.6rem;
          }

          .discount {
            font-size: 0.7rem;
            padding: 0.06em 0.25rem;
            border-radius: 0.4rem 0.4rem 0.4rem 0;
            transform: translateY(-25%);
            color: #fff;
            background: linear-gradient(to right, rgba(255, 88, 35, 1), rgba(254, 154, 1, 1));
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }

      padding: 0.2rem 1.4rem;

      .line-item {
        margin: 1.2rem 0;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        position: relative;

        &.arrow {
          cursor: pointer;
          padding-right: 0.55rem;

          &::after {
            content: '';
            height: 0.45rem;
            width: 0.45rem;
            border-width: 0.06rem 0.06rem 0 0;
            border-color: rgba(181, 181, 181, 1);
            border-style: solid;
            transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            position: absolute;
            top: 50%;
            right: 0;
          }
        }
      }
    }

    button {
      margin: 0.2rem 0.5rem;
      border-radius: 50vw;
      cursor: pointer;
      font-size: 1rem;
      line-height: 2.5;
      background: linear-gradient(to right, rgba(35, 107, 255, 1), rgba(192, 21, 217, 1));
      color: #fff;
      border: none;
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 75%;
    }

  }

}

//@media screen and (min-width: 600px) {
//  .popupWindow {
//    .popupDialog {
//      left: 35%;
//      top: 6%;
//      width: 59%;
//      height: 76%;
//      border-radius: 10px 10px 10px 10px;
//    }
//  }
//}
</style>
