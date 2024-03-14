export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

export function loadScript(path) {
    return new Promise((resolve, reject) => {
      let script = document.createElement("script");
      script.src = path;
      script.type = "text/javascript";
      script.onload = (res) => {
        resolve(res);
        document.body.removeChild(script);
      };
      script.onerror = (err) => {
        reject(err);
        document.body.removeChild(script);
      };
      document.body.appendChild(script);
    });
  }

  export function getIsWxClient() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
    return false;
};