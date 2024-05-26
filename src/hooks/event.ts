import { onMounted, onBeforeUnmount } from "vue";
export default (eventName: string, handleFn: () => void, immediate = false) => {
  onMounted(() => {
    immediate && handleFn();
    window.addEventListener(eventName, handleFn);
  });
  onBeforeUnmount(() => {
    window.removeEventListener(eventName, handleFn);
  });
};
