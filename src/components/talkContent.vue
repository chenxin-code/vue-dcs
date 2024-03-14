<template>
  <div class="talkWindow" :style="{ height: talkWindowHeight }">
<!--    <div class="talkContent" :class="{ fade: isfade }">
      <div class="loading" v-show="loadingShow">
        <van-loading type="spinner" class="loadingIcon"/>
      </div>
      <div
          class="conversation"
          @scroll="scrollevent"
          @mousewheel="mousescroll"
          :ontouchstart="touchstart"
          :ontouchmove="touchmove"

      >
        <div
            v-for="item in historyList"
            :key="item.id"
            :class="[item.styletype]"
            v-show="!store.platformInfo.searchingHistory||recoverHistoryList"
        >
          <div v-if="!item.type" class="conversationList">
            <div v-html="item.content.split(cutKeyStr)[0]"></div>
            <div
                style="
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 33px;
              "
                v-if="item.content.split(cutKeyStr).length > 1"
            >
              {{ cutKeyStr }}
            </div>
            <div
                style="color: #557cf0; line-height: 33px"
                v-for="ele in checkMoreQuestion(item.content)"
                :key="ele"
                @click="sendChat(cutnumber(ele))"
                v-html="ele"
            ></div>
          </div>
          <div v-if="item.type == 'historytips'" class="conversationList">
            <div
                style="
                width: 100%;
                color: rgb(78, 78, 78);
                text-align: center;
                font-size: 0.6rem;
                margin: 10px 0px;
              "
            >
              {{ item.realcontent }}
            </div>
          </div>
          <div v-if="item.type == 'button'" class="conversationList">
            <button-answer-list
                :contentList="exchangeButtonAnswer(item.content)"
                @choosebutton="askitem"
            ></button-answer-list>
          </div>
          <div
              v-if="item.type == 'relativeanswer' && item.realcontent.length >= 1"
              class="conversationList"
          >
            <div
                v-for="ele in item.realcontent"
                :key="ele"
                style="color: #557cf0; line-height: 33px"
            >
              <div v-if="cutnumber(ele)" @click="sendChat(cutnumber(ele))">
                {{ ele }}
              </div>
              <div v-else v-html="ele" style="color: #3c3c3c"></div>
            </div>
          </div>
&lt;!&ndash;          <div v-if="item.type == 'guess'" class="conversationList">
            <guess-question-list
                @askguessquestion="askitem"
                @adjust="adjustWindow"
                :ttsaWork="ttsaWork"
            ></guess-question-list>
          </div>&ndash;&gt;
&lt;!&ndash;          <div v-if="item.type == 'selectuse'" class="conversationList">
            <select-use
                @callinneruse="callinneruse"
                @record="recordclick"
                @changeFade="changeFade"
                @openIframe="openIframe"
            ></select-use>
          </div>&ndash;&gt;
          <div v-if="item.type == 'noanswer'" class="conversationList">
            <transfer-to-person></transfer-to-person>
          </div>
          <div v-if="item.type == 'selectinneruse'" class="conversationList">
            <select-inner-use
                :askUseItem="item.realcontent.name"
                :jumpList="item.realcontent.child"
                :askUseId="item.realcontent.id"
                @record="recordclick"
            ></select-inner-use>
          </div>
        </div>
        <div
            v-for="item in historyListbydate"
            :key="item.id"
            :class="[item.styletype]"
            v-show="store.platformInfo.searchingHistory"
        >
          <div v-if="!item.type" class="conversationList">
            <div v-html="item.content.split(cutKeyStr)[0]"></div>
            <div
                style="
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 33px;
              "
                v-if="item.content.split(cutKeyStr).length > 1"
            >
              {{ cutKeyStr }}
            </div>
            <div
                style="color: #557cf0; line-height: 33px"
                v-for="ele in checkMoreQuestion(item.content)"
                :key="ele"
                @click="sendChat(cutnumber(ele))"
                v-html="ele"
            ></div>
          </div>
          <div v-if="item.type == 'historytips'" class="conversationList">
            <div
                style="
                width: 100%;
                color: rgb(78, 78, 78);
                text-align: center;
                font-size: 0.6rem;
                margin: 10px 0px;
              "
            >
              {{ item.realcontent }}
            </div>
          </div>
          <div v-if="item.type == 'button'" class="conversationList">
            <button-answer-list
                :contentList="exchangeButtonAnswer(item.content)"
                @choosebutton="askitem"
            ></button-answer-list>
          </div>
          <div
              v-if="item.type == 'relativeanswer' && item.realcontent.length >= 1"
              class="conversationList"
          >
            <div
                v-for="ele in item.realcontent"
                :key="ele"
                style="color: #557cf0; line-height: 33px"
            >
              <div v-if="cutnumber(ele)" @click="sendChat(cutnumber(ele))">
                {{ ele }}
              </div>
              <div v-else v-html="ele" style="color: #3c3c3c"></div>
            </div>
          </div>
&lt;!&ndash;          <div v-if="item.type == 'guess'" class="conversationList">
            <guess-question-list
                @askguessquestion="askitem"
                @adjust="adjustWindow"
                :ttsaWork="ttsaWork"
            ></guess-question-list>
          </div>&ndash;&gt;
&lt;!&ndash;          <div v-if="item.type == 'selectuse'" class="conversationList">
            <select-use
                @callinneruse="callinneruse"
                @record="recordclick"
                @changeFade="changeFade"
                @openIframe="openIframe"
            ></select-use>
          </div>&ndash;&gt;
          <div v-if="item.type == 'noanswer'" class="conversationList">
            <transfer-to-person></transfer-to-person>
          </div>
          <div v-if="item.type == 'selectinneruse'" class="conversationList">
            <select-inner-use
                :askUseItem="item.realcontent.name"
                :jumpList="item.realcontent.child"
                :askUseId="item.realcontent.id"
                @record="recordclick"
            ></select-inner-use>
          </div>
        </div>
&lt;!&ndash;        <div v-show="!store.platformInfo.searchingHistory||recoverTalk" class="welcome">我是您的专属客户经理</div>
        <guess-question-list
            @askguessquestion="askitem"
            v-show="!store.platformInfo.searchingHistory||recoverTalk"
            :ttsaWork="ttsaWork"
        ></guess-question-list>&ndash;&gt;
        <div
            v-for="item in conversationList"
            :key="item.id"
            :class="[item.styletype]"
            v-show="!store.platformInfo.searchingHistory||recoverTalk"
        >
          <div v-if="!item.type" class="conversationList">
            <div v-html="item.content.split(cutKeyStr)[0]"></div>
            <div
                style="
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 33px;
              "
                v-if="item.content.split(cutKeyStr).length > 1"
            >
              {{ cutKeyStr }}
            </div>
            <div
                style="color: #557cf0; line-height: 33px"
                v-for="ele in checkMoreQuestion(item.content)"
                :key="ele"
                @click="sendChat(cutnumber(ele))"
                v-html="ele"
            ></div>
          </div>
          <div v-if="item.type == 'button'" class="conversationList">
            <button-answer-list
                :contentList="exchangeButtonAnswer(item.content)"
                @choosebutton="askitem"
            ></button-answer-list>
          </div>
          &lt;!&ndash; <div v-if="item.type=='noanswer'&&item.realcontent.length<1" class="conversationList"><div> 小微被您的问题问住了，要不您换个问法试试，也许会有不一样的收获~ </div></div> &ndash;&gt;
          <div
              v-if="item.type == 'relativeanswer' && item.realcontent.length >= 1"
              class="conversationList"
          >
            &lt;!&ndash; <div>您想问的是这些问题吗？</div> &ndash;&gt;
            <div
                v-for="ele in item.realcontent"
                :key="ele"
                style="color: #557cf0; line-height: 33px"
            >
              <div v-if="cutnumber(ele)" @click="sendChat(cutnumber(ele))">
                {{ ele }}
              </div>
              <div v-else v-html="ele" style="color: #3c3c3c"></div>
            </div>
            &lt;!&ndash; <div v-if="checkAuditTime('8:30','17:30')">
              或者您也可以联系
              <a onclick="onlineChat('3')">人工客服</a>哦
            </div>
            <div v-else>或者您也可以在工作日8:30-17:30咨询人工客服</div> &ndash;&gt;
          </div>
          <div v-if="item.type == 'noanswer'" class="conversationList">
            <transfer-to-person></transfer-to-person>
          </div>
&lt;!&ndash;          <div v-if="item.type == 'guess'" class="conversationList">
            <guess-question-list
                @askguessquestion="askitem"
                @adjust="adjustWindow"
                :ttsaWork="ttsaWork"
            ></guess-question-list>
          </div>&ndash;&gt;
