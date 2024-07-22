import base from "./modules/base";
import other from "./modules/other";
import system from "./modules/system";

export * from "./_config";
export * from "./cascader";
export * from "./_types";

/**
 * 字典映射集合
 */

export default {
  ...base,
  ...other,
  ...system,
};
