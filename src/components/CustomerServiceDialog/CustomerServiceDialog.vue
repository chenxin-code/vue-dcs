<template>
  <div class="main">
    <van-popup v-model:show="show" round>
      <div class="card">
        <div class="text">是否结束当前会话？</div>
        <div class="btns">
          <div class="btn active" @click="onClickDisconnect">是</div>
          <div class="btn" @click="show=false">否</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="showPingjia" round>
      <div class="pingjiaCard">
        <div class="tl">请对本次服务做出评价：</div>
        <div
          class="pingjiaBtn"
          :key="index"
          v-for="(item,index) in pingjiaList"
          :class="{isChoose : item.isActive}"
          @click="choosePingjiaBtn(item)"
        >{{item.text}}</div>
        <div class="tijiao" @click="subMit">提交</div>
      </div>
    </van-popup>
    <van-popup v-model:show="showPingjia2" round>
      <div class="pingjiaCard">
        <div class="tl">请选择对客服不满意的原因</div>
        <div
          class="pingjiaBtn"
          :key="index"
          v-for="(item,index) in pingjiaList2"
          :class="{isChoose : item.isActive}"
          @click="choosePingjiaBtn2(item)"
        >{{item.text}}</div>
        <div class="tijiao" @click="subMit2">提交</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import {
  defineProps,
  ref,
  computed,
  toRaw,
  onMounted,
  defineExpose,
  onUnmounted,
  nextTick,
  watch
} from "vue";
// import { message } from "ant-design-vue";
// import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { TermAdapter } from "@/adapters";
import { sendKefuPingjia } from "@/service/customerservice";
import { encryptGcm } from "@/utils/aes.js";
import { store } from "@/store/store";
import {
  encryptedSM2,
  decryptedSM2,
  encryptedSM4
} from "@/public/encrypted/index";
import Moss, {
  CustInfo,
  Message,
  MessageType,
  MessageState
} from "@/public/Moss";
import MsgHandler from "@/public/Moss/MsgHandler";
import Utils from "@/utils/customerutils";
import { Dialog ,Toast } from "vant";
const show = ref(false);
const pingjia1 = ref('')
const showPingjia = ref(false);
const showPingjia2 = ref(false);
const seasonTitle2 = ref('')
const isFirst = ref(true)
const pingjiaList2 = ref([
  // { text: "业务规定或处理效率", id: "1", isActive: true },
  // { text: "需要通过其他渠道办理", id: "2", isActive: false },
  // { text: "系统或APP使用操作不畅", id: "3", isActive: false },
  // { text: "上述以外的其他原因", id: "4", isActive: false }
]);
const pingjiaList = ref([
  // { text: "非常满意", id: "1", isActive: true },
  // { text: "满意", id: "2", isActive: false },
  // { text: "对客服不满意", id: "3", isActive: false },
  // { text: "对其他不满意", id: "4", isActive: false }
]);

const mossObject = ref(null);
const valid = ref(false); // 是否可用
const callInfo = ref(null); // 会话信息
const msgHandler = ref(null); // 处理消息的类
const emit = defineEmits([
  "handleOnMessage",
  "changeConnectStage",
  "handleOnTips"
]);
onMounted(() => {
  console.log(123);
  // nextTick(() => {
  //   initmoss();
  // });
});
onUnmounted(() => {
  onClickDisconnect();
});

const initmoss = async() => {
  const options = [store.platformInfo.askplatform +store.platformInfo.location +"_" +store.platformInfo.userId, navigator.userAgent.includes('iPhone') ? 'iOS' : 'Android', "app", sessionStorage.getItem('software'), "1.0.0", sessionStorage.getItem('CustType2'), 1]
  console.error('initmoss options:',options)
 // Moss.Init(TermAdapter.Inst.SdkOptions())
   await Moss.Init(options)
    .then(data => {
      mossObject.value = Moss.Inst;
      valid.value = mossObject.value.Valid;
      callInfo.value = mossObject.value.CallInfo;
      msgHandler.value = mossObject.value.MsgHandler;
      mossObject.value.On("IMClosed", onClosed);
      mossObject.value.On("IMReceived", onMessage);
      mossObject.value.On("Prompt", onPrompt);
      mossObject.value.On("SurveyType", onSurveyType);
      mossObject.value.On("SurveyStart", onSurveyStart);
      console.log("callInfo为：", callInfo.value);
   
    })
    .catch(err => {
      console.log("err-----初始化失败", err);
    });
};
const loading = ref(false); // 是否加载中
const inputText = ref(""); // 输入的文字
const custInfoObj = ref(new CustInfo()); // 格式化后的custInfo

