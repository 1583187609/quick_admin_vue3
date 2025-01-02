<!-- 开发页面&组件 -->
<template>
  <div class="dev-valid page-view f-fs-s-c">
    <el-form-item label="模块" class="f-0">
      <el-select v-model="currModule" placeholder="请选择模块" clearable @change="getData" style="width: 220px">
        <el-option v-bind="opt" v-for="(opt, ind) in modlueOpts" :key="ind" />
      </el-select>
    </el-form-item>
    <div class="f-sb-s f-1">
      <div class="left box f-fs-s-c f-1">
        <div class="f-fs-s-c">
          <h3 class="f-0">总计共开发有效页面（含复杂弹窗）：{{ pages.valideNames.length }}个</h3>
          <ul class="list valid hover-show-scroll">
            <li class="li" v-for="(item, ind) in pages.valideNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
          </ul>
        </div>
        <div class="f-0">
          <h3 class="f-0 mt-o">暂时备用无效页面（含复杂弹窗）：{{ pages.unValidNames.length }}个</h3>
          <ul class="list hover-show-scroll">
            <li class="li" v-for="(item, ind) in pages.unValidNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
          </ul>
        </div>
      </div>
      <div class="right box ml-t f-fs-s-c f-1">
        <div class="f-fs-s-c">
          <h3 class="f-0">总计共开发有效组件：{{ comps.valideNames.length }}个</h3>
          <ul class="list valid hover-show-scroll">
            <li class="li" v-for="(item, ind) in comps.valideNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
          </ul>
        </div>
        <div class="f-0">
          <h3 class="f-0 mt-o">暂时备用无效组件：{{ comps.unValidNames.length }}个</h3>
          <ul class="list hover-show-scroll">
            <li class="li" v-for="(item, ind) in comps.unValidNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { CommonObj } from "@/core/_types";
import { getModuleNames, getVueFiles } from "@/utils";
const pages = ref<CommonObj>([]);
const comps = ref<CommonObj>([]);
const currModule = ref<string>("all");
const modlueOpts = [{ label: "全部", value: "all" }, ...getModuleNames()];
getData();
function getData(name = "all") {
  pages.value = getVueFiles("page", name === "all" ? "" : name);
  comps.value = getVueFiles("comp");
}
</script>
<style lang="scss" scoped>
.dev-valid {
  // height: 100%;
  // .box {
  //   // height: 100%;
  .list {
    overflow: auto;
    &.valid {
      flex-basis: 70%;
    }
  }
  //   .list {
  //     overflow: auto;
  //     .li {
  //       line-height: 1.6;
  //     }
  //   }
  // }
}
</style>
