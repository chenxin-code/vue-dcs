export default class Utils {
  static LoadScript(path) {
    return new Promise((resolve, reject) => {
      let script = document.createElement("script");
      script.src = path;
      script.type = "text/javascript";
      script.onload = (res) => {
        resolve(res);
      };
      script.onerror = (err) => {
        reject(err);
      };
      document.body.appendChild(script);
    });
  }

  static LoadXml(xmlstr) {
    let domParser = new DOMParser();
    let xml = domParser.parseFromString(xmlstr, "text/xml");
    let json = this.XmlToJson(xml);
    return { xml, json };
  }
  static XmlToJson(xml) {
    let node;
    if (xml.tagName) {
      let attributes = {};
      for (let i = 0; i < xml.attributes.length; i++) {
        let attribute = xml.attributes[i];
        attributes[attribute.name] = attribute.value;
      }
      node = {
        root: false,
        tagName: xml.tagName,
        attributes: attributes,
        value: xml.nodeValue,
        children: [],
      };
    } else {
      node = {
        root: true,
        tagName: xml.nodeName,
        children: [],
      };
    }
    let children = xml.childNodes;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      node.children.push(this.XmlToJson(child));
    }
    return node;
  }

  // TODO: 需要写实际内容
  static IsMobile() {
    return false;
  }

  static GetIP() {
    return new Promise((resolve, reject) => {
      var ip_dups = {};
      var RTCPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      var useWebKit = !!window.webkitRTCPeerConnection;
      var mediaConstraints = {
        optional: [{ RtpDataChannels: true }],
      };
      // 这里就是需要的ICEServer了
      var servers = {
        iceServers: [
          { urls: "stun:stun.services.mozilla.com" },
          { urls: "stun:stun.l.google.com:19302" },
        ],
      };
      var pc = new RTCPeerConnection(servers, mediaConstraints);
      function handleCandidate(candidate) {
        var ip_regex =
          /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
        var hasIp = ip_regex.exec(candidate);
        if (hasIp) {
          var ip_addr = ip_regex.exec(candidate)[1];
          if (ip_dups[ip_addr] === undefined) resolve(ip_addr);
          ip_dups[ip_addr] = true;
        }
      }
      // 网络协商的过程
      pc.onicecandidate = function (ice) {
        if (ice.candidate) {
          handleCandidate(ice.candidate.candidate);
        }
      };
      pc.createDataChannel("");
      //创建一个SDP(session description protocol)会话描述协议 是一个纯文本信息 包含了媒体和网络协商的信息
      pc.createOffer(
        function (result) {
          pc.setLocalDescription(
            result,
            function () {},
            function () {}
          );
        },
        function () {}
      );
      setTimeout(function () {
        // 联网才能拿到
        var lines = pc.localDescription?.sdp.split("\n");
        if (!lines) return reject();
        lines?.forEach(function (line) {
          if (line.indexOf("a=candidate:") === 0) handleCandidate(line);
        });
      }, 1000);
    });
  }
}
