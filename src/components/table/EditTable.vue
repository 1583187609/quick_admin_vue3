<template>
  <el-form ref="formRef" class="edit-table f-fs-s-c" :model="newRows">
    <el-table :data="newRows" v-bind="newAttrs" class="table" v-if="newCols.length">
      <template v-for="(col, cInd) in newCols" :key="cInd">
        <el-table-column v-bind="col">
          <template #header="{ row, colum, $index }">
            <span>
              <span v-if="col.required" class="required">*</span>
              {{ col.label }}
            </span>
          </template>
          <template #default="{ row, column, $index }" v-if="col.field">
            <slot :name="col.prop" v-bind="{ row, col, $index }" v-if="col?.field?.type === 'custom'"></slot>
            <template v-else-if="col?.field?.type === 'operate'">
              <template v-if="$index < newRows.length - 1">
                <el-button :icon="Delete" type="danger" link @click="onDelete($index)">删除</el-button>
                <!-- <el-button
                  :icon="Delete"
                  type="primary"
                  link
                  @click="onEmptyRow($index)"
                  >置空</el-button
                > -->
              </template>
              <template v-else>-</template>
            </template>
            <BaseFormItem :field="getNewField(col, $index)" v-model="row[col.prop]" v-else></BaseFormItem>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <BaseEmpty></BaseEmpty>
      </template>
    </el-table>
    <div class="f-c-c" v-else>空空如也~</div>
    <div class="f-c-c f-0 pt-h pb-h" style="width: 100%" v-if="!text && footer">
      <el-button type="primary" v-debounce.immediate="onSubmit" :disabled="loading">
        <template #icon>
          <BaseIcon :class="{ rotate: loading }" :name="loading ? 'Loading' : 'Promotion'"></BaseIcon>
        </template>
        {{ submitText }}
      </el-button>
      <el-button :icon="RefreshLeft" @click="resetForm" :disabled="loading">{{ resetText }}</el-button>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { merge } from "lodash";
import { ref, reactive, toRefs, inject, watch } from "vue";
import { Delete, RefreshLeft } from "@element-plus/icons-vue";
import { FormInstance } from "element-plus";
import { CommonObj } from "@/vite-env";
import { TableFieldAttrs, defaultColumnAttrs, defaultTableAttrs } from "@/components/table";
import { showMessage } from "../_utils";
export type CellType = "" | "input" | "select" | "switch" | "custom" | "operate";
const props = withDefaults(
  defineProps<{
    cols: TableFieldAttrs[]; //表头
    rows: CommonObj[]; //表格行数据
    footer?: boolean; //是否显示底部按钮
    text?: boolean; //是否纯文本展示
    request?: any; //接口请求
    total?: number;
    currPage?: number; //当前页码，默认1
    pageSize?: number; // 每页多少条，默认10
    pageAttrs?: CommonObj; //分页属性
    submitText?: string; //提交按钮的文字
    resetText?: string; //提交按钮的文字
    index?: boolean; //是否展示序号列
    extraParams?: CommonObj; //额外的参数
    autoAddRow?: boolean; //是否自动增加要编辑的行
    submitCb?: () => void; //提交之后的回调函数
  }>(),
  {
    autoAddRow: false,
    formData: () => ({}),
    cols: () => [],
    rows: () => [],
    text: false,
    footer: true,
    fields: () => [],
    submitText: "提交",
    resetText: "重置",
  }
);
const emits = defineEmits(["submit", "update:rows"]);
const closePopup: any = inject("closePopup");
const formRef = ref<FormInstance | null>(null);
const loading = ref(false);
const newRows = ref(props.rows);
const { extraParams, submitText, submitCb, index, cols } = props;
// const rowNum = $attrs.showSummary ? 2 : 1;
const rowNum = 1;
const newAttrs = reactive(merge({ maxHeight: `calc(100% + ${rowNum * 36}px)` }, defaultTableAttrs));
if (index) {
  //为了防止开发的时候，保存文件就刷新，导致序号列和选择列会重复添加，正式环境则不会影响
  if (!cols.slice(0, 2).find(it => it.type === "index")) {
    cols.unshift({
      prop: "$index",
      label: "序号",
      type: "index",
      fixed: "left",
      width: 58,
      index: 1,
    });
  }
}
const newCols = reactive(
  cols.map(item => {
    const { type } = item?.field || {};
    let fixedAttr = {};
    if (type === "operate") {
      fixedAttr = {
        prop: "$operate",
        fixed: "right",
        width: 80,
      };
    }
    item = merge(fixedAttr, defaultColumnAttrs, item);
    return item;
  })
);

function getNewField(col: CommonObj, $index: number) {
  const { field, label, prop = "", ...rest } = col;
  const newProp = `${$index}[${prop}]`;
  field.prop = newProp;
  // if ($index === newRows.value.length - 1) {
  //   // col.required = true;
  //   field.rules = [{ required: true, message: "请输入" }];
  //   console.log($index, "$inxee-----------");
  // }
  // return {
  //   field,
  //   prop: newProp,
  //   ...rest,
  // };
  return field;
}
watch(
  newRows,
  (newVal = []) => {
    if (!newVal.length && props.autoAddRow) {
      const lastVals = Object.values(newVal.slice(-1)[0]);
      const isLastEmpty = lastVals.every(it => it === "");
      // const secondVals =
      //   newVal.length > 2 ? Object.values(newVal.slice(-2)[0]) : [];
      // const isSecondEmpty = secondVals.every((it) => it === "");
      if (!isLastEmpty) {
        const obj: CommonObj = {};
        Object.keys(newVal.slice(-1)[0]).forEach(key => {
          obj[key] = "";
        });
        newVal.push(obj);
      }
    }
    // if (isSecondEmpty) {
    //   newVal.shift();
    // }
    emits("update:rows", newVal);
  },
  { immediate: true, deep: true }
);
function onDelete(ind: number) {
  newRows.value.splice(ind, 1);
}
// function onEmptyRow(ind: number) {
//   const obj: CommonObj = {};
//   Object.keys(newRows.value[ind]).forEach((key) => {
//     obj[key] = "";
//   });
//   newRows.value[ind] = obj;
// }
//提交表单
const onSubmit = () => {
  const formInst = formRef.value;
  if (!formInst) return;
  formInst.validate((valid, fieldsObj) => {
    if (valid) {
      // console.log(newRows.value, "mergeParams-----------------------");
      const mergeParams = newRows.value.slice(0, -1);
      if (props?.request) {
        loading.value = true;
        props
          .request(mergeParams)
          .then((res: any) => {
            showMessage(submitText + "成功");
            if (submitCb) {
              submitCb();
            } else {
              closePopup();
            }
          })
          .finally(() => {
            loading.value = false;
          });
      } else {
        emits("submit", mergeParams);
      }
    } else {
      const target = Object.values(fieldsObj)[0][0];
      showMessage(target.message, "error");
    }
  });
};
//重置表单
const resetForm = () => {
  const formInst = formRef.value;
  if (!formInst) return;
  formInst.resetFields();
};
defineExpose({
  formRef,
});
</script>
<style lang="scss" scoped>
.required {
  color: red;
}
.edit-table {
  height: 100%;
  overflow: auto;
  .table {
    width: 100%;
    overflow: auto;
  }
}
</style>
