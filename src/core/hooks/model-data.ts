import { computed } from "vue";
import { CommonObj } from "@/core/_types";

const cacheMap = new WeakMap();
/**
 * 双向绑定数据
 * @param {object} splitDateMap  例：{dateRange: ['startDate', 'endDate']} 支持数据回显或数据提交时，日期参数是散开的两个字段（处理了el-element的日期控件接收数组）
 */
export default (props: CommonObj, $emit: any, propName = "modelValue", splitDateMap?: CommonObj) => {
  return computed({
    get() {
      if (cacheMap.has(props[propName])) return cacheMap.get(props[propName]);
      const proxy = new Proxy(props[propName], {
        get(target, key) {
          if (splitDateMap?.[key as string]) {
            const [minProp, maxProp] = splitDateMap[key as string];
            Reflect.set(target, key, [target[minProp], target[maxProp]]);
          }
          return Reflect.get(target, key);
        },
        set(target, key, val) {
          let overTarget: CommonObj = { [key]: val };
          if (splitDateMap?.[key as string]) {
            const [minProp, maxProp] = splitDateMap[key as string];
            const [minVal = "", maxVal = ""] = val || [];
            // Reflect.deleteProperty(target, key);
            // delete target[key];
            overTarget = { [minProp]: minVal, [maxProp]: maxVal };
          }
          $emit(`update:${propName}`, { ...target, ...overTarget });
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
