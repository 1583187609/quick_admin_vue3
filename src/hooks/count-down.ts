import { ref } from "vue";

export default (total = 3, cb: () => void, isAdd = false) => {
  if (!cb) throw new Error("必须传入回调函数");
  const seconds = ref(isAdd ? 0 : total);
  let timer: any = null;
  function start() {
    if (isAdd) {
      timer = setInterval(() => {
        if (seconds.value < total) {
          seconds.value++;
        } else {
          cb();
          clearInterval(timer);
        }
      }, 1000);
    } else {
      timer = setInterval(() => {
        if (seconds.value > 1) {
          seconds.value--;
        } else {
          cb();
          clearInterval(timer);
        }
      }, 1000);
    }
  }
  function pause() {
    clearInterval(timer);
    cb();
    setTimeout(() => {
      seconds.value = isAdd ? 0 : total;
    }, 1000);
  }
  return {
    timer,
    seconds,
    pause,
    start,
  };
};
