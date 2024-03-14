import dragPinch from "../dragPinch/dragPinch";
import "./imgCall.less";
import isPc from "../isPc.js";
const imgCall = (src) => {
  var panoDom = document.querySelector("#app");
  var container = document.createElement("div");
  container.setAttribute("id", "img-container");
  var closeIcon = document.createElement("div");
  closeIcon.setAttribute("class", "imgCall_close_icon");
  var imgContainer = document.createElement("div");
  imgContainer.setAttribute("id", "imgDiv");
  var img = document.createElement("img");
  img.setAttribute("id", "dragPinchImg");
  img.style.transform = "scale(1)";
  img.style.marginLeft = 0;
  img.style.marginTop = 0;
  img.src = src;
  // img.src = require('../../static/pano/img/1.jpg')
  imgContainer.appendChild(img);
  container.appendChild(imgContainer);
  container.appendChild(closeIcon);
  panoDom.appendChild(container);
  closeIcon.addEventListener("click", function () {
    panoDom.removeChild(container);
  });
  img.onload = function () {
    // 移动端
    if (!isPc) {
      dragPinch();
    } else {
      wheelScroll();
      drag();
    }
  };

  // 图片缩放
  function wheelScroll() {
    let step = 0.1;
    let INNER = true;
    if (window.addEventListener)
      //FF,火狐浏览器会识别该方法
      window.addEventListener("DOMMouseScroll", wheel, false);
    window.onmousewheel = document.onmousewheel = wheel; //W3C

    function wheel(event) {
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      } else if (event.detail) {
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3;
      }
      if (delta) handle(delta, event);
    }
    //上下滚动时的具体处理函数

    function handle(delta, event) {
      let imgContainer = document.getElementById("dragPinchImg");
      if (!imgContainer) {
        return;
      }
      if (INNER) {
        if (delta > 0) {
          //向上滚动
          // console.log('向上滚动');
          let scale =
            Number.parseFloat(
              imgContainer.style.transform.replace("scale(", "")
            ) + step;
          imgContainer.style.transform = "scale(" + scale + ")";
        } else {
          //向下滚动
          // console.log('向下滚动');
          let scale =
            Number.parseFloat(
              imgContainer.style.transform.replace("scale(", "")
            ) - step;
          if (scale <= 0.8) {
            return;
          }
          imgContainer.style.transform = "scale(" + scale + ")";
        }
        // event.preventDefault();
        event.stopPropagation();
        return;
      }
    }
  }

  function drag() {
    var oDiv = document.getElementById("dragPinchImg");
    oDiv.onmousedown = function (ev) {
      var oEvent = ev || window.event;
      let clientX = oEvent.clientX;
      let clientY = oEvent.clientY;
      document.onmousemove = function (ev) {
        var oDiv = document.getElementById("dragPinchImg");
        let eventMove = ev || window.event;
        eventMove.preventDefault();
        let movementX = eventMove.clientX - clientX;
        let movementY = eventMove.clientY - clientY;
        // console.log(movementX, movementY, parseInt(oDiv.style.marginLeft));
        // event.clientY;
        // this.imgLeft += movementX * 2;
        oDiv.style.marginLeft =
          parseInt(oDiv.style.marginLeft) + movementX * 2 + "px";
        // this.imgTop += movementY * 2;
        oDiv.style.marginTop =
          parseInt(oDiv.style.marginTop) + movementY * 2 + "px";
        clientX = eventMove.clientX;
        clientY = eventMove.clientY;
      };
      document.onmouseup = function (ev) {
        document.onmousemove = null; //将move清除
        document.onmouseup = null;
      };
      return false; //火狐的bug，要阻止默认事件
    };
  }
};

export default imgCall;
