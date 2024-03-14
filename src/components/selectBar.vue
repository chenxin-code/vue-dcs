<template>
<div>
<div class="tips_select" :style="{bottom:styleUpHeight}">
      <div class="select_list">
        <div :class="{selected:selectName==item.barName&&isSelected}" v-for="(item,index) in useList" :key="index" @click="askItem(item.barName)" v-show="!(index==0&&!(store.platformInfo.qiyeshoujiyinhang||store.platformInfo.feichiejia))">
            <img class="tipsIcon" :src="`./static/images/${item.barName}.png`">
            {{item.title}}
            <div class="redtips" v-show="index==2&&readtipsShow"></div>
        </div>
        <div v-if="useList.length>4" class="list_item"></div>
      </div>
    </div>
    <div class="errortip" v-show="errorTipsShow"><div>{{errorTips}}</div></div>
    <show-frame v-if="frameShow" @close="closeiframe" :url="frameurl" :type="selectName" @recordHistory="recordHistory"></show-frame>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits,ref,defineProps,onMounted,computed,watch } from "vue";
import showFrame from "@/components/showFrame.vue"
import { getQueryVariable } from "@/utils/utils.js";
import { store } from "@/store/store";
import isPc from "@/utils/isPc.js";
interface Inprops {
    isSelected:boolean
    readtipsShow:boolean
    upHeight:string
}
const styleUpHeight = computed(()=>{
  props.upHeight
  if (isPc) {
    return props.upHeight!="0px"? "calc(11% + "+props.upHeight+")":"11%"
  }
  else{
    return props.upHeight!="0px"? "calc(12.5% + "+props.upHeight+")":"12.5%"
  }
})
const props = defineProps<Inprops>()
const emit = defineEmits(["selectedBar","showguesslist","interrupt","recordHistory"]);
const showGuessList = ()=>{
    emit('showguesslist')
}
watch(()=>store.platformInfo.qiyeshoujiyinhang,()=>{
  if (store.platformInfo.qiyeshoujiyinhang) {
    askItem('kuaijiebanli');
  }
})
watch(()=>store.platformInfo.feichiejia,()=>{
  if (store.platformInfo.feichiejia&&!store.platformInfo.feichiez) {
    askItem('kuaijiebanli');
  }
})
watch(()=>store.platformInfo.feichiez,()=>{
  if (store.platformInfo.feichiez) {
    useList.value = [{title:"资讯服务",barName:"zixunfuwu"},{title:"消息待办",barName:"xiaoxidaiban"},{title:"业务介绍",barName:"chanpingmulu"}]
  }
})
onMounted(()=>{
  // if (localStorage.getItem('readnotice')&&localStorage.getItem('readnotice')=='read') {
  //   readtipsShow.value = false
  // }
  // else readtipsShow.value = true
})
const selectName = ref('');
const errorTipsShow = ref(false);
const errorTips = ref('');
const useList = ref([{title:"快捷办理",barName:"kuaijiebanli"},{title:"资讯服务",barName:"zixunfuwu"},{title:"消息待办",barName:"xiaoxidaiban"},{title:"业务介绍",barName:"chanpingmulu"}]);
const askItem = (name:string)=>{
    if (selectName.value == name&&props.isSelected) {
        return
    }
    switch (name) {
        case 'kuaijiebanli':
          if (store.platformInfo.qiyeshoujiyinhang||store.platformInfo.feichiejia) {
            selectName.value = name
    emit('selectedBar',selectName.value,'selectuse')
          }
            break;
        case 'zixunfuwu':
          // if (!store.platformInfo.qiyewangyin) {
            emit('interrupt')
            selectName.value = name
    emit('selectedBar',selectName.value,'newsservice')
    console.log('showparam查看usrId和t和platform',getQueryVariable('user'),getQueryVariable('t'),getQueryVariable('platform'));
          frameurl.value = process.env.VUE_APP_FEICHI_FRAMEURL+"/#/digital?user="+getQueryVariable('user')+"&t="+getQueryVariable('t')+"&platform="+getQueryVariable('platform')+"&authorization="+getQueryVariable('authorization')+"&cstId="+getQueryVariable("cstId")
          setTimeout(() => {
            frameShow.value = true
          }, 200);
          // }
  //         else{
  //           errorTips.value = '功能正在建设中…'
  // errorTipsShow.value = true
  // setTimeout(() => {
  //   errorTipsShow.value = false
  // }, 1000);
  //         }
          break;
          case 'chanpingmulu':
            emit('interrupt')
            selectName.value = name
            if (store.platformInfo.feichiejia) {
    emit('selectedBar',selectName.value)
          frameurl.value = process.env.VUE_APP_FEICHI_FRAMEURL+"/#/digital/product?user="+getQueryVariable('user')+"&t="+getQueryVariable('t')+"&platform="+getQueryVariable('platform')+"&authorization="+getQueryVariable('authorization')+"&cstId="+getQueryVariable("cstId")
          setTimeout(() => {
            frameShow.value = true
          }, 200);
          }
          else{
            emit('selectedBar',selectName.value,'product')
          }
            break;
          case 'xiaoxidaiban':
            // readtipsShow.value = false
            selectName.value = name
            if (store.platformInfo.feichiejia) {
              emit('selectedBar',selectName.value)
            frameurl.value = process.env.VUE_APP_FEICHI_FRAMEURL+"/#/digital/message?user="+getQueryVariable('user')+"&t="+getQueryVariable('t')+"&platform="+getQueryVariable('platform')+"&authorization="+getQueryVariable('authorization')+"&cstId="+getQueryVariable("cstId")
          setTimeout(() => {
            frameShow.value = true
          }, 200);
            }
            else{
            emit('selectedBar',selectName.value,'dealnotice')
          }
            break;
        default:
            errorTips.value = '功能正在建设中…'
  errorTipsShow.value = true
  setTimeout(() => {
    errorTipsShow.value = false
  }, 1000);
            break;
    }
}

