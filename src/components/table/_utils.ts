import { CommonObj, StrNum } from "@/vite-env";
import { typeOf, propsJoinChar, emptyTime, devErrorTips, emptyVals, renderValue } from "@/utils";
import { TableField, TableFieldAttrs, defaultColumnAttrs } from "@/components/table";
import { merge } from "lodash";
import config from "@/config";

/**
 * 获取特殊列
 */
export function getSpecialColMap(currPage: number = 1, pageSize: number = 20): CommonObj {
  return Object.assign(
    {
      //序号列
      index: {
        prop: "$index",
        label: "序号",
        type: "index",
        width: 54,
        fixed: "left",
        index: (ind: number) => ind + 1 + (currPage - 1) * pageSize,
      },
      //排序列
      sort: {
        prop: "$sort",
        label: "排序",
        type: "sort",
        width: 54,
        fixed: "left",
      },
      //多选列
      selection: {
        prop: "$selection",
        label: "选择",
        type: "selection",
        width: 48,
        fixed: "left",
      },
      //操作列
      operate: {
        prop: "$operate",
        label: "操作",
        type: "operate",
        // minWidth: 250,
        fixed: "right",
      },
      //id：唯一标识id
      id: { prop: "id", label: "ID", minWidth: 70, fixed: "left" },
      //备注列
      remark: { prop: "remark", label: "备注", minWidth: 140 },
      //创建列
      create: {
        prop: ["createdName", "createdAt"],
        label: "创建时间",
        minWidth: 160,
      },
      //修改列
      update: {
        prop: ["updatedName", "updatedAt"],
        label: "修改时间",
        minWidth: 160,
      },
      //switch开关
      switch: {
        prop: "status",
        label: "启用状态",
        minWidth: 80,
        attrs: {
          activeValue: 1,
          inactiveValue: 0,
          activeText: "启用",
          inactiveText: "禁用",
          inlinePrompt: true,
          // onChange() {
          //   ElMessage.warning("暂未处理【启用/禁用】事件");
          // },
        },
      },
      //是否启用状态
      BaseTag: {
        prop: "status",
        label: "状态",
        minWidth: 90,
        attrs: { name: "EnableStatus" },
      },
      //图片
      BaseImg: {
        prop: "imgUrl",
        label: "图片",
        minWidth: 136,
        attrs: { size: "120" },
      },
      //文本省略显示，点击查看更多
      BaseText: {
        prop: "content",
        label: "内容",
        minWidth: 250,
      },
      // 文本复制
      // BaseCopy: {},
      //用户信息
      // UserInfo: {
      //   prop: "userData",
      //   label: "用户信息",
      //   fixed: "left",
      //   getAttrs(col: TableFieldAttrs) {
      //     return {
      //       width: col?.attrs?.simple ? 222 : 440,
      //     };
      //   },
      // },
    },
    config?.table?.customSpecialCol
  );
}

// 获取col和level
export function getColLevel(col: TableFieldAttrs, lev = 0, specialColMap: CommonObj, isSmall?: boolean): CommonObj {
  let newLev = lev;
  const { children, type, prop, label, minWidth } = col;
  const specialColAttrs = specialColMap[type as string];
  const { getAttrs } = specialColAttrs || {};
  const newCol = merge(
    {},
    defaultColumnAttrs,
    specialColAttrs,
    label?.includes("时间") && {
      minWidth: 164,
      formatter:
        type !== "custom" && typeof prop === "string"
          ? (row: CommonObj) => renderValue(emptyTime === row[prop] ? undefined : row[prop])
          : undefined,
    },
    getAttrs?.(col),
    col
  );
  if (typeOf(newCol.prop) === "Array") {
    newCol.prop = (newCol.prop as [string, string]).join(propsJoinChar);
  }
  //如果是小型的紧凑型，那么所有的宽度均要减少20px
  if (isSmall) {
    const { width, minWidth } = newCol;
    width && (newCol.width -= 20);
    minWidth && (newCol.minWidth -= 20);
  }
  // if (minWidth) {
  //   delete newCol.width;
  // }
  if (children?.length) {
    newCol.children = children.map((item: TableField) => {
      if (typeOf(item) !== "Object") return 0;
      const { col, level } = getColLevel(item as TableFieldAttrs, lev++, specialColMap, defaultColumnAttrs);
      if (level > newLev) {
        newLev = level;
      }
      return col;
    });
  }
  return { col: newCol, level: newLev };
}
