<template>
<div class="historyCalendarWindow">
  <div class="mainWindow">
    <van-calendar
    ref="calendarRef"
  title="按日期查找"
  :poppable="false"
  :show-confirm="false"
  :show-mark="false"
  :min-date="minDate"
  :max-date="endDate"
  :formatter="formatter"
  @month-show="loadMoth"
  @confirm="selectDate"
>
<!-- <div slot="month-title" slot-scope="date">
  <div>{{date}}</div>
</div> -->
  <!-- <template #subtitle>
    <div class="van-calendar__month-title">{{subtitle+123213213213213}}</div>
  </template> -->
</van-calendar>
<img
      class="closeCalender"
      src="@/assets/img/backtohome.png"
      @click="closeWindow"
    />
    <div class="loading" v-show="loadingShow"><van-loading type="spinner" class="loadingIcon"/></div>
    <div class="calenderTips"><p>仅支持查询近一个月的历史记录</p></div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { defineEmits,ref,defineProps,onMounted,computed, nextTick } from "vue";
import httpszzt from "@/api/reqszzt";
import { store } from "@/store/store";
import { encrypt,decrypt,encryptGcm } from "@/utils/aes.js";
const emit = defineEmits(["close","showguesslist"]);

onMounted(()=>{
  initSearchDate()
})

const searchYear = ref(2020);
const loadingShow = ref(false)
const searchMonth = ref(1);
const endDate = new Date();
const minDate = ref();
const historyRecord = ref([]);
const initSearchDate = ()=>{
  loadingShow.value = true
  let today = new Date()
  searchYear.value = today.getFullYear()
  searchMonth.value = today.getMonth()+1
  minDate.value = new Date(searchYear.value,searchMonth.value-2,1)
}
const getHistoryTime = (year:number,month:number)=>{
  console.log(month);
  if (store.platformInfo.userId=='guest') {
    loadingShow.value = false
    return
  }
  let encryptParam = encryptGcm("hisMonth="+year+"-"+month+"&tagId="+store.platformInfo.askplatform+store.platformInfo.location+"_"+store.platformInfo.userId+"&dataType=json",'QZPM1029WXON3847')
  let data = {
    custType:sessionStorage.getItem("CustType2"),
    wParam:encryptParam
  }
    httpszzt.getrequest(store.platformInfo.requestHead+store.platformInfo.requestDomain+"/online/webChatHisDate",data).then((res:any)=>{
      
      historyRecord.value = historyRecord.value.concat(res.data.msgList)
      historyRecord.value = [...new Set(historyRecord.value)]
      console.log("获取完毕---------",res.data.msgList,historyRecord.value);
      loadingShow.value = false
    }).catch(()=>{
      loadingShow.value = false
    });
}

const loadMoth = (obj:any)=>{
    getHistoryTime(obj.date.getFullYear(),obj.date.getMonth()+1);
}

const sortList = (list:Array<string>,keyitem:Date)=>{
  return list.filter((item:string)=>{
    let date=Date.parse(item.replace(/\-/g,'/'))
    let keydate = keyitem.getTime()
    return date>=keydate
  })
}

const selectDate = (value:any)=>{
  // console.log(9999,sortList(historyRecord.value,value));
  store.platformInfo.searchingHistory = false
  store.platformInfo.searchTime = dateFormat(value).split(" ")[0]
  store.platformInfo.searchTimeList = sortList(historyRecord.value,value)
  nextTick(()=>{
    store.platformInfo.searchingHistory = true
    emit("close");
  })
}


const formatter = (day:any)=>{
  let month = day.date.getMonth()+1
  if (month<10) {
    month = "0"+month
  }
  let daytime = day.date.getDate()
  if (daytime<10) {
    daytime = "0"+daytime
  }
  let date = day.date.getFullYear()+"-"+month+"-"+daytime
  if (historyRecord.value.indexOf(date)===-1) {
    day.type = "disabled"
  }
  
  return day
}
const closeWindow = ()=>{
  emit("close");
}
function dateFormat(time: Date, type?: string) {
  let date = new Date(time);
  let year = date.getFullYear();
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  // 拼接
  if (type == "time") {
    return month + "-" + day + " " + hours + ":" + minutes;
  }
  if (type == "yeartime") {
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
  }
  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
}
</script>

<style lang="less">
.historyCalendarWindow{
  position: fixed;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
z-index: 10;
.mainWindow{
  position: absolute;
  top: 20%;
  height: 80%;
  width: 100%;
  background: #ffffff;
  border-radius: 15px 15px 0px 0px;
  .van-calendar{
    height: 88%;
  border-radius: 15px 15px 0px 0px;
  }
  .closeCalender {
    position: absolute;
    left: 4%;
    top: 2.2%;
    width: 4%;
    object-fit: contain;
    z-index: 3;
  }
  .loading{
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(255, 255, 255, 0.600);
    border-radius: 15px 15px 0px 0px;
    .loadingIcon{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .calenderTips{
    position: absolute;
    top: 90%;
    width: 100%;
    text-align: center;
    color: #929292;
    font-size: 0.8rem;
    >p{
      margin-top: 0px;
    }
  }
}
}
@media screen and (min-width: 600px) {
  .historyCalendarWindow{
.mainWindow{
  position: absolute;
  top: 2%;
  left: 34%;
  height: 88%;
  width: 60%;
  background: #ffffff;
  border-radius: 15px 15px 15px 15px;
  .van-calendar{
    height: 90%;
  border-radius: 15px 15px 15px 15px;
  }
  .closeCalender {
    left: 4%;
    top: 2%;
    width: 3%;
  }
}
}
}
</style>
