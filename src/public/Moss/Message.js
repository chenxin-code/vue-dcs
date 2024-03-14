import MD5 from "crypto-js/md5";
import { reactive } from "vue";

export const MessageState = {
  INIT: "INIT",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export const MessageType = {
  NORMAL: "NORMAL", // 普通聊天信息
  SYSTEM: "SYSTEM", // 系统信息
  MENU: "MENU", // 菜单信息
};

export default class Message {
  static genId(msg) {
    return MD5(JSON.stringify(msg)).toString().toUpperCase();
  }

  constructor({ id, seq, text, from, to, type, state, sendTime, extra }) {
    if (!Message.seq) Message.seq = 1;
    Message.seq += 1;

    this.raw = reactive({});
    this.raw.seq = seq || Message.seq; // 外部传入或者采用类的seq
    this.raw.text = text;
    this.raw.from = from;
    this.raw.to = to;
    this.raw.type = type;
    this.raw.state = state;
    this.raw.extra = extra;
    this.raw.sendTime = sendTime || new Date().getTime(); // 接收到的消息会有sendTime，否则直接生成

    this.raw.id = reactive(id || Message.genId(this)); // 生成随机id
    console.log("生成的消息", this.raw);
  }
  Copy(message) {
    message = message instanceof Message ? message : new Message(message);
    this.raw.seq = message.raw.seq;
    this.raw.text = message.raw.text;
    this.raw.from = message.raw.from;
    this.raw.to = message.raw.to;
    this.raw.type = message.raw.type;
    this.raw.state = message.raw.state;
    this.raw.sendTime = message.raw.sendTime;
    this.raw.extra = message.raw.extra;
  }
  ID() {
    return this.raw.id;
  }
  Seq(value) {
    return (this.raw.seq = value || this.raw.seq);
  }
  Text(value) {
    return (this.raw.text = value || this.raw.text);
  }
  From(value) {
    return (this.raw.from = value || this.raw.from);
  }
  To(value) {
    return (this.raw.to = value || this.raw.to);
  }
  Type(value) {
    return (this.raw.type = value || this.raw.type);
  }
  State(value) {
    return (this.raw.state = value || this.raw.state);
  }
  SendTime(value) {
    return (this.raw.sendTime = value || this.raw.sendTime);
  }
  Extra(value) {
    return (this.raw.extra = value || this.raw.extra);
  }
}
