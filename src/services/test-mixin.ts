import { Directive } from "vue";

const debounce = (func: Function, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const directive: Directive = {
  mounted(el, binding) {
    const { value, arg = 500, modifiers = {} } = binding;
    const { immediate } = modifiers;
    console.log(immediate, "immediate--------");
    if (typeof value !== "function") {
      throw new Error("v-debounce expects a function as its value");
    }
    console.log(arg, "args------");
    el.addEventListener("input", debounce(value, arg as number));
  },
  beforeUnmount(el, binding) {
    const { value } = binding;
    el.removeEventListener("input", value);
  },
};

export default directive;
