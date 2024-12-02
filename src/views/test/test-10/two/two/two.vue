<!-- 页面-简介 -->
<template>
  <div>测试10-2-2-2</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
// import { importFileFromPaths } from "@/utils";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
// const paths = ["../../../../core/index.vue", "@/views/test/test-10/two/two/one.vue"];
const paths = [`${"./"}index.vue`, `${"./"}one.vue`];
function importFile(paths: string[] = []) {
  return new Promise((resolve, reject) => {
    import(paths[0])
      .then(res => resolve(res))
      .catch(err => {
        import(paths[1]).then(res => resolve(res)).catch(err => reject(err));
      });
  });
}
importFile(paths).then((res: any) => console.log(res.default.name));
// importFileFromPaths(["./one.vue", "./two.vue"]).then(file => {
//   console.log(file, "file-----------");
// });
</script>
<style lang="scss" scoped></style>