&lt;!&ndash;          <div v-if="item.type == 'selectuse'" class="conversationList">
            <select-use
                @callinneruse="callinneruse"
                @record="recordclick"
                @changeFade="changeFade"
                @openIframe="openIframe"
            ></select-use>
          </div>&ndash;&gt;
          <div v-if="item.type == 'selectinneruse'" class="conversationList">
            <select-inner-use
                :askUseItem="item.realcontent.name"
                :jumpList="item.realcontent.child"
                :askUseId="item.realcontent.id"
                @record="recordclick"
            ></select-inner-use>
          </div>
          &lt;!&ndash; time提示 &ndash;&gt;
          <div v-if="item.type == 'time'" class="conversationList">
            <div class="kefuTime">{{ item.content }}</div>
          </div>
          &lt;!&ndash; 客服第一次接入提示 &ndash;&gt;
          <div v-if="item.type == 'kefuFirst'" class="conversationList">
            <div class="kefuTips">{{ item.content }}</div>
            <div class="sucContent">
              <div class="words">人工客服</div>
              <img class="img" src="@/assets/img/intoKefu.png"/>
            </div>
          </div>
          &lt;!&ndash; 客服提示 &ndash;&gt;
          <div v-if="item.type == 'kefu'" class="conversationList">
            <div class="kefuTips">{{ item.content }}</div>
          </div>
          &lt;!&ndash; 客服聊天内容 &ndash;&gt;
          <div v-if="item.type == 'kefuWords'" style="display: flex">
            <div>
              <img class="touxiang" src="@/assets/img/intoKefu.png"/>
            </div>
            <div class="kefuSay" v-html="item.content"></div>
          </div>
          &lt;!&ndash; 点击直接跳产品目录答案 &ndash;&gt;
          <div v-if="item.type == 'bindToshowMenu'" class="conversationList">
            <div class="showMenu" v-html="item.content"></div>
          </div>
          <div v-if="item.evaluate" class="evaluate_content">
            <div class="like_btn" v-show="item.evaluate!='unlike'">
              <img src="@/assets/img/helpful.png" @click="commitRate(true,item.evaluate,item.id)"
                   v-show="item.evaluate!='like'"/>
              <img src="@/assets/img/helpful_highline.png" v-show="item.evaluate=='like'"/>
            </div>
            <div class="unlike_btn" v-show="item.evaluate!='like'">
              <img src="@/assets/img/helpless.png" @click="commitRate(false,item.evaluate,item.id)"
                   v-show="item.evaluate!='unlike'"/>
              <img src="@/assets/img/helpless_highline.png" v-show="item.evaluate=='unlike'"/>
            </div>
          </div>
        </div>
      </div>
    </div>-->
<!--    <div id="inputBar" class="inputBar" :class="{chooseExpression:expressionSelectShow}">
      <div class="changeInput" @click="changeInputType" v-if="!isPc">
        <img src="@/assets/img/keyboard.png" v-show="inputType == 'voice'"/>
        <img src="@/assets/img/microwphone.png"
             v-show="inputType == 'typer'&&!(store.platformInfo.feichiez&&getIsWxClient())"/>
      </div>
      <voice
          v-show="inputType == 'voice'"
          @sendChat="fillInputContent"
          @interrupt="interruptVoice"
          v-if="!isPc"
      ></voice>
      <div id="typerInput" class="typerInput" v-show="inputType == 'typer'">
        <div class="el_input_outer" :style="inputOutStyleObj">
          <div
              id="inputContent"
              ref="inputContent"
              class="el-input__inner"
              contenteditable="true"
              @input="inputEvent"
              :style="inputInStyleObj"
              placeholder=" 请输入查询信息~"
              v-html="inputWord"></div>
        </div>
        <div class="sentBtn" @click="sendTyper">
          <img src="@/assets/img/sendBtn.png"/>
        </div>
        <div class="expression_btn" @click="startSelectExpression">
          <img src="@/assets/img/emoj.png"/>
        </div>
      </div>
      <div class="inputBackground" v-show="inputType == 'typer'&&!isPc"
           :style="{height:inputBarBackgroundHeight}"></div>
    </div>-->
<!--    <disconnectKefu v-if="customerMode" @closeKefu="closeKefu"/>-->
<!--    <select-bar
        :isSelected="barSelected"
        :readtipsShow="readtipsShow"
        :upHeight=selectBarUpHeight
        @selectedBar="changeSelectWindow"
        @showguesslist="showguesslist"
        @interrupt="interruptVoice"
        @recordHistory="recordHistory"
    ></select-bar>-->
<!--    <data-record ref="dataRecordNode"></data-record>-->
<!--    <customer-service-dialog
        ref="transferToCustomer"
        @handleOnMessage="handleOnMessage"
        @changeConnectStage="changeConnectStage"
        @response="customerResponse"
        @handleOnTips="handleOnTips"
        v-if="true"
    ></customer-service-dialog>-->
    <init-info></init-info>
<!--    <product-menu
        @close="closeWindow"
        v-if="showProductMenu"
        @play="sendtomedia"
        @interrupt="interruptVoice"
        @record="recordclick"
        @changemute="changemute"
        @showAginMenu="recordHistory"
    ></product-menu>
    <product-Detl
        v-if="showProductDetail"
        :showProductTitle="showProductTitle"
        :notAgain="notAgain"
        @close="closeProductWindow"
        @play="sendtomedia"
        @interrupt="interruptVoice"
        @record="recordclick"
        @changemute="changemute"
        @recordHistory="showAginMenu"
    ></product-Detl>-->
<!--    <deal-notice
        @close="closeWindow"
        v-show="showDealNotice"
        @changetip="changetipState"
    ></deal-notice>-->
<!--    <show-frame
        v-if="frameShow"
        @close="closeiframe"
        :url="frameurl"
        :type="frameType"
        :usetitle="usetitle"
    ></show-frame>-->
<!--    <expression-select v-if="expressionSelectShow" @close="hideExpression" @outputemoj="addEmojToInput"
                       @sendContent="sendTyper"></expression-select>-->
<!--    <bad-rating-cause-form v-if="badRatingCauseShow" :causeList="causeList" @close="closeCauseForm"
                           @commit="recordRateResult"></bad-rating-cause-form>-->
<!--    <show-tips :tipsText="tipsText" :tipsIcon="tipsIcon" v-if="tipsText"></show-tips>-->
<!--    <guess-intention v-if="showGuessIntention" :upHeight="selectBarUpHeight" v-show="intentionList.length"
                     :intentionList="intentionList" @commitintention="selectIntention"></guess-intention>-->
<!--    <div class="downToBottomBtn" @click="adjustWindow" v-show="downToBottomShow&&!expressionSelectShow">
      <img src="@/assets/img/down_to_bottom.png"/>
      <p>回到底部</p>
    </div>-->
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  //nextTick,
  defineEmits,
  defineProps,
  watch,
  //computed,
} from "vue";
// import voice from "@/components/voice.vue";
// import selectBar from "@/components/selectBar.vue";
// import disconnectKefu from "@/components/disconnectKefu.vue";
// import selectUse from "@/components/selectUse.vue";
// import selectInnerUse from "@/components/selectInnerUse.vue";
// import buttonAnswerList from "@/components/buttonAnswerList.vue";
// import guessQuestionList from "@/components/guessQuestionList.vue";
import {call_client_pub} from "@/api";
import isPc from "@/utils/isPc.js";
// import {loadScript, getIsWxClient} from "@/utils/utils.js";
// import httpszzt from "@/api/reqszzt";
// import dataRecord from "@/components/dataRecord.vue";
// import productMenu from "@/components/productMenu.vue";
// import productDetl from "@/components/productDetl.vue";
// import customerServiceDialog from "@/components/CustomerServiceDialog/CustomerServiceDialog.vue";
// import dealNotice from "@/components/dealNotice.vue";
import initInfo from "@/components/initInfo.vue";
// import transferToPerson from "@/components/transferToPerson.vue";
// import {store} from "@/store/store";
// import {allUseList} from "@/public/alluselist";
// import {encryptGcm} from "@/utils/aes.js";
// import showFrame from "@/components/showFrame.vue";
// import {productNameToTrdSpinf} from "@/public/productNameToTrdSpinf";
// import expressionSelect from "@/components/expressionSelect.vue";
// import badRatingCauseForm from "@/components/badRatingCauseForm.vue";
// import showTips from "@/components/showTips.vue";
// import guessIntention from "@/components/guessIntention.vue";
// import {getQueryVariable} from "@/utils/utils.js";
// import {throttle} from 'lodash'




interface Inprops {
  ttsaWork: boolean;
  fluentWelcome: boolean;
}

const props = defineProps<Inprops>();
watch(
    () => props.fluentWelcome,
    (val) => {
      if (val) {
        //dataRecordNode.value.selectuserecord("shuzirentuiliu_open");
        //addConversation({content: "我是您的专属客户经理", styletype: "ansBack", type: false, realcontent: false, isSend: "mute"});
        // addConversation({content: "guess", styletype: "guess", type: "guess"});
        // if (store.platformInfo.qiyeshoujiyinhang) {
        //   addConversation({content: "selectuse", styletype: "selectuse", type: "selectuse"});
        // }

        //sendtomedia("欢迎光临");
      }
    }
);
// watch(
//     () => store.platformInfo.historyRecord,
//     () => {
//       if (store.platformInfo.historyRecord) {
//         addhistoryconversation(
//             "",
//             "",
//             "historytips",
//             "———— 上拉可加载历史记录 ————"
//         );
//       }
//     }
// );

//const dataRecordNode = ref(null);
//const answer = ref("");
//const askContext = ref("");
//const conversationList: any = ref([]);
//const inputType = ref("typer");
//const isfade = ref(false);
//const rejectfade = ref(true);
//const inputWord = ref("");
//const srcDataSessionId = ref("");

// const customerMode = ref(false);
// const transferToCustomer = ref(null);
// const connectTime = ref(null);

