<!-- summary VsCode代码片段
在VsCode编辑器中，点击左下角设置图标 ==> 用户代码片段 ==> 新建全局代码片段文件，然后复制粘贴下列文件并保存。这样，以后每次新建好vue文件后，输入vuets，待编辑器出现提示后，按下回车键，即可生成文件代码。
VuePage
VueComponent
VueForm
VueSectionForm
VueTable
VueCrud
AddEdit
-->
<template>
  <div class="example-vue">example-vue</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
