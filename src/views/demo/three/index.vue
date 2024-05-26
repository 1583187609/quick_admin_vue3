<!-- 页面 - 用户列表 -->
<template>
  <div class="page-view three f-sb-s">
    <BaseCrud
      class="f-3"
      v-model="model"
      :cols="cols"
      :fields="fields"
      :fetch="PostAuthRoleList"
      :extraBtns="[
        'add',
        'export',
        {
          name: 'zdy',
          text: '自定义按钮',
          attrs: { type: 'primary', icon: ElemeFilled },
        },
      ]"
      :groupBtns="[
        'edit',
        'delete',
        (row:CommonObj)=> row.$index%2 === 1 ? 'forbid' : 'enable',
        { name: 'view', to: (row:CommonObj) => ({name: 'userDetail', query:{id: row.id}})}
      ]"
      @extraBtn="onExtraBtn"
      @groupBtn="onGroupBtn"
      :colSpanAttrs="{
        xs: 12,
        sm: 12,
        md: 12,
        lg: 8,
        xl: 6,
      }"
      :handleParams="(args:CommonObj)=>handleRegionParams(args,'liveCity')"
      compact
      selection
    >
      <template #zdy>【这是自定义的搜索条件项】</template>
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
import { ref, reactive, inject } from "vue";
import { PostAuthRoleList } from "@/api-mock";
import { FormField } from "@/components/BaseFormItem";
import { TableField } from "@/components/table";
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
import { ExtraBtnRestArgs } from "@/components/BaseCrud";
const { getOpts, getText } = useDictStore();
const route = useRoute();
const { type } = route.query;
const isSimple = type === "simple";
const tipsList: string[] = ["XXXX说明"];
// const { getDictOpts } = useDictMap();
const { getSearchOpts } = useSelectOpts();
const userOpts = getOpts("RoleType");
const enableOpts = getOpts("EnableStatus");
const openPopup: any = inject("openPopup");
let model = reactive<CommonObj>({
  //默认搜索值
  xm: "张三",
  dbq: [0],
  date: ["2023-08-19", "2023-08-27"],
  date_min: "2023-07-19",
  date_max: "2023-07-27",
  min_num: 1,
  max_num: 2,
  num_def: [10, 20],
});
//搜索表单
const fields = ref<FormField[]>([
  {
    prop: "xm",
    label: "姓名",
  },
  { prop: "qyzt", label: "启用状态", type: "select", options: enableOpts },
  {
    prop: "dbq",
    label: "多标签",
    type: "select",
    options: userOpts,
    attrs: {
      multiple: true,
    },
  },
  {
    prop: "times",
    label: "时间(数组)",
    type: "date-picker",
  },
  {
    prop: ["date_min", "date_max"],
    label: "时间(对象)",
    type: "date-picker",
  },
  {
    prop: "date",
    label: "时间(带值)",
    type: "date-picker",
  },
  {
    prop: ["min_num", "max_num"],
    label: "数字(对象)",
    type: "BaseNumberRange",
  },
  {
    prop: "numRange",
    label: "数字(数组)",
    type: "BaseNumberRange",
  },
  {
    prop: "num_def",
    label: "数字(默值)",
    type: "BaseNumberRange",
  },
  {
    prop: "liveCity",
    label: "级联",
    type: "cascader",
    // options: getDictOpts("Region"),
  },
  getSearchOpts("school", {
    prop: "schoolId",
    label: "学校",
    popover: "采用hooks封装复杂逻辑",
  }),
  getSearchOpts("company", {
    prop: "companyId",
    label: "公司",
    popover: "自定义选择下拉项",
  }),
  {
    prop: "zdy",
    label: "自定义",
    type: "custom",
    popover: "在搜索表单中一般几乎用不到自定义特性",
  },
]);
const cols: TableField[] = [
  //表格表头
  {
    // prop: "userData",
    label: "内置自定义组件列",
    type: "UserInfo",
    attrs: {
      simple: isSimple,
    },
  },
  {
    prop: "form_col",
    label: "formatter列",
    minWidth: 140,
    formatter(row: CommonObj) {
      return "formatter格式化示例";
    },
  },
  //注意观察下面的关于是否显示的多种写法
  !isSimple && {
    prop: "info_complete",
    label: "非内置自定义组件列",
    width: 170,
    type: "custom",
  },
  isSimple
    ? {
        prop: "is_proxy",
        label: "标签(自定义，simple可见)",
        width: 220,
        type: "custom",
      }
    : {
        prop: "agentId",
        label: "标签(内置，非simple可见)",
        width: 220,
        type: "BaseTag",
        attrs: {
          name: "EnableStatus",
        },
      },
  !isSimple && { prop: "create_time", label: "时间（内置宽度）" },
  ...(isSimple
    ? [
        {
          type: "create",
          label: "创建时间（内置）",
        } as TableField,
      ]
    : [
        {
          type: "create",
          label: "创建时间（内置、单prop）",
          minWidth: 200,
        } as TableField,
      ]),
  // {
  //   prop: ["creator", "createdAt"],
  //   label: "创建时间（内置、双prop）",
  //   type: "create",
  // },
  {
    prop: "status",
    label: "是否启用",
    type: "switch",
    attrs: {
      // fetch: PostEnable,
    },
  },
  { type: "remark", label: "备注（内置）" },
];
function onExtraBtn(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { exportRows } = restArgs;
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      export: () => handleExport(exportRows),
    },
    name
  );
}
function onGroupBtn(name: any, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => handleDelete(row.id, next),
      forbid: () => toggleForbidEnable(row.id, next),
      enable: () => toggleForbidEnable(row.id, next),
    },
    name
  );
}
//新增/编辑
async function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  if (row) {
    row = {
      xm: "李四",
      xb: 2,
      nl: 26,
      dhhm: "18483221518",
      jgnr: "这是警告内容",
    };
  }
  openPopup(`${row ? "编辑" : "新增"}`, {
    component: AddEdit,
    attrs: {
      data: row,
      refreshList: next,
    },
  });
}
//删除
function handleDelete(id: string, next: FinallyNext) {
  PostAuthRoleList({ id }).then((res: CommonObj) => next());
}
//切换启用禁用
function toggleForbidEnable(id: string, next: FinallyNext) {
  PostAuthRoleList().then((res: CommonObj) => {
    next();
  });
}
//处理导出
function handleExport(exportRows) {
  exportExcel(exportRows);
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
