import { onMounted, onBeforeUnmount } from "vue";
import { debounce } from "@/components/_utils";
export default (eventName: string, handleFn: () => void, immediate = false, delay = 1000) => {
  onMounted(() => {
    immediate && handleFn();
    // window.addEventListener(eventName, handleFn);
    window.addEventListener(eventName, debounce(handleFn, immediate, delay, false));
  });
  onBeforeUnmount(() => {
    window.removeEventListener(eventName, handleFn);
  });
};
