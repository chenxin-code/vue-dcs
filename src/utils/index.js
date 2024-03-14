import EncodeUtf8 from "./EncodeUtf8";

export default class Utils {
  static isSystem() {
    if (/iphone/.test(window.navigator.userAgent.toLowerCase())) {
      return "iPhone";
    } else if (/android/.test(window.navigator.userAgent.toLowerCase())) {
      return "Android";
    } else {
      return "";
    }
  }

  static callIosApp(eventId, paramStr) {
    try {
      if (window.webkit?.messageHandlers?.CCBNativeFunc) {
        console.log(
          "window.webkit.messageHandlers.CCBNativeFunc",
          `{"eventId":"${eventId}","dic":${paramStr || "{}"}}`
        );
        window.webkit.messageHandlers.CCBNativeFunc.postMessage(
          `{"eventId":"${eventId}","dic":${paramStr || "{}"}}`
        );
      } else {
        console.log(
          "ios scheme: ",
          `ios://${EncodeUtf8(
            `client.callShell(${eventId}${paramStr ? `, ${paramStr}` : ""})`
          )}`
        );
        window.location.href = `ios://${EncodeUtf8(
          `client.callShell(${eventId}${paramStr ? `, ${paramStr}` : ""})`
        )}`;
      }
    } catch (error) {
      console.error(error);
      console.log(
        "ios schem: ",
        `ios://${EncodeUtf8(
          `client.callShell(${eventId}${paramStr ? `, ${paramStr}` : ""})`
        )}`
      );
      window.location.href = `ios://${EncodeUtf8(
        `client.callShell(${eventId}${paramStr ? `, ${paramStr}` : ""})`
      )}`;
    }
  }
}