const u = navigator.userAgent;
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
onMounted(() => {
  sessionStorage.setItem("sessionid", getRandomString(32));
  //sessionStorage.setItem("userid", getRandomString(16));
  window.jumptouse = (str: string) => {
    let param = {FUNCTIONID: str, NEEDLOGIN: false};
    let jumpParam = JSON.stringify(param);
    call_client_pub("callNativePage", jumpParam);
  };
  // 手机银行打开新页面方法类似iframe
  window.showwebviewurl = (str: string) => {
    interruptVoice();
    if (isiOS) {
      let param = {loadUrl: str};
      let jumpParam = JSON.stringify(param);
      call_client_pub("showWebViewUrl", jumpParam);
    } else {
      call_client_pub("showWebViewUrl", str);
    }
  };

  // document.onselectionchange = () => {
  //   let selection = document.getSelection();
  //   if (selection.rangeCount > 0) {
  //     const range = selection.getRangeAt(0);
  //     if (inputContent.value.contains(range.commonAncestorContainer)) {
  //       rangeOfInputBox.value = range;
  //     }
  //   }
  // };
  // nextTick(() => {
  //   initialInputHeight.value = JSON.parse(JSON.stringify(document.getElementById("inputContent").clientHeight))
  // })

});
// const getEmojStr = (str: string) => {
//   //[emot]001.gif[/emot] => <img class="img" src="./static/phone_emots/001.gif"/>
//   const s = str.replace(
//       /\[emot\]([0-9]+\.gif)\[\/emot\]/g,
//       (m: string, n: string) => {
//         return String.raw`<img class="img" src="./static/phone_emots/${n}"/>`;
//       }
//   );
//   return String.raw`<div class="messagebox"><span class="message">${s}</span></div>`;
// };
// const customerResponse = (str: string) => {
//   addConversation({content: str, styletype: "ansBack", type: false, realcontent: false, isSend: "mute"});
// };
// const showAginMenu = (showProductTitle: string, status?: boolean) => {
//   addConversation({
//     content: `<div>小微已为您讲解${showProductTitle}相关内容，您可以<span style="color:#557cf0;" onclick="showProMenu('${showProductTitle}','${true}')">【点击这里】</span> 再次查看。也可以点击下方产品目录查看其他产品。</div>`,
//     styletype: "ansBack",
//     type: "bindToshowMenu"
//   });
// };
// const handleOnMessage = (str: string) => {
//   console.log("回复信息为：", str);
//   jurgeTime();
//   addConversation({content: getEmojStr(str.trim()), styletype: "kefuAns", type: "kefuWords"});
// };
// const handleOnTips = (str: string) => {
//   console.log("tip信息为：", str);
//   addConversation({content: str, styletype: "ansTip", type: "kefu"});
// };
// const changeConnectStage = (state: boolean, tips: string, type: string) => {
//   customerMode.value = state;
//   store.platformInfo.connectStage = state;
//   if (tips && tips !== "0") {
//     addConversation({content: tips, styletype: "ansTip", type: type || "kefu"});
//   }
// };
// const closeKefu = (str: string) => {
//   transferToCustomer.value.closeKefu();
// };

// 加载聊天框的内容
// interface conversationDataType {
//   content: string,
//   styletype: string,
//   type?: any,
//   realcontent?: any,
//   isSend?: string,
//   evaluate?: any
// }

// const addConversation = (
//     obj: conversationDataType
// ) => {
//   if (!obj.type) {
//     obj.type = false;
//     barSelected.value = false;
//   }
//   if (!obj.realcontent) {
//     obj.realcontent = "";
//   }
//   if (obj.styletype == "ansBack") {
//     obj.content = changelabelevent(obj.content);
//     obj.content = obj.content.replaceAll("&lt;br&gt;", "");
//     console.log("-------changelabelevent---------", obj.content);
//   }
//   if (obj.content == "ACS" || obj.content == "acs") {
//     obj.content = "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//     obj.realcontent = "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//     obj.styletype = "ansBack";
//     obj.type = "noanswer";
//   }
//   if (obj.styletype == "askBack") {
//     obj.content = "&nbsp;" + obj.content + "&nbsp;";
//   } //增加空格撑开气泡，用padding苹果手机会出现自动换行bug
//   let tab = new RegExp("#r#n#r#n", "g");
//   let enter = new RegExp("#r#n", "g");
//   obj.content = obj.content.replace(tab, "<p></p>");
//   obj.content = obj.content.replace(enter, "<div></div>");
//   let id =
//       conversationList.value.length > 0
//           ? parseInt(conversationList.value[conversationList.value.length - 1].id) +
//           1
//           : 0;
//   conversationList.value.push({
//     content: obj.content,
//     id,
//     styletype: obj.styletype,
//     type: obj.type,
//     realcontent: obj.realcontent,
//     evaluate: obj.evaluate
//   });
//   if (obj.styletype == "ansBack") {
//     if (obj.type == "button") {
//       console.log("button", obj.content);
//       sendtomedia(buttonAnswerToMedia(exchangeButtonAnswer(obj.content)));
//     } else {
//       if (!obj.isSend || obj.isSend != "mute") {
//         sendtomedia(obj.content);
//       }
//     }
//   }
//
//   nextTick(() => {
//     adjustWindow();
//   });
// };


// const sendTyper = () => {
//   inputWord.value = document.getElementById("inputContent")?.innerHTML
//   if (!inputWord.value) return
//   sendChat(inputWord.value)
//   hideExpression()
//   inputWord.value = ""
//   if (document.getElementById("inputContent")) {
//     document.getElementById("inputContent").innerHTML = ""
//   }
//   calculateInputStyle()
// };

//聊天框输入时样式变化
//const inputLine = ref(0)
const talkWindowHeight = ref(isPc ? "79%" : '50%')
//const inputOutStyleObj = ref({})
//const inputInStyleObj = ref({})
// const initialInputHeight = ref(0);
//const inputBarBackgroundHeight = ref("0px")
//const selectBarUpHeight = ref("0px")
// const inputGetIntentionTimeOut = ref()
// const inputEvent = (e: any) => {
//   showGuessIntention.value = false
//   clearTimeout(intentionTimeout.value)
//   clearTimeout(inputGetIntentionTimeOut.value)
//   inputGetIntentionTimeOut.value = setTimeout(() => {
//     requestAskIntention(document.getElementById("inputContent")?.innerText)
//   }, 700);
//   calculateInputStyle()
// }
// const calculateInputStyle = () => {
//   if (document.getElementById("inputContent")?.clientHeight > initialInputHeight.value) {
//     inputLine.value = Math.ceil(document.getElementById("inputContent")?.clientHeight / initialInputHeight.value)
//     if (inputLine.value > 0 && inputLine.value <= 3) {
//       inputInStyleObj.value.borderRadius = "12px"
//       inputOutStyleObj.value.borderRadius = "12px"
//       //inputOutStyleObj.value.height = (document.getElementById("typerInput")?.clientHeight * 0.85 + ((inputLine.value - 1) * initialInputHeight.value)) + "px"
//       //inputOutStyleObj.value.maxHeight = (document.getElementById("typerInput")?.clientHeight * 0.85 + ((inputLine.value - 1) * initialInputHeight.value)) + "px"
//       inputBarBackgroundHeight.value = (inputLine.value - 1) * initialInputHeight.value + "px"
//       inputOutStyleObj.value.overflowY = "unset"
//     }
//     if (inputLine.value > 3) {
//       inputInStyleObj.value.borderRadius = "12px"
//       inputOutStyleObj.value.borderRadius = "12px"
//       //inputOutStyleObj.value.height = (document.getElementById("typerInput")?.clientHeight * 0.85 + (3 * initialInputHeight.value)) + "px"
//       //inputOutStyleObj.value.maxHeight = (document.getElementById("typerInput")?.clientHeight * 0.85 + (3 * initialInputHeight.value)) + "px"
//       inputBarBackgroundHeight.value = (3 * initialInputHeight.value) + "px"
//       inputOutStyleObj.value.overflowY = "scroll"
//     }
//     selectBarUpHeight.value = inputBarBackgroundHeight.value
//     if (isPc) {
//       talkWindowHeight.value = inputOutStyleObj.value.maxHeight ? "calc(79% - " + inputOutStyleObj.value.maxHeight + ")" : "79%"
//     } else {
//       talkWindowHeight.value = inputOutStyleObj.value.maxHeight ? "calc(50% - " + inputOutStyleObj.value.maxHeight + ")" : "50%"
//     }
//   } else {
//     recoverInputStyle()
//   }
// }
// const recoverInputStyle = () => {
//   inputInStyleObj.value = {}
//   inputOutStyleObj.value = {}
//   inputBarBackgroundHeight.value = "0px"
//   selectBarUpHeight.value = "0px"
//   talkWindowHeight.value = isPc ? "79%" : "50%"
//   inputLine.value = 0
// }
//聊天框输入联想问题
// const intentionList = ref([])
//const showGuessIntention = ref(false)
// const intentionTimeout = ref()
// const guessAskIntention = throttle((str: string) => {
//   requestAskIntention(str)
// }, 3000)
// const requestAskIntention = (str: string) => {
//   if (!str) {
//     return
//   }
//   let requestUrl =
//       store.platformInfo.requestHead +
//       store.platformInfo.requestDomain +
//       "/robot-bankccb/mobilerelated-question.action?userId=" +
//       store.platformInfo.askplatform +
//       store.platformInfo.location +
//       "_" +
//       store.platformInfo.userId +
//       "&location=" +
//       store.platformInfo.location +
//       "&top=3&platform=" +
//       store.platformInfo.askplatform +
//       "&question=" +
//       encodeURIComponent(str);
//   showGuessIntention.value = true
//   httpszzt.postRobot(requestUrl).then((res: any) => {
//     intentionList.value = res.data
//     if (intentionList.value.length == 1 || (typeof intentionList.value) != Array) {
//       intentionList.value = JSON.parse(JSON.stringify(intentionList.value).replaceAll("@class@", "intentionKeyWord"))
//       intentionList.value = intentionList.value.split(",")
//       intentionList.value[0] = JSON.parse(JSON.stringify(intentionList.value[0]).replaceAll("[", ""))
//       intentionList.value[intentionList.value.length - 1] = JSON.parse(JSON.stringify(intentionList.value[intentionList.value.length - 1]).replaceAll("]", ""))
//     }
//     // showGuessIntention.value = true
//     // intentionTimeout.value = setTimeout(() => {
//     //   showGuessIntention.value = false
//     // }, 3000);
//
//   }).catch(() => {
//     console.log("requestaskintentionError");
//
//   })
// }
// const selectIntention = (str: any) => {
//   document.getElementById("inputContent").innerHTML = str
//   calculateInputStyle()
//   sendTyper()
// }
//操作提示
// const tipsText = ref('')
// const tipsIcon = ref('')
// const setShowTips = (str: string, icon?: string) => {
//   tipsText.value = str
//   tipsIcon.value = icon ? icon : ""
//   setTimeout(() => {
//     tipsIcon.value = ''
//     tipsText.value = ''
//   }, 3000);
// }
//答案点赞点踩
//const badRatingCauseShow = ref(false)
// const causeList = ref([])
// const ratingAnswerId = ref(0)
// const ratingParam = ref('')
// const closeCauseForm = () => {
//   badRatingCauseShow.value = false
// }
// const commitRate = (judge: boolean, param: any, id: number) => {
//   ratingAnswerId.value = id
//   if (judge) {
//     ratingParam.value = encodeURIComponent(param.match(/\[link[^\]]*\]/g)[0].match(/faqvote:[^"]*"/g)[0].replaceAll('"', ''))
//     console.log(888, ratingParam.value);
//
//     recordRateResult()
//   } else {
//     ratingParam.value = encodeURIComponent(param.match(/\[link[^\]]*\]/g)[1].match(/faqvote:[^"]*"/g)[0].replaceAll('"', ''))
//     causeList.value = param.split("[cause]")[1].replaceAll("[/cause]", "").split("|")
//     badRatingCauseShow.value = true
//   }
// }
// const recordRateResult = (param?: string) => {
//   let str = param ? ratingParam.value + " " + param : ratingParam.value
//   let requestUrl =
//       store.platformInfo.requestHead +
//       store.platformInfo.requestDomain +
//       "/dwr/ask-robot.action?userId=" +
//       store.platformInfo.askplatform +
//       store.platformInfo.location +
//       "_" +
//       store.platformInfo.userId +
//       "&location=" +
//       store.platformInfo.location +
//       "&sessionId=" +
//       sessionStorage.getItem("sessionid") +
//       "&dstType=16&platform=" +
//       store.platformInfo.askplatform +
//       "&question=" + str;
//
//   httpszzt.postRobot(requestUrl).then(() => {
//     if (param) {
//       conversationList.value[ratingAnswerId.value].evaluate = "unlike"
//       badRatingCauseShow.value = false
//       setShowTips("已反馈", "./static/images/success.png")
//     } else {
//       conversationList.value[ratingAnswerId.value].evaluate = "like"
//     }
//   })
//
// }

