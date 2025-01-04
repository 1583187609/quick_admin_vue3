<!-- 开发页面&组件 -->
<template>
  <div class="dev-valid q-page-view f-fs-s-c">
    <el-form-item label="模块" class="f-0">
      <el-select v-model="currModule" placeholder="请选择模块" clearable @change="getData" style="width: 220px">
        <el-option v-bind="opt" v-for="(opt, ind) in moduleOpts" :key="ind" />
      </el-select>
    </el-form-item>
    <div class="f-sb-s f-1">
      <div class="left box f-fs-s-c f-1">
        <section class="f-fs-s-c section">
          <h3 class="f-0">开发有效页面（含弹窗）共计：{{ pages.valideNames.length }}个</h3>
          <ul class="list f-2 hover-show-scroll">
            <li class="li" v-for="(item, ind) in pages.valideNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
          </ul>
        </section>
        <section class="section f-fs-s-c">
          <h3 class="f-0">暂时备用无效页面（含弹窗）共计：{{ pages.unValidNames.length }}个</h3>
          <ul class="list f-1 hover-show-scroll">
            <li class="li" v-for="(item, ind) in pages.unValidNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
          </ul>
        </section>
      </div>
      <div class="right box ml-t f-fs-s-c f-1">
        <section class="f-fs-s-c section">
          <h3 class="f-0">开发有效组件共计：{{ comps.valideNames.length }}个</h3>
          <ul class="list f-2 hover-show-scroll">
            <li class="li" v-for="(item, ind) in comps.valideNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
          </ul>
        </section>
        <section class="section f-fs-s-c">
          <h3 class="f-0">暂时备用无效组件共计：{{ comps.unValidNames.length }}个</h3>
          <ul class="list f-1 hover-show-scroll">
            <li class="li" v-for="(item, ind) in comps.unValidNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
          </ul>
        </section>
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
const moduleOpts = [{ label: "全部", value: "all" }, ...getModuleNames()];
getData();
function getData(name = "all") {
  pages.value = getVueFiles("page", name === "all" ? "" : name);
  comps.value = getVueFiles("comp");
}
</script>
<style lang="scss" scoped>
.dev-valid {
  .box {
    // max-height: calc(100vh - 170px);
    // flex-basis: 1px;
    // overflow: auto;
    // background: #eee;
  }
  .section {
    overscroll-behavior: auto; // 默认为auto
    // flex-basis: 1px;
    &:nth-child(1) {
      .list {
        max-height: calc(100vh - 300px);
      }
    }
    &:nth-child(2) {
      margin-top: $gap;
      .list {
        max-height: calc(100vh - 880px);
      }
    }
  }
  .list {
    // max-height: calc(100vh - 590px);
    overflow: auto;
    overscroll-behavior: auto; // 默认为auto
    .li {
      line-height: 1.6;
    }
  }
}
</style>
