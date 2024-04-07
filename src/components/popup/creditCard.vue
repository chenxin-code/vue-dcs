<template>
  <div class="popupWindow" @click="closePopup()">
    <div class="popupDialog" @click.stop>
      <div class="box1">
        <van-icon name="arrow-left" color="rgba(121, 121, 121, 1)" size="1.1rem" @click="showConfirm = false"
                  v-show="showConfirm"/>
        <img src="@/assets/img/intoKefu.png" alt=""/>
        <span class="title" @click="showAllCard()">建设银行信用卡（3298）</span>
        <van-icon name="cross" color="rgba(121, 121, 121, 1)" size="1.1rem" @click="closePopup()"/>
        <div v-show="showAllCardBox"></div>
      </div>
      <div class="box2" v-show="!showConfirm">
        <div class="tip">信用卡分期利息有7折优惠</div>
        <div class="sum">本期账单合计</div>
        <div class="rmb">¥1000.00</div>
      </div>
      <div class="box3" :class="{confirm: showConfirm}">
        <div class="line-item">
          <div>分期金额</div>
          <div>
            <van-field
                :readonly="showConfirm"
                @focus="inputFocus()"
                :placeholder="showConfirm?'':'请输入分期金额'"
                :right-icon="showConfirm?'':'edit'"
                input-align="right"/>
          </div>
        </div>
        <div class="line-item" :class="{arrow: !showConfirm}" @click="selectPeriod()">
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
        <div class="line-item mb">
          <div>每期应还</div>
          <div>¥100.00</div>
          <div class="patch">每期本金：995.00 每期分期利息：90.57</div>
        </div>
        <div class="line-item">
          <div>计息方式</div>
          <div>分期收取</div>
        </div>
        <div class="line-item">
          <div>近似折算年化利率(单利)</div>
          <div>13.04%</div>
        </div>
        <div class="prompt-box">
          <div class="title">温馨提示</div>
          <div class="content">·每期分期利息=分期本金总额*每期分期利率。</div>
          <div class="content">·未按期足额还款产生的利息、还款违约金及相应计算规则按照《中国建设银行龙卡信用卡领用协议》执行。</div>
        </div>
      </div>
      <div class="btn-box">
        <div class="line1" v-show="!showConfirm">
          <van-checkbox
              v-model="checked"
              shape="square"
              checked-color="rgba(49, 157, 255, 1)"
              icon-size="0.75rem">
            <span :style="{color: checked?'rgba(49, 157, 255, 1)':'inherit'}">我已阅读并同意</span>
          </van-checkbox>
        </div>
        <div class="line2" @click="showTermBox = true" v-show="!showConfirm">《中国建设银行龙卡信用卡账单分期付款业务约定条款》</div>
        <button @click="handle()" v-show="!showConfirm">办理信用卡分期</button>
        <button @click="confirmHandle()" v-show="showConfirm">确认办理信用卡分期</button>
      </div>
      <div class="term-box" v-show="showTermBox">
        <div class="title">《中国建设银行龙卡信用卡账单分期 付款业务约定条款》</div>
        <div class="content">{{ '一段文本'.repeat(999) }}</div>
        <div class="btn-box">
          <button @click="checked = true;showTermBox = false">同意协议</button>
          <button @click="showTermBox = false">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, onMounted, ref, computed, watch} from "vue";

