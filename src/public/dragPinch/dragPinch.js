import Hammer from './hammer.js'
const dragPinch = () => {
  function point2D (x, y) {
    return { x: x, y: y };
  }

  var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  var el = document.getElementById('imgDiv');
  // var tMatrix = [1,0,0,1,Number('-' + el.offsetWidth/2),0]//x缩放，无，无，y缩放，x平移，y平移
  var tMatrix = [1, 0, 0, 1, 0, 0]
  var initScale = 1;//初始化scale


  // console.log(el)
  var mc = new Hammer.Manager(el)
  var ticking = false
  var poscenter = point2D(0, 0);//缓存双指的中心坐标
  // var duration = '';//设置过渡效果，用于双击缩放效果
  var lastTranslate = point2D(0, 0);//记录上次的偏移值
  var oDiv = document.getElementById('imgDiv')
  var lastcenter = point2D(oDiv.offsetWidth / 2, oDiv.offsetHeight / 2)//图像的中心点，用于对比双指中心点
  var center = lastcenter
  mc.add(new Hammer.Pan({ threshold: 0, pointers: 1 }))
  mc.add(new Hammer.Pinch({ threshold: 0 }))
  // mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
  mc.on("panmove", onPan);
  mc.on("panstart", onPanStart)
  mc.on("pinchmove", onPinch);
  mc.on("pinchstart", onPinchStart);
  // mc.on("doubletap",onDoubleTap);

  function onPanStart (ev) {
    lastTranslate = point2D(tMatrix[4], tMatrix[5])//缓存上一次的偏移值
  }
  function onPan (ev) {
    // duration = ''
    // el.className = ''			
    tMatrix[4] = lastTranslate.x + ev.deltaX
    tMatrix[5] = lastTranslate.y + ev.deltaY
    requestElementUpdate('onpan');

  }
  function onPinchStart (ev) {
    // duration = '';
    lastTranslate = point2D(tMatrix[4], tMatrix[5])//记录上一次的偏移值
    initScale = tMatrix[0] || 1;
    poscenter = point2D(ev.center.x, ev.center.y);
    lastcenter = point2D(center.x + lastTranslate.x, center.y + lastTranslate.y);//重新计算放大后的中心坐标
    poscenter = point2D(ev.center.x - lastcenter.x, ev.center.y - lastcenter.y);
    requestElementUpdate('onpinchStart');
  }
  function onPinch (ev) {

    var nowScale = tMatrix[0] = tMatrix[3] = initScale * ev.scale;
    var composscal = (1 - ev.scale)
    if (tMatrix[0] < 1) {
      tMatrix[0] = tMatrix[3] = 1;
      return
    }
    // tMatrix[4] = poscenter.x - ((poscenter.x - lastcenter.x) *  ev.scale + lastcenter.x)  + lastTranslate.x//最后加上上一次的偏移值
    // tMatrix[5] = poscenter.y - ((poscenter.y - lastcenter.y) *  ev.scale + lastcenter.y)  + lastTranslate.y
    tMatrix[4] = (1 - ev.scale) * poscenter.x + lastTranslate.x;
    
    tMatrix[5] = (1 - ev.scale) * poscenter.y + lastTranslate.y;
    
    requestElementUpdate('onpinch');
  }

  function updateElementTransform () {
    // el.style.transition = duration
    var tmp = tMatrix.join(',')
    el.style.transform = 'matrix(' + tmp + ')';
    ticking = false;
  }
  function requestElementUpdate () {
    if (!ticking) {
      reqAnimationFrame(updateElementTransform);
      ticking = true;
    }
  
    
  }
  /**
    初始化设置
  */
  requestElementUpdate();
}




export default dragPinch