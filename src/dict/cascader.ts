import { storage } from "@/utils";
import { CommonObj, OptionItem, StrNum } from "@/vite-env";

export type CascaderName = "Region";
//  | "ReportCascader"

/**
 * 级联的逻辑处理暂时放在这里，后续再改进放置位置
 */
//获取举报类型下拉项
// function getReportsCascader(): OptionItem[] {
//   return (
//     storage.getItem("reportCascaderOpts")?.map((item: CommonObj) => {
//       const { content, id, children } = item;
//       return {
//         label: content,
//         value: id,
//         children: children.map((it: CommonObj) => {
//           const { content, id } = it;
//           return { label: content, value: id };
//         }),
//       };
//     }) || []
//   );
// }

//获取级联中的文字
export function getCascaderText(name: CascaderName, val: StrNum, char = "-") {
  if (name === "Region") {
    if (!val) return char;
    let text = "";
    const regions: OptionItem[] = storage.getItem("regions") || [];
    regions.find((item, ind) => {
      const { label, children = [] } = item;
      const target = children.find((it: any) => it.value === val);
      if (target) {
        text = `${label}${char}${target.label}`;
      }
      return !!target;
    });
    return text;
  }
  // else if (name === "ReportCascader") {
  //   const target = getReportsCascader().find(
  //     (it: CommonObj) => it.value === val
  //   );
  //   return target?.label || "";
  // }
  else {
    throw new Error(`未找到name为${name}的字典映射`);
  }
}

//获取级联下拉项
export function getCascaderOpts(name: CascaderName): OptionItem[] {
  if (name === "Region") {
    return storage.getItem("regions") || [];
  }
  // else if (name === "ReportCascader") {
  //   return getReportsCascader();
  // }
  else {
    throw new Error(`未找到name为${name}的字典映射`);
  }
}
