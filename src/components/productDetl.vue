<template>
<div class="productMenuWindow">
  <broadcast-product v-if="showBroadcast" @play="broadcast" @close="backtoList" :productInfo="productInfo"  @interrupt="interrupt" :isStatic="isStatic" @changemute="changemute"></broadcast-product>
  </div>
    
</template>

<script lang="ts" setup>
import { defineProps,defineEmits,onMounted,ref,nextTick ,computed} from "vue";
import broadcastProduct from "@/components/broadcastProduct.vue";
import httpszzt from "@/api/reqszzt";
import { encryptGcm } from "@/utils/aes.js";
import isPc from "@/utils/isPc.js";
import { store } from "@/store/store";
// import { staticproduct } from "@/public/productList";
interface IProps {
  showProductTitle: string
  notAgain:boolean
}

const props = defineProps({
  showProductTitle: '',
  notAgain:false,
})
onMounted(()=>{

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
        // let getData = res.data.data
        productList.value = res.data.data
      console.log('产品信息',productList.value); 
      console.log('title是：',props.showProductTitle)
  productInfo.value = productList.value.find((item:any)=>{
       return item.aspd_NM = props.showProductTitle
  })
  // productList.value.forEach((item:any)=>{
  //   if(item.aspd_NM === props.showProductTitle){
  //       console.log('找到了是谁：',item)
  //       productInfo.value = item
  //   }
  // })
  console.log('productInfo是：',productInfo.value)
  readProduct(productInfo.value)
  document.getElementById("backtohomeBtn").style.display = "none"
      }
    }).catch(()=>{
      // productList.value = staticproduct
      //   selectItem.value = productList.value[selectIndex.value].children
    })



  

//811封板版本先写死
    // productList.value = staticproduct
    // selectItem.value = productList.value[selectIndex.value].children


  // console.log(document.getElementById("scrollid").scrollHeight);
})

// const productList = computed(()=>{
//     let res:any = [] 
//     for(let i = 0; i <staticproduct.length;i++){
//         console.log('i:',i)
//         for(let j = 0; j < staticproduct[i].children.length;j++){          
//             let obj = staticproduct[i].children[j]
//             res = [...res,...obj.children]   
//         }
//     }
//     return res
// })
const productList = ref([]);
const selectIndex = ref(0);
const selectItem = ref<any>(null);
const productInfo = ref<any>(null)

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
    let id = item.pdln+'_'+item.pd_GRP+"_"+item.bspd_ECD
    emit('record',id)
    isStatic.value = false
     productInfo.value = item
  showBroadcast.value = true
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
  closeWindow()

}
const emit = defineEmits(["close","play","interrupt","record","changemute","recordHistory"])
const changemute = (val:boolean)=>{
  emit("changemute",val)
}
const closeWindow = ()=>{
  document.getElementById("backtohomeBtn").style.display = "block"
  if (!props.notAgain) {
    emit('recordHistory',props.showProductTitle)
  }
  emit("close",props.showProductTitle)
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
