<template>
<div class="gifWindow" :class="{touzi:istouzi}" :style="{height:gifWindowheight+'px'}">
	<!-- <div v-show="!istouzi" class="runninglogo"><img class="runningImg" id="runningImg" src="../../../public/static/images/logo-move.png"></div> -->
    <div v-show="!istouzi&&store.platformInfo.qiyeshoujiyinhang" class="uselogowindow"><img  :src="uselogsrc"></div>
</div>
</template>

<script lang="ts" setup>
import { defineEmits,ref,defineProps,onMounted,watch,computed } from "vue";
import { getQueryVariable } from "@/utils/utils.js";
import httpszzt from "@/api/reqszzt";
import { encryptGcm } from "@/utils/aes.js";
import { store } from "@/store/store";
interface Inprops {
    questionforlogo:string,
    useName:string
}
const props = defineProps<Inprops>()
watch(()=>props.questionforlogo,(val)=>{
  requestuselog(val);
})
watch(()=>props.useName,(val)=>{
  if (val=="投资理财") {
    istouzi.value = true
  }
  else{
    istouzi.value = false
  }
})
const emit = defineEmits(["selectedBar","showguesslist"]);
const logodom = ref('');
const uselogsrc = ref('./static/images/BJ01.png');
const istouzi = ref(false);
const gifWindowheight = ref(0);
onMounted(()=>{
  gifWindowheight.value = document.body.clientHeight
    // logodom.value = document.getElementById('runningImg')
    // let num = 0
    // setInterval(()=>{
    //     if (num<-2700) {
    //         num = 0
    //     }
    //     else{
    //         num = num -100
    //     }
    //     logodom.value.style.top = num+'%'
    // },3400/29)
})

const requestuselog = (str:string)=>{
    if (str==''||!store.platformInfo.qiyeshoujiyinhang) {
        return
    }
    console.log(9999,str);
  let word = "foreign-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
  let baseurl = process.env.NODE_ENV == "development"?"http://192.168.8.164:8892/dh-digital/manager/dg/getIcon?data=":" https://dh.match.ccb.com/dh-digital/manager/dg/getIcon?data="
     httpszzt
    .get(
      baseurl+str,token
    )
    .then((res: any) => {
        // console.log("res7777",res.data.msg);
        uselogsrc.value = res.data.msg;
    }).catch(()=>{
        uselogsrc.value = './static/images/BJ01.png';
    })
}

</script>

<style lang="less">
.gifWindow{
    position: absolute;
    left: -2vw;
    top: 0%;
    width: 104vw;
    height: 100vh;
    z-index: 100;
	background:url(../../../public/static/images/runningbackground.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
	.runninglogo{
		position: absolute;
		left: 0%;
		top: 11.3%;
		width: 100%;
		height: calc(100vw/1080*260);
        overflow: hidden;
        .runningImg{
            position: relative;
            width: 100%;
            object-fit: cover;
            top: 0%;
            // animation: upward 1s linear infinite;
        }
        @keyframes upward {
          from {
            top: 0%;
          }
          to {
            top: -2900%;
          }
        }
	}
    .uselogowindow{
        position: absolute;
        top: 27.5%;
    right: 5.5%;
    width: 28.5%;
    height: 7%;
    >img{
        position: absolute;
        width: 100%;
        object-fit: contain;
    }
    }
  }
  .gifWindow.touzi{
    background:url(../../../public/static/images/touzibackground.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  @media screen and (min-width: 600px) {
    .gifWindow{
    position: absolute;
    left: 0%;
    top: 0%;
    width: 100vw;
    height: 100vh!important;
    z-index: 100;
	background:url(../../../public/static/images/runningbackground_pc.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .uselogowindow{
    right: unset;
        top: 36%;
    left: 17%;
    width: 16.2%;
    height: 17.2%;
    >img{
        width: 100%;
        height: 100%;
        object-fit: unset;
    }
    }
  }
  .gifWindow.touzi{
    background:url(../../../public/static/images/touzibackground.png);
  }
  }
</style>
