import "./imgCall.less";
const imgCall = (src) => {
  var panoDom = document.querySelector("#pano");
  var container = document.createElement("div");
  container.setAttribute("id", "imglength-container");
  var closeIcon = document.createElement("div");
  closeIcon.setAttribute("class", "imgCall_close_icon");
  var imgContainer = document.createElement("div");
  imgContainer.setAttribute("id", "imgDiv");
  var img = document.createElement("img");
  img.src = src;
  imgContainer.appendChild(img);
  container.appendChild(imgContainer);
  container.appendChild(closeIcon);
  panoDom.appendChild(container);
  closeIcon.addEventListener("click", function () {
    panoDom.removeChild(container);
  });
  img.onload = function () {
    if (img.clientHeight < img.clientWidth) {
      img.style.width = "60%";
    }
    if (img.clientHeight < imgContainer.offsetHeight) {
      img.style.transform = "translateY(-50%)";
      img.style.top = "50%";
      img.style.left = "0%";
      img.style.position = "relative";
    }
  };
};

export default imgCall;