// 向小i请求答案，并且对答案分类展示
// const sendChat = (str: string) => {
//   showGuessIntention.value = false
//   //consolelog后门
//   if (str == "szzh0515") {
//     let cSrc = "https://shuzizhanting.com/dh/remote_plugins/plugable_console.min.js"
//     loadScript(cSrc).then(() => {
//       window.console_inst = new window.plugable_console;
//     });
//     return;
//   }
//   if (customerMode.value) {
//     if (str == "退出人工") {
//       transferToCustomer.value.onClickDisconnect();
//       customerMode.value = false;
//       return;
//     }
//     transferToCustomer.value.onClickSendText(str);
//     jurgeTime();
//     addConversation({content: str, styletype: "askBack", type: false, realcontent: false, isSend: "mute"});
//     return;
//   }
//
//   if (str != "") {
//     //处理xss和表情
//     let emojList = JSON.parse(JSON.stringify(str)).match(/<img[^>]*>/g)
//     askContext.value = filterXSS(str);
//     if (emojList && emojList.length) {
//       let wordList = JSON.parse(JSON.stringify(askContext.value)).split("<img src>")
//       for (let i = 0; i < emojList.length; i++) {
//         wordList[i] = wordList[i] + emojList[i]
//       }
//       let attachWord = wordList.join("")
//       addConversation({content: attachWord, styletype: "askBack"});
//     } else {
//       askContext.value = askContext.value.replace(/(<\/?img.*?>)/g, "");
//       addConversation({content: askContext.value, styletype: "askBack"});
//     }
//     str = str.replace(/(<\/?img.*?>)/g, "");
//     if (!str) {
//       return
//     }
//     emits("changebackgroundandlogo", str);
//     let requestUrl =
//         store.platformInfo.requestHead +
//         store.platformInfo.requestDomain +
//         "/dwr/ask-robot.action?userId=" +
//         store.platformInfo.askplatform +
//         store.platformInfo.location +
//         "_" +
//         store.platformInfo.userId +
//         "&location=" +
//         store.platformInfo.location +
//         "&sessionId=" +
//         sessionStorage.getItem("sessionid") +
//         "&dstType=16&platform=" +
//         store.platformInfo.askplatform +
//         "&question=" +
//         str;
//     if (srcDataSessionId.value && srcDataSessionId.value != "") {
//       requestUrl = requestUrl + "&srcDataSessionId=" + srcDataSessionId.value;
//     }
//     httpszzt.postRobot(requestUrl)
//         .then((res) => {
//           let getanswer = getXMLNode({xmlStr: res.data}, "Content");
//           let evaluate = getXMLNode({xmlStr: res.data}, "FaqVoteText");
//           answer.value = getanswer;
//           if (getXMLNode({xmlStr: res.data}, "srcDataSessionId")) {
//             srcDataSessionId.value = getXMLNode({xmlStr: res.data}, "srcDataSessionId");
//           }
//           if (exchangeButtonAnswer(answer.value)) {
//             addConversation({content: answer.value, styletype: "ansBack", type: "button", evaluate: evaluate});
//           } else if (
//               answer.value.search("!@人工!@") != -1
//           ) {
//             let result =
//                 "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//             addConversation({
//               content: result,
//               styletype: "ansBack",
//               type: "noanswer",
//               realcontent: result,
//               evaluate: evaluate
//             });
//           } else if (getXMLNode({xmlStr: res.data}, "Type") == "11") {
//             addConversation({
//                   content: answer.value,
//                   styletype: "ansBack",
//                   type: "relativeanswer",
//                   realcontent: dealRelativeAnswer(answer.value),
//                   evaluate: evaluate
//                 }
//             );
//           } else if (getXMLNode({xmlStr: res.data}, "Type") == "1") {
//             addConversation({content: answer.value, styletype: "ansBack", type: "bindToshowMenu", evaluate: evaluate});
//           } else {
//             addConversation({content: answer.value, styletype: "ansBack", evaluate: evaluate});
//           }
//         })
//         .catch((error) => {
//           let result =
//               "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//           addConversation({content: result, styletype: "ansBack", type: "noanswer", realcontent: result});
//         });
//   }
// };
// 企业手机银行快捷办理二级菜单
// const callinneruse = (obj: any) => {
//   addConversation({content: "selectinneruse", styletype: "selectinneruse", type: "selectinneruse", realcontent: obj});
//   httpszzt.postRobot(
//       store.platformInfo.requestHead +
//       store.platformInfo.requestDomain +
//       "/dwr/ask-robot.action?userId=" +
//       store.platformInfo.askplatform +
//       store.platformInfo.location +
//       "_" +
//       store.platformInfo.userId +
//       "&location=" +
//       store.platformInfo.location +
//       "&sessionId=" +
//       sessionStorage.getItem("sessionid") +
//       "&dstType=16&platform=" +
//       store.platformInfo.askplatform +
//       "&question=" +
//       obj.id
//   ).then((res) => {
//   });
//   if (props.ttsaWork) {
//     sendtomedia("请问您需要办理以下哪个业务?");
//     emits("changebackgroundandlogo", obj.name);
//   }
//   //dataRecordNode.value.selectuserecord(obj.id);
// };
// 飞驰快捷办理埋点
// const recordclick = (id: string) => {
//   dataRecordNode.value.selectuserecord(id);
// };
// 产品目录点击留历史记录
// const recordHistory = (str: string) => {
//   httpszzt.postRobot(
//       store.platformInfo.requestHead +
//       store.platformInfo.requestDomain +
//       "/dwr/ask-robot.action?userId=" +
//       store.platformInfo.askplatform +
//       store.platformInfo.location +
//       "_" +
//       store.platformInfo.userId +
//       "&location=" +
//       store.platformInfo.location +
//       "&sessionId=" +
//       sessionStorage.getItem("sessionid") +
//       "&dstType=16&platform=" +
//       store.platformInfo.askplatform +
//       "&question=" +
//       str
//   ).then((res) => {
//     let getanswer = getXMLNode({xmlStr: res.data}, "Content");
//     if (getanswer) {
//       addConversation({content: str, styletype: "askBack"});
//       addConversation({
//         content: getanswer,
//         styletype: "ansBack",
//         type: "bindToshowMenu",
//         realcontent: false,
//         isSend: "mute"
//       });
//     }
//   });
// };

// const askitem = (value: string) => {
//   sendChat(value);
// };

// const scrollevent = () => {
//   if (document.querySelector(".conversation").scrollTop == 0) {
//     isfade.value = false;
//   } else {
//     isfade.value = true;
//   }
//   if (document.querySelector(".conversation")?.scrollTop <= (document.querySelector(".conversation")?.scrollHeight - document.querySelector(".conversation")?.clientHeight) / 4 && document.querySelector(".conversation")?.scrollHeight > 4 * document.querySelector(".conversation")?.clientHeight) {
//     downToBottomShow.value = true
//   } else {
//     downToBottomShow.value = false
//   }
// };
// const mousescroll = (event: any) => {
//   //区分是否根据日期查历史记录模式
//   if (!store.platformInfo.searchingHistory) {
//     if (
//         document.querySelector(".conversation").scrollTop == 0 &&
//         event.wheelDelta > 0 &&
//         !loaddingrecord.value
//     ) {
//       loaddingrecord.value = true;
//       gethistory();
//     }
//   } else {
//     if (
//         (document.querySelector(".conversation")?.scrollTop >= document.querySelector(".conversation")?.clientHeight || document.querySelector(".conversation")?.scrollTop == 0) &&
//         event.wheelDelta < 0 && !loaddingrecord.value
//     ) {
//       loaddingrecord.value = true;
//       gethistorybydate();
//     }
//     if (
//         document.querySelector(".conversation").scrollTop == 0 &&
//         event.wheelDelta > 0 &&
//         !loaddingrecord.value
//     ) {
//       loaddingrecord.value = true;
//       gethistory("searching");
//     }
//   }
// };
// const touchstart = (event: any) => {
//   touchstartposition.value = event.touches[0].pageY;
// };
// const touchmove = (event: any) => {
//   //区分是否根据日期查历史记录模式
//   if (!store.platformInfo.searchingHistory) {
//     if (
//         touchstartposition.value - event.touches[0].pageY < -70 &&
//         !loaddingrecord.value &&
//         document.querySelector(".conversation").scrollTop == 0
//     ) {
//       loaddingrecord.value = true;
//       gethistory();
//     }
//   } else {
//     if (
//         touchstartposition.value - event.touches[0].pageY > 70 && !loaddingrecord.value &&
//         (document.querySelector(".conversation")?.scrollTop >= document.querySelector(".conversation")?.clientHeight || document.querySelector(".conversation")?.scrollTop == 0)
//     ) {
//       loaddingrecord.value = true;
//       gethistorybydate();
//     }
//     if (
//         touchstartposition.value - event.touches[0].pageY < -70 &&
//         !loaddingrecord.value &&
//         document.querySelector(".conversation").scrollTop == 0
//     ) {
//       loaddingrecord.value = true;
//       gethistory("searching");
//     }
//   }
// };
// const historytimes = ref(1);
// const logintime = ref(new Date());
// const historyList: any = ref([]);
// const nowscrollheight = ref(0);
// const loaddingrecord = ref(false);
//const touchstartposition = ref(0);

