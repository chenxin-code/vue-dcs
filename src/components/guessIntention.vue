<template>
    <div class="guessIntentionWindow" :style="{bottom:styleUpHeight}">
        <div class="intention_list">
            <div class="list_item" v-for="(item,index) in intentionList" :key="index" v-html="item" @click="selectItem(item)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits,onMounted,ref,defineProps,computed } from "vue";
import isPc from "@/utils/isPc.js";
interface Inprops {
    intentionList:any
    upHeight:string
}
const props = defineProps<Inprops>()
    const styleUpHeight = computed(()=>{
  props.upHeight
  if (isPc) {
    return props.upHeight!="0px"? "calc(10% + "+props.upHeight+")":"10%"
  }
  else{
    return props.upHeight!="0px"? "calc(12% + "+props.upHeight+")":"12%"
  }
})
onMounted(()=>{
    console.log(props.intentionList);
    
})
const selectItem = (str:any)=>{
    emit("commitintention",str)
}

const emit = defineEmits(["commitintention"])


</script>

<style lang="less">
.guessIntentionWindow{
    position: fixed;
    z-index: 10;
    bottom: 12%;
    left: 0%;
    width: 100%;
    height: fit-content;
    background: #ffffff;
    border-radius: 10px 10px 0px 0px;
    font-size: 0.7rem;
    text-align: center;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4E4E4E;
    line-height: 1rem;
    .intention_list{
        position: relative;
        width: 90%;
        margin-left: 5%;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4E4E4E;
        font-size: 0.8rem;
        line-height: 1.8rem;
        margin-top: 2%;
        margin-bottom: 1%;
        
        .list_item{
            position: relative;
            width: 100%;
            white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
            border-bottom: 1px solid #d4d4d4;
            .intentionKeyWord{
                color: #4368EB;
            }
        }
    }
  }
@media screen and (min-width: 600px) {
    .guessIntentionWindow{
        left: 34%;
        width: 54.5%;
    }
}
</style>
