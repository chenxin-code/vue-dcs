export default class Base {
  static match() {
    return true;
  }
  static Match() {
    return this.match();
  }

  SdkOptions() {
    return [];
  }
  LoadHistory(...params) {
    return [];
  }
}
