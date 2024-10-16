<!-- 按钮传参简介
/**
* 可接受一个数组，数组内可接受字符串、方法、对象；
* to跳转目标地址可传入字符串，也可传入对象（route）、方法；
* 内置按钮皆可简写成一个英文名，可传入text属性替换默认文本【详情】为【查看】或其他属性覆盖默认值；
*/ 
:operateBtns="[
  'edit', 'reject','delete','download','pass',
  (row: CommonObj, rowInd: number)=> rowInd % 2 === 1 ? 'forbid' : 'enable',
  { name: 'view', to: `/system/user/detail?id=${12}`},
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
        {
          name: 'dialog',
          text: '打开dialog列表',
          attrs: { type: 'primary', icon: 'Postcard' },
        },
        {
          name: 'drawer',
          text: '打开drawer表单',
          attrs: { type: 'primary', icon: Postcard },
        },
        {
          name: 'view',
          text: 'url跳转',
          to: '/system/user/detail?id=12',
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
          rowInd % 3 === 0 ? 'forbid' : 'enable', { name: 'view', text: '查看', to: `/system/user/detail?id=${id}`}]
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
import { ref, onMounted, reactive, inject } from "vue";
import { GetMockCommonList, PostMockCommon, DeleteMockCommon } from "@/api-mock";
import { FormFieldAttrs } from "@/components/form/_types";
import { TableCol, TableColAttrs } from "@/components/table/_types";
import AddEdit from "./AddEdit.vue";
import InfoSteps from "@/views/_components/InfoSteps.vue";
import AuthInfo from "@/views/_components/AuthInfo.vue";
import { useSelectOpts } from "@/hooks";
import { BtnName } from "@/components/BaseBtn/_types";
import { CommonObj, FinallyNext, OpenPopupInject } from "@/vite-env";
import { useRoute } from "vue-router";
import { ElemeFilled, Postcard } from "@element-plus/icons-vue";
import { handleRegionParams, exportExcel, handleBtnNext } from "@/utils";
import SimpleList from "./SimpleList/Index.vue";
import SimpleForm from "./SimpleForm/Index.vue";
import CustomHead from "./_components/CustomHead.vue";
import { SectionFormItemAttrs } from "@/components/form/_types";
import { ExtraBtnRestArgs } from "@/components/crud/BaseCrud";
import { h } from "vue";

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
const openPopup = inject<OpenPopupInject>("openPopup");
const route = useRoute();
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
    options: "EnableStatus",
  },
  { prop: "qqxl", label: "文本下拉", type: "select", options: "TestText" },
  { prop: "hsxl", label: "函数下拉", type: "select", options: "TestFunction" },
  { prop: "promxl", label: "Promise下拉", type: "select", options: "TestPromise" },
  { prop: "qqxl", label: "请求下拉", type: "select", options: "TestFetch" },
  { prop: "ybhsxl", label: "异步函数下拉", type: "select", options: "TestFetchLazy" },
  {
    prop: "multi_tag",
    label: "多标签",
    type: "select",
    options: "RoleType",
    attrs: {
      multiple: true,
    },
  },
  {
    prop: "liveCity",
    label: "居住地址",
    type: "cascader",
    options: "Region",
    attrs: {
      filterable: true,
    },
  },
  {
    prop: "localCascader",
    label: "写死级联",
    type: "cascader",
    options: "TestCascader",
  },
  {
    prop: "tree",
    label: "树形下拉",
    type: "tree-select",
    options: "TestTree",
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
    type: "custom",
    quickAttrs: {
      popover: "在搜索表单中一般几乎用不到自定义特性，此处用作示例",
    },
  },
];
const sections: SectionFormItemAttrs[] = [
  { title: "基础", fields: fields.slice(0, 4) },
  { title: "远程", fields: fields.slice(4, 6) },
  { title: "数字", fields: fields.slice(6, 9) },
  { title: "日期", fields: fields.slice(9) },
];
const cols: TableCol[] = [
  { type: "selection" },
  //表格表头
  {
    // prop: "userData",
    label: "自定义组件列-内置 [UserInfo]",
    type: "UserInfo",
    quickAttrs: {
      popover: `传递popover属性增加疑问小提示；可以自定义表格列并内嵌到系统中，设置 {type: "UserInfo"} 即可`,
    },
    attrs: {
      simple: isSimple,
    },
  },
  //注意观察下面的关于是否显示的多种写法
  !isSimple && {
    prop: "info_complete",
    label: "自定义组件-非内置",
    width: 170,
    type: "custom",
    quickAttrs: {
      popover: `需设置 {type: "custom"}`,
    },
  },
  {
    prop: "custom_head",
    // label: "自定义表格头",
    label: h(CustomHead),
    minWidth: 210,
    quickAttrs: {
      // popover: "这是自定义popover示例",
      // popover: CustomHead,
      popover: h(CustomHead, { isPopover: true }),
    },
  },
  {
    prop: "avatar",
    label: "图片 [BaseImg]",
    type: "BaseImg",
    minWidth: 160,
    quickAttrs: {
      popover: "内置图片组件 [BaseImg]，含列宽、图片大小、圆角样式、预览等功能；设置{minWidth: 160} 覆盖默认宽度",
    },
  },
  {
    prop: "produce",
    label: "自我介绍 [BaseText]",
    type: "BaseText",
    quickAttrs: {
      popover: "内置文本组件 [BaseText]，内置列宽；超出文本后自动省略，且可点击后弹出弹窗查看完整内容",
    },
  },
  {
    prop: "avatar",
    label: "文本复制[BaseCopy]",
    type: "BaseCopy",
  },
  {
    prop: "form_col",
    label: "formatter列",
    minWidth: 140,
    quickAttrs: {
      popover: `继承自ElementPlus的 formatter 方法`,
    },
    formatter(row: CommonObj, column: any, cellValue: any, ind: number = 0) {
      return `formatter格式化示例-第${ind + 1}行`;
    },
  },
  isSimple
    ? {
        prop: "is_proxy",
        label: "标签(自定义，simple可见)",
        width: 220,
        type: "custom",
      }
    : {
        prop: "status",
        label: "状态 [BaseTag]",
        width: 150,
        type: "BaseTag",
        quickAttrs: {
          popover: `非simple可见`,
        },
      },
  {
    prop: "status",
    label: "请求状态 [BaseTag]",
    width: 150,
    type: "BaseTag",
    attrs: {
      name: "TestFetchLazy",
    },
  },
  !isSimple && {
    prop: "sj",
    label: "时间（内置宽度）",
    quickAttrs: {
      popover: `只设置 {prop: "sj"}，不设置 {type: "create"}。会根据 label 中带时间二字，自动确定该列的宽度`,
    },
  },
  // ...(isSimple
  //   ? [
  {
    type: "create",
    label: "创建时间 [create]",
    quickAttrs: {
      popover: `只设置 {type: "create"}，便会默认区创建时间、创建人两个字段的 prop `,
    },
  } as TableColAttrs,
  //   ]
  // : [
  {
    type: "update",
    prop: "updatedAt",
    label: "修改时间 [update]",
    quickAttrs: {
      popover: `设置 {type: "update", prop: "updatedAt"}，只会显示 updatedAt 属性的值`,
    },
  } as TableColAttrs,
  // ]),
  // {
  //   prop: ["creator", "createdAt"],
  //   label: "创建时间（内置、双prop）",
  //   type: "create",
  // },
  {
    prop: "status",
    label: "启/禁用",
    type: "switch",
    minWidth: 100,
    quickAttrs: {
      popover: `设置{type: "switch"}，此列可防止在右侧操作栏的按钮组中，后续可能考虑移除`,
    },
    attrs: {
      // fetch: PostEnable,
    },
  },
  {
    type: "remark",
    label: "备注 [remark]",
    quickAttrs: {
      popover: `设置{type: "remark"}，内置列宽度、label文案`,
    },
  },
  {
    prop: "wltl",
    label: "未联调列",
    minWidth: 100,
    quickAttrs: {
      popover: "未联调的列，表格头文字会被标红",
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
