<template>
  <div class="main">
    <div class="tips_select">
      <div class="select_list">
        <div class="btn" @click="showPopup">
          <div class="icon">
             <img class="img" src="@/assets/img/closeKefu.png" />
          </div>结束人工服务
        </div>
      </div>
    </div>
    <!-- <van-popup v-model:show="show" round>
      <div class="card">
        <div class="text">是否结束当前会话？</div>
        <div class="btns">
          <div class="btn active" @click="closeKefu">是</div>
          <div class="btn" @click="show=false">否</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="showPingjia" round>
      <div class="pingjiaCard">
        <div class="tl">请对本次服务做出评价：</div>
        <div class="pingjiaBtn" :key="index" v-for="(item,index) in pingjiaList" :class="{isChoose : item.isActive}" @click="choosePingjiaBtn(item)">
          {{item.text}}
        </div>
        <div class="tijiao" @click="subMit">提交</div>
      </div>
    </van-popup>
    <van-popup v-model:show="showPingjia2" round>
      <div class="pingjiaCard">
        <div class="tl">请选择对“其他不满意”原因</div>
        <div class="pingjiaBtn" :key="index" v-for="(item,index) in pingjiaList2" :class="{isChoose : item.isActive}" @click="choosePingjiaBtn2(item)">
          {{item.text}}
        </div>
        <div class="tijiao" @click="subMit2">提交</div>
      </div>
    </van-popup> -->

  </div>
</template>

<script lang="ts" setup>
import {
  defineEmits,
  ref,
  reactive,
  defineProps,
  onMounted,
  computed
} from "vue";
import { Dialog, Popup } from "vant";
const show = ref(false);
// const showPingjia = ref(false);
// const showPingjia2 = ref(false);
// const pingjiaList2 = ref([{text:'业务规定或处理效率',id:'1',isActive:true},{text:'需要通过其他渠道办理',id:'2',isActive:false},{text:'系统或APP使用操作不畅',id:'3',isActive:false},{text:'上述以外的其他原因',id:'4',isActive:false},])
// const pingjiaList = ref([{text:'非常满意',id:'1',isActive:true},{text:'满意',id:'2',isActive:false},{text:'对客服不满意',id:'3',isActive:false},{text:'对其他不满意',id:'4',isActive:false},])
interface Inprops {
  isSelected?: boolean;
}
const props = defineProps<Inprops>();
const emit = defineEmits(['closeKefu']);
const showGuessList = () => {};

onMounted(() => {});

const showConfirm = ref(false);
const useList = reactive([]);
const askItem = (index: number, name?: string) => {
  //emit("sendChat", useList[index].question,useList[index].keyword);
};
const showPopup = () => {
   emit('closeKefu')
//     closeKefu
//   show.value = true;
};
//用户主动点断开链接
// const closeKefu = () => {
//    show.value = false
//  //  emit('onClickDisconnect')
//    showPingjia.value = true
// };
// const subMit = () => {
//    showPingjia.value = false
//    if(pingjiaList.value[3].isActive){
//      setTimeout(()=>{
//        showPingjia2.value = true
//      },500)
//    }
// };
// const subMit2 = () => {
//   showPingjia2.value = false
// };
// const choosePingjiaBtn = (i:any) => {
//    if(i.isActive) return
//    pingjiaList.value = pingjiaList.value.map((item:any)=>{
//     return {
//         text:item.text,
//         id:item.id,
//         isActive:item.id == i.id ? true : false
//     }
//    })
// };
// const choosePingjiaBtn2 = (i:any) => {
//    if(i.isActive) return
//    pingjiaList2.value = pingjiaList2.value.map((item:any)=>{
//     return {
//         text:item.text,
//         id:item.id,
//         isActive:item.id == i.id ? true : false
//     }
//    })
// };
</script>

<style lang="less">
.tips_select {
  .select_list {
    .btn {
      color: #e5992c;
      border: 1px solid #e5992c;
      border-radius: 30px;
      display: flex;
      // font-size: .8rem;
      align-items: center;
      .icon {
        width: 20px;
        height: 20px;
        padding-right: 3px;
        display: flex;
        align-items: center;
        .img{
            width: 16px;
            height: 16px;
        }
      }
    }
  }
}
.main {
  .card {
    width: 320px;
    height: 120px;
    background: #fff;
    font-size: 1rem;
    font-family: FZLTZHJW--GB1-0;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    .text {
      font-weight: 400;
      color: #4e4e4e;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btns {
      display: flex;
      justify-content: space-around;
      .btn {
        width: 103px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        background: linear-gradient(0deg, #4368eb, #88b6ff);
        color: #ffffff;
        &.active {
            background: #ffffff;
            border: 1px solid #b0b0b0;
            color: #b0b0b0;
        }
      }
    }
  }
  .pingjiaCard{
    width: 320px;
    height: 360px;
    background: #fff;
    font-family: FZLTZHJW--GB1-0;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    padding: 14px;
    .tl{
      font-weight: bold;
      height: 40px;
      display: flex;
      align-items: center;
      color: #333333;
      font-family: FZLanTingHeiS-DB-GB;
    }
    .pingjiaBtn{
        width: 260px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        background: #F4F5FA;
        margin: 10px auto;
        &.isChoose{
            color: #FFFFFF;
            background: #4368EB;
        }
    }
    .tijiao{
        width: 130px;
        height: 40px;
        color: #4368EB;
        border: 1px solid #4368EB;
        margin: 20px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        margin-top: 16px;
        box-sizing: border-box;
    }

  }
}

// .confirm {
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 2;
//   display: flex;
//   align-items: center;
//   justify-content: center;

// }
</style>