// function dateFormat(time: Date, type?: string) {
//   let date = new Date(time);
//   let year = date.getFullYear();
//   /* 在日期格式中，月份是从0开始的，因此要加0
//    * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
//    * */
//   let month =
//       date.getMonth() + 1 < 10
//           ? "0" + (date.getMonth() + 1)
//           : date.getMonth() + 1;
//   let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
//   let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//   let minutes =
//       date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//   let seconds =
//       date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//   // 拼接
//   if (type == "time") {
//     return month + "-" + day + " " + hours + ":" + minutes;
//   }
//   if (type == "yeartime") {
//     return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
//   }
//   return (
//       year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
//   );
// }

// const gethistory = (selectStatus?: string) => {
//   if (!store.platformInfo.historyRecord) {
//     return;
//   }
//   if (selectStatus == "searching") {
//     recoverHistoryList.value = true
//   }
//   let encryptParam = encryptGcm(
//       "selTime=" +
//       (selectStatus == "searching" ? originSelectTime.value : dateFormat(logintime.value)) +
//       "&tagId=" +
//       store.platformInfo.askplatform +
//       store.platformInfo.location +
//       "_" +
//       store.platformInfo.userId +
//       "&page=" +
//       historytimes.value +
//       "&dataType=json", 'QZPM1029WXON3847'
//   );
//   let data = {
//     custType: sessionStorage.getItem("CustType2"),
//     wParam: encryptParam,
//   };
//   httpszzt
//       .getrequest(store.platformInfo.requestHead + store.platformInfo.requestDomain + "/dwr/webChatHis", data)
//       .then((res: any) => {
//         let data = res.data.msgList;
//         if (!data || !data.length) {
//           setTimeout(() => {
//             loaddingrecord.value = false;
//           }, 3000);
//           return;
//         }
//         if (historytimes.value == 1 && selectStatus != "searching") {
//           historyList.value.shift();
//           addhistoryconversation(
//               "",
//               "",
//               "historytips",
//               "———— 以上为历史记录 ————"
//           );
//         }
//         for (let i = 1; i < data.length; i = i + 2) {
//           swapArray(data, i, i - 1);
//         }
//         nowscrollheight.value =
//             document.querySelector(".conversation").scrollHeight;
//         loadhistory(data);
//         historytimes.value++;
//       });
// };

//每组问答更改问和答的顺序
// function swapArray(arr: Array<any>, index1: number, index2: number) {
//   arr[index1] = arr.splice(index2, 1, arr[index1])[0];
//   return arr;
// }

//规则：相差大于5分钟显示mmddhhmm，年份有更改则显示yymmddhhmm
// function calculateTime(showtime: any, standardtime: any) {
//   showtime = new Date(showtime); //转换为中国标准时间
//   let formatshowtime = new Date(showtime);
//   standardtime = new Date(standardtime);
//   showtime = showtime.getTime(); //转换为时间戳
//   standardtime = standardtime.getTime();
//   let runTime = (standardtime - showtime) / 1000; //开始得出时间差,然后计算
//   // let year = Math.floor(runTime / 86400 / 365);
//   runTime = runTime % (86400 * 365);
//   // let month = Math.floor(runTime / 86400 / 30);
//   runTime = runTime % (86400 * 30);
//   // let day = Math.floor(runTime / 86400);
//   runTime = runTime % 86400;
//   // let hour = Math.floor(runTime / 3600);
//   runTime = runTime % 3600;
//   let minute = Math.floor(runTime / 60);
//   // runTime = runTime % 60;
//   // let second = runTime;
//   if (minute >= 5) {
//     if (logintime.value.getFullYear() - formatshowtime.getFullYear() <= 0) {
//       return dateFormat(showtime, "time");
//     } else {
//       return dateFormat(showtime, "yeartime");
//     }
//   } else {
//     return false;
//   }
// }

// const loadhistory = (hislist: Array<any>) => {
//   for (let i = 0; i < hislist.length; i++) {
//     const element = hislist[i];
//     if (element.senderType == "00") {
//       let filtlist = allUseList.filter(
//           (ele) => ele.id && ele.id == element.sendContent
//       );
//       if (filtlist.length > 0) {
//         addhistoryconversation(
//             "selectinneruse",
//             "selectinneruse",
//             "selectinneruse",
//             filtlist[0]
//         );
//         return;
//       }
//       let timeresult = calculateTime(
//           element.sendTime,
//           hislist[i - 2] ? hislist[i - 2].sendTime : dateFormat(logintime.value)
//       );
//       addhistoryconversation(element.sendContent, "askBack");
//       if (timeresult) {
//         addhistoryconversation("", "", "historytips", timeresult);
//       }
//     } else {
//       if (exchangeButtonAnswer(element.sendContent)) {
//         addhistoryconversation(element.sendContent, "ansBack", "button");
//       } else if (element.sendContent.search("!@人工!@") != -1) {
//         let result =
//             "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//         addhistoryconversation(result, "ansBack", "noanswer", result);
//       } else if (element.sendContent.search("您想问的是这些问题吗？") != -1) {
//         addhistoryconversation(
//             element.sendContent,
//             "ansBack",
//             "relativeanswer",
//             dealRelativeAnswer(element.sendContent)
//         );
//       } else {
//         if (element.sendContent != "ywcj_answer") {
//           addhistoryconversation(element.sendContent, "ansBack");
//         }
//       }
//     }
//   }
// };
// const addhistoryconversation = (
//     content: string,
//     styletype: string,
//     type?: any,
//     realcontent?: any
// ) => {
//   if (!type) {
//     type = false;
//   }
//   if (!realcontent) {
//     realcontent = "";
//   }
//   if (styletype == "ansBack") {
//     content = changelabelevent(content);
//   }
//   if (content == "ACS" || content == "acs") {
//     content = "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//     realcontent = "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//     styletype = "ansBack";
//     type = "noanswer";
//   }
//   if (styletype == "askBack") {
//     content = "&nbsp;" + content + "&nbsp;";
//   } //增加空格撑开气泡，用padding苹果手机会出现自动换行bug
//   let tab = new RegExp("#r#n#r#n", "g");
//   let enter = new RegExp("#r#n", "g");
//   content = content.replace(tab, "<p></p>");
//   content = content.replace(enter, "<div></div>");
//   let id =
//       historyList.value.length > 0
//           ? parseInt(historyList.value[historyList.value.length - 1].id) + 1
//           : 0;
//   historyList.value.unshift({
//     content,
//     id,
//     styletype,
//     type,
//     realcontent,
//   });
//   nextTick(() => {
//     document.querySelector(".conversation").scrollTop =
//         document.querySelector(".conversation").scrollHeight -
//         nowscrollheight.value;
//     loaddingrecord.value = false;
//   });
// };
// const gethispage = ref(1)
// const historyListbydate = ref([])
// const loadingShow = ref(false)
// const recoverTalk = ref(false)
// const originSelectTime = ref('')
// const recoverHistoryList = ref(false)
// const gethistorybydate = () => {
//   if (!store.platformInfo.searchTime) {
//     recoverTalk.value = recoverTalk.value ? recoverTalk.value : true
//     if (recoverTalk.value) {
//       loaddingrecord.value = false
//     }
//     return
//   }
//   loadingShow.value = true
//   let encryptParam = encryptGcm(
//       "hisTime=" +
//       store.platformInfo.searchTime +
//       "&tagId=" +
//       store.platformInfo.askplatform +
//       store.platformInfo.location +
//       "_" +
//       store.platformInfo.userId +
//       "&page=" +
//       gethispage.value +
//       "&dataType=json"
//       , 'QZPM1029WXON3847'
//   );
//   let data = {
//     custType: sessionStorage.getItem("CustType2"),
//     wParam: encryptParam,
//   };
//   httpszzt
//       .getrequest(store.platformInfo.requestHead + store.platformInfo.requestDomain + "/dwr/webChatHis", data)
//       .then((res: any) => {
//         let data = res.data.msgList;
//         // for (let i = 1; i < data.length; i = i + 2) {
//         //   swapArray(data, i, i - 1);
//         // }
//         // nowscrollheight.value =
//         //   document.querySelector(".conversation").scrollHeight;
//         loadhistorybydate(data);
//         loadingShow.value = false
//         gethispage.value++;
//         if (gethispage.value <= res.data.totalPages) {
//           gethistorybydate()
//         } else {
//           gethispage.value = 1
//           store.platformInfo.searchTimeList = store.platformInfo.searchTimeList.filter((item: string) => {
//             return item != store.platformInfo.searchTime
//           })
//           store.platformInfo.searchTime = store.platformInfo.searchTimeList[0] ? store.platformInfo.searchTimeList[0] : ""
//           if (historyListbydate.value.length < 10 && !recoverTalk.value) {
//             gethistorybydate()
//           }
//         }
//       }).catch(() => {
//     loadingShow.value = false
//   });
// }
// const loadhistorybydate = (hislist: Array<any>) => {
//   for (let i = 0; i < hislist.length; i++) {
//     const element = hislist[i];
//     if (element.senderType == "00") {
//       let filtlist = allUseList.filter(
//           (ele) => ele.id && ele.id == element.sendContent
//       );
//       if (filtlist.length > 0) {
//         addhistoryconversationbydate(
//             "selectinneruse",
//             "selectinneruse",
//             "selectinneruse",
//             filtlist[0]
//         );
//         return;
//       }
//       let timeresult = calculateTime(
//           element.sendTime,
//           hislist[i - 2] ? hislist[i - 2].sendTime : dateFormat(logintime.value)
//       );
//       if (timeresult) {
//         addhistoryconversationbydate("", "", "historytips", timeresult);
//       }
//       addhistoryconversationbydate(element.sendContent, "askBack");
//     } else {
//       if (exchangeButtonAnswer(element.sendContent)) {
//         addhistoryconversationbydate(element.sendContent, "ansBack", "button");
//       } else if (element.sendContent.search("!@人工!@") != -1) {
//         let result =
//             "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//         addhistoryconversationbydate(result, "ansBack", "noanswer", result);
//       } else if (element.sendContent.search("您想问的是这些问题吗？") != -1) {
//         addhistoryconversationbydate(
//             element.sendContent,
//             "ansBack",
//             "relativeanswer",
//             dealRelativeAnswer(element.sendContent)
//         );
//       } else {
//         if (element.sendContent != "ywcj_answer") {
//           addhistoryconversationbydate(element.sendContent, "ansBack");
//         }
//       }
//     }
//   }
// };
// const addhistoryconversationbydate = (
//     content: string,
//     styletype: string,
//     type?: any,
//     realcontent?: any
// ) => {
//   if (!type) {
//     type = false;
//   }
//   if (!realcontent) {
//     realcontent = "";
//   }
//   if (styletype == "ansBack") {
//     content = changelabelevent(content);
//   }
//   if (content == "ACS" || content == "acs") {
//     content = "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//     realcontent = "小微被您的问题问住了，您也可以点击拨打专属电话进一步咨询。";
//     styletype = "ansBack";
//     type = "noanswer";
//   }
//   if (styletype == "askBack") {
//     content = "&nbsp;" + content + "&nbsp;";
//   } //增加空格撑开气泡，用padding苹果手机会出现自动换行bug
//   let tab = new RegExp("#r#n#r#n", "g");
//   let enter = new RegExp("#r#n", "g");
//   content = content.replace(tab, "<p></p>");
//   content = content.replace(enter, "<div></div>");
//   let id =
//       historyListbydate.value.length > 0
//           ? parseInt(historyListbydate.value[historyListbydate.value.length - 1].id) + 1
//           : 0;
//   historyListbydate.value.push({
//     content,
//     id,
//     styletype,
//     type,
//     realcontent,
//   });
//   setTimeout(() => {
//     loaddingrecord.value = false;
//   }, 200);
// };
// watch(
//     () => store.platformInfo.searchingHistory,
//     (val) => {
//       if (store.platformInfo.searchingHistory) {
//         originSelectTime.value = JSON.parse(JSON.stringify(store.platformInfo.searchTime)) + " 00:00:01"
//         gethistorybydate()
//       } else {
//         recoverHistoryList.value = false
//         recoverTalk.value = false
//         historyListbydate.value = []
//         gethispage.value = 1
//         historytimes.value = 1
//         historyList.value = []
//       }
//     }
// );

