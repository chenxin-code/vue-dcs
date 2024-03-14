<template>
    <div style="display:none;">
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineExpose, defineProps,watch,computed } from "vue";
import httpszzt from "@/api/reqszzt";
import isPc from "@/utils/isPc.js";
import { getQueryVariable } from "@/utils/utils.js";
import { encryptGcm } from "@/utils/aes.js";
import { store } from "@/store/store";
const platform = computed(()=>{
  let name = getQueryVariable('platform')
  if (!name) {
    if (isPc) {
      return '1'
    }
    else{
      return '2'
    }
  }
  else{
    return name
  }
})
// onMounted(()=>{
//     enterrecord();
// })
watch(()=>store.platformInfo.userId,()=>{
  if (store.platformInfo.userId!='guest') {
    enterrecord(store.platformInfo.userId);
  }
  else{
    enterrecord();
  }
})
const enterResult = ref('');
//访问量记录接口
const enterrecord = (user?:string)=>{
  let data = {
    ehallId:862,
    userId:user?user:'',
    channel:platform.value,
  }
  let word = "szztStatics-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
    httpszzt
    .enterRecordpost(
      process.env.VUE_APP_SZZT_BASEURL+"/statics-api/statics/data/enter",
      data,token
    )
    .then((res: any) => {
      // console.log(999,res);
      enterResult.value = res.data.msg
      timerecordinterval.value = setInterval(()=>{
        timerecord()
      },30000)
    })
}
const timerecordinterval = ref('');
//访问时间记录接口
const timerecord = ()=>{
  let data = {
    visitTimes:'',
  }
  let word = "szztStatics-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
  data.visitTimes = enterResult.value +'-'+ Date.parse(new Date())
    httpszzt
    .enterRecordpost(
      process.env.VUE_APP_SZZT_BASEURL+"/statics-api/statics/data/visitTime",
      data,token
    )
    .then((res: any) => {
      // console.log(999,res);
      
    })
}
//点击热点（业务）接口
const selectuserecord = (id:string,user?:string)=>{
  let data = {
    embedId:'',
    ehallId:862,
    userId:user?user:'',
    channel:platform.value,
  }
  let word = "szztStatics-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
  data.embedId = id
    httpszzt
    .enterRecordpost(
      process.env.VUE_APP_SZZT_BASEURL+"/statics-api/statics/data/embed",
      data,token
    )
    .then((res: any) => {
      // console.log(999,res);
    })
}
defineExpose({
  selectuserecord,
});
onUnmounted(()=>{
  clearInterval(timerecordinterval.value);
})
</script>

<style lang="less" scoped>
</style>
