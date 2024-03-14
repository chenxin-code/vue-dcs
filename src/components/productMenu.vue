<template>
<div class="productMenuWindow">
  <div class="productDialog" v-show="!showBroadcast">
    <img class="closeBtn" src="@/assets/img/iframeclose.png" @click="closeWindow">
    <div class="dialogHead" @touchmove.prevent>
      <p>请选择您要咨询的产品</p>
    </div>
    <div class="dialogContent">
      <div class="title_area">
        <div class="pdtl_list">
          <div v-for="(item,index) in productList" :key="item.pdln" :class="{active:selectIndex==index}" @click="selectpdln(index)">{{item.pdln_NM}}<div v-if="!isPc"></div></div>
        </div>
      </div>
      <div class="main_area" id="scrollid" :ontouchstart="touchstart" :ontouchmove="touchmove">
        <div class="pdg_list">
          <div class="pdg_item" v-for="item in selectItem" :key="item.pd_GRP">
            <div class="item_title">{{item.pd_GRP_NM}}</div>
            <div class="button_list">
              <div class="item_button" v-for="ele in item.children" :key="ele.bspd_ECD"><p @click="readProduct(ele)">{{ele.aspd_NM}}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <broadcast-product v-if="showBroadcast" @play="broadcast" @close="backtoList" :productInfo="productInfo"  @interrupt="interrupt" :isStatic="isStatic" @changemute="changemute"></broadcast-product>
  </div>
    
</template>

<script lang="ts" setup>
import { defineProps,defineEmits,onMounted,ref,nextTick } from "vue";
import broadcastProduct from "@/components/broadcastProduct.vue";
import httpszzt from "@/api/reqszzt";
import { encryptGcm } from "@/utils/aes.js";
import isPc from "@/utils/isPc.js";
import { store } from "@/store/store";
// import { staticproduct } from "@/public/productList";
// interface Inprops {
//     url:string
// }
// const props = defineProps<Inprops>()
onMounted(()=>{
  document.getElementById("backtohomeBtn").style.display = "none"
  
let word = "foreign-" + Date.parse(new Date());
  let keyStr = "szzhforeignqwert";
  let token = encryptGcm(word, keyStr);
    httpszzt
    .get(
      process.env.VUE_APP_BASE_TOBANKURL+"/qyBank/directory",
      token
    )
    .then((res: any) => {     
      if (res.data.code==200&&res.data.data) {
        let getData = res.data.data.filter((item:any)=>{return item.pdCmdpAtch.length&&item.pdCmdpAtch[0].atch_TPCD=="04"})
      let resolveData = findParent(getData,'pdln_NM','pdln_NM')
      resolveData.forEach((ele:any) => {
        ele.children = findParent(ele.children,'pd_GRP_NM','pd_GRP_NM')
      });
      productList.value = resolveData
      // let staticList = JSON.parse(JSON.stringify(staticproduct))
      // staticproduct.forEach(ele => {
      //   let index = productList.value.findIndex((item:any)=>{return item.pdln==ele.pdln})
      //   if(index>=0){
      //     productList.value[index].children=productList.value[index].children.concat(ele.children)
      //     // console.log(888888,index);
          
      //     staticList = staticList.filter((item:any)=>{
      //       return item.pdln!=ele.pdln
      //     })
      //   }
      // });
      // productList.value = productList.value.concat(staticList)
      selectItem.value = productList.value[selectIndex.value].children
      console.log('产品信息',productList.value); 
      }
      // else{
      //   productList.value = staticproduct
      //   selectItem.value = productList.value[selectIndex.value].children
      // }
    }).catch(()=>{
      // productList.value = staticproduct
        // selectItem.value = productList.value[selectIndex.value].children
    })
//811封板版本先写死
    // productList.value = staticproduct
    //     selectItem.value = productList.value[selectIndex.value].children

    nextTick(()=>{
      document.getElementById("scrollid").scrollTop = 1
    })
  // console.log(document.getElementById("scrollid").scrollHeight);
})

const productList = ref<any>(null);
const selectIndex = ref(0);
const selectItem = ref<any>(null);
const productInfo = ref<any>(null);
const showBroadcast = ref(false)
const isStatic = ref(false)

const touchstart = ()=>{
  if (document.getElementById("scrollid").scrollTop == 0) {
    document.getElementById("scrollid").scrollTop = 1
  }
}
const touchmove = ()=>{
  if (document.getElementById("scrollid").scrollTop == 0) {
    document.getElementById("scrollid").scrollTop = 1
  }
}
const readProduct = (item:any)=>{
  console.log('readProduct item:',item);
  if (!item.status) {
    let id = item.pdln+'_'+item.pd_GRP+"_"+item.bspd_ECD
    emit('record',id)
    isStatic.value = false
     productInfo.value = item
  showBroadcast.value = true
  }
  else{
    let id = item.pdln+'_'+item.pd_GRP+"_"+item.bspd_ECD
    emit('record',id)
    isStatic.value = true
     productInfo.value = item
  showBroadcast.value = true
  }
  
  //emit('recordHistory',item.aspd_NM+"介绍")
  store.platformInfo.isLogin ?  emit('recordHistory',item.aspd_NM+"介绍") : null  //如果登陆就要记录历史
}
const broadcast = (context?:string)=>{
  emit('play',context,"product")
}
const interrupt = ()=>{
  emit('interrupt')
}

