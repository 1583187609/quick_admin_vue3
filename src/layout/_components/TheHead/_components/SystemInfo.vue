<template>
  <SectionForm style="width: 500px" v-model="modelData" labelSuffix="：" :sections="sections" pureText />
</template>
<script lang="ts" setup>
import pkg from "#/package.json";
import { CommonObj } from "@/core/_types";
import { SectionFormItemAttrs } from "@/core/components/form/_types";
import { reactive } from "vue";
import SectionForm from "@/core/components/form/SectionForm.vue";

const { VITE_APP_NAME } = import.meta.env;
const env = import.meta.env.MODE;
const { version, dependencies, devDependencies } = pkg;

const modelData = reactive<CommonObj>({
  name: VITE_APP_NAME,
  description: "这是系统介绍描述相关的内容展示这是系统介绍描述相关的内容展示这是系统介绍描述相关的内容展示这是系统介绍描述相关的内容展示",
  version: `${env} - ${version}`,
  depends: dependencies,
  devDepends: devDependencies,
});
const sections: SectionFormItemAttrs[] = [
  {
    title: "基础信息",
    fields: [
      {
        prop: "name",
        label: "系统名称",
      },
      {
        prop: "version",
        label: "版本号",
      },
      {
        prop: "description",
        label: "系统介绍",
      },
    ],
  },
  {
    title: "生产环境依赖",
    prop: "depends",
    fields: Object.entries(dependencies).map(([label, value]) => ({ prop: label, label })),
  },
  {
    title: "开发环境依赖",
    prop: "devDepends",
    fields: Object.entries(devDependencies).map(([label, value]) => ({ prop: label, label })),
  },
];
</script>
<style lang="scss" scoped></style>
