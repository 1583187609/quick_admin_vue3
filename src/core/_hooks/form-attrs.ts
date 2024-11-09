import { CommonObj } from "../_types";
import { defaultCommonSize } from "../_utils";
import { FormLevelsAttrs } from "../form";

/**
 * 获取el-form 需要 provide 到 el-form-item 的属性
 * @param mergeProps
 * @returns
 */
// function provideFormAttrs(mergeProps: CommonObj | undefined = propsAttrs, keys: string[] = levelFormKeys) {
//   const attrs: CommonObj = {};
//   keys.forEach((key: string) => {
//     attrs[key] = mergeProps?.[key] ?? defaultMap[key];
//   });
//   return attrs;
// }

const levelFormKeys = ["labelSuffix", "labelWidth", "grid", "size", "readonly", "disabled", "pureText"];
const defaultMap = {
  grid: 24,
  size: defaultCommonSize,
};
export default (propsAttrs?: CommonObj, handleKeys: string[] = levelFormKeys, isRoot = false) => {
  /**
   * 获取el-form 需要 inject 的属性
   * @param mergeProps
   * @returns
   */
  const provideAttrs: CommonObj = {};
  function injectFormAttrs(keys: string[] = handleKeys, mergeProps = propsAttrs) {
    const injectAttrs = isRoot ? undefined : inject<any>(FormLevelsAttrs);
    if (!injectAttrs && !mergeProps) return {};
    const attrs: CommonObj = {};
    levelFormKeys.forEach((key: string) => {
      const val = mergeProps?.[key] ?? injectAttrs?.[key] ?? defaultMap[key];
      provideAttrs[key] = val;
      if (keys.includes(key)) attrs[key] = val;
    });
    return attrs;
  }
  const formAttrs = injectFormAttrs();
  provide<any>(FormLevelsAttrs, provideAttrs);
  return formAttrs;
};
