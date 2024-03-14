<template>
    <div class="showTips">
        <img v-if="tipsIcon" :src="tipsIcon" >
        <div>{{tipsText}}</div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits,onMounted,ref,defineProps,computed } from "vue";
interface Inprops {
    tipsText:string
    tipsIcon?:string
}
const props = defineProps<Inprops>()
// onMounted(()=>{
// })

const emit = defineEmits(["commit","close"])


</script>

<style lang="less">
.showTips{
    position: fixed;
    z-index: 20;
    top: 50%;
    left: 50%;
    max-width: 60%;
    height: fit-content;
    background: rgba(0,0,0,0.6);
    border-radius: 16px;
    font-size: 0.7rem;
    text-align: center;
    color: #ffffff;
    line-height: 32px;
    padding: 8px 10px;
    transform: translate(-50%,-50%);
    >img{
        position: relative;
        width: 25%;
        object-fit: contain;
    }
  }
@media screen and (min-width: 600px) {
}
</style>
