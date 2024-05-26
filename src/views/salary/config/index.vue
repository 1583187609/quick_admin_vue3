<!-- 页面-简介 -->
<template>
  <div class="f-sb-c">
    <div class="f-0">翻台宝</div>
    <div class="f-0" style="width: 600px">
      <el-steps :space="200" :active="currStep" finish-status="success" simple>
        <el-step title="基本信息" />
        <el-step title="薪资规则" />
        <el-step title="薪资考勤规则" />
      </el-steps>
    </div>
    <el-button type="primary" plain>取消</el-button>
    <!-- <div>
      <el-button type="primary">下一步</el-button>
    </div> -->
  </div>
  <BaseInfo :style="style" v-if="currStep === 1" />
  <SalaryRule :style="style" v-else-if="currStep === 2" />
  <CheckingRule :style="style" v-else-if="currStep === 3" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import BaseInfo from "./BaseInfo/Index.vue";
import SalaryRule from "./SalaryRule/Index.vue";
import CheckingRule from "./CheckingRule/Index.vue";
import { Edit, Picture, UploadFilled } from "@element-plus/icons-vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const style = "height: calc(100% - 50px)";
const currStep = ref(3);
</script>
<style lang="scss" scoped></style>
