export default class Base {
  static match() {
    return true;
  }
  static Match() {
    return this.match();
  }

  RedirectionIp() {
    return "";
  }
  MosPhoneIp() {
    return "";
  }
}
