/**
 * 标签页通信（暂未完善，后续用到再完善）
 * @link 参考链接：6.10 p@d.aA 06/21 YZZ:/ 标签页间通信 # JavaScript # 前端开发工程师 # 编程 # 程序员 # web前端  https://v.douyin.com/i6MRmdG5/ 复制此链接，打开Dou音搜索，直接观看视频！
 */

export default (name = "test") => {
  const channel = new BroadcastChannel(name);
  /**
   * 判断某个标签页是否存在
   * 两种实现方式：（1）通过localStorage；（2）通过标签页通信
   */
  function getIsExist(name) {
    return false;
  }
  function send(url: string) {
    if (!getIsExist(name)) {
      window.open(url, name);
    } else {
      channel.postMessage(name);
    }
  }
  function accept() {
    channel.addEventListener("message", e => {
      console.log(e.data, "data------------------");
    });
  }
  return {
    send,
    accept,
  };
};