// 点击输入框上方快速按钮
//const barSelected = ref(true);
// const changeSelectWindow = (name: string, useName?: string) => {
//   barSelected.value = true;
//   if (useName == "selectuse") {
//     barSelected.value = true;
//     addConversation({content: "selectuse", styletype: "selectuse", type: "selectuse"});
//     //dataRecordNode.value.selectuserecord("selectuse");
//   }
//   if (useName == "product") {
//     showProductMenu.value = true;
//     //dataRecordNode.value.selectuserecord("product");
//   }
//   if (useName == "dealnotice") {
//     showDealNotice.value = true;
//     document.getElementById("backtohomeBtn").style.display = "none";
//     //dataRecordNode.value.selectuserecord("dealnotice");
//   }
//   if (useName == "newsservice") {
//     //dataRecordNode.value.selectuserecord("newsservice");
//   }
// };
//const readtipsShow = ref(true);
// const changetipState = () => {
//   readtipsShow.value = false;
// };
// const showguesslist = () => {
//   addConversation({content: "guess", styletype: "guess", type: "guess"});
// };

const emits = defineEmits([
  "sendchattomedia",
  "interruptVoice",
  //"changebackgroundandlogo",
  //"changemute",
]);
//传给ttsa播报
const sendtomedia = (str: string, type?: string) => {
  if (type) {
    emits("sendchattomedia", str, type);
  } else {
    emits("sendchattomedia", str);
  }
};
//中断播报
const interruptVoice = () => {
  emits("interruptVoice");
};
//播报静音
// const changemute = (val: boolean) => {
//   emits("changemute", val);
// };
//切换输入形式
// const changeInputType = () => {
//   if (inputType.value == "voice") {
//     inputType.value = "typer";
//     nextTick(() => {
//       calculateInputStyle()
//     })
//
//   } else {
//     inputType.value = "voice";
//     recoverInputStyle()
//     hideExpression()
//   }
// };
//
// const fillInputContent = (str: string) => {
//   let textEl = document.createTextNode(str);
//   if (!rangeOfInputBox.value) {
//     rangeOfInputBox.value = new Range();
//     rangeOfInputBox.value.selectNodeContents(inputContent.value);
//   }
//   if (rangeOfInputBox.value.collapsed) {
//     rangeOfInputBox.value.insertNode(textEl);
//   } else {
//     rangeOfInputBox.value.deleteContents();
//     rangeOfInputBox.value.insertNode(textEl);
//   }
//   rangeOfInputBox.value.collapse(false);
//   changeInputType()
// }
//处理没有答案时的不同推荐相关问
// const dealRelativeAnswer: any = (str: string) => {
//   if (str.search("<br>") != -1) {
//     // let list = str
//     //   .split("或者您也可以咨询")[0]
//     //   .split("您想问的是这些问题吗？")[1]
//     //   .split("<br>");
//     let list = str.split("<br>");
//     let result: any = [];
//     list.forEach((ele) => {
//       if (ele != "") {
//         result.push(ele);
//       }
//     });
//     console.log("delaREsutlt-------------", result);
//
//     return result;
//   } else {
//     // let result:any = []
//     // return result
//     return false;
//   }
// };
//获取返回内容
// const getXMLNode = (parm: any, type: string) => {
//   let str = parm.xmlStr;
//   //创建文档对象
//   let xmlDoc = new DOMParser().parseFromString(str, "text/xml");
//   let finds = xmlDoc.getElementsByTagName(type); //获取find节点
//   if (finds[0] && finds[0].textContent) {
//     return finds[0].textContent;
//   } else {
//     return false;
//   }
// };
//转化成按钮形式回复
// const exchangeButtonAnswer = (str: string): any => {
//   let reg = RegExp(/!@#\$/);
//   let answerArray: any = [];
//   if (reg.test(str)) {
//     let strArray = str.split("<br>");
//     strArray.forEach((element) => {
//       let data = {label: "", value: ""};
//       if (reg.test(element)) {
//         data.label = element.split("!@#$")[0];
//         data.value = element.split("!@#$")[1];
//       } else {
//         data.label = element;
//         data.value = "content";
//       }
//       answerArray.push(data);
//     });
//     return answerArray;
//   } else {
//     return false;
//   }
// };
//按钮样式只给前半段到推流去说话
// const buttonAnswerToMedia = (arry: Array): any => {
//   let askToMedia = "";
//   for (let i = 0; i < arry.length; i++) {
//     if (arry[i].label) {
//       let label = arry[i].label.split("&nbsp;")[0];
//       askToMedia = askToMedia + label;
//     }
//   }
//   return askToMedia;
// };
//处理建议问样式
// const cutKeyStr = ref("您可以换一种方式问我，或者点击以下您可能关注的问题:");
// const checkMoreQuestion = (str: string): any => {
//   let arry = str.split(cutKeyStr.value);
//   if (arry.length > 1) {
//     let focusList = arry[1].split("<br>");
//     let result: any = [];
//     focusList.forEach((ele) => {
//       if (ele != "") {
//         if (ele.split("<br/>") && ele.split("<br/>").length > 1) {
//           let inersplit = ele.split("<br/>");
//           inersplit.forEach((item) => {
//             result.push(item);
//           });
//         } else {
//           result.push(ele);
//         }
//       }
//     });
//
//     return result;
//   } else return false;
// };
//去除按钮样式下点击请求问答的序号
// const cutnumber = (content: string) => {
//   let reg = new RegExp(/^[1-9]\.\s/);
//   if (reg.test(content)) {
//     content = content.split(".")[1];
//     return content;
//   }
// };
//跳转链接格式化为手机银行组件打开，变成可返回
// const changelabelevent = (content: string): string => {
//   if (content.includes('id="jumpuse"')) {
//     content =
//         content.split("</div>")[0] +
//         `<img class="optionicon" src="./static/useIcon/rightArrow.png">` +
//         `</div>`;
//   }
//   let str = content;
//   let reg = /<a\/?.+?\/?a>/gi;
//   //把<A></A>标签变成<a></a>
//   str = str.replaceAll("<A", "<a");
//   str = str.replaceAll("A>", "a>");
//   let sliceList = str.match(reg);
//
//   if (sliceList) {
//     sliceList.forEach((ele) => {
//       if (ele.split('">').length && ele.split('">').length >= 2) {
//         if (
//             ele.split('">')[0].split('href="').length &&
//             ele.split('">')[0].split('href="')[1]
//         ) {
//           let deala = "";
//           if (!store.platformInfo.qiyewangyin) {
//             //手机银行和飞驰用app方法打开页面
//             deala =
//                 `<a onclick="window.showwebviewurl('` +
//                 ele.split('">')[0].split('href="')[1] +
//                 `')">` +
//                 ele.split('">')[1];
//           } else {
//             //  企业网银直接打开
//             deala =
//                 `<a onclick="window.open('` +
//                 ele.split('">')[0].split('href="')[1] +
//                 `')">` +
//                 ele.split('">')[1];
//           }
//           let finish = str.split(ele)[0];
//           for (let i = 0; i < str.split(ele).length; i++) {
//             if (str.split(ele)[i + 1]) {
//               finish = finish + deala + str.split(ele)[i + 1];
//             }
//           }
//           str = finish;
//         }
//       }
//     });
//   }
//   if (str.search("或者您也可以咨询")) {
//     str = str.split("或者您也可以咨询")[0];
//   }
//   return str;
// };

