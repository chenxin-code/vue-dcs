<template>
    <div class="question_tip">
      <div class="tagselectbar" :class="{isbackground:ttsaWork}">
        <!-- <div class="tagList">
          <div class="tagItem" :class="{seleted:item==selectedtag}" v-for="item in tagList" :key="item" @click="selectTag(item)"><p>{{item}}</p><div class="selectedstatus" v-show="item==selectedtag"></div></div>
        </div> -->
        <p class="title">猜你想问</p>
      </div>
      <div class="content">
        <div class="operatezone"><p class="guesstitle" v-html="'换一换'" @click="changeQuestion"></p><div class="change" @click="changeQuestion"><img src="@/assets/img/refresh.png"></div></div>
       <div class="quesitionzone">
        <div v-show="!loadquestionerror" v-for="item in randomQuestionList" :key="item" @click="askItem(item)">{{item}}</div>
        <div class="loaderror" v-show="loadquestionerror" @click="refresh">
          <p>网络连接超时，请刷新重试</p>
          <img src="@/assets/img/errorrefresh.png">
        </div>
       </div>
      </div>
       </div>
</template>

<script lang="ts" setup>
import { defineEmits,onMounted,ref ,nextTick,defineProps,watch} from "vue";
import http from "@/api/req";
import { store } from "@/store/store";
interface Inprops {
    ttsaWork:boolean
}
const props = defineProps<Inprops>()
// onMounted(()=>{    
// })
watch(()=>store.platformInfo.location,()=>{
    nextTick(()=>{
      selectTag(tagList.value[0]);
    })
},{immediate:true})
watch(()=>store.platformInfo.askplatform,()=>{
    selectTag(tagList.value[0]);
})
const selectedtag = ref('');
const tagList = ref(["热点问题","账户服务","转账支付","投行业务","普惠金融"])
const questionVal = ref('')
const questionList:any = ref([]);
const randomQuestionList:any = ref([]);
const adjusted = ref(false)
const loadquestionerror = ref(false)

const selectTag = (str:string)=>{
  if (selectedtag.value!=str) {
    selectedtag.value = str
  requestquestion(str);
  }
}
const requestquestion = (str:string)=>{
  switch (str) {
    case "热点问题":
      questionVal.value = "cjwt_05"
      break;
      case "账户服务":
      questionVal.value = "cjwt_01"
      break;
      case "转账支付":
      questionVal.value = "cjwt_02"
      break;
      case "投行业务":
      questionVal.value = "cjwt_03"
      break;
      case "普惠金融":
      questionVal.value = "cjwt_04"
      break;
    default:
      break;
  }
  http("/dwr/mobilehot-question.action?platform="+store.platformInfo.askplatform+"&location="+store.platformInfo.location).then((res)=>{
    // let getanswer = getXMLNode({xmlStr:res.data})
    // questionList.value = getanswer?.split('!@#$');
    questionList.value = res.data
    randomQuestionList.value = getramdomlist(JSON.parse(JSON.stringify(questionList.value)),5)
    loadquestionerror.value = false
    nextTick(()=>{
      if (!adjusted.value) {
        emit("adjust");
      adjusted.value = true
      }
    })
  }).catch(()=>{
    loadquestionerror.value = true
  })
}
const refresh = ()=>{
  requestquestion(selectedtag.value)
}
const changeQuestion = ()=>{
  randomQuestionList.value = getramdomlist(JSON.parse(JSON.stringify(questionList.value)),5)
}

const askItem = (str:string)=>{
emit("askguessquestion",str)
}
const emit = defineEmits(["askguessquestion","adjust"])

const getramdomlist = (arry:any,num:number):any=>{
  let arr = arry;
let result:any = [];
let ranNum = num;
for (let i = 0; i < ranNum; i++) {
let ran = Math.floor(Math.random() * (arr.length - i));
if(result.includes(arr[ran])){
            continue;
}
result.push(arr[ran]);
arr[ran] = arr[arr.length - i - 1];
}
return result
}
const getXMLNode = (parm:any)=>{
      let str=parm.xmlStr;
      //创建文档对象
      let xmlDoc = new DOMParser().parseFromString(str, "text/xml");
      let finds=xmlDoc.getElementsByTagName('Content');   //获取find节点
      return finds[0].textContent
    }