const emit = defineEmits(["closePopup", "inputFocus", "noChecked", "isChecked"]);
const closePopup = () => {
  emit("closePopup");
};
const inputFocus = () => {
  emit("inputFocus");
};
const showPeriodBox = ref(false);
const showTermBox = ref(false);
const checked = ref(false);
const showConfirm = ref(false);
const showAllCardBox = ref(false);
const handle = () => {
  if (checked.value) {
    showConfirm.value = true;
    emit("isChecked");
  } else {
    emit("noChecked");
  }
};
const confirmHandle = () => {

};
const selectPeriod = () => {
  if (!showConfirm.value) {
    showPeriodBox.value = !showPeriodBox.value;
  }
};
const showAllCard = () => {
  if (!showConfirm.value) {
    showAllCardBox.value = !showAllCardBox.value;
  }
};
onMounted(() => {
});

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
    top: 30%;
    width: 100%;
    height: 70%;
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
        position: relative;

        &::after {
          content: '';
          border: 0.35rem solid #fff;
          border-top: 0.35rem solid #000;
          transform: translateY(-25%);
          position: absolute;
          top: 50%;
          right: -0.7rem;
        }
      }

      img {
        width: 1.5rem;
        height: 1.5rem;
        vertical-align: middle;
        margin-right: 0.2rem;
      }

      .van-icon-cross {
        cursor: pointer;
        position: absolute;
        right: 1.4rem;
        top: 1.35rem;
      }

      .van-icon-arrow-left {
        vertical-align: middle;
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
      height: 35%;
      padding: 0.2rem 1.4rem;

      &.confirm {
        height: 70%;
      }

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

      .line-item {
        margin: 1.4rem 0;
        font-size: 0.88rem;
        display: flex;
        justify-content: space-between;
        position: relative;

        &::before {
          position: absolute;
          height: 1px;
          background-color: rgba(149, 149, 149, 1);
          content: '';
          right: 0;
          bottom: -0.7rem;
          left: 0;
          transform: scaleY(0.13);
        }

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

        .van-cell {
          padding: 0;
          line-height: inherit;
          background: inherit;
        }

        &.mb {
          margin-bottom: 2.8rem;

          &::before {
            bottom: -2.1rem;
          }
        }

        .patch {
          color: darkgrey;
          font-size: 0.82rem;
          position: absolute;
          right: 0;
          bottom: -1.4rem;
        }
      }

      .prompt-box {
        margin-bottom: 1.4rem;
        position: relative;

        &::before {
          position: absolute;
          height: 1px;
          background-color: rgba(149, 149, 149, 1);
          content: '';
          right: 0;
          bottom: -0.7rem;
          left: 0;
          transform: scaleY(0.13);
        }

        .title {
          font-size: 0.88rem;
          margin-bottom: 0.44rem;
        }

        .content {
          font-size: 0.66rem;
          margin-bottom: 0.33rem;
          color: rgba(118, 120, 128, 1);
        }
      }
    }

    > .btn-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding-top: 0.5rem;
      padding-bottom: 4.5rem;

      .line1 {
        font-size: 0.75rem;

        .van-checkbox {
          justify-content: center;
        }
      }

      .line2 {
        margin-top: 0.1rem;
        font-size: 0.75rem;
        text-align: center;
        color: rgba(49, 157, 255, 1);
        cursor: pointer;
      }

      > button {
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

    .term-box {
      padding: 1rem;
      word-wrap: break-word;
      position: absolute;
      left: 1rem;
      right: 1rem;
      top: 1rem;
      bottom: 1rem;
      background-color: ghostwhite;
      border-radius: 1rem;

      .title {
        margin: 0.7rem 0 1rem;
        font-size: 1.2rem;
        text-align: center;
        color: rgba(35, 108, 255, 1);
        position: relative;

        &::after {
          position: absolute;
          height: 1px;
          background-color: rgba(149, 149, 149, 1);
          content: '';
          right: 0;
          bottom: -1rem;
          left: 0;
          transform: scaleY(0.13);
        }
      }

      .content {
        margin-bottom: 1rem;
        padding: 0 1rem 0.35rem;
        font-size: 0.77rem;
        color: rgba(118, 120, 128, 1);
        overflow-y: auto;
        position: absolute;
        top: 6rem;
        bottom: 4rem;
      }

      > .btn-box {
        display: flex;
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;

        &::before {
          position: absolute;
          height: 1px;
          background-color: rgba(149, 149, 149, 1);
          content: '';
          right: 0;
          top: -1rem;
          left: 0;
          transform: scaleY(0.13);
        }

        > button {
          flex: 1;
          margin: 0.2rem 0.5rem;
          border-radius: 50vw;
          cursor: pointer;
          font-size: 1rem;
          line-height: 2.5;

          &:nth-child(1) {
            background: linear-gradient(to right, rgba(35, 107, 255, 1), rgba(192, 21, 217, 1));
            color: #fff;
            border: none;
          }

          &:nth-child(2) {
            background: #fff;
            color: rgba(35, 108, 255, 1);
            border: 0.02rem solid rgba(35, 107, 255, 1);
          }
        }

      }
    }
  }

}
</style>
