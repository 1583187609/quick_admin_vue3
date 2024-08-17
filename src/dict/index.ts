import test from "./modules/test";
import base from "./modules/base";
import other from "./modules/other";
import system from "./modules/system";
import global from "./modules/global";

/**
 * 数据映射集合（包含select，cascader 的下拉项，还有 tree 的数据）
 */

export default {
  ...test,
  ...base,
  ...other,
  ...system,
  ...global,
};
