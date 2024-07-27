<template>
  <BaseForm style="width: 500px" label-suffix="：" :fields="fields" v-model="model" :footer="false">
    <template #version>
      <el-tag>{{ model.version }}</el-tag>
    </template>
    <template #depends>
      <BaseKeyVal style="width: 100%" :label="item[0]" v-for="(item, ind) in model.depends" :key="ind">
        <el-tag size="small" type="info">{{ item[1] }}</el-tag>
      </BaseKeyVal>
    </template>
    <template #devDepends>
      <BaseKeyVal style="width: 100%" :label="item[0]" v-for="(item, ind) in model.devDepends" :key="ind">
        <el-tag size="small" type="info">{{ item[1] }}</el-tag>
      </BaseKeyVal>
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import pkg from "#/package.json";
import { CommonObj } from "@/vite-env";
import { FormFieldAttrs } from "@/components/form";
import { reactive } from "vue";
const { version, dependencies, devDependencies } = pkg;
const { VITE_APP_NAME } = import.meta.env;
const env = import.meta.env.MODE;
const fields: FormFieldAttrs[] = [
  {
    prop: "name",
    label: "系统名称",
    class: "mb-h",
    extraAttrs: {
      pureText: true,
    },
  },
  {
    prop: "description",
    label: "系统介绍",
    class: "mb-h",
    extraAttrs: {
      pureText: true,
    },
  },
  {
    prop: "version",
    label: "版本号",
    type: "custom",
    class: "mb-h",
  },
  {
    prop: "depends",
    label: "生产环境依赖",
    type: "custom",
    class: "mb-h",
  },
  {
    prop: "devDepends",
    label: "开发环境依赖",
    type: "custom",
    class: "mb-h",
  },
];
const model = reactive<CommonObj>({
  name: VITE_APP_NAME,
  description:
    "这是系统介绍描述相关的内容展示这是系统介绍描述相关的内容展示这是系统介绍描述相关的内容展示这是系统介绍描述相关的内容展示",
  version: `${env} - ${version}`,
  depends: Object.entries(dependencies),
  devDepends: Object.entries(devDependencies),
});
</script>
<style lang="scss" scoped></style>
