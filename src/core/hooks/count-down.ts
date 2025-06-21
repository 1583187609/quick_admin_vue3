/**
 * 倒计时
 */
import { ref } from "vue";

export default (total = 3, cb?: () => void, isAdd = false) => {
  const timer = ref<any>(null);
  const seconds = ref(isAdd ? 0 : total);
  function start() {
    if (isAdd) {
      timer.value = setInterval(() => {
        if (seconds.value < total) {
          seconds.value++;
        } else {
          clear();
        }
      }, 1000);
    } else {
      timer.value = setInterval(() => {
        if (seconds.value > 1) {
          seconds.value--;
        } else {
          clear();
        }
      }, 1000);
    }
  }
  function pause() {
    clear();
    setTimeout(() => {
      seconds.value = isAdd ? 0 : total;
    }, 1000);
  }
  function clear() {
    clearInterval(timer.value);
    timer.value = null;
    cb?.();
  }
  return {
    timer,
    seconds,
    pause,
    start,
  };
};
