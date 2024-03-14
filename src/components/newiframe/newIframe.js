import  testpc  from "../../utils/isPc.js";
import "./newIframe.css";
let isPC = false;
var intervalTime;
const new_iframe = (link) => {
  const url = link;
  const openType = 'fullscreeniframe';
  if (url === "") {
    return;
  }
  var iframe = document.createElement("iframe");
  iframe.setAttribute("allowfullscreen", "true");
  iframe.setAttribute("webkitallowfullscreen", "true");
  iframe.setAttribute("mozallowfullscreen", "true");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("id", "dialogFrame");
  // iframe.frameborder = '0';
  // iframe.src = args[1];
  iframe.src = url;

  var closeEl = document.createElement("img");
  const closeElClass =
    openType == "fullscreeniframe"
      ? "newJsxIframe-close-img"
      : "iframe-close-img";
  closeEl.setAttribute("class", closeElClass);
  var imgSrc =
    openType == "fullscreeniframe"
      ? require("../../assets/img/backtohome.png")
      : require("../../assets/img/backtohome.png");
  // var imgSrc = require("../../assets/img/close_black2.png");
  closeEl.src = imgSrc;
  closeEl.onclick = function () {
    document.getElementById("app").removeChild(container);
  };

  var container = document.createElement("div");
  container.setAttribute("id", "mycontainer");
  var containerIframe = document.createElement("div");
  containerIframe.setAttribute("id", "new-container");

  if (openType != "fullscreeniframe") {
    containerIframe.style.cssText = isPC
      ? containerIframe.setAttribute("class", "open-type-pciframe")
      : containerIframe.setAttribute("class", "open-type-webiframe");
  } else {
    containerIframe.setAttribute("class", "opne-allscroll-iframe");
  }

  // containerIframe.style.overflowY = "auto";
  // containerIframe.style.overflowX = "auto";
  containerIframe.style.webkitOverflowScrolling = "touch";

  containerIframe.appendChild(iframe);
  actLoading(containerIframe);

  container.appendChild(containerIframe);
  containerIframe.appendChild(closeEl);
  iframe.onload = function () {
    // clearInterval(intervalTime)
    var loadingDom = document.getElementById("loadContainer");
    loadingDom.remove();
  };

  document.getElementById("app").appendChild(container);

  animation();
};
// loading加载器
function actLoading(elDom) {
  var loadingDom = document.createElement("div");
  loadingDom.setAttribute("id", "loadContainer");

  for (let i = 0; i < 4; i++) {
    var loadIconOne = document.createElement("div");
    loadIconOne.setAttribute("class", "animation-item");
    loadingDom.appendChild(loadIconOne);
  }
  elDom.appendChild(loadingDom);
}

function animation() {
  var childNodes = document.getElementById("loadContainer").children;

  var num = 0;

  intervalTime = setInterval(() => {
    childNodes[0].style.backgroundColor = "#00a6ff";
    num++;
    if (num < 12) {
      for (let i = 0; i < childNodes.length; i++) {
        childNodes[i].style.backgroundColor = "#e4f6ff";
      }
      childNodes[num % 4].style.backgroundColor = "#00a6ff";
    } else if (num >= 12 && num < 15) {
      childNodes[num % 4].style.backgroundColor = "#00a6ff";
    }
    if (num > 15) {
      num = 0;
    }
  }, 100);
}
export default new_iframe;
