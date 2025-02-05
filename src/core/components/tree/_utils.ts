import { CommonObj } from "@/core/_types";

export function test(val: string, data: CommonObj, props?: CommonObj) {
  if (!val) return true;
  //   const labelKey = props?.label ?? "label";
  return data.label.includes(val);
}
