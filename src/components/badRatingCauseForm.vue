<template>
    <div class="causeFormWindow">
        <div class="drawer">
            <div class="drawer_title">您的反馈将帮助我们优化问答功能</div>
            <img class="close_btn" src="@/assets/img/close_cause_form.png" @click="closeWindow">
            <div class="cause_select_list">
                <div class="cause_item" :class="{selected:calculateSelected(item)>=0}" v-for="(item,index) in causeList" :key="index" @click="triggerSelect(item)">{{item}}</div>
            </div>
            <div id="inputArea" class="input_area" contenteditable="true" placeholder="请反馈更多细节，帮助我们提供更好的服务."></div>
            <div class="commit_btn" @click="commit">提交意见</div>
        </div>
        <show-tips :tipsText="tipsText" :tipsIcon="tipsIcon" v-if="tipsText"></show-tips>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits,onMounted,ref,defineProps,computed } from "vue";
import showTips from "@/components/showTips.vue";
interface Inprops {
    causeList:Array<string>
}
const props = defineProps<Inprops>()
// onMounted(()=>{
// })
const selectedList = ref([])

const calculateSelected = (val:string)=>{
    return selectedList.value.findIndex((item:string)=>{
        return item==val
    })
}
const triggerSelect = (val:string)=>{
    if (calculateSelected(val)>=0) {
        selectedList.value = selectedList.value.filter((item)=>{
            return item!= val
        })
    }
    else{
        selectedList.value.push(val)
    }
}
const commit = ()=>{
    if (filterXSS(document.getElementById("inputArea")?.innerText)||selectedList.value.length) {
        let result = filterXSS(document.getElementById("inputArea")?.innerText)?filterXSS(document.getElementById("inputArea")?.innerText):""
        result = result+(selectedList.value.length ? ","+selectedList.value.join(",") : "")
        console.log(result);
        
    emit("commit",result)
    }
    else{
        setShowTips("意见不能为空！")
    }
}

//操作提示
const tipsText = ref('')
const tipsIcon = ref('')
const setShowTips = (str:string,icon?:string)=>{
  tipsText.value = str
  tipsIcon.value = icon?icon:""
  setTimeout(() => {
    tipsIcon.value = ''
    tipsText.value = ''
  }, 3000);
}
const closeWindow = ()=>{
    emit("close")
}
const emit = defineEmits(["commit","close"])


</script>

<style lang="less">
.causeFormWindow{
    position: fixed;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
z-index: 10;
background: rgba(0, 0, 0, 0.400);
.drawer{
    position: absolute;
    left: 0%;
    bottom: 0%;
    height: 52%;
    width: 100%;
    background: #ffffff;
    border-radius: 20px 20px 0px 0px;
    .drawer_title{
        position: relative;
        width: 100%;
        text-align: center;
        margin-top: 20px;
        line-height: 1rem;
        font-size: 1rem;
        font-family: FZLanTingHeiS-DB-GB;
        font-weight: 400;
        color: #333333;
    }
    .close_btn{
        position: absolute;
        left: 92%;
        top: 6%;
        width: 5%;
        object-fit: contain;
    }
    .cause_select_list{
        position: relative;
        width: 100%;
        height: 30%;
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        overflow: scroll;
        align-items: center;
        .cause_item{
            position: relative;
            margin: 5px 10px;
            padding: 8px 16px;
            border-radius: 50vh;
            background: #F4F5FA;
            font-size: 0.9rem;
            font-family: FZLanTingHeiS-R-GB;
            font-weight: 400;
            color: #333333;
        }
        .cause_item.selected{
            background: #4367eb36;
            color: #4368EB;
        }
    }
    .cause_select_list::-webkit-scrollbar{
        width: 0px;
        height: 0px;
    }
    .input_area{
        position: relative;
        height: 24%;
        overflow: scroll;
        background: #F4F5FA;
        border: 1px solid #ECECEC;
        border-radius: 10px;
        width: 92%;
        margin-top: 15px;
        margin-left: 3%;
        padding: 5px;
        font-size: 0.8rem;
    }
    .input_area:focus{
        outline: none;
      }
      .input_area:empty::before {
				content: attr(placeholder);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #aeaeae;
        font-size: 0.75rem;
        padding-left: 10px;
			}
      .input_area::placeholder {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #aeaeae;
        font-size: 0.75rem;
        padding-left: 10px;
      }
      .input_area::-webkit-scrollbar{
        width: 0px;
        height: 0px;
      }
      .commit_btn{
        position: relative;
        width: 80%;
        margin-left: 10%;
        height: 10%;
        background: linear-gradient(0deg, #4368EB, #88B6FF);
        border-radius: 50vh;
        font-family: PingFang SC;
        font-size: 1rem;
font-weight: 500;
color: #FFFFFF;
text-align: center;
display: flex;
justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 15px;
      }
}
}
@media screen and (min-width: 600px) {
    .causeFormWindow{
        left: 34%;
        width: 60%;
        background: unset;
}
}
</style>
