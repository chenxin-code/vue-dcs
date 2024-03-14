import Message from "./Message.js";
import { reactive } from "vue";

export default class MsgHandler {
  constructor() {
    this.Clean();
    Object.defineProperties(this, {
      Messages: {
        enumerable: true,
        configurable: false,
        get() {
          return this.reactive.messages;
        },
      },
      Seq: {
        enumerable: true,
        configurable: false,
        get() {
          return this.reactive.seq;
        },
      },
    });
  }
  Clean() {
    if (!this.reactive) this.reactive = reactive({});
    if (!this.reactive.messages) this.reactive.messages = reactive([]);
    this.reactive.messages.splice(0);
    this.reactive.seq = 1;
  }
  SetSeq(value) {
    this.reactive.seq = value;
  }
  Add(messages) {
    if (typeof messages == "undefined") return;
    if (!(messages instanceof Array)) messages = [messages];
    messages = messages.map((message) =>
      message instanceof Message ? message : new Message(message)
    );
    this.reactive.messages.push(...messages);
    this.reactive.seq += messages.length;
    console.log(
      "seq",
      this.reactive.seq,
      "添加消息",
      messages,
      this.reactive.messages
    );
  }
  Set(messages) {
    if (typeof messages == "undefined") return;
    if (!(messages instanceof Array)) messages = [messages];
    messages = messages.map((message) =>
      message instanceof Message ? message : new Message(message)
    );
    messages.forEach((message) => {
      let old = this.reactive.messages.find((m) => m.ID() === message.ID());
      if (!old) return;
      old.Copy(message);
    });
    console.log(
      "seq",
      this.reactive.seq,
      "更新消息",
      messages,
      this.reactive.messages
    );
  }
  Get(ids) {
    if (typeof ids == "undefined") return;
    if (!(ids instanceof Array)) ids = [ids];
    ids.map((id) => (id instanceof Message ? id.ID() : id));
    if (ids.length == 1)
      return this.reactive.messages.find((message) => message.ID() === ids[0]);
    return ids.map((id) =>
      this.reactive.messages.find((message) => message.ID() === id)
    );
  }
  Del(ids) {
    if (typeof ids == "undefined") return;
    if (!(ids instanceof Array)) ids = [ids];
    ids.map((id) => (id instanceof Message ? id.ID() : id));
    ids.forEach((id) => {
      let index = this.reactive.messages.findIndex(
        (message) => message.ID() === id
      );
      if (index < 0) return;
      this.reactive.messages.splice(index, 1);
    });
    console.log(
      "seq",
      this.reactive.seq,
      "移除消息",
      ids,
      this.reactive.messages
    );
  }
}
