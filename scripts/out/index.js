/**
 * 用于运行脚本
 */

// export enum OrderDropKeyEnum {
//   OrderType = '订单类型'
// }
// export type OrderDropListRes = {
//   [k in keyof typeof OrderDropKeyEnum]: OrderDropItem[];
// };

import fs from "fs";
import path from "path";
import { writeComponentDoc, writeDemoTestDoc, writeTestMdDoc } from "./create/index.js";
import { docsPath, readMeName, splitOrderChar } from "./utils/consts.js";
import { getRowsOfProps, getRowsOfMethod, getRowsOfEvent, getRowsOfSlot } from "./create/component.js";

/**
 * 触发热更新写入新文件的方法
 * @notice 这个方法是为了更改文件触发热更新执行文件重写的
 */
export function hotRun() {}

function getSecs() {
  return {
    apis: [
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
    ],
    tsPath: "/src/components/form/_types.ts",
  };
}

function writeCommonTestDoc(dirPath = "/examples") {
  const fullDirPath = path.join(process.cwd(), dirPath);
  const dirNames = fs.readdirSync(fullDirPath).filter(it => it !== "0_示例_demo");
  dirNames.forEach(parFile => {
    const currPath = path.join(fullDirPath, parFile);
    const isDir = fs.lstatSync(currPath).isDirectory();
    if (!isDir) throw new Error("暂未处理不是文件夹的情况");
    const enName = parFile.split(splitOrderChar).at(-1);
    // console.log(parFile, enName, "parFile------------");
    fs.readdirSync(currPath).forEach(file => {
      const readDirPath = `${dirPath}/${parFile}/${file}`;
      const writeFilePath = `${docsPath}/2_组件_comp/${parFile}/${file}.md`;
      const secs = enName === "form" ? getSecs() : null;
      writeComponentDoc(readDirPath, writeFilePath, secs);
    });
  });
  // //组件 -> 表单 -> 基础表单
  // writeComponentDoc("/examples/2_表单_form/1_BaseForm 基础表单", `${docsPath}/2_组件_comp/2_表单_form`, {
  //   apis: [
  //     {
  //       type: "props",
  //       rows: getRowsOfProps("/src/components/form/BaseForm.vue", true),
  //     },
  //     { type: "method", rows: getRowsOfMethod(), descs: { tip: "这是tip消息" } },
  //     {
  //       type: "event",
  //       rows: getRowsOfEvent(),
  //       descs: {
  //         tip: "这是tip消息",
  //         warning: "这是warning消息",
  //         danger: "这是danger消息",
  //         details: "这是details消息",
  //       },
  //     },
  //     { type: "slot", rows: getRowsOfSlot(), descs: { warning: "这是warning消息" } },
  //   ],
  //   tsPath: "/src/components/form/_types.ts",
  // });
  // //组件 -> 表单 -> 分块表单
  // writeComponentDoc("/examples/2_表单_form/2_SectionForm 分块表单 分块表单 分块表单 分块表单", `${docsPath}/2_组件_comp/2_表单_form`, {
  //   apis: [
  //     {
  //       type: "props",
  //       rows: getRowsOfProps("/src/components/form/BaseForm.vue", true),
  //     },
  //     { type: "method", rows: getRowsOfMethod(), descs: { tip: "这是tip消息" } },
  //     {
  //       type: "event",
  //       rows: getRowsOfEvent(),
  //       descs: {
  //         tip: "这是tip消息",
  //         warning: "这是warning消息",
  //         danger: "这是danger消息",
  //         details: "这是details消息",
  //       },
  //     },
  //     { type: "slot", rows: getRowsOfSlot(), descs: { warning: "这是warning消息" } },
  //   ],
  //   tsPath: "/src/components/form/_types.ts",
  // });
}

// writeTestMdDoc(); //测试生成Md文档页示例
// writeDemoTestDoc(); // 生成文档页示例

writeCommonTestDoc(); //生成组件文档页（通用方法）
