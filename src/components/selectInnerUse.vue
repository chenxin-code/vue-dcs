<template>
<div class="selectWindow">
    <div class="selectContent">
    <div class="askuse" v-show="askUseItem!=''"><div>{{askUseItem}}</div></div>
    <!-- <div class="title">请问您需要办理以下哪个业务:</div> -->
    <div class="useListWindow">
        <div class="title">请问您需要办理以下哪个业务</div>
        <div class="useList">
        <div class="listItem" v-for="item in jumpList" :key="item.childId" @click="jumpUse(item.childId)">
            <!-- <img class="itemIcon" :src="`./static/useIcon/${item.childId}.png`"> -->
            <div class="itemName">{{item.childName}}</div>
        </div>
    </div>
    </div>
</div>
</div>
    
</template>

<script lang="ts" setup>
import { defineEmits,ref,defineProps } from "vue";
import { call_client_pub } from "@/api";
interface Inprops {
    askUseItem:string,
    jumpList:Array<any>,
    askUseId:string
}
const props = defineProps<Inprops>()
const emit = defineEmits(["record"]);
const jumpUse = (str:string)=>{
    let id = props.askUseId+str
    emit('record',id);
    let param={"FUNCTIONID":str,"NEEDLOGIN":false}
    let jumpParam = JSON.stringify(param)
    call_client_pub("callNativePage",jumpParam)
}
</script>

<style lang="less">
.selectWindow{
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    .selectContent{
    position: relative;
    left: 0%;
    width: 100%;
    .askuse{
    position: relative;
    top: 0%;
    right: 0%;
    width: 100%;
    text-align: right;
    margin: 20px 0px;
    display: flex;
    justify-content: flex-end;
    color: #ffffff;
    >div{
        position: relative;
        background: #4368EB;
        width: fit-content;
        font-size: 0.875rem;
    font-family: PingFangSC-Semibold, PingFang SC;
        opacity: 0.9;
        font-weight: 400;
        border-radius: 10px 0px 10px 10px;
        padding: 8px 28px;
    }
    }
    .title{
        position: relative;
        top: 0%;
        right: 0%;
        font-size: 0.875rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        width: fit-content;
        background: #ffffff;
opacity: 0.9;
font-weight: 400;
border-radius: 0px 10px 10px 10px;
    margin: 10px 0px;
    padding: 8px 12px;
    }
    .useListWindow{
        position: relative;
        left: 0%;
        width: 76%;
            background: #fff;
            opacity: 0.9;
    border-radius: 10px;
    padding-bottom: 15px;
    .title{
        position: relative;
        top: 0%;
        right: 0%;
        font-size: 0.875rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        color: #333333;
        width: fit-content;
        // background: #ffffff;
// opacity: 0.9;
font-weight: 400;
// border-radius: 0px 10px 10px 10px;
    margin: 10px 0px;
    // padding: 8px 18px;
    }
            .useList{
        position: relative;
        left: 10px;
    top: 0%;
    height: 100%;
    width: 100%;
    display: grid;
    justify-content: start;
    grid-template-columns: repeat(auto-fill, 21vw);
    grid-gap: 10px;
        .listItem{
            position: relative;
            // width: 18vw;
            // height: 71px;
            width: 21vw;
            text-align: center;
            .itemIcon{
                position: relative;
                margin-top: 6px;
                width: 35px;
                object-fit: contain;
            }
            .itemName{
                position: relative;
                // width: 80px;
                background: linear-gradient(-24deg, #62BBF9, #5CA9FF);
                text-align: center;
                font-size: 0.6rem;
                color: #FFFFFF;
                padding: 8px 0px;
                border-radius: 50vh;
                line-height: 0.6rem;
            }
        }
    }
    }
}
}
</style>
