<!-- 组件 - 处罚/处理/解封用户 -->
<template>
  <BaseForm
    style="width: 550px"
    v-model="model"
    :fields="fields"
    :fetch="handleFetch"
    :fetchSuccess="refreshPage"
    :extraParams="{ relationTypeList: [0] }"
    :no-submit-props="type === 'unseal' ? ['forbidLevel', 'timeDay'] : []"
    @change="handleChange"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { PostMockCommon } from "@/api-mock";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { useDictMap } from "@/hooks";
export type FormType = "unseal" | "add" | "handle";
export type SceneType = "warning" | "login" | "all-interaction";
const { getOpts } = useDictMap();
const props = withDefaults(
  defineProps<{
    type: FormType;
    data: {
      id?: StrNum; //举报id
      userId?: StrNum; //用户id
      [key: string]: any;
    };
    refreshPage?: FinallyNext;
  }>(),
  {}
);
const model = reactive<CommonObj>(
  Object.assign(
    {
      // userId: props?.data?.userId,
      scene: "warning",
      timeDay: 1,
      forbidLevel: 1,
    },
    props.data
  )
);
const fields = computed<FormField[]>(() => {
  const { scene } = model;
  const { type } = props;
  return [
    {
      prop: "userId",
      label: "用户ID",
      attrs: {
        disabled: type !== "add",
      },
    },
    ...(type === "unseal"
      ? []
      : [
          {
            prop: "scene",
            label: "处罚类型",
            type: "radio-group",
            required: true,
            options: [],
            attrs: {},
          },
          scene === "all-interaction" && {
            prop: "timeDay",
            label: "时间",
            required: true,
            type: "input-number",
            attrs: {
              min: 1,
              style: { width: "180px" },
            },
            extra: {
              after: "天",
            },
          },
          scene !== "login" && {
            prop: "fromMsg",
            label: "回复用户",
            required: true,
            attrs: {
              type: "textarea",
              maxlength: 100,
              rows: 3,
            },
          },
          scene === "login" && {
            prop: "forbidLevel",
            label: "违规级别",
            type: "radio-group",
            required: true,
            options: [],
            tips: "数值越小处罚程度越严重",
          },
        ]),
    {
      prop: "remark",
      label: "备注",
      required: true,
      attrs: {
        type: "textarea",
        maxlength: 100,
        rows: 3,
      },
    },
  ];
});
//处理表单请求
function handleFetch(params: CommonObj) {
  const { type, data } = props;
  params.relationDataList = {
    userId: type === "add" ? params.userId : data.userId,
  };
  if (type === "unseal") {
    //status: 0=维持现有封禁;1=解除封禁
    params.status = 1;
    params.id = data.id;
    return PostMockCommon(params);
  } else {
    delete params.userId;
    return PostMockCommon(params);
  }
}
//处理表单值变化时
function handleChange(prop: string, val: SceneType) {
  if (prop === "scene") {
    model.fromMsg = getReplyMsg(val);
  } else if (prop === "timeDay") {
    if (model.scene === "all-interaction") {
      nextTick(() => {
        model.fromMsg = getReplyMsg("all-interaction");
      });
    }
  }
}
//获取回复消息
function getReplyMsg(type: SceneType) {
  const days = model.timeDay;
  const map: CommonObj = {
    warning:
      "经用户举报，并经平台核实，您因违反平台行为规范，存在违规行为，现对您进行消息警告通知！请严格遵守《脱单计划行为规范》。",
    login: "",
    "all-interaction": `经用户举报，并经平台核实，您因违反平台行为规范，存在违规行为，现被处罚禁止互动${days}天！请严格遵守《脱单计划行为规范》，再次出现违规行为，将被永久封禁！`,
  };
  return map[type] ?? "";
}
</script>
<style lang="scss" scoped></style>
