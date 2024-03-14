import Base from "./base";

class Prod extends Base {
  static match() {
    return process.env.NODE_ENV === "production";
  }
  RedirectionIp() {  
    return process.env.VUE_APP_REQUESTDOMAIN+"/dwr/domainNameQuery.do";
  }
  MosPhoneIp() {
    return "https://vchat.ccb.com:80/dwr/dwr";
  }
}
export default Prod;