const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
const RandomIndex=(min:any, max:any, i:any)=>{
    let index = Math.floor(Math.random()*(max-min+1)+min),
        numStart = _charStr.length - 10;
    //如果字符串第一位是数字，则递归重新获取
    if(i==0&&index>=numStart){
        index = RandomIndex(min, max, i);
    }
    //返回最终索引值
    return index;
}
    const getRandomString= (len:number)=>{
    let min = 0, max = _charStr.length-1, _str = '';
    //判断是否指定长度，否则默认长度为15
    len = len || 15;
    //循环生成字符串
    for(let i = 0, index; i < len; i++){
        index = RandomIndex(min, max, i);
        _str += _charStr[index];
    }
    return _str;
}
</script>

<style lang="less">
      .question_tip{
          position: relative;
    height: fit-content;
    width: 100%;
    left: 0%;
    top: 1%;
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.78);
.tagselectbar{
      position: relative;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.78);
    border-radius: 10px 10px 0px 0px;
    overflow-x: scroll;
    overflow-y: hidden;
    background: url(../assets/img/titleBg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
    .title{
      height: 40px;
      line-height: 40px;
      font-size: 1rem;
      width: fit-content;
      margin: 0px;
      margin-left: 20px;
      font-family: FZLanTingHei-B_GB18030;
      font-weight: bold;
      color: #4368EB;
    }
    .tagList{
      position: relative;
      display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    height: 100%;
      .tagItem{
      position: relative;
      font-size: 0.8rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3C3C3C;
      white-space: nowrap;
      margin-left: 12px;
      >p{
        height: 95%;
      }
      .selectedstatus{
      position: absolute;
      bottom: 8%;
      left: 25%;
      width: 50%;
      height: 2px;
      border-radius: 1px;
      background: #557CF0;
    }
    }
    .tagItem.seleted{
      color: #557CF0;
    }
    }
}
.tagselectbar.isbackground{
  background: url(../assets/img/titleBg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.tagselectbar::-webkit-scrollbar{
  width: 0%;
  height: 0%;
}
.content{
  position: relative;
  width: 100%;
  top: 0%;
  left: 0%;
  display: flex;
    // background: rgba(255, 255, 255, 0.78);
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    border-radius: 0px 0px 10px 10px;
    justify-content: space-around;
    .operatezone{
      position: relative;
    left: 1%;
    width: 15%;
    height: 82%;
  .guesstitle{
    position: relative;
    font-size: 0.75rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #557CF0;
    background: linear-gradient(180deg, #88B6FF 0%, #4368EB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    top: 29%;
    margin: 0%;
  }
  .change{
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-top: 5px;
    // top: 29%;
    >img{
      width: 20%;
      object-fit: contain;
    }
    >p{
      font-size: 0.65rem;
    }
  }
}
.quesitionzone{
  position: relative;
  left: 1%;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: row;
  align-items: center;
  margin: 15px 0px;
  >div{
      font-size: 0.75rem;
      line-height: 0.95rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3C3C3C;
      text-overflow: -o-ellipsis-lastline;
	overflow: hidden;				//溢出内容隐藏
	text-overflow: ellipsis;		//文本溢出部分用省略号表示
	display: -webkit-box;			//特别显示模式
	-webkit-line-clamp: 2;			//行数
	line-clamp: 2;					
	-webkit-box-orient: vertical;
  margin: 6px 0px;
  width: 100%;
  }
  .loaderror{
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
  >p{
    font-size: 0.8rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #AEAEAE;
  }
  >img{
    width: 6%;
    object-fit: contain;
  }
}
}
}
    }
    @media screen and (min-width: 600px) {
      .question_tip{
    width: 80%;
    left: 0%;
.content{
    .operatezone{
      position: relative;
    left: 1%;
    width: 15%;
    height: 82%;
}
.quesitionzone{
  left: 1%;
  width: 80%;
  >div{
  width: 100%;
  }
}
}
    }
    }
</style>
