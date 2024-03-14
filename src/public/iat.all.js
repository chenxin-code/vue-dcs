/**
 * Created by zhangqi on 16/10/9.
 *
 * 动作
 * 1.发送音频 如果未结束 缓冲6组发送 audiostatu:2 代表未结束 若结束 发送缓冲区数据，发送结尾数据 audiostatu:4代表结束
 * 2.获取结果 停止录音 发送空的 终止音频 发送获取结果的指令
 * 3.会话结束 发送会话结束指令
 *
 * 动作流程
 * 1. 初始化websocket
 * 2. websocket onopen -> 发送session begin 请求
 * 3. 收到应答(cmd = ssb)获取sid,初始化会话，开始采集音频
 * 4. 收集音频 通过websocket上传服务器
 * 5. 到达末端（用户触发 or 本地检测 ）发起音频结束指令，发起获取结果指令
 * 6. 收到结果应答，发送会话结束指令，结束会话
 */

import { recordWorkerCode, speexWorkCode, vadWorkerCode } from "./worker";

var IFlyIatSession = (function(window, navigator) {
  var auth_on = false;
  var iatUrl = "";
  var uaps_url = "wss://voicesrv1.ccb.com:1030/https_iat_prx";

  var get_url = "";
  var get_uaps_url = function(uaps_uri, msg) {
    $.ajax({
      async: false,
      type: "post",
      url: uaps_uri,
      contentType: "application/json-rpc",
      data: JSON.stringify(msg),
      dataType: "text",
      Accept: "application/json-rpc",
      success: function(data, textStatus, jqXHR) {
        console.log(data);
        console.log(textStatus);
        console.log(jqXHR);

        // alert("--------return data : " + data);
        // alert("--------return json : " + utils.base64decode(data));
        // alert("--------return result.url : " + JSON.parse(utils.base64decode(data)).result.url);

        var resp_data = utils.base64decode(data);

        if (
          JSON.stringify(JSON.parse(resp_data).result) != null &&
          JSON.stringify(JSON.parse(resp_data).result) != undefined
        ) {
          get_url = JSON.parse(utils.base64decode(data)).result.url;

          //callback.uaps_ret("uaps_get_url : " + get_url);
        }

        if (
          JSON.stringify(JSON.parse(resp_data).error) != null &&
          JSON.stringify(JSON.parse(resp_data).error) != undefined
        ) {
          //alert("-------uaps ,error---- : "+ JSON.stringify(JSON.parse(resp_data).error));

          callback.uaps_ret(
            "uaps_get_url_error : " +
              JSON.stringify(JSON.parse(resp_data).error)
          );
        }

        //get_url = JSON.parse(utils.base64decode(data)).result.url;
      },
      error: function(xhr, textStatus) {
        console.log("错误");
        console.log(xhr);
        console.log(textStatus);

        alert(JSON.parse(utils.base64decode(xhr.responseText)));
      },
      complete: function(XHR, TS) {
        XHR = null;
      } //回收资源
    });
  };

  var uaps_sse = function(uaps_uri, msg) {
    $.ajax({
      async: true,

      type: "post",
      url: uaps_uri,
      contentType: "application/json-rpc",
      data: JSON.stringify(msg),
      dataType: "text",
      Accept: "application/json-rpc",
      success: function(data, textStatus, jqXHR) {
        console.log(data);
        console.log(textStatus);
        console.log(jqXHR);

        //alert("---------uaps_sse : "+JSON.parse(utils.base64decode(data)).result.ret);
        var uaps_sse_ret = JSON.parse(utils.base64decode(data)).result.ret;
        if (uaps_sse_ret != 0) {
          callback.uaps_ret("uaps_sse , error: " + uaps_sse_ret);
        }
      },
      error: function(xhr, textStatus) {
        console.log("错误");
        console.log(xhr);
        console.log(textStatus);

        alert(JSON.parse(utils.base64decode(xhr.responseText)));
      },
      complete: function(XHR, TS) {
        XHR = null;
      } //回收资源
    });
  };

  var uaps_heart = function(uaps_uri, msg) {
    $.ajax({
      async: true,

      type: "post",
      url: uaps_uri,
      contentType: "application/json-rpc",
      data: JSON.stringify(msg),
      dataType: "text",
      Accept: "application/json-rpc",
      success: function(data, textStatus, jqXHR) {
        console.log(data);
        console.log(textStatus);
        console.log(jqXHR);

        //alert("---------uaps_heart : "+JSON.parse(utils.base64decode(data)).result.ret);
        var uaps_heart_ret = JSON.parse(utils.base64decode(data)).result.ret;
        if (uaps_heart_ret != 0) {
          callback.uaps_ret("uaps_heart ,error : " + uaps_heart_ret);
        }
      },
      error: function(xhr, textStatus) {
        console.log("错误");
        console.log(xhr);
        console.log(textStatus);

        alert(JSON.parse(utils.base64decode(xhr.responseText)));
      },
      complete: function(XHR, TS) {
        XHR = null;
      } //回收资源
    });
  };

  var _utf8_decode = function(utftext) {
    var string = "";
    var i = 0;
    var c = (c1 = c2 = 0);
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }
    return string;
  };

  var utils = {
    log: function(message, level) {
      if (level > 0) {
        console.log(message);
      }
    },
    base64encode: function(str) {
      var base64EncodeChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var out, i, len;
      var c1, c2, c3;
      len = str.length;
      i = 0;
      out = "";
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt((c1 & 0x3) << 4);
          out += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt(
            ((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4)
          );
          out += base64EncodeChars.charAt((c2 & 0xf) << 2);
          out += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3f);
      }
      return out;
    },

    base64decode: function(input) {
      var output = "";
      var _keyStr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      if (input != null) {
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
          enc1 = _keyStr.indexOf(input.charAt(i++));
          enc2 = _keyStr.indexOf(input.charAt(i++));
          enc3 = _keyStr.indexOf(input.charAt(i++));
          enc4 = _keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }
        output = _utf8_decode(output);
        return output;
      } else {
        return null;
      }
    },

    getBufferSize: function() {
      var ua = navigator.userAgent;
      if (/(Win(dows )?NT 6\.2)/.test(ua)) {
        return 1024; //Windows 8
      } else if (/(Win(dows )?NT 6\.1)/.test(ua)) {
        return 1024; //Windows 7
      } else if (/(Win(dows )?NT 6\.0)/.test(ua)) {
        return 2048; //Windows Vista
      } else if (/Win(dows )?(NT 5\.1|XP)/.test(ua)) {
        return 4096; //Windows XP
      } else if (/Mac|PPC/.test(ua)) {
        return 1024; //Mac OS X
      } else if (/Linux/.test(ua)) {
        return 8192; //Linux
      } else if (/iPhone|iPad|iPod/.test(ua)) {
        return 2048; //iOS
      } else {
        return 16384; //Otherwise
      }
    },
    checkIsSupport: function() {
      var scope=navigator.mediaDevices||{};
    if(!scope.getUserMedia){
        scope=navigator;
        scope.getUserMedia||(scope.getUserMedia=scope.webkitGetUserMedia||scope.mozGetUserMedia||scope.msGetUserMedia);
    }
    if(!scope.getUserMedia){
        return false;
    }
      // if (!navigator.getUserMedia) {
      //   //if (!navigator.mediaDevices.getUserMedia) {
      //   return false;
      // }
      if (!window.AudioContext) {
        return false;
      }
      if (!window.Worker) {
        return false;
      }
      if (!window.URL) {
        return false;
      }
      return true;
    },
    extend: function(defaults, options) {
      var extended = {};
      var prop;
      for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
          extended[prop] = defaults[prop];
        }
      }
      for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
          extended[prop] = options[prop];
        }
      }
      return extended;
    },
    getBrowserId: function() {
      if (typeof Fingerprint2 == "function") {
        new Fingerprint2().get(function(result) {
          env.browserId = result;
        });
      } else {
        env.browserId = "unknow:" + btoa(navigator.userAgent).substr(0, 16);
      }
    }
  };
  var settings = {
    //"serverUrl":"ws://172.31.3.91:8082/iat/",
    serverUrl: "wss://voicesrv1.ccb.com:1030/https_iat_prx",
    recordWorkerPath: null,
    vadWorkerPath: null,
    speexWorkerPath: null
  };

  var iat_params = {
    appid: "pc20onli",
    lang: "sms",
    acous: "anhui",
    aue: "speex-wb",
    ent: "sms16k",
    auf: "audio/L16;rate=16000",
    svad: "1",
    vad_rst: "1",
    hotword: "普惠，序厅"
  };
  /*var iat_params = {
        "appid": "aicep300",
        "lang": "sms", 
        "acous": "anhui", 
        "aue": "speex-wb", 
        "ent": "sms16k", 
        "auf":  "audio/L16;rate=16000",
        "svad": "1", 
        "vad_rst": "1",
        "ability":"ab_asr",
        "auth_id":"111111",
        "token":"432547fhgsdfdvgf"
    };*/

  var sessionInfo = {
    id: null,
    synId: 0, //音频帧计数
    jsonId: 1, //jsonrpc计数
    audiostatus: 1 //音频状态
  };
  var recording = false;
  var rec_state = "";
  var audioStream = null;
  var audioCtx = null;
  var audioNode = {
    source: null,
    scriptNode: null
  };
  var serverParam = "";
  var env = {
    browserId: null,
    bufferSize: null,
    host: null,
    isSupport: true
  };

  var recorderWorker = null;
  var speexWorker = null;
  var vadWorker = null;

  var newRecorderWorker = function(path) {
    var recorderWorker = new Worker(path);
    recorderWorker.onmessage = function(e) {
      volumeCheck.listen(e.data.volume);
      callback.onVolume(e.data.volume);
      var buffer = e.data.buffer;
      var data = new Int16Array(buffer);
      vadWorker.sendData(data);
      speexWorker.encodeData(data); //把录音数据传送给speexworker编码
    };
    var init = function(sampleRate) {
      recorderWorker.postMessage({
        command: "init",
        config: {
          sampleRate: sampleRate,
          outputBufferLength: env.bufferSize
        }
      });
    };
    var reset = function() {
      recorderWorker.postMessage({ command: "reset" });
    };
    var sendData = function(data) {
      recorderWorker.postMessage({
        command: "record",
        buffer: data
      });
    };
    return {
      init: init,
      reset: reset,
      sendData: sendData
    };
  };
  var newSpeexWorker = function(path) {
    var speexWorker = new Worker(path);
    speexWorker.onmessage = function(e) {
      if (recording == false) return;
      if (e.data.command == "encode") {
        var buffer = e.data.buffer;
        var result = new Int8Array(buffer);
        audioSender.sendData(result.buffer);
      }
    };
    var init = function() {
      speexWorker.postMessage({ command: "init" });
    };
    var encodeData = function(data) {
      //data Int16Array
      var output = new Int8Array();
      speexWorker.postMessage({
        command: "encode",
        inData: data,
        inOffset: 0,
        inCount: data.length,
        outData: output,
        outOffset: 0
      });
    };
    return {
      init: init,
      encodeData: encodeData
    };
  };
  var newVadWorker = function(path) {
    var vadWorker = new Worker(path);
    vadWorker.onmessage = function(e) {
      //hwt  这里应该是监测语录中断的
      // if (e.data.command == "esvad" && e.data.message == 'end') {
      //     iatEvent.getResult();
      // }
    };
    var init = function() {
      vadWorker.postMessage({ command: "init" });
    };
    var sendData = function(data) {
      vadWorker.postMessage({
        command: "appendData",
        pcmData: data,
        nSamples: data.length
      });
    };
    return {
      init: init,
      sendData: sendData
    };
  };

  var command = (function() {
    var base = {
      jsonrpc: "2.0",
      method: "request",
      id: sessionInfo.jsonId
    };
    var clone = function(obj) {
      return JSON.parse(JSON.stringify(obj));
    };
    var sessionBegin = function() {
      sessionInfo.jsonId++;
      var msg = clone(base);
      var data = clone(iat_params); //+ ", \"svc\": \"iat\", \"type\": \"2\", \"cmd\": \"ssb\", \"uid\": \"test\""
      if (serverParam.appid != null && serverParam.appid != undefined) {
        data.appid = serverParam.appid;
      }
      console.log("sessionBegin");
      data.svc = "iat";
      data.type = "2";
      data.cmd = "ssb";
      data.uid = "test";
      data.apr = "1";
      msg.params = data;
      socket.send(msg);
    };

    var audioWrite = function(sessionId, data) {
      sessionInfo.jsonId++;
      var msg = clone(base);
      //msg.sid = sessionId;
      //msg.cmd = "auw";
      var data1 = clone(data); // + ", \"sid\": \"" + sessionId + "\"";
      data1.sid = sessionId;
      msg.params = data1;
      //   console.log(msg, "audioWrite");
      socket.send(msg);

      //------------------
      if (auth_on) {
        var uaps_heart_param = {
          token: iat_params.token,
          appid: iat_params.appid,
          ability: iat_params.ability,
          auth_id: iat_params.auth_id,
          svc: iat_params.svc,
          batchHeartBeat: "1"
        };

        var msg = {
          jsonrpc: "2.0",
          method: "deal_request",
          params: uaps_heart_param
        };

        uaps_heart(uaps_url, msg);
      }
      //------------------
    };
    var getResult = function(sessionId) {
      sessionInfo.jsonId++;
      var msg = clone(base);
      var params = {
        svc: "iat",
        cmd: "grs",
        uid: "test",
        type: "2",
        sid: sessionId
        //"appid": "court200",
      };
      if (serverParam.appid != null && serverParam.appid != undefined) {
        params.appid = serverParam.appid;
      } else {
        params.appid = iat_params.appid;
      }
      msg.params = params;
      // console.log(msg,"getresult");
      socket.send(msg);
      //------------------
      if (auth_on) {
        var uaps_heart_param = {
          token: iat_params.token,
          appid: iat_params.appid,
          ability: iat_params.ability,
          auth_id: iat_params.auth_id,
          svc: iat_params.svc,
          batchHeartBeat: "1"
        };
        var msg = {
          jsonrpc: "2.0",
          method: "deal_request",
          params: uaps_heart_param
        };
        uaps_heart(uaps_url, msg);
      }
      //------------------
    };
    var sessionEnd = function(sessionId) {
      sessionInfo.jsonId++;
      var msg = clone(base);
      // msg.cmd = "sse";
      // msg.sid = sessionId;
      var params = {
        svc: "iat",
        cmd: "sse",
        //"appid": "court200",
        uid: "test",
        type: "2"
      };
      var data = clone(params); // + ", \"sid\": \"" + sessionId +"\"";
      data.sid = sessionId;
      if (serverParam.appid != null && serverParam.appid != undefined) {
        data.appid = serverParam.appid;
      } else {
        data.appid = iat_params.appid;
      }

      msg.params = data;
      console.log(msg, "sessionEnd");
      socket.send(msg);
      //----------------
      if (auth_on) {
        var uaps_sse_param = {
          token: iat_params.token,
          appid: iat_params.appid,
          ability: iat_params.ability,
          auth_id: iat_params.auth_id,
          svc: iat_params.svc,
          cmd: "sse"
        };

        var msg = {
          jsonrpc: "2.0",
          method: "deal_request",
          params: uaps_sse_param
        };

        uaps_sse(uaps_url, msg);
      }
      //------------------
    };
    return {
      sessionBegin: sessionBegin,
      audioWrite: audioWrite,
      getResult: getResult,
      sessionEnd: sessionEnd
    };
  })();

  var recorderStatus = {
    idle: "idle", //空闲
    sessionBegin: "ssb", //session begin 会话开始
    audioWrite: "auw", //audio write 写入音频
    getResult: "grs", //get result 获取结果
    sessionEnd: "sse" //session end 会话结束
  };

  var callback = {
    onResult: function(code, re) {},
    onVolume: function() {},
    onError: function() {},
    onProcess: function(status) {},
    uaps_ret: function(msg) {}
  };

  var socket = null;
  var newSocket = function(url) {
    var instance = null;
    var serverMessageHandler = (function() {
      return {
        /**
         * 会话开始请求响应处理
         * @param obj e.g. {"jsonrpc" : "2.0", "id" : 1, "result" : { "cmd" : "ssb@..." }}
         */
        onSSB: function(obj) {
          if (obj.result.ret == 0) {
            sessionInfo.id = obj.result.sid;
            callback.onProcess("started"); //启动成功
          } else {
            iatEvent.abortSession();
            callback.onResult(obj.result.ret, null);
          }
        },
        /**
         * 会话开始请求响应处理
         * @param obj e.g. {"jsonrpc" : "2.0", "id" : 1, "result" : { "svc" : "iat@..." }}
         */
        onAUW: function(obj) {
          var ret = obj.result.ret;
          if (ret != 0) {
            iatEvent.abortSession();
            callback.onResult(obj.result.ret, null);
            return;
          }

          var recStatus = obj.result.recStatus;
          var result = obj.result.iatrst;
          var pgs = obj.result.pgs;
          var isEnd = recStatus == 5;
          if (!isEnd) {
            //success but not end
            if (recStatus == 0) {
              callback.onResult(ret, result, pgs);
            }
          } else {
            // got a final result
            callback.onResult(ret, result, pgs, isEnd, obj.result.resultStatus);
            rec_state = recorderStatus.sessionEnd;
            iatSessionEnd();
          }
        },
        /**
         * 请求结果响应处理
         * @param obj e.g. {"jsonrpc" : "2.0", "id" : 1, "params" : { "svc" : "iat@..." }}
         */
        onGRS: function(obj) {
          if (rec_state != recorderStatus.getResult) {
            //on status error
            utils.log("GET RESULT ERROR.");
            return;
          }
          var ret = obj.result.ret;

          if (ret != 0) {
            // on error
            iatEvent.abortSession();
            callback.onResult(ret, null);
            return;
          }
          var resultStatus = obj.result.resultStatus;
          var result = obj.result.iatrst;
          var pgs = obj.result.pgs;
          var isEnd = resultStatus == 5;
          if (!isEnd) {
            //success but not end
            callback.onResult(ret, result, pgs, isEnd);
            iatEvent.getResult();
          } else {
            // got a final result
            callback.onResult(ret, result, pgs, isEnd);
            rec_state = recorderStatus.sessionEnd;
            iatSessionEnd();
          }
        },
        /**
         * 会话结束请求响应处理
         * @param obj e.g. {"jsonrpc" : "2.0", "id" : 1, "params" : { "svc" : "iat@..." }}
         */
        onSSE: function(obj) {
          sessionInfo.id = null;
          callback.onProcess("onEnd");
        }
      };
    })();
    var onclose = function() {
      console.log("session close");
    };
    var onopen = function() {
      command.sessionBegin();
    };
    var onmessage = function(obj) {
      var json = JSON.parse(obj.data);
      var result = json.result;
      var cmd;

      if (result != null && result != undefined && result != "") {
        cmd = result.cmd;
      }

      //对应的应答进行对应的逻辑处理
      if (cmd == "ssb") {
        serverMessageHandler.onSSB(json);
      } else if (cmd == "auw") {
        serverMessageHandler.onAUW(json);
      } else if (cmd == "grs") {
        serverMessageHandler.onGRS(json);
      } else if (cmd == "sse") {
        serverMessageHandler.onSSE(json);
      } else {
        /*var ret = json.ret;
                if (ret == 0) return;
                iatEvent.abortSession();
                callback.onResult(ret, null);*/
        var ret = json.ret;
        if (ret) {
          iatEvent.abortSession();
          callback.onResult(json.ret);
        } else {
          if (json.error == null) {
            iatEvent.abortSession();
            callback.onResult(json.result.ret);
          } else {
            iatEvent.abortSession();
            callback.onResult(json.error.code);
          }
        }
      }
    };
    var onerror = function() {
      // alert("连接服务出现错误");
    };
    return {
      connect: function() {
        if (instance == null || instance.readyState != 1) {
          //------------------
          if (auth_on) {
            /*		
                                var uaps_ssb_param = {
                                    "token":iat_params.token,
                                    "appid":iat_params.appid,
                                    "ability":iat_params.ability,
                                    "auth_id":iat_params.auth_id,
                                    "svc":iat_params.svc,
                                    "cmd":"ssb"
                                };
                            	
                                var msg = {
                                    "jsonrpc": "2.0",
                                    "method": "deal_request",
                                    "params": uaps_ssb_param,
                                };
                            	
                                alert("------JSON.stringify(msg) : " + JSON.stringify(msg)+";;;;uaps_url : "+uaps_url);
        
                                get_uaps_url(uaps_url,msg);
                            */
            iatUrl = "wss://" + get_url;
          } else {
            iatUrl = url;
          }
          console.trace();
          //alert("--------------iatUrl : " + iatUrl);
          // instance = new WebSocket(iatUrl);

          //复用websocket通道
          if (!window.$instance || window.$instance.readyState != 1) {
            instance = new WebSocket(iatUrl);
            window.$instance = instance;
          } else {
            instance = window.$instance;
            command.sessionBegin();
          }

          //------------------

          //alert("url : " + url);
          //instance = new WebSocket(url);//WebSocket(url, {protocolVersion: 8, origin: url, rejectUnauthorized: false});
          instance.onclose = onclose;
          instance.onopen = onopen;
          instance.onmessage = onmessage;
          instance.onerror = onerror;
        } else {
          //若链接可复用，直接发送sessionBegin指令(否则如上，初始化后再在onopen时发送)
          command.sessionBegin();
        }
      },
      send: function(msg) {
        // console.trace()
        // console.log(msg);
        utils.log(msg);
        instance.send(JSON.stringify(msg));
      }
    };
  };

  var iatEvent = (function() {
    var startRecord = function() {
      /* 写音频接口 或 非首次初始化 则不进行多媒体初始化*/
      if (audioStream == null) {
        initMedia();
        recorderWorker.init();
        return;
      }

      var serverurl = "";
      if (serverParam.url == null || serverParam.url == undefined) {
        serverurl = settings.serverUrl;
      } else {
        serverurl = serverParam.url;
      }

      //--------------------------------
      if (auth_on) {
        var uaps_ssb_param = {
          token: iat_params.token,
          appid: iat_params.appid,
          ability: iat_params.ability,
          auth_id: iat_params.auth_id,
          svc: iat_params.svc,
          cmd: "ssb"
        };

        var msg = {
          jsonrpc: "2.0",
          method: "deal_request",
          params: uaps_ssb_param
        };

        //alert("------JSON.stringify(msg) : " + JSON.stringify(msg)+";;;;uaps_url : "+uaps_url+"-------------------");

        get_uaps_url(uaps_url, msg);
        iatUrl = "wss://" + get_url;
      } else {
        iatUrl = serverurl;
      }

      //alert("---------iatUrl : " + iatUrl + "-------------");
      socket = newSocket(iatUrl);

      //--------------------------------------------

      //socket = newSocket(serverurl);
      callback.onProcess("onStart"); //开始启动录音
      socket.connect(); //连接服务

      rec_state = recorderStatus.sessionBegin;

      recording = true;
      volumeCheck.start();

      recorderWorker.reset();

      vadWorker.init();
      speexWorker.init();
    };
    var getResult = function() {
      stopRecord(); //停止录音
      if (rec_state == recorderStatus.audioWrite) {
        //首次从录音状态 切换到获取结果状态
        audioSender.sendEnd();
        callback.onProcess("onStop");
        rec_state = recorderStatus.getResult;
      }

      if (rec_state == recorderStatus.getResult) {
        command.getResult(sessionInfo.id);
      }
    };
    var stopRecord = function() {
      console.log("停止录音");
      recording = false;
      volumeCheck.stop();
    };
    var abortSession = function() {
      //停止录音
      stopRecord();
      rec_state = recorderStatus.sessionEnd; //sse
      iatSessionEnd();
    };
    return {
      startRecord: startRecord,
      getResult: getResult,
      stopRecord: stopRecord,
      abortSession: abortSession
    };
  })();

  function iatSessionEnd() {
    if (rec_state == recorderStatus.sessionEnd && sessionInfo.id != 0) {
      command.sessionEnd(sessionInfo.id);
    }
    rec_state = recorderStatus.idle;
  }

  var audioSender = (function() {
    var recorderBuffer = [];
    var frameCount = 0; //缓冲帧计数
    var checkStatus = function() {
      if (rec_state == recorderStatus.getResult) return false;
      if (sessionInfo.id == null) return false;
      return true;
    };
    var addBuffer = function(data) {
      recorderBuffer.push(data);
    };
    var sendData = function() {
      var frameSize = 43; //帧长 43bit
      var audioLength = recorderBuffer.length * frameSize;
      var str = (function() {
        //从缓冲区获取数据
        var str = "";
        var output = recorderBuffer.splice(0, recorderBuffer.length);
        var outputArray = new Int8Array(audioLength);
        var i = 0;
        var view;
        for (i = 0; i < output.length; i++) {
          view = new Int8Array(output[i]);
          outputArray.set(view, i * frameSize);
        }

        for (i = 0; i < audioLength; i++) {
          str += String.fromCharCode(outputArray[i]);
        }
        return str;
      })();
      sessionInfo.synId++;

      //   console.log(`data:audio/x-wav;base64,${utils.base64encode(str)}`);
      //   let snd = new Audio(`data:audio/wav;base64,Ki3RDUnmoUdh2GLq/Wt9e7li4Z9tb9yj28liFvdyGpbi/WB/h+YJyGralyotzM9AR6D25WkIBzWPQWOqgf7tgZdfbfb3yydxaVKj4ZJHoftPKTspUjIqLcktkmd+PyB5BQq8vnkDpyNZB55SMz2opVAyW8dJvm55BaKvLGk4aEaPKi3TLKRmbAtFxhUlzJg1Z5mkea+FgTB81m1kiKNw/b9rmYMGhwpJOio5iyot3F29pic3fXX7U/0s5XuO5gFvIsJKza+pF4zZJ88n6KoQWvlduTolLcoqLdlgBgXDN6+pCjFZHX+/kL/prlC7C03G8nCLpoPlKunIJPLjX7k6hcFr`);
      //   snd.play();
      // console.log(utils.base64encode(str));
      var data = {
        svc: "iat",
        cmd: "auw",
        //"appid": "court200",
        uid: "test",
        synid: "" + sessionInfo.synId,
        audiolen: "" + audioLength,
        //"audioStatus": "2",// 2 代表未完成
        data: utils.base64encode(str)
      };
      if (sessionInfo.audiostatus == 1) {
        sessionInfo.audiostatus = 2;
        data.audioStatus = "1";
      } else {
        data.audioStatus = "2";
      }

      if (serverParam.appid != null && serverParam.appid != undefined) {
        data.appid = serverParam.appid;
      } else {
        data.appid = iat_params.appid;
      }

      command.audioWrite(sessionInfo.id, data);
      frameCount = 0; //计数清空
    };
    //发送空音频 表示录音结束
    var sendEnd = function() {
      // console.trace()
      var data = {
        svc: "iat",
        cmd: "auw",
        //"appid": "court200",
        uid: "test",
        synid: "" + sessionInfo.synId,
        audiolen: "0",
        audioStatus: "4", // 2 代表未完成
        data: ""
      };

      if (serverParam.appid != null && serverParam.appid != undefined) {
        data.appid = serverParam.appid;
      } else {
        data.appid = iat_params.appid;
      }
      command.audioWrite(sessionInfo.id, data);
      sessionInfo.synId = 0; // 会话帧计数清空
    };
    return {
      sendData: function(data) {
        if (!checkStatus()) return;
        rec_state = recorderStatus.audioWrite;
        if (frameCount < 6) {
          //缓冲6帧再发送
          addBuffer(data);
          frameCount++;
          return;
        }
        sendData();
      },
      sendEnd: function() {
        if (!checkStatus()) return;
        sendData(); //清空缓冲数据
        sendEnd(); //发送结尾标记
      }
    };
  })();
  var gotStream = function(stream) {
    audioStream = stream;
    audioNode.source = audioCtx.createMediaStreamSource(stream);
    audioNode.scriptNode = audioCtx.createScriptProcessor(env.bufferSize, 1, 1);
    recorderWorker.init(audioCtx.sampleRate);
    //录音处理
    audioNode.scriptNode.onaudioprocess = function(e) {
      if (!recording) return;
      //把录音传给AudioContext对象
      // console.log(e.inputBuffer.getChannelData(0));
      recorderWorker.sendData(e.inputBuffer.getChannelData(0));
    };
    audioNode.source.connect(audioNode.scriptNode);
    audioNode.scriptNode.connect(audioCtx.destination);
    iatEvent.startRecord();
  };

  var initMedia = function() {
    //请求麦克风权限   //原旧方法  兼容性需要加上
    // navigator.getUserMedia({ audio: true }, gotStream, function(e) {
    //   alert("getUserMedia error " + e.name);
    // });

    navigator.mediaDevices //请求麦克风权限   //现代浏览器方法  兼容性需要加上
      .getUserMedia({ audio: true })
      .then(stream => {
        // let audioinput =  new AudioContext().createMediaStreamSource(stream)
        // console.log(audioinput);
        gotStream(stream);
      })
      .catch(e => {
        alert("getUserMedia error " + e.name);
        console.log(e);
      });

    //var p = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    //p.then(gotStream);
    //p.catch(function (e) {
    //	alert("getUserMedia error " + e.name);
    //});
    if (audioCtx == null) {
      audioCtx = new window.AudioContext();
    }
  };
  var volumeCheck = (function() {
    var lowVolumeLimit = 8; //音量过小
    var interval = 500; //音量判定间隔
    var maxTooLow = 5; //录音开始多少判定点提示音量过小
    var maxVolume = 0;
    var checkEventId = 0;

    var isTooLow = false;
    var tooLowCount = 0;

    var init = function() {
      maxVolume = 0;
      isTooLow = false;
      tooLowCount = 0;
    };
    var fire = function() {
      if (!isTooLow && maxVolume < lowVolumeLimit) {
        tooLowCount++;
        if (tooLowCount >= maxTooLow) {
          isTooLow = true;
          callback.onProcess("lowVolume"); //音量太小
        }
        return;
      }
      if (isTooLow && maxVolume >= lowVolumeLimit) {
        callback.onProcess("normalVolume"); //正常音量
      }
      if (maxVolume >= lowVolumeLimit) {
        clearInterval(checkEventId); //一旦恢复正常，结束
        tooLowCount = 0;
      }
    };
    var start = function() {
      init();
      checkEventId = setInterval(fire, interval);
    };
    var stop = function() {
      clearInterval(checkEventId);
    };

    var listen = function(volume) {
      maxVolume = Math.max(maxVolume, volume);
      // console.log(volume);
    };

    return {
      start: start,
      stop: stop,
      listen: listen
    };
  })();
  return function(setting) {
    callback = utils.extend(callback, setting.callback);
    settings = utils.extend(settings, setting.params);
    //init
    (function() {
      //api 统一
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      window.AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.msAudioContext;
      window.URL = window.URL || window.webkitURL;
      //环境变量判断
      utils.getBrowserId();
      env.host = window.document.domain;
      env.bufferSize = utils.getBufferSize();
      env.isSupport = utils.checkIsSupport();
    })();
    this.isSupport = function() {
      return env.isSupport;
    };
    if (!env.isSupport) {
      return;
    }
    settings.recordWorkerPath = recordWorkerCode();
    settings.vadWorkerPath = vadWorkerCode();
    settings.speexWorkerPath = speexWorkCode();

    recorderWorker = newRecorderWorker(settings.recordWorkerPath);
    speexWorker = newSpeexWorker(settings.speexWorkerPath);
    vadWorker = newVadWorker(settings.vadWorkerPath);
    //识别入口
    this.start = function(iat_params_obj) {
      serverParam = iat_params_obj; //+ ", rse = utf8, browser_id=" + env.browserId + ",host=" + env.domain;
      iatEvent.startRecord();
    };
    /*
     * stop record or write audio
     */
    this.stop = function() {
      iatEvent.getResult();
    };
    /*
     * cancel recognition
     */
    this.cancel = function() {
      iatEvent.abortSession();
    };

    this.kill = function() {
      console.log("kill");
      if (audioStream != null) {
        var tracks = audioStream.getAudioTracks();
        for (var i = 0; i < tracks.length; i++) {
          tracks[i].stop();
        }
        audioStream = null;
      }
      if (audioNode.source != null) {
        // 由于部分旧浏览器不支持audioCtx.close
        audioNode.source.disconnect();
        audioNode.scriptNode.disconnect();
        audioNode.source = null;
        audioNode.scriptNode = null;
      }
    };
  };
})(window, navigator);

export default IFlyIatSession;
