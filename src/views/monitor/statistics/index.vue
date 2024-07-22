<!-- 页面 - 测试 -->
<template>
  <div class="f-sb-s test-seven page-view">
    <div class="left box f-fs-s-c f-1">
      <div class="scroll f-fs-s-c">
        <h3 class="f-0">总计共开发有效页面（含复杂弹窗）：{{ pages.valideNames.length }}个</h3>
        <ul class="list hover-show-scroll">
          <li class="li" v-for="(item, ind) in pages.valideNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
        </ul>
      </div>
      <div class="f-0">
        <h3 class="f-0 mt-o">暂时备用无效页面（含复杂弹窗）：{{ pages.unValidNames.length }}个</h3>
        <ul class="list f-0">
          <li class="li" v-for="(item, ind) in pages.unValidNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="right box ml-t f-fs-s-c f-1">
      <div class="scroll f-fs-s-c">
        <h3 class="f-0">总计共开发有效组件：{{ comps.valideNames.length }}个</h3>
        <ul class="list hover-show-scroll">
          <li class="li" v-for="(item, ind) in comps.valideNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
        </ul>
      </div>
      <div class="f-0">
        <h3 class="f-0 mt-o">暂时备用无效组件：{{ comps.unValidNames.length }}个</h3>
        <ul class="list f-0">
          <li class="li" v-for="(item, ind) in comps.unValidNames" :key="ind">{{ ind + 1 }}、{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" name="TestSeven" setup>
//form-create地址： http://www.form-create.com/v3/element-ui/
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, OptionItem, StrNum } from "@/vite-env";
import { getDevelopPages, getDevelopComponents } from "@/utils";
const pages = getDevelopPages();
const comps = getDevelopComponents();
</script>
<style lang="scss" scoped>
.test-seven {
  .box {
    height: 100%;
    .scroll {
      overflow: auto;
    }
    .list {
      overflow: auto;
      .li {
        line-height: 1.6;
      }
    }
  }
}
</style>