// const showProductMenu = ref(false);
// const showDealNotice = ref(false);
//const notAgain = ref(false)
//const showProductTitle = ref(null);
// const closeWindow = () => {
//   showProductMenu.value = false;
//   showDealNotice.value = false;
//   barSelected.value = false;
// };
//const showProductDetail = ref(false);
// const closeProductWindow = (title: string) => {
//   showProductDetail.value = false
// }
//
// const downToBottomShow = ref(false)
// const adjustWindow = () => {
//   if (!isfade.value && !rejectfade.value) {
//     isfade.value = true;
//   } else {
//     rejectfade.value = false;
//   }
//   let ansheight =
//       document.querySelector(".conversation").lastElementChild?.clientHeight;
//   let windowheight = document.querySelector(".talkContent").clientHeight;
//   let resize = 0;
//   if (ansheight > windowheight) {
//     resize = ansheight - windowheight + 100;
//   }
//   document.querySelector(".conversation").scrollTop =
//       document.querySelector(".conversation").scrollHeight;
//   document.querySelector(".conversation").scrollTop =
//       document.querySelector(".conversation").scrollTop - resize;
// };
// const changeFade = (val: boolean) => {
//   isfade.value = val;
// };
// const checkAuditTime = (beginTime: string, endTime: string) => {
//   var nowDate = new Date();
//   if (nowDate.getDay() == 6 || nowDate.getDay() == 7) {
//     return false;
//   }
//   var beginDate = new Date(nowDate);
//   var endDate = new Date(nowDate);
//
//   var beginIndex = beginTime.lastIndexOf(":");
//   var beginHour = beginTime.substring(0, beginIndex);
//   var beginMinue = beginTime.substring(beginIndex + 1, beginTime.length);
//   beginDate.setHours(beginHour, beginMinue, 0, 0);
//
//   var endIndex = endTime.lastIndexOf(":");
//   var endHour = endTime.substring(0, endIndex);
//   var endMinue = endTime.substring(endIndex + 1, endTime.length);
//   endDate.setHours(endHour, endMinue, 0, 0);
//   return (
//       nowDate.getTime() - beginDate.getTime() >= 0 &&
//       nowDate.getTime() <= endDate.getTime()
//   );
// };
// const jurgeTime = () => {
//   let now = new Date();
//   console.log("经过了：", (now.getTime() - connectTime.value) / 1000, "秒了");
//   if (now.getTime() - connectTime.value >= 1000 * 60 * 3) {
//     var date = now;
//     var Y = date.getFullYear() + "-";
//     var M =
//         (date.getMonth() + 1 < 10
//             ? "0" + (date.getMonth() + 1)
//             : date.getMonth() + 1) + "-";
//     var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
//
//     var h =
//         (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
//     var m =
//         date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//     //  var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
//     var strDate = Y + M + D + h + m;
//     //addConversation({content: strDate, styletype: "ansTime", type: "time"});
//     connectTime.value = now.getTime();
//   }
// };
//获取随机长度字符串
const _charStr =
    "abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
const RandomIndex = (min: any, max: any, i: any) => {
  let index = Math.floor(Math.random() * (max - min + 1) + min),
      numStart = _charStr.length - 10;
  //如果字符串第一位是数字，则递归重新获取
  if (i == 0 && index >= numStart) {
    index = RandomIndex(min, max, i);
  }
  //返回最终索引值
  return index;
};
const getRandomString = (len: number) => {
  let min = 0,
      max = _charStr.length - 1,
      _str = "";
  //判断是否指定长度，否则默认长度为15
  len = len || 15;
  //循环生成字符串
  for (let i = 0, index; i < len; i++) {
    index = RandomIndex(min, max, i);
    _str += _charStr[index];
  }
  return _str;
};
// window.onlineChat = (type: string) => {
//   if (customerMode.value) return;
//   console.log("type123:", type);
//   //addConversation({content: "正在尝试为您连接人工客服", styletype: "ansBack"});
//   connectTime.value = new Date().getTime();
//   transferToCustomer.value.onClickConnect(type);
// };
// window.showProMenu = (name: string, status?: boolean) => {
//   if (name) {
//     notAgain.value = status ? status : false
//     showProductTitle.value = name;
//     if (!store.platformInfo.feichiejia) {
//       showProductDetail.value = true;
//     } else {
//       let product = productNameToTrdSpinf.find((item) => {
//         return item.name == name
//       })
//       console.log("飞驰触发产品详情——----------------", product?.trdSpinf, product);
//       if (product?.trdSpinf) {
//         frameType.value = 'chanpingmulu'
//         frameurl.value = process.env.VUE_APP_FEICHI_FRAMEURL + "/#/digital/product?user=" + getQueryVariable('user') + "&t=" + getQueryVariable('t') + "&platform=" + getQueryVariable('platform') + "&authorization=" + getQueryVariable('authorization') + "&cstId=" + getQueryVariable("cstId") + "&trdSpinf=" + product?.trdSpinf
//         setTimeout(() => {
//           frameShow.value = true
//         }, 200);
//       }
//     }
//   }
// };

//发送表情功能相关
// const expressionSelectShow = ref(false)
// const startSelectExpression = () => {
//   expressionSelectShow.value = !expressionSelectShow.value
// }
// const hideExpression = () => {
//   expressionSelectShow.value = false
// }
// const inputContent = ref(null)
// const rangeOfInputBox = ref(null);
// const addEmojToInput = (outVal: string) => {
//   let emojiEl = document.createElement("img");
//   emojiEl.src = outVal;
//
//   if (!rangeOfInputBox.value) {
//     rangeOfInputBox.value = new Range();
//     rangeOfInputBox.value.selectNodeContents(inputContent.value);
//   }
//   console.log(99999, rangeOfInputBox.value);
//
//   if (rangeOfInputBox.value.collapsed) {
//     rangeOfInputBox.value.insertNode(emojiEl);
//   } else {
//     rangeOfInputBox.value.deleteContents();
//     rangeOfInputBox.value.insertNode(emojiEl);
//   }
//   rangeOfInputBox.value.collapse(false);
//   //calculateInputStyle()
// }

// const frameShow = ref(false);
// const frameType = ref('kuaijiebanli')
// const frameurl = ref("");
// const closeiframe = () => {
//   if (frameType.value == 'chanpingmulu' && !notAgain.value) {
//     //showAginMenu(showProductTitle.value)
//   }
//   frameShow.value = false;
//   changeFade(!frameShow.value);
// };
// const usetitle = ref("");
// const openIframe = (url: string, title?: string) => {
//   frameType.value = 'kuaijiebanli'
//   frameurl.value = url;
//   usetitle.value = title ? title : "";
//   frameShow.value = true;
// };
</script>


