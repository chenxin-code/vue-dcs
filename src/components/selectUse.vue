<template>
<div class="selectWindow">
    <div class="usePartListWindow">
        <div class="useList" v-if="store.platformInfo.qiyeshoujiyinhang">
            <div class="useItem" v-for="item in allUseList" :key="item.id" @click="askItem(item)">
                <img class="itemIcon" :src="`./static/useIcon/${item.id}.png`">
                <div class="itemName">{{item.name}}</div>
            </div>
        </div>
        <div class="useList" v-if="store.platformInfo.feichiejia">
            <div class="useItem" v-for="item in feichiUseList" :key="item.id" @click="selectItem(item)" v-show="item.name!='需求发布'||getQueryVariable('ctfnFlag')=='04'">
                <img class="itemIcon" :src="item.icon">
                <div class="itemName">{{item.name}}</div>
            </div>
        </div>
    </div>
    <div class="usePart"></div>
    <!-- <show-frame v-if="frameShow" @close="closeiframe" :url="frameurl" :type="'kuaijiebanli'" :usetitle="usetitle"></show-frame> -->
</div>
    
</template>

<script lang="ts" setup>
import { defineEmits,ref,nextTick } from "vue";
import { allUseList } from "@/public/alluselist";
import { store } from "@/store/store";
// import showFrame from "@/components/showFrame.vue"
import { getQueryVariable } from "@/utils/utils.js";

const emit = defineEmits(["callinneruse","record","changeFade","openIframe"]);

const frameShow = ref(false)
const frameurl = ref('')
const closeiframe = ()=>{
  frameShow.value = false
  emit("changeFade",!frameShow.value)
}

const usetitle = ref('')
const feichiUseList = [
    {
        id:'searchProject',
        name:'找项目',
        icon:'./static/kuaijiebanli/project.png',
        link:process.env.VUE_APP_FEICHI_FRAMEURL+'/#/project',
    },
    {
        id:'searchInvest',
        name:'找投资',
        icon:'./static/kuaijiebanli/invest.png',
        link:process.env.VUE_APP_FEICHI_FRAMEURL+'/#/investment',
    },
    {
        id:'investmentNeeds',
        name:'需求发布',
        icon:'./static/kuaijiebanli/investneed.png',
        link:process.env.VUE_APP_FEICHI_FRAMEURL+'/#/user/nonstdManage',
    },
    {
        id:'searchAgency',
        name:'寻中介',
        icon:'./static/kuaijiebanli/agency.png',
        link:process.env.VUE_APP_FEICHI_FRAMEURL+'/#/agency/product',
    },
]

const askItem = (obj:any)=>{
    console.log(obj);
    nextTick(()=>{
        emit("callinneruse",obj);
    })
}

const selectItem = (obj:any)=>{
    usetitle.value = obj.name
    frameurl.value = obj.link+"?user="+getQueryVariable('user')+"&t="+getQueryVariable('t')+"&platform="+getQueryVariable('platform')+"&authorization="+getQueryVariable('authorization')+"&cstId="+getQueryVariable("cstId")
    frameShow.value = true
    // emit("changeFade",!frameShow.value)
    emit("openIframe",frameurl.value,usetitle.value)
    emit("record",obj.id)
}
</script>

<style lang="less">
.selectWindow{
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    .usePartListWindow{
        position: absolute;
        width: 100%;
        height: 86px;
        overflow-x: scroll;
        .useList{
                display: flex;
                height: 100%;
                flex-direction: row;
                flex-wrap: nowrap;
                position: relative;
                width: fit-content;
            .useItem{
            position: relative;
            width: 75px;
            height: 100%;
            font-size: 0.72rem;
            text-align: center;
            background: rgba(255, 255, 255, 0.900);
            border-radius: 8px;
            margin-right: 9px;
            .itemIcon{
                position: relative;
                margin-top: 14px;
                width: 35px;
                object-fit: contain;
            }
            .itemName{
                position: relative;
                width: 100%;
                text-align: center;
            }
        }
        }
    }
    .usePartListWindow::-webkit-scrollbar{
        width: 0px;
        height: 0px;
        display: none;
    }
    .usePart{
        width: 100%;
        height: 86px;
    }
}
</style>
