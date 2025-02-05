import test from "./modules/test";
import base from "./modules/base";
import other from "./modules/other";
import system from "./modules/system";
import global from "./modules/global";

// 懒加载请求
export function lazyFetch(promiseFn) {
  // 这里声明一个带名称的函数，是为了后续处理逻辑会用到这个名称
  const lazy = () => promiseFn;
  return lazy;
}

// export const originDictMap = {
//   ...test,
//   ...base,
//   // ...batch,
//   ...other,
//   ...system,
//   ...global,
// };

/**
 * 数据映射集合（包含select，cascader 的下拉项，还有 tree 的数据）
 * @notice 支持文本、数组、对象、Promise、批量请求的下拉项
 */

const dictMap = {
  ...test,
  ...base,
  ...other,
  ...system,
  ...global,
};

export default dictMap;