// const readtipsShow = ref(true)

const frameShow = ref(false)
const frameurl = ref('')
const closeiframe = ()=>{
  frameShow.value = false
  selectName.value = ''
}
const recordHistory = (str:string)=>{
  emit('recordHistory',str)
}
</script>

<style lang="less">
.tips_select{
    position: fixed;
    width: 100%;
    height: 5%;
    bottom: 12.5%;
    overflow-x: scroll;
    overflow-y: hidden;
    .select_list{
      position: relative;
      height: 100%;
      left: 1%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      >div{
        position: relative;
        white-space: nowrap;
        font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
        box-shadow: 0px 1px 16px -1px rgba(0, 0, 0, 0.05);
        border-radius: 50vw;
        // border: 2px solid #DBB576;
        background: rgba(255, 255, 255, 1);
        color: #3C3C3C;
        font-size: 0.68rem;
        cursor: pointer;
        margin: 2px;
        padding: 7px 12px;
        margin-right: 10px;
        .tipsIcon{
            height: 0.6rem;
            object-fit: contain;
        }
        .redtips{
          position: absolute;
          top: 0%;
          right: 0%;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background: rgba(236, 95, 95, 1);
        }
      }
      >div.selected{
        color: #4368EB;
        border: 1px solid #4368EB;
      }
      .list_item{
        background: unset;
        width: 1px;
        padding: 1px 1px;
      }
    }
    .change_select{
      position: absolute;
      right: 5%;
      height: 48%;
      top: 25%;
      object-fit: contain;
      cursor: pointer;
    }
  }
  .tips_select::-webkit-scrollbar{
    width: 0px;
    height: 0px;
    opacity: 0;
    display: none;
  }
  .errortip{
    position: fixed;
    z-index: 20;
    top: 0%;
    left: 0%;
    height: 100vh;
    width: 100vw;
    >div{
        position: absolute;
        top: 45%;
    left: 30%;
    width: 40%;
    height: 93px;
    background: rgba(0,0,0,0.6);
    border-radius: 10px;
    font-size: 0.7rem;
    text-align: center;
    color: #ffffff;
    line-height: 93px;
    }
  }
  @media screen and (min-width: 600px) {
    .tips_select{
    bottom: 11%;
    .select_list{
      >div{
        font-size: 0.68rem;
        cursor: pointer;
      }
    }
  }
  .errortip{
    >div{
    left: 40%;
    width: 20%;
    border-radius: 10px;
    font-size: 1rem;
    }
  }
  }
</style>
