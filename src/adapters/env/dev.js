import Base from "./base";

class Dev extends Base {
  static match() {
    return process.env.NODE_ENV === "development";
  }
  RedirectionIp() {
    return "http://128.192.182.232:8104/dwr/domainNameQuery.do";
  }
  MosPhoneIp() {
    return "http://128.128.97.153:6004/dwr/dwr";
  }
}
export default Dev;
