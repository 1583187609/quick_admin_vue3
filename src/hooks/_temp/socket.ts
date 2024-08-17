const info = {
  app: {
    appid: "3565746828",
    cluster: "volcengine_streaming_common",
    secret: "4gSlbIzn4Fc41nldiJA1SUgRXef47zUn",
    token: "YmEnue54H6pJd7gEaoGXIjrRt8xpF-Js",
  },
  audio: {
    bits: 16,
    channel: 1,
    format: "wav",
    language: "zh-CN",
    rate: 16000,
  },
  request: {
    nbest: 1,
    reqid: "uid1234567890",
    sequence: 1,
    show_utterances: true,
    text: "这是一段语音识别【single】的测试文本内容",
    workflow: "audio_in,resample,partition,vad,fe,decode",
  },
  user: {
    uid: "uid1234567890",
  },
};

export default (url: string, protocol?: any) => {
  const socket = new WebSocket(url, protocol ? [protocol] : undefined);
  socket.binaryType = "arraybuffer";
  socket.onopen = function () {
    // send("这是第一条通过socket发送的消息");
    send(JSON.stringify(info));
    console.log("数据发送中...");
  };

  socket.onmessage = function (res) {
    console.log("数据已接收...", res.data);
  };

  socket.onclose = function () {
    console.log("连接已关闭...");
  };
  socket.onerror = function () {
    console.log("连接发生错误...");
  };
  //发送消息
  function send(text: string) {
    if (!text) return;
    socket.send(text);
  }
  //关闭链接
  function close() {
    socket.close();
  }
  return {
    send,
    close,
  };
};
