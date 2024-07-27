import { docsPath } from "../utils";
import { writeComponentDoc } from ".";
import { getRowsOfEvent, getRowsOfMethod, getRowsOfProps, getRowsOfSlot } from "./component";

/**
 * 生成Demo文档
 * @advice 方法名建议: writeDemoTestDoc
 */
export default () => {
  writeComponentDoc(
    "/examples/0_示例_demo/1_DemoForm 示例表单",
    `${docsPath}/4_示例_demo/2_文档生成_create/1_DemoForm 示例表单.md`,
    {
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
    }
  );
};
