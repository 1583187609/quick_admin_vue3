<!-- 按钮传参简介
/**
* 可接受一个数组，数组内可接受字符串、方法、对象；
* to跳转目标地址可传入字符串，也可传入对象（route）、方法；
* 内置按钮皆可简写成一个英文名，可传入text属性替换默认文本【详情】为【查看】或其他属性覆盖默认值；
*/ 
:operateBtns="[
  'edit', 'reject','delete','download','pass',
  (row: CommonObj, rowInd: number)=> rowInd % 2 === 1 ? 'forbid' : 'enable',
  { name: 'view', to: `/common-center/user/detail?id=${12}`},
  { name: 'view', to: {name: 'systemUserDetail', query: {id: 12}}},
  { name: 'view', text: '查看', to: (row:CommonObj) => ({name: 'systemUserDetail', query:{id: row.id}})},
]"
/**
* 可接受一个方法，按钮书写的前后位置不影响显示时前后的摆放位置（也可通过传入order属性改变前后位置）；
* 可自定义一个按钮（文本、图标、样式完全自定义）
* 按钮图标可传入字符串 'ElemeFilled'，也可传入引入的 ElemeFilled
*/ 
:operateBtns="(row:CommonObj, rowInd: number)=>{
  const {id} = row;
  if(rowInd % 3===0){
    return ['edit','delete', 'reject','pass','download', rowInd % 2 === 0 ? 'forbid' : 'enable']
  }else if(rowInd % 3===1){
    return [{name: 'edit', text: '修改', order: 1000}, 'reject','delete','download','pass']
  }else if(rowInd % 3===2){
    return [{name: 'zdy',text: '自定义按钮',attrs: { type: 'primary', icon: 'ElemeFilled' }}]
  }
}"
// 下方的 extraBtns 同 operateBtns 的规则
-->
<!-- 
:sections="sections" //可将搜索条件分块显示
:fields="fields"
-->
<template>
  <div class="page-view three f-sb-s">
    <BaseCrud
      class="f-3"
      v-model="modelData"
      :cols="cols"
      :fields="fields"
      :sections="sections"
      :fetch="GetMockCommonList"
      :importCfg="testImportCfg"
      :extraBtns="[
        'add',
        'delete',
        { name: 'import', handleClickType: 'common' },
        { name: 'export', handleClickType: 'common' },
        'enable',
        'forbid',
        'repeal',
        'upload',
        'download',
        'pass',
        'reject',
        { name: 'link', text: '前往详情页' },
        {
          name: 'drawer',
          text: '打开drawer表单',
          attrs: { type: 'primary', icon: Postcard },
        },
        {
          name: 'view',
          text: 'url跳转',
          to: '/common-center/user/detail?id=12',
          order: 50,
          attrs: { icon: 'Link' },
        },
        {
          name: 'zdy',
          text: '自定义按钮',
          attrs: { type: 'primary', icon: ElemeFilled },
        },
      ]"
      :operateBtns="(row:CommonObj, rowInd: number)=>{
        const {id} = row;
        if(rowInd % 2===0){
          return ['edit','delete', 'reject','repeal','pass','download', 'log', 'audit', 'reset', 
          rowInd % 3 === 0 ? 'forbid' : 'enable', { name: 'view', text: '查看', to: `/common-center/user/detail?id=${id}`}]
        }else{
          return ['edit', 'audit', 'reject','delete','download','pass', 'repeal', 'reset', 'log', 
          { name: 'view', to: {name: 'systemUserDetail', query:{id}}}]
        }
      }"
      @extraBtns="onExtraBtns"
      @operateBtns="onOperateBtns"
      :handleRequest="(args:CommonObj) => handleRegionParams(args, ['liveCity'])"
      compact
      ref="baseCrudRef"
    >
      <template #zdy>【这是自定义的搜索项】</template>
      <template #info_complete_children="{ row }">
        <InfoSteps :data="row" />
      </template>
      <template #info_complete="{ row }">
        <InfoSteps :data="row" />
      </template>
      <template #info_status="{ row }"> 这是自定义组件 - 信息状态 </template>
      <template #auth_info="{ row }">
        <AuthInfo :data="row" />
      </template>
      <template #relation_tag="{ row }">
        <BaseTag name="User" class="mb-q" :value="it.tagCode" v-for="(it, i) in row.relationTag" :key="i" />
        <template v-if="!row.relationTag.length">-</template>
      </template>
      <template #is_proxy="{ row }">
        <BaseTag name="YesNo" :value="row.agentId === 0 ? 1 : 0" />
      </template>
      <template #business="{ row }">
        <div class="f-c-c-c" v-if="row.vipLevel === 1 || row.rechargeMoney">
          <!-- 0不是会员 1会员 -->
          <el-tag type="warning" effect="dark" v-if="row.vipLevel === 1">
            <BaseIcon name="StarFilled" />
            脱单特权
          </el-tag>
          <div v-if="row.rechargeMoney">RMB充值：{{ row.rechargeMoney }}元</div>
        </div>
        <template v-else>-</template>
      </template>
    </BaseCrud>
    <!-- <ul class="f-1 ml-o tips-list">
      <li class="item" v-for="(item, ind) in tipsList" :key="ind">
        {{ ind + 1 }}、{{ item }}
      </li>
    </ul> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, h } from "vue";