<style lang="less">
.talkWindow {
  position: fixed;
  top: 32%;
  width: 100%;
  height: 50%;
  z-index: 2;

  .talkContent {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    overflow: hidden;

    .loading {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      z-index: 2;

      .loadingIcon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .conversation {
      position: relative;
      width: 95%;
      left: 2.5%;
      top: 0%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      touch-action: auto;
      -webkit-overflow-scrolling: touch;

      .welcome {
        width: fit-content;
        max-width: 80%;
        background: rgba(255, 255, 255, 0.78);
        border-radius: 0px 10px 10px 10px;
        margin-top: 1%;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #3c3c3c;
        font-weight: 400;
        padding: 8px 5%;
        font-size: 0.8rem;
        line-height: 1.2rem;
      }

      .showMenu {
        .btn {
          width: 264px;
          height: 37px;
          background: #ffffff;
          border: 1px solid #4368eb;
          border-radius: 19px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #4368eb;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px auto;
        }
      }

      .ansBack {
        margin-top: 3px;
        margin-bottom: 8px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;

        .conversation_img {
          object-fit: contain;
          width: 6%;
        }

        .titleicon {
          position: relative;
          left: 4%;
          width: 100%;

          > img {
            position: relative;
            width: 8%;
          }
        }

        .conversationList {
          width: auto;
          max-width: 80%;
          background: rgba(255, 255, 255, 0.78);
          border-radius: 10px 10px 10px 10px;
          margin-top: 1%;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #3c3c3c;
          font-weight: 400;
          padding: 8px 5%;
          font-size: 0.8rem;
          line-height: 1.2rem;
          overflow: hidden;
          word-break: break-all;

          .collapse {
            display: -webkit-box;
            -webkit-line-clamp: 13;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .showmore {
            color: #557cf0;
          }

          a {
            text-decoration: unset;
            color: #557cf0;
          }

          > div {
            #jumpuse {
              position: relative;
              color: #ffffff;
              background: #557cf0;
              margin-top: 16px;
              height: 40px;
              line-height: 40px;
              border-radius: 20px;
              padding-left: 25px;

              .optionicon {
                position: absolute;
                right: 6%;
                width: 18px;
                object-fit: contain;
                top: 11px;
              }
            }

            > img {
              max-width: 160px;
            }
          }
        }

        .evaluate_content {
          position: relative;
          width: 90%;
          height: 24px;
          display: flex;
          justify-content: flex-end;
          margin-top: 5px;

          .like_btn {
            position: relative;
            height: 20px;
            width: fit-content;
            background: #ffffff;
            padding: 3px 12px;
            border-radius: 13px;
            margin-left: 5px;
            margin-right: 5px;

            > img {
              height: 80%;
              object-fit: contain;
              display: block;
            }
          }

          .unlike_btn {
            position: relative;
            height: 20px;
            width: fit-content;
            background: #ffffff;
            padding: 3px 12px;
            border-radius: 13px;
            margin-left: 5px;
            margin-right: 5px;

            > img {
              height: 80%;
              object-fit: contain;
              display: block;
            }
          }
        }
      }

      .askBack {
        margin-top: 3px;
        margin-bottom: 8px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        flex-direction: row-reverse;

        .conversation_img {
          object-fit: contain;
          width: 6%;
        }

        .conversationList {
          width: auto;
          min-width: 10%;
          max-width: 82%;
          background: #557cf0;
          border-radius: 10px 0px 10px 10px;
          margin-top: 1%;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          padding: 8px 5px;
          color: #ffffff;
          font-size: 0.8rem;
          line-height: 1.2rem;
          overflow: hidden;

          > div {
            display: flex;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;

            > img {
              display: block;
              vertical-align: middle;
              background: #557cf0;
            }
          }

          .dot {
            width: 80px;
            height: 1.2rem;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 25%;
            flex: 0 0 25%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0;
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            overflow: hidden;

            .dot-loader {
              height: 8px;
              width: 8px;
              border-radius: 50%;
              background-color: #ffffff;
              position: relative;
              -webkit-animation: 1.2s grow ease-in-out infinite;
              animation: 1.2s grow ease-in-out infinite;
            }

            .dot-loader--2 {
              -webkit-animation: 1.2s grow ease-in-out infinite 0.15555s;
              animation: 1.2s grow ease-in-out infinite 0.15555s;
              margin: 0 10px;
            }

            .dot-loader--3 {
              -webkit-animation: 1.2s grow ease-in-out infinite 0.3s;
              animation: 1.2s grow ease-in-out infinite 0.3s;
            }

            @keyframes grow {
              0%,
              40%,
              100% {
                -webkit-transform: scale(0);
                transform: scale(0);
              }
              40% {
                -webkit-transform: scale(1);
                transform: scale(1);
              }
            }
          }
        }

        .conversationList.tipshow {
          background: rgba(0, 0, 0, 0.3);
        }
      }

      .ansTip {
        .kefuTips {
          margin-top: 3px;
          margin-bottom: 8px;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: center;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          font-size: 0.6rem;
          width: 76%;
          margin: 10px auto;
          padding: 10px;
        }

        .sucContent {
          display: flex;
          justify-content: center;
          width: 80%;
          margin: 36px auto;
          height: 70px;
          line-height: 86px;
          background: #fff;
          border-radius: 10px;
          position: relative;

          .words {
            font-size: 1rem;
            color: #333;
            font-weight: bold;
          }

          .img {
            width: 60px;
            height: 60px;
            position: absolute;
            top: -30px;
          }
        }
      }

      .ansTime {
        .kefuTime {
          font-size: 0.8rem;
          display: flex;
          justify-content: center;
          margin: 8px auto;
          color: #fff;
        }
      }

      .kefuAns {
        display: inline-block;
        width: 100%;
        margin-top: 3px;
        margin-bottom: 8px;

        .touxiang {
          width: 40px;
          height: 40px;

          .touxiang-img {
            width: 40px;
            height: 40px;
          }
        }

        .kefuSay {
          width: fit-content;
          max-width: 70%;
          background: rgba(255, 255, 255, 0.78);
          border-radius: 0px 10px 10px 10px;
          margin-left: 10px;
          margin-top: 1%;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #3c3c3c;
          font-weight: 400;
          padding: 8px 5%;
          font-size: 0.8rem;
          line-height: 1.2rem;
          display: flex;
          align-items: center;

          .messagebox {
            height: auto;
            word-wrap: break-word;
            word-break: break-all;
            white-space: pre-wrap;
            padding: 0px;
            margin: 0px;

            .message {
              height: auto;
            }

            .img {
              width: 1rem;
              height: 1rem;
              position: relative;
            }
          }
        }
      }
    }

    .conversation::-webkit-scrollbar {
      background-color: transparent;
      width: 0;
      height: 0;
      display: none;
    }
  }

  .talkContent.fade {
    -webkit-mask: linear-gradient(transparent 0%, #fff 10%);
  }

  .inputBar {
    position: fixed;
    bottom: 0%;
    height: 12%;
    left: 0%;
    width: 100%;
    background: #ffffff;
    z-index: 1;

    .changeInput {
      position: absolute;
      left: 4%;
      top: 14%;
      width: 8%;

      > img {
        position: relative;
        object-fit: contain;
        width: 100%;
      }
    }

    .typerInput {
      position: absolute;
      left: 15%;
      top: 8.8%;
      width: 81%;
      height: 50%;

      .el_input_outer {
        position: absolute;
        bottom: 15%;
        min-height: 85%;
        height: fit-content;
        left: 0%;
        width: 60%;
        // width: 74%;
        border-radius: 50vh;
        border: 0px solid transparent;
        background: #f4f5fb;
        font-size: 0.9rem;
        font-weight: 400;
        padding: 0px 24% 0px 10px;
        line-height: 1.2rem;
        display: flex;
        align-content: center;
        align-items: center;

        .el-input__inner {
          position: relative;
          // min-height: 100%;
          height: fit-content;
          left: 0%;
          width: 100%;
          border-radius: 50vh;
          // padding: 5px 0px 5px 1px;
          > img {
            vertical-align: middle;
            margin: 0px 2px;
          }
        }

        .el-input__inner:focus {
          outline: none;
        }

        .el-input__inner:empty::before {
          content: attr(placeholder);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #aeaeae;
          font-size: 0.75rem;
          padding-left: 10px;
        }

        .el-input__inner::placeholder {
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #aeaeae;
          font-size: 0.75rem;
          padding-left: 10px;
        }

        .el-input__inner * {
          -webkit-user-select: auto;
          -webkit-user-modify: read-write;
        }

        .el-input__inner::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
      }

      .el_input_outer::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }

      .sentBtn {
        position: absolute;
        right: 0%;
        top: 0%;
        height: 85%;
        left: 86%;
        // left: 74%;
        width: 0%;
        // padding: 0px 24% 0px 10px;
        > img {
          position: absolute;
          right: 5%;
          height: 85%;
          top: 50%;
          transform: translate(0px, -50%);
          object-fit: contain;
        }
      }

      .expression_btn {
        position: absolute;
        left: 90%;
        height: 85%;
        bottom: 7.5%;

        > img {
          position: absolute;
          height: 85%;
          top: 50%;
          transform: translate(0px, -50%);
          object-fit: contain;
        }
      }
    }

    .inputBackground {
      position: absolute;
      background: #ffffff;
      bottom: 100%;
      width: 100%;
      height: 0px;
      z-index: -1;
    }
  }

  .inputBar.chooseExpression {
    bottom: 38%;
  }
}

// .talkWindow.nowork {
//   top: 20%;
//   height: 62%;
// }
.downToBottomBtn {
  position: absolute;
  z-index: 10;
  left: 76%;
  top: 76%;
  width: 24%;
  max-height: 30px;
  background: #FFFFFF;
  border: 1px solid #4368EB;
  border-radius: 50vh 0px 0px 50vh;
  font-size: 14px;
  font-family: FZLanTingHeiS-R-GB;
  font-weight: 400;
  color: #4368EB;
  line-height: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  > img {
    position: relative;
    height: 14px;
    object-fit: contain;
  }
}

@media screen and (min-width: 600px) {
  .talkWindow {
    top: 5%;
    width: 60%;
    height: 79%;
    left: 34%;

    .talkContent {
      .conversation {
        width: 95%;
        left: 2.5%;
        top: 0%;
        height: 100%;

        .welcome {
          padding: 8px 2%;
        }

        .ansBack {
          .titleicon {
            position: relative;
            left: 4%;
            width: 100%;

            > img {
              position: relative;
              width: 8%;
            }
          }

          .conversationList {
            width: auto;
            max-width: 80%;

            > div {
              #jumpuse {
                margin-top: 16px;
                height: 40px;
                line-height: 40px;
                border-radius: 20px;
                padding-left: 25px;

                .optionicon {
                  right: 6%;
                  width: 18px;
                  top: 11px;
                }
              }
            }
          }
        }

        .askBack {
          .conversationList {
            min-width: unset;
            max-width: 82%;
            padding: 8px 2%;
            color: #ffffff;
          }
        }
      }
    }

    .talkContent.fade {
      -webkit-mask: unset;
    }

    .inputBar {
      bottom: 0%;
      height: 10%;
      left: 34%;
      width: 60%;
      background: unset;

      .typerInput {
        left: 0%;
        top: 8.8%;
        width: 100%;
        height: 70%;

        .el_input_outer {
          height: 85%;
          width: 79%;
          // width: 87%;
          border: 0px solid transparent;
          background: #ffffff;
          padding: 0px 10.5% 0px 15px;
        }

        .sentBtn {
          height: 85%;
          // left: 82%;
          left: 90%;
          // padding: 0px 8% 0px 10px;
        }

        .expression_btn {
          left: 93%;
          bottom: 15.5%;
        }
      }
    }

    .inputBar.chooseExpression {
      bottom: 0%;
    }
  }

  .downToBottomBtn {
    right: 0%;
    left: unset;
    top: 65%;
    width: 8%;
    border: 1px solid #4368EB;
    border-radius: 50vh;
    cursor: pointer;
  }
}
</style>
