import app from "@/utils";

const isDevelopment = process.env.NODE_ENV == "development";

export function call_client_pub(eventId, paramStr) {
  console.log("call_client_pub", eventId, paramStr);
  console.log("isSystem", app.isSystem(), "window.webkit", window.webkit);
  if (app.isSystem() === "iPhone" || isDevelopment) {
    app.callIosApp(eventId, paramStr);
  } else if (app.isSystem() === "Android") {
    console.log("Android: window.client ", window.client);
    console.log("window.client.callShell", window.client?.callShell?.toString());
    window.client?.callShell(eventId, paramStr);
  }
}