const msgs = computed(() => msgHandler.value.Messages);
const custInfo = ref(CustInfo.TestObject().ToJson());
Utils.GetIP()
  .then(ip => {
    console.log("GetIP", ip);
    custInfo.value.custIP = ip;
  })
  .catch(() => {
    // 没联网获取失败了
  });
const getCustInfo = ()=>{
  // let info = store.getplatformInfo() 320890000000512015
  //  console.log('改变custInfo 的值：',info)
  custInfoObj.value.CustType(sessionStorage.getItem('CustType2'));
  //custInfoObj.value.CustNo(store.getplatformInfo().userId);
  custInfoObj.value.CustName(store.getplatformInfo().userName || '');
  custInfoObj.value.RobotId(sessionStorage.getItem('sessionid'));
  //custInfoObj.value.Attr1("320890000000512015");
  if(store.getplatformInfo().userId.length === 18){
     custInfoObj.value.Attr1(store.getplatformInfo().userId) 
     custInfoObj.value.CustNo('')
  }else{
     custInfoObj.value.CustNo(store.getplatformInfo().userId)
  }
};
//reload innit connect
const reloadPageAndConnect= async(reaon)=>{
   //await location.reload()
   window.dwr.engine._dwrSessionId = null
   window.dwr.engine._initializer.init()
   await initmoss()
   await onClickConnect(reaon)
}
const onClickConnect = async(reaon) => {
  if(isFirst.value){
    await initmoss()
    isFirst.value = false
  }
  if (valid.value) return;

  // 中断连接
  // if (loading.value)
  //   return mossObject.value.CancelIM().then(() => {
  //     loading.value = false;
  //   });

  if (!custInfo.value) return console.log("无用户信息");
  // emit("handleOnTips", "正在为您连接人工客服，请耐心等待");
 // loading.value = true;
  custInfoObj.value.FromJson(custInfo.value);
  getCustInfo()
  console.log(
    "------custInfo----",
    custInfoObj.value
  );
  custInfoObj.value.TransferReason(reaon);
  // console.log("mossobj",mossObject.value.Connect);
  console.log("改变原因之后的custInfoObj：", custInfoObj.value.ToString());
  await mossObject.value
    .Connect(encryptGcm(custInfoObj.value.ToString(),'QZPM1029WXON3847'),(res)=>{ 
      console.error('Connect res:',res)
      if(res != '0'){
        //reload innit connect
       reloadPageAndConnect(reaon)
      }
    })
    .then(res => {
      valid.value = true;

      console.log("-------------连接成功 callid---------------", res.callId);
      callInfo.value.callId = res.callId;
      emit("changeConnectStage", true, res.welcome_Msg || "", "kefuFirst");
      // message.success({ content: "连接成功" });
      // return TermAdapter.Inst.LoadHistory(10); // 暂时用10页测试一下
    })
    .then(res => {
      console.log("历史信息", res);

      msgHandler.value.Add([
        {
          seq: msgHandler.value.Seq,
          type: MessageType.SYSTEM,
          text: `客服${callInfo.value.agent_name}正在为您服务`
        },
        {
          seq: msgHandler.value.Seq + 1,
          type: MessageType.NORMAL,
          text: callInfo.value.welcome_Msg,
          state: MessageState.SUCCESS,
          from: callInfo.value.agent_Id,
          to: callInfo.value.callId
        }
      ]);
    })
    .catch(error => {
      console.error("------error-----连接人工失败", error);
      emit("changeConnectStage", false, error);
     // initmoss();
      // message.error({ content: "连接失败" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const onClickDisconnect = () => {
  show.value = false;
  if (!valid.value) return;
  // message.warn({ content: "连接未开启" });

  if (loading.value) return;
  mossObject.value.ReleaseIM("00", callInfo.value.callId).then(res => {
    console.log("断开连接返回的信息", res);
  });
};

const onClickCallMenu = () => {
  msgHandler.value.Add(
    new Message({
      seq: msgHandler.value.Seq,
      type: MessageType.Menu,
      extra: [{ label: "客户留言", callback: onClickLeaveMessage }]
    })
  );
};

const onClickSendText = inputText => {
  // console.log(999,valid.value,inputText);
  if (!valid.value) return console.log("-----初始化未成功-----");
  if (!inputText) return;
  let msg = new Message({
    seq: msgHandler.value.Seq,
    text: inputText,
    type: MessageType.NORMAL,
    state: MessageState.PENDING,
    from: callInfo.value.callId,
    to: callInfo.value.agent_Id
  });
  mossObject.value
    .SendMsg(inputText, msg.Seq())
    .then(() => {
      console.log("-------------成功消息------------", inputText);
      msg.State(MessageState.SUCCESS);
      msg.SendTime(new Date().getTime());
      msgHandler.value.Set(msg);
    })
    .catch(err => {
      console.log("点击发送消息失败", err);
      msg.State(MessageState.FAILED);
      msg.SendTime(new Date().getTime());
      msgHandler.value.Set(msg);
    });
  msgHandler.value.Add(msg); // 发送后立即添加，添加消息会增加Seq
};

const onClickResend = msg => {
  mossObject.value
    .SendMsg(msg.Text(), msg.Seq())
    .then(() => {
      msg.State(MessageState.SUCCESS);
      msg.SendTime(new Date().getTime());
      msgHandler.value.Set(msg);
    })
    .catch(() => {
      msg.State(MessageState.FAILED);
      msg.SendTime(new Date().getTime());
      msgHandler.value.Set(msg);
    });
};

const onMessage = (info, msg) => {
  msg = unescape(msg);
  console.log("----------返回信息-----", info, msg);
  console.log("----------callInfo-----", callInfo.value);
  emit("handleOnMessage", msg);
  let [msgId, sendTime] = info.split("#");
   window.MosPhone.msgReceived(msgId);
  // console.log();
  // let message = new Message({
  //   id: msgId,
  //   sendTime,
  //   text: msg,
  //   from: callInfo.value.agent_Id,
  //   to: callInfo.value.callId,
  //   type: MessageType.NORMAL,
  //   state: MessageState.SUCCESS
  // });
  // msgHandler.value.Add(message);
  // mossObject.value.MsgReceived(msgId, callInfo.value.callId);
};
const onPrompt = msg => {
  console.log("onPrompt hahaha:", msg);
  emit("handleOnTips", msg);
};
const onSurveyStart = (msg) => {
  onSurveyType(msg)
  console.log(
    "onSurveyStart.. 收到这个事件表示 要做评价 pingjiaList:",
    pingjiaList.value
  );
  showPingjia.value = true;
};
const onSurveyType = msg => {
  console.log("onSurveyType123:", msg);
  try {
    const obj = JSON.parse(msg);
    console.log("obj:", obj);
    if (obj && obj.fstReview_GRP.length) {
      pingjiaList.value = obj.fstReview_GRP.map((item, index) => {
        return {
          text: item.Prim_Cgy_Dsc,
          id: item.Prim_Cgy_ECD,
          isActive: index === 0 ? true : false,
          secReview_GRP: item.secReview_GRP || [],
          Rsrv_Fld_1: item.Rsrv_Fld_1
        };
      });
      console.log("pingjiaList:", pingjiaList.value);
    }
  } catch (error) {
    console.log("pingjiaList err:", pingjiaList.value);
  }
};
const onClosed = (callId, close_Msg) => {
  console.log("----------onClosed id msg-----", callId, close_Msg);
  emit("changeConnectStage", false, close_Msg);
  msgHandler.value.Add({
    type: MessageType.NORMAL,
    text: close_Msg,
    state: MessageState.SUCCESS,
    from: callInfo.value.agent_Id,
    to: callInfo.value.callId
  });
  valid.value = false;
};

const onClickLeaveMessage = () => {
  if (!valid.value) return;
  if (!inputText.value) return;
  let message = new Message({
    seq: msgHandler.value.Seq,
    text: inputText.value,
    from: callInfo.value.callId,
    to: callInfo.value.agent_Id,
    type: MessageType.NORMAL,
    state: MessageState.PENDING
  });
  mossObject.value
    .LeaveMsg(
      custInfoObj.value.ToString(),
      "00",
      "00",
      inputText.value,
      "",
      "00"
    )
    .then(() => {
      message.State(MessageState.SUCCESS);
      message.SendTime(new Date().getTime());
      msgHandler.value.Set(message);
    })
    .catch(() => {
      message.State(MessageState.FAILED);
      message.SendTime(new Date().getTime());
      msgHandler.value.Set(message);
    });
  msgHandler.value.Add(message);
  inputText.value = "";
};
//用户主动点断开链接
const closeKefu = () => {
  show.value = true;
  //  emit('onClickDisconnect')
  //showPingjia.value = true
};
window.$closeKefu = closeKefu
const subMit = () => {
  showPingjia.value = false;
  let chooseItem = pingjiaList.value.find(item => item.isActive);
  console.log("选择的是：", chooseItem);
  //pingjia1.value = chooseItem.Prim_Cgy_ECD
  if (chooseItem.secReview_GRP.length) {
    pingjia1.value = chooseItem.id;
    setTimeout(() => {
      pingjiaList2.value = chooseItem.secReview_GRP.map((item, index) => {
        return {
          text: item.Subcls_Dsc,
          id: item.Subcls_ECD,
          isActive: index === 0 ? true : false,
          secReview_GRP: item.secReview_GRP || [],
          Rsrv_Fld_1: item.Rsrv_Fld_1
        };
      });
      console.log("");
      showPingjia2.value = true;
    }, 500);
  } else {
    const pa = {
      callid: callInfo.value.callId,
      type: chooseItem.id
    }
    console.log(pa)
    sendKefuPingjia(pa).then(res => {
      console.log("一个评价 res:", res);
    });
    // Dialog.alert({
    //   title: "提示",
    //   message: chooseItem.Rsrv_Fld_1
    // });
    Toast(chooseItem.Rsrv_Fld_1);
  }
};
const subMit2 = () => {
  showPingjia2.value = false;
  let chooseItem = pingjiaList2.value.find(item => item.isActive);
  Toast(chooseItem.Rsrv_Fld_1);
  // Dialog.alert({
  //   title: "提示",
  //   message: chooseItem.Rsrv_Fld_1
  // });
  sendKefuPingjia({
    callid: callInfo.value.callId,
    type: pingjia1.value,
    untype: chooseItem.id
  }).then(res => {
    console.log("二个评价 res:", res);
  });
  //pingjia2.value = chooseItem.Prim_Cgy_ECD
};
const choosePingjiaBtn = i => {
  if (i.isActive) return;
  pingjiaList.value = pingjiaList.value.map(item => {
    return {
      text: item.text,
      id: item.id,
      isActive: item.id == i.id ? true : false,
      secReview_GRP: item.secReview_GRP || [],
      Rsrv_Fld_1: item.Rsrv_Fld_1
    };
  });
};
const choosePingjiaBtn2 = i => {
  if (i.isActive) return;
  pingjiaList2.value = pingjiaList2.value.map(item => {
    return {
      text: item.text,
      id: item.id,
      isActive: item.id == i.id ? true : false,
      secReview_GRP: item.secReview_GRP || [],
      Rsrv_Fld_1: item.Rsrv_Fld_1
    };
  });
};

defineExpose({
  onClickConnect,
  onClickSendText,
  onClickDisconnect,
  onMessage,
  closeKefu,
  initmoss
});
</script>

<style lang="less" scoped>
@import url("./styles/index@default.less");
</style>
