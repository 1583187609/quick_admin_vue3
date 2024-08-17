import { computed } from "vue";
import { CommonObj } from "@/vite-env";

const cacheMap = new WeakMap();
export default (props: CommonObj, emits: any, propName = "modelValue") => {
  return computed({
    get() {
      if (cacheMap.has(props[propName])) {
        return cacheMap.get(props[propName]);
      }
      const proxy = new Proxy(props[propName], {
        get(target, key) {
          return Reflect.get(target, key);
        },
        set(target, key, val) {
          emits(`update:${propName}`, {
            ...target,
            [key]: val,
          });
          return true;
        },
      });
      cacheMap.set(props[propName], proxy);
      return proxy;
    },
    set(val: any) {
      emits(`update:${propName}`, val);
    },
  });
};