import { GetMockCommonList, PostMockCommon, DeleteMockCommon, PostMockCommonUpdate } from "@/api-mock";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { TableCol, TableColAttrs } from "@/core/components/table/_types";
import AddEdit from "./AddEdit.vue";
import InfoSteps from "@/components/InfoSteps.vue";
import AuthInfo from "@/components/AuthInfo.vue";
import { usePopup, useSelectOpts } from "@/hooks";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { useRoute, useRouter } from "vue-router";
import { ElemeFilled, Postcard } from "@element-plus/icons-vue";
import { handleRegionParams, exportExcel, handleBtnNext } from "@/utils";
import SimpleList from "./SimpleList/Index.vue";
import SimpleForm from "./SimpleForm/Index.vue";
import CustomColHead from "./_components/CustomColHead.vue";
import CustomPopover from "./_components/CustomPopover.vue";
import { SectionFormItemAttrs } from "@/core/components/form/_types";
import { ExtraBtnRestArgs } from "@/core/components/crud/BaseCrud";

const tempRow = {
  xm: "李四",
  xb: 2,
  nl: 26,
  dhhm: "18483221518",
  jgnr: "这是警告内容",
};
const testImportCfg = {
  name: "测试导出的自定义下载模板",
  cols: [
    { prop: "userName", label: "用户姓名" },
    { prop: "phone", label: "电话号码" },
    { prop: "labelName", label: "标签名称" },
  ],
};
const { openPopup } = usePopup();
const route = useRoute();
const router = useRouter();
const baseCrudRef = ref<any>(null);
const { type } = route.query;
const isSimple = type === "simple";
const { getSearchOpts } = useSelectOpts();
//默认搜索值
const modelData = reactive<CommonObj>({
  xm: "张三",
  multi_tag: [0],
  date_range_def_val: ["2023-08-19", "2023-08-27"],
  num_range_def_val: [10, 20],
});
//搜索表单
const fields: FormFieldAttrs[] = [
  {
    prop: "xm",
    label: "姓名",
  },
  {
    prop: "qyzt",
    label: "启用状态",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
  {
    prop: "qqxl",
    label: "文本下拉",
    type: "select",
    attrs: {
      options: "TestText",
    },
  },
  {
    prop: "multi_tag",
    label: "多标签",
    type: "select",
    attrs: {
      options: "D_RoleType",
      multiple: true,
    },
  },
  {
    prop: "hsxl",
    label: "函数下拉",
    type: "select",
    attrs: {
      options: "TestFunction",
    },
  },
  {
    prop: "promxl",
    label: "Promise下拉",
    type: "select",
    attrs: {
      options: "TestPromise",
    },
  },
  {
    prop: "qqxl",
    label: "请求下拉",
    type: "select",
    attrs: {
      options: "TestFetch",
    },
  },
  {
    prop: "ybhsxl",
    label: "异步函数下拉",
    type: "select",
    attrs: {
      options: "TestFetchLazy",
    },
  },
  getSearchOpts("school", {
    prop: "schoolId",
    label: "学校",
    quickAttrs: {
      popover: "采用hooks封装复杂逻辑",
    },
  }),
  getSearchOpts("company", {
    prop: "companyId",
    label: "公司",
    quickAttrs: {
      popover: "hooks封装且自定义选择下拉项",
    },
  }),
  {
    prop: "localCascader",
    label: "写死级联",
    type: "cascader",
    attrs: {
      options: "TestCascader",
    },
  },
  {
    prop: "liveCity",
    label: "居住地址",
    type: "cascader",
    attrs: {
      options: "Region",
      filterable: true,
    },
  },
  {
    prop: "tree",
    label: "树形下拉",
    type: "tree-select",
    attrs: {
      options: "TestTree",
    },
  },
  {
    prop: "num_range_arr",
    label: "数字(数组)",
    type: "BaseNumberRange",
  },
  {
    prop: ["num_range_min", "num_range_max"],
    label: "数字(对象)",
    type: "BaseNumberRange",
  },
  {
    prop: "num_range_def_val",
    label: "数字(默值)",
    type: "BaseNumberRange",
  },
  {
    prop: "date_range",
    label: "日期(数组)",
    type: "date-picker",
  },
  {
    prop: ["date_range_min", "date_range_max"],
    label: "日期(对象)",
    type: "date-picker",
  },
  {
    prop: "date_range_def_val",
    label: "日期(默值)",
    type: "date-picker",
  },
  {
    prop: "zdy",
    label: "自定义",
    type: "slot",
    quickAttrs: {
      popover: "在搜索表单中一般几乎用不到自定义特性，此处用作示例",
    },
  },
];
const sections: SectionFormItemAttrs[] = [
  { title: "基础", fields: fields.slice(0, 2) },
  { title: "下拉", fields: fields.slice(2, 13) },
  { title: "区间", fields: fields.slice(13, 19) },
  { title: "其他", fields: fields.slice(19) },
];
const cols: TableCol[] = [
  { tpl: "T_Selection" },
  {
    prop: "insertCols",
    label: "外部插入列",
    quickAttrs: {
      popover: "外部插入列实例：内嵌、custom自定义",
    },
    children: [
      {
        tpl: "T_UserInfo",
        // prop: "userData", // 默认值为userData
        label: "用户信息",
        quickAttrs: {
          popover: {
            title: "业务内嵌组件 - UserInfo",
            slots: {
              default: h(CustomPopover, {
                sections: [
                  {
                    name: "描述",
                    desc: ["单个项目的常用组件，采用内嵌至系统的方式。", "预设了列宽，prop等属性", "可通过attrs传入UserInfo组件的props属性"],
                  },
                  { name: "设置", desc: `{tpl: "T_UserInfo"}` },
                ],
              }),
            },
          },
        },
        attrs: {
          simple: isSimple,
        },
      },
      //注意观察下面的关于是否显示的多种写法
      !isSimple && {
        prop: "info_complete_children",
        label: "资料完善状态",
        width: 170,
        type: "slot",
        quickAttrs: {
          // popover: `需设置 {type: "slot"}`,
          popover: {
            title: "自定义组件 - InfoSteps",
            slots: {
              default: h(CustomPopover, {
                sections: [
                  { name: "描述", desc: "项目中的不常用组件，采用自定义方式插入" },
                  { name: "设置", desc: `{type: "slot"}` },
                ],
              }),
            },
          },
        },
      },
    ],
  },
  {
    prop: "info_complete",
    label: "资料完善状态",
    width: 170,
    type: "slot",
    quickAttrs: {
      popover: `不放在children中进行展示`,
    },
  },
  {
    prop: "sysCols",
    label: "系统内置列",
    children: [
      {
        prop: "avatar",
        label: "头像",
        tpl: "T_BaseImg",
        minWidth: 160,
        quickAttrs: {
          // popover: "内置图片组件 [BaseImg]，含列宽、图片大小、圆角样式、预览等功能；设置{minWidth: 160} 覆盖默认宽度",
          popover: {
            title: "系统内置组件 - BaseImg",
            slots: {
              default: h(CustomPopover, {
                sections: [
                  {
                    name: "描述",
                    desc: [
                      "任意项目的常用组件，采用内置至系统的方式。",
                      "预设了含列宽、图片大小、圆角样式、图片预览等功能。",
                      "设置{minWidth: 160} 覆盖默认宽度",
                    ],
                  },
                  { name: "设置", desc: `{tpl: "T_BaseImg"}` },
                ],
              }),
            },
          },
        },
      },
      {
        prop: "produce",
        label: "自我介绍",
        tpl: "T_BaseText",
        attrs: {
          maxLine: 3,
        },
        quickAttrs: {
          popover: {
            title: "系统内置组件 - BaseText",
            slots: {
              default: h(CustomPopover, {
                sections: [
                  {
                    name: "描述",
                    desc: [
                      "任意项目的常用组件，采用内置至系统的方式。",
                      "内置列宽；超出文本后自动省略，且可点击后弹出弹窗查看完整内容",
                      "可通过attrs传入BaseText的props属性",
                    ],
                  },
                  { name: "设置", desc: `{tpl: "T_BaseText"}` },
                ],
              }),
            },
          },
        },
      },
      {
        prop: "avatar",
        label: "头像路径",
        tpl: "T_BaseCopy",
        quickAttrs: {
          popover: {
            title: "系统内置组件 - BaseCopy",
            slots: {
              default: h(CustomPopover, {
                sections: [
                  {
                    name: "描述",
                    desc: ["任意项目的常用组件，采用内置至系统的方式。", "点击整个文本域进行复制", "可通过attrs传入BaseCopy的props属性"],
                  },
                  { name: "设置", desc: `{tpl: "T_BaseCopy"}` },
                ],
              }),
            },
          },
        },
      },
      {
        prop: "userCode",
        label: "userCode",
        tpl: "T_BaseCopy",
        attrs: {
          // to: (row: CommonObj) => `/common-center/user/detail?id=${row.userCode}`,
          // 暂时没有实现，检测到绑定了onClick事件后，就将clickIconCopy设为true
          clickIconCopy: true,
          onClick(row: CommonObj) {
            router.push(`/common-center/user/detail?id=${row.userCode}`);
          },
        },
        quickAttrs: {
          // popover: `文本复制，支持跳转`,
          popover: {
            title: "系统内置组件 - BaseCopy",
            slots: {
              default: h(CustomPopover, {
                sections: [
                  {
                    name: "描述",
                    desc: ["任意项目的常用组件，采用内置至系统的方式。", "点击文本跳转页面，点击图标进行复制", "可通过attrs传入BaseCopy的props属性"],
                  },
                  { name: "设置", desc: `{tpl: "T_BaseCopy"}` },
                ],
              }),
            },
          },
        },
      },
      {
        prop: "type_text",
        label: "$自定义多维度$",
        // label: h(CustomColHead),
        minWidth: 210,
        quickAttrs: {
          // popover: "这是自定义popover示例（传入字符串）",
          // popover: { title: "这是标题", width: 320, content: "这是自定义popover示例（传入属性对象）" },
          // popover: h(CustomColHead, { type: "popover" }),
          // popover: [CustomColHead],
          popover: {
            title: "自定义【格头 + popover + formatter】",
            width: 400,
            slots: {
              default: h(CustomPopover, {
                sections: [
                  { name: "自定义表格头", desc: "展示如何自定义表格头" },
                  { name: "自定义popover", desc: "展示如何自定义popover" },
                  { name: "formatter", desc: "展示如何用继承自ElementPlus的formatter方法处理数据" },
                ],
              }),
            },
          },
        },
        formatter(row: CommonObj, column: any, cellValue: any, ind: number = 0) {
          return `自定义第${ind}行：表格头 + popover + formatter`;
        },
        slots: {
          header: h(CustomColHead),
        },
      },
      isSimple
        ? {
            prop: "is_proxy",
            label: "标签(自定义，simple可见)",
            width: 220,
            type: "slot",
          }
        : {
            prop: "status",
            label: "启/禁用状态",
            width: 150,
            tpl: "T_BaseTag",
            attrs: {
              name: "D_EnableStatus",
            },
            quickAttrs: {
              popover: {
                title: "系统内置组件 - BaseTag",
                slots: {
                  default: h(CustomPopover, {
                    sections: [
                      {
                        name: "描述",
                        desc: ["任意项目的常用组件，采用内置至系统的方式。", "非simple可见"],
                      },
                      { name: "设置", desc: `{tpl: "T_BaseTag"}` },
                    ],
                  }),
                },
              },
            },
          },
      {
        prop: "status",
        label: "请求状态",
        width: 150,
        tpl: "T_BaseTag",
        attrs: {
          name: "TestFetchLazy",
        },
        quickAttrs: {
          popover: {
            title: "系统内置组件 - BaseTag",
            slots: {
              default: h(CustomPopover, {
                sections: [
                  {
                    name: "描述",
                    desc: ["测试请求到的下拉项的解析情况"],
                  },
                  { name: "设置", desc: `{tpl: "T_BaseTag"}` },
                ],
              }),
            },
          },
        },
      },
    ],
  },
  {
    prop: "formCols",
    label: "表单控件列",
    children: [
      {
        prop: "status",
        label: "启/禁用",
        tpl: "T_Switch",
        minWidth: 100,
        attrs: {},
        quickAttrs: {
          handleChange: (val: any, row: CommonObj, next: FinallyNext) => PostMockCommonUpdate().then((res: any) => next()),
          popover: `设置{tpl: "T_Switch"}，此列可防止在右侧操作栏的按钮组中，后续可能考虑移除`,
        },
      },
      {
        prop: "create_user",
        label: "编辑内容",
        type: "input",
        width: 100,
        quickAttrs: {
          handleBlur: (val: string, row: CommonObj, next: FinallyNext) => PostMockCommonUpdate({}).then((res: any) => next()),
        },
      },
      {
        prop: "gender",
        label: "性别",
        type: "select",
        width: 100,
        attrs: {
          // options: "D_Gender",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ],
        },
        quickAttrs: {
          handleChange: (val: string, row: CommonObj, next: FinallyNext) => PostMockCommonUpdate({}).then((res: any) => next()),
        },
      },
      {
        prop: "age",
        label: "年龄",
        type: "input-number",
        width: 180,
        quickAttrs: {
          handleBlur: (val: string, row: CommonObj, next: FinallyNext) => PostMockCommonUpdate({}).then((res: any) => next()),
        },
      },
    ],
  },
  {
    prop: "timeCols",
    label: "时间列",
    children: [
      !isSimple && {
        prop: "register_time",
        label: "注册时间",
        quickAttrs: {
          popover: `只设置 {prop: "sj"}，不设置 {type: "create"}。会根据 label 中带时间二字，自动确定该列的宽度`,
        },
      },
      // ...(isSimple
      //   ? [
      {
        tpl: "T_Create",
        label: "创建时间",
        quickAttrs: {
          popover: `只设置 {tpl: "T_Create"}，便会默认区创建时间、创建人两个字段的 prop `,
        },
      } as TableColAttrs,
      //   ]
      // : [
      {
        tpl: "T_Update",
        prop: "update_time",
        label: "修改时间",
        quickAttrs: {
          popover: `设置 {tpl: "T_Update", prop: "update_time"}，只会显示 update_time 属性的值`,
        },
      } as TableColAttrs,
    ],
  },
  // ]),
  // {
  //   prop: ["creator", "create_time"],
  //   label: "创建时间（内置、双prop）",
  //   tpl: "T_Create",
  // },
  // 设置tpl模板可以省略其他模板配置内的参数不写
  {
    tpl: "T_Remark",
    // tpl: "T_Remark",
    // label: "备注",
    quickAttrs: {
      popover: `设置{tpl: "T_Remark"}，内置列宽度、label文案`,
    },
  },
  // 未设置tpl时，因label中含有备注字样，就被推断为type为remark类型，故也可以获得跟上面写法一样的配置
  // {
  //   prop: "remark",
  //   label: "备注",
  //   quickAttrs: {
  //     popover: `设置{tpl: "T_Remark"}，内置列宽度、label文案`,
  //   },
  // },
  {
    prop: "userData.nickname",
    label: "多级prop",
    minWidth: 100,
    quickAttrs: {
      popover: "可传入任意多级的prop，例：user.data.info.age",
    },
  },
  {
    prop: "wltl",
    label: "未联调列",
    minWidth: 120,
    quickAttrs: {
      popover: "未联调的列，表格头右侧会新增一个标红的感叹号图标",
    },
  },
];
function onExtraBtns(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { exportRows } = restArgs;
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      import: () => handleImport(),
      export: () => exportExcel(exportRows),
      dialog: () => openPopup("这是一个dialog列表示例", SimpleList),
      drawer: () => openPopup("这是一个drawer表单示例", SimpleForm, "drawer"),
    },
    name
  );
}
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => DeleteMockCommon({ id }).then(() => next()),
      forbid: () => PostMockCommon({ id, status: 0 }).then(() => next()),
      enable: () => PostMockCommon({ id, status: 1 }).then(() => next()),
    },
    name
  );
}
//新增/编辑
async function handleAddEdit(row: CommonObj | undefined, next: FinallyNext) {
  if (row) row = tempRow;
  openPopup(
    `${row ? "编辑" : "新增"}`,
    [AddEdit, { data: row, refreshList: next }]
    // "drawer" //传入第三个参数drawer，可打开抽屉，不传则默认为dialog
  );
}
//处理导入
function handleImport() {
  console.log("点击了导入----------");
}
onMounted(() => {
  // setTimeout(() => {
  //   console.log(baseCrudRef.value, "baseCrudRef.value-------------");
  // }, 1000);
});
</script>
<style lang="scss" scoped>
.tips-list {
  .item {
    &:not(:last-child) {
      margin-bottom: $gap-half;
    }
  }
}
</style>
