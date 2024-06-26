<!-- 按钮传参简介
/**
* 可接受一个数组，数组内可接受字符串、方法、对象；
* to跳转目标地址可传入字符串，也可传入对象（route）、方法；
* 内置按钮皆可简写成一个英文名，可传入text属性替换默认文本【详情】为【查看】或其他属性覆盖默认值；
*/ 
:groupBtns="[
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
:groupBtns="(row:CommonObj, rowInd: number)=>{
  const {id} = row;
  if(rowInd % 3===0){
    return ['edit','delete', 'reject','pass','download', rowInd % 2 === 0 ? 'forbid' : 'enable']
  }else if(rowInd % 3===1){
    return [{name: 'edit', text: '修改', order: 1000}, 'reject','delete','download','pass']
  }else if(rowInd % 3===2){
    return [{name: 'zdy',text: '自定义按钮',attrs: { type: 'primary', icon: 'ElemeFilled' }}]
  }
}"
// 下方的 extraBtns 同 groupBtns 的规则
-->
<!-- 
:sections="sections" //可将搜索条件分块显示
:fields="fields"
-->
<template>
  <div class="page-view three f-sb-s">
    <BaseCrud
      class="f-3"
      v-model="model"
      :cols="cols"
      :fields="fields"
      :fetch="PostUserList"
      :importCfg="testImportCfg"
      :extraBtns="[
        'add',
        'delete',
        { name: 'import', customRules: false },
        { name: 'export', customRules: false },
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
      :groupBtns="(row:CommonObj, rowInd: number)=>{
        const {id} = row;
        if(rowInd % 2===0){
          return ['edit','delete', 'reject','repeal','pass','download', 'log', 'audit', 'reset', 
          rowInd % 3 === 0 ? 'forbid' : 'enable', { name: 'view', text: '查看', to: `/system/user/detail?id=${id}`}]
        }else{
          return ['edit', 'audit', 'reject','delete','download','pass', 'repeal', 'reset', 'log', 
          { name: 'view', to: {name: 'systemUserDetail', query:{id}}}]
        }
      }"
      @extraBtn="onExtraBtn"
      @groupBtn="onGroupBtn"
      :handleRequest="(args:CommonObj) => handleRegionParams(args, ['liveCity'])"
      compact
      selection
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
<script lang="ts" name="TestThree" setup>
import { ref, reactive, inject, isVNode } from "vue";
import { PostUserList } from "@/api-mock";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { TableField, TableFieldAttrs } from "@/components/table";
import AddEdit from "./AddEdit.vue";
import InfoSteps from "@/views/_components/InfoSteps.vue";
import AuthInfo from "@/views/_components/AuthInfo.vue";
import { useSelectOpts } from "@/hooks";
import { BtnName } from "@/components/BaseBtn";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { useRoute } from "vue-router";
import { ElemeFilled } from "@element-plus/icons-vue";
import { useDictStore } from "@/store";
import { handleRegionParams, exportExcel, handleBtnNext } from "@/utils";
import { getCascaderOpts } from "@/dict";
import { Postcard } from "@element-plus/icons-vue";
import SimpleList from "./SimpleList/Index.vue";
import SimpleForm from "./SimpleForm/Index.vue";
import CustomHead from "./_components/CustomHead.vue";
import { SectionFieldsItemAttrs } from "@/components/form";
import { ExtraBtnRestArgs } from "@/components/BaseCrud";
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
const { getOpts, getText } = useDictStore();
const openPopup: any = inject("openPopup");
const route = useRoute();
const { type } = route.query;
const isSimple = type === "simple";
const { getSearchOpts } = useSelectOpts();
const userOpts = getOpts("User");
const enableOpts = getOpts("EnableStatus");
const testFetchAsyncOpts = getOpts("TestFetchAsync");
//默认搜索值
const model = reactive<CommonObj>({
  xm: "张三",
  multi_tag: ["new_user"],
  date_range_def_val: ["2023-08-19", "2023-08-27"],
  num_range_def_val: [10, 20],
});
//搜索表单
const fields: FormFieldAttrs[] = [
  {
    prop: "xm",
    label: "姓名",
  },
  { prop: "qyzt", label: "启用状态", type: "select", options: enableOpts },
  { prop: "qqxl", label: "请求下拉", type: "select", options: testFetchAsyncOpts },
  {
    prop: "multi_tag",
    label: "多标签",
    type: "select",
    options: userOpts,
    attrs: {
      multiple: true,
    },
  },
  {
    prop: "liveCity",
    label: "居住地址",
    type: "cascader",
    options: getCascaderOpts("Region"),
    attrs: {
      filterable: true,
    },
  },
  getSearchOpts("school", {
    prop: "schoolId",
    label: "学校",
    extra: {
      popover: "采用hooks封装复杂逻辑",
    },
  }),
  getSearchOpts("company", {
    prop: "companyId",
    label: "公司",
    extra: {
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
    extra: {
      popover: "在搜索表单中一般几乎用不到自定义特性，此处用作示例",
    },
  },
];
const sections: SectionFieldsItemAttrs[] = [
  { label: "基础", fields: fields.slice(0, 4) },
  { label: "远程", fields: fields.slice(4, 6) },
  { label: "数字", fields: fields.slice(6, 9) },
  { label: "日期", fields: fields.slice(9) },
];
const cols: TableField[] = [
  //表格表头
  {
    // prop: "userData",
    label: "自定义组件列-内置 [UserInfo]",
    type: "UserInfo",
    extra: {
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
    extra: {
      popover: `需设置 {type: "custom"}`,
    },
  },
  {
    prop: "custom_head",
    // label: "自定义表格头",
    label: CustomHead,
    // label: `<div><span>111111</span>自定义表格头</div>`,
    // label: {
    //   component: CustomHead,
    // },
    minWidth: 210,
    extra: {
      // popover: "这是自定义popover示例",
      // popover: CustomHead,
      popover: h(CustomHead, { isPopover: true }),
      // popover: {
      //   component: CustomHead,
      //   attrs: {
      //     isPopover: true,
      //   },
      // },
    },
  },
  {
    prop: "avatar",
    label: "图片 [BaseImg]",
    type: "BaseImg",
    minWidth: 160,
    extra: {
      popover: "内置图片组件 [BaseImg]，含列宽、图片大小、圆角样式、预览等功能；设置{minWidth: 160} 覆盖默认宽度",
    },
  },
  {
    prop: "produce",
    label: "自我介绍 [BaseText]",
    type: "BaseText",
    extra: {
      popover: "内置文本组件 [BaseText]，内置列宽；超出文本后自动省略，且可点击后弹出弹窗查看完整内容",
    },
  },
  {
    prop: "form_col",
    label: "formatter列",
    minWidth: 140,
    extra: {
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
        width: 220,
        type: "BaseTag",
        extra: {
          popover: `非simple可见`,
        },
      },
  !isSimple && {
    prop: "sj",
    label: "时间（内置宽度）",
    extra: {
      popover: `只设置 {prop: "sj"}，不设置 {type: "create"}。会根据 label 中带时间二字，自动确定该列的宽度`,
    },
  },
  // ...(isSimple
  //   ? [
  {
    type: "create",
    label: "创建时间 [create]",
    extra: {
      popover: `只设置 {type: "create"}，便会默认区创建时间、创建人两个字段的 prop `,
    },
  } as TableFieldAttrs,
  //   ]
  // : [
  {
    type: "update",
    prop: "updatedAt",
    label: "修改时间 [update]",
    extra: {
      popover: `设置 {type: "update", prop: "updatedAt"}，只会显示 updatedAt 属性的值`,
    },
  } as TableFieldAttrs,
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
    extra: {
      popover: `设置{type: "switch"}，此列可防止在右侧操作栏的按钮组中，后续可能考虑移除`,
    },
    attrs: {
      // fetch: PostEnable,
    },
  },
  {
    type: "remark",
    label: "备注 [remark]",
    extra: {
      popover: `设置{type: "remark"}，内置列宽度、label文案`,
    },
  },
];
function onExtraBtn(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { exportRows } = restArgs;
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      import: () => handleImport(),
      export: () => exportExcel(exportRows),
      dialog: () =>
        openPopup("这是一个dialog列表示例", {
          component: SimpleList,
          attrs: {},
        }),
      drawer: () => openPopup("这是一个drawer表单示例", { component: SimpleForm, attrs: {} }, "drawer"),
    },
    name
  );
}
function onGroupBtn(name: any, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => PostUserList({ id }).then(() => next()),
      forbid: () => PostUserList({ id, status: 0 }).then(() => next()),
      enable: () => PostUserList({ id, status: 1 }).then(() => next()),
    },
    name
  );
}
//新增/编辑
async function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  if (row) row = tempRow;
  openPopup(
    `${row ? "编辑" : "新增"}`,
    {
      component: AddEdit,
      attrs: { data: row, refreshList: next },
    }
    // "drawer" //传入第三个参数drawer，可打开抽屉，不传则默认为dialog
  );
}
//处理导入
function handleImport() {
  console.log("点击了导入----------");
}
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
