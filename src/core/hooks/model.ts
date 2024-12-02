import { computed } from "vue";
import { CommonObj } from "@/core/_types";

const cacheMap = new WeakMap();
export default (props: CommonObj, $emit: any, propName = "modelValue") => {
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
          $emit(`update:${propName}`, {
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
      $emit(`update:${propName}`, val);
    },
  });
};
