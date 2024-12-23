import { CommonObj, OptionItem } from "@/core/_types";
import BaseOption from "@/core/components/BaseOption.vue";

export const exampleMap: CommonObj = {
  options: `[{label: "XX1", value: 1},{label: "XX2", value: 2}]`,
  rules: `[{required: true, message: "xxx不能为空", trigger: "blur", }]`,
  attrs: `{min: 0; max: 10}`,
  labelWidth: `4em`,
};

export function getGroupApiOpts(
  groupOpts: OptionItem[] = [
    { label: "用户", value: "user" },
    { label: "角色", value: "role" },
  ]
) {
  return groupOpts.map((opt: OptionItem, ind: number) => {
    const { label, value } = opt;
    const id = String(ind + 1); // 5 是下面的children的数组长度
    return {
      id,
      label,
      value,
      children: [
        {
          id: `${id}-1`,
          label: "新增、批量导入",
          value: `Post /mock/${value}`,
          api: `Post /mock/${value}`,
          method: "post",
          slots: [BaseOption, { leftKey: "label", rightKey: "api" }],
        },
        {
          id: `${id}-2`,
          label: "删除、批量删除",
          value: `Delete /mock/${value}`,
          api: `Delete /mock/${value}`,
          method: "delete",
          slots: [BaseOption, { leftKey: "label", rightKey: "api" }],
        },
        {
          id: `${id}-3`,
          label: "修改、批量修改",
          value: `Patch /mock/${value}`,
          api: `Patch /mock/${value}`,
          method: "patch",
          slots: [BaseOption, { leftKey: "label", rightKey: "api" }],
        },
        {
          id: `${id}-4`,
          label: "查询详情、查询列表、导出列表",
          value: `Get /mock/${value}`,
          api: `Get /mock/${value}`,
          method: "get",
          slots: [BaseOption, { leftKey: "label", rightKey: "api" }],
        },
        {
          id: `${id}-5`,
          label: "导入模板",
          value: `Get /mock/${value}/tpl`,
          api: `Get /mock/${value}/tpl`,
          method: "get",
          slots: [BaseOption, { leftKey: "label", rightKey: "api" }],
        },
      ],
    };
  });
}
