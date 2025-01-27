import { useMenuStore } from "@/store";
import { getNewTpls } from "../form/FilePannel/_config";

export default () => {
  const { allMenus } = useMenuStore();
  // 已生效的的生成文件模板
  const sysGeneratorTplsNew = getNewTpls(JSON.parse(JSON.stringify(allMenus)));
  return {
    sysGeneratorTplsNew,
  };
};

// export const sysGeneratorTpls = [
//   // 表单
//   {
//     value: "commonCenter",
//     label: "通用中心",
//     children: [
//       {
//         value: "tempForm1",
//         label: "临时表单1",
//         data: {
//           fields: [],
//           apiId: "1-1",
//         },
//       },
//       {
//         value: "tempForm2",
//         label: "临时表单2",
//         data: {
//           fields: [],
//           apiId: "1-1",
//         },
//       },
//     ],
//   },
//   // 表格
//   {
//     value: "monitorCenter",
//     label: "监控中心",
//     children: [
//       {
//         value: "tempTable1",
//         label: "临时表格1",
//         data: {
//           cols: [],
//           operateBtns: [],
//         },
//       },
//       {
//         value: "tempTable2",
//         label: "临时表格2",
//         data: {
//           cols: [],
//           operateBtns: [],
//         },
//       },
//     ],
//   },
//   // 增删改查
//   {
//     value: "projectCenter",
//     label: "项目中心",
//     children: [
//       {
//         value: "easyNote",
//         label: "轻松笔记",
//         data: {
//           fields: [],
//           cols: [],
//           extraBtns: [],
//           operateBtns: [],
//         },
//       },
//       {
//         value: "smartEducation",
//         label: "智慧教育",
//         data: {
//           fields: [],
//           cols: [],
//           extraBtns: [],
//           operateBtns: [],
//         },
//       },
//     ],
//   },
// ];