const selectpdln = (index:number)=>{
  selectIndex.value = index
  selectItem.value = productList.value[selectIndex.value].children
}

const findParent = (originList:any,parentStatus:string,parentName:string):any=>{
  let resultData: { children: any[]; }[] = []
  originList.forEach((ele: { [x: string]: any; }) => {
    let status = resultData.findIndex(item=>{
      
          return item[parentStatus]==ele[parentStatus]
        }) 
        if (status==-1) {
          let obj = {children:[]}
          obj[parentName]=ele[parentName]
          obj[parentStatus]=ele[parentStatus]
          obj.children.push(ele)
          resultData.push(obj)
        }
        else{
          resultData[status].children.push(ele)
        }
  });
  return resultData
}
const backtoList = ()=>{
  showBroadcast.value = false
  emit('showAginMenu',productInfo.value.aspd_NM,true)
}
const emit = defineEmits(["close","play","interrupt","record","changemute","recordHistory","showAginMenu"])
const changemute = (val:boolean)=>{
  emit("changemute",val)
}
const closeWindow = ()=>{
  document.getElementById("backtohomeBtn").style.display = "block"
  emit("close")
}

</script>

<style lang="less" scoped>
.productMenuWindow{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index:200;
    top: 0px;
    left: 0px;
    .productDialog{
      position: absolute;
      left: 0%;
      top: 38%;
      width: 100%;
      height: 62%;
      background: #ffffff;
      border-radius: 10px 10px 0px 0px;
      overflow: hidden;
      .closeBtn{
        position: absolute;
        right: 2.7%;
        top: 3.5%;
        width: 4%;
        object-fit: contain;
        cursor: pointer;
        z-index: 2;
      }
    }
    .dialogHead{
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 12.5%;
      background: linear-gradient(0deg, rgba(255,255,255,0), #C2D7F5);
      border-radius: 10px 10px 0px 0px;
      >p{
        width: 100%;
        text-align: center;
        font-size: 1rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #111111;
      }
      // >img{
      //   position: absolute;
      //   right: 3.2%;
      //   top: 37%;
      //   height: 26%;
      //   object-fit: contain;
      //   z-index: 2;
      // }
    }
    .dialogContent{
      position: absolute;
      top: 12.5%;
      left: 0%;
      width: 100%;
      height: 100%;
      .title_area{
        position: absolute;
        left: 0%;
        top: 0%;
        width: 24%;
        height: 95%;
        border-right: 1px solid #EDEFF7;
        .pdtl_list{
          position: relative;
          display: flex;
          font-size: 0.85rem;
          width: 90%;
          left: 5%;
          text-align: center;
              flex-direction: column;
    flex-wrap: nowrap;
          >div{
            position: relative;
            display: inline-block;
            text-align: left;
            margin-bottom: 15px;
            >div{
            position: absolute;
            left: 25%;
            height: 100%;
            width: 50%;
            top: 10%;
          }
          }
          >div.active{
            color: #4368EB;
            >div{
              border-bottom: 2px solid #4368EB;
            }
          }
        }
      }
      .main_area{
        position: absolute;
        left: 25%;
        top: 0%;
        width: 74%;
        height: 80%;
        overflow: scroll;
        touch-action: auto;
        -webkit-overflow-scrolling:touch;
        z-index: 1;
        .pdg_list{
          position: relative;
          left: 5%;
          width: 92%;
          top: 0%;
          .pdg_item{
            font-size: 0.8rem;
            .item_title{
              font-weight: bold;
              margin-bottom: 10px;
              margin-top: 10px;
            }
            .button_list{
              display: flex;
                  flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
              .item_button{
              >p{
                background: #F4F6FA;
                border-radius: 50vh;
                width: fit-content;
                padding: 5px 12px;
                cursor: pointer;
                margin: 8px 0px;
                margin-right: 5px;
              }
            }
            }
          }
        }
      }
      .main_area::-webkit-scrollbar{
        width: 0px;
        height: 0px;
      }
    }
}
@media screen and (min-width: 600px) {
.productMenuWindow{
  .productDialog{
    left: 35%;
    top: 6%;
    width: 59%;
    height: 76%;
    border-radius: 10px 10px 10px 10px;
    .closeBtn{
      width: 3%;
    }
  }
  .dialogHead{
    display: none;
  }
  .dialogContent{
    top: 0%;
    .title_area{
      background: #E3E5F2;
      padding-bottom: 5%;
      padding-top: 3%;
      .pdtl_list{
        font-size: 1rem;
        width: 100%;
        left: 0%;
        text-align: center;
        >div{
          padding: 15px 10px;
        }
        >div.active{
          background: #4368EB;
          color: #ffffff;
        }
      }
    }
    .main_area{
      padding-bottom: 5%;
      padding-top: 5%;
      height: 95%;
    }
  }
}
}
</style>
