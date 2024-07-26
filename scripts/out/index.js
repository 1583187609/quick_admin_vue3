/**
 * 用于运行脚本
 */

// export enum OrderDropKeyEnum {
//   OrderType = '订单类型'
// }
// export type OrderDropListRes = {
//   [k in keyof typeof OrderDropKeyEnum]: OrderDropItem[];
// };

import { getRowsOfProps, getRowsOfMethod, getRowsOfEvent, getRowsOfSlot } from "./create/component.js";
import { writeComponentDoc, writeTestMdDoc } from "./create/index.js";
import { docsPath } from "./utils/consts.js";

/**
 * 触发热更新写入新文件的方法
 * @notice 这个方法是为了更改文件触发热更新执行文件重写的
 */
export function hotRun() {}

function writeCommonTestDoc() {
  const tempApis = [
    {
      type: "props",
      rows: getRowsOfProps("/src/components/form/BaseForm.vue", true),
    },
    { type: "method", rows: getRowsOfMethod(), descs: { tip: "这是tip消息" } },
    {
      type: "event",
      rows: getRowsOfEvent(),
      descs: {
        tip: "这是tip消息",
        warning: "这是warning消息",
        danger: "这是danger消息",
        details: "这是details消息",
      },
    },
    { type: "slot", rows: getRowsOfSlot(), descs: { warning: "这是warning消息" } },
  ];
  writeComponentDoc(
    "/examples/form",
    `${docsPath}/4_示例_demo/2_文档生成_create`,
    {
      demoDirPath: "/examples/form",
      apis: tempApis,
      tsPath: "/src/components/form/_types.ts",
    },
    1
  );
}
writeCommonTestDoc();

writeTestMdDoc();
