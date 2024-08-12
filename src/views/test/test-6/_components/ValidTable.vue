<!-- 参考：https://blog.csdn.net/weixin_45295253/article/details/115582504 -->
<template>
  <el-form ref="forms" :model="forms">
    <el-table ref="multipleTable" :data="forms.tableData" tooltip-effect="dark" style="width: 100%" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="姓名" width="80">
        <template #default="{ row, $index }">
          <el-form-item
            :prop="`tableData.${$index}.realname`"
            :rules="rules.realname"
            style="margin-bottom: 16px"
            v-if="$index >= 0"
          >
            <el-input type="text" placeholder="输入姓名" v-model="row.realname" clearable></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" show-overflow-tooltip>
        <template #default="{ row, $index }">
          <el-form-item :prop="`tableData.${$index}.idcard`" :rules="rules.idcard" style="margin-bottom: 16px">
            <el-input type="text" placeholder="输入身份证号" v-model="row.idcard" clearable></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" show-overflow-tooltip>
        <template #default="{ row, $index }">
          <el-form-item :prop="`tableData.${$index}.mobile`" :rules="rules.mobile" style="margin-bottom: 16px">
            <el-input type="number" placeholder="输入手机号码" v-model="row.mobile" clearable></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex_cen mt_15">
      <el-button type="primary" :disabled="forms.tableData.length == 0" class="submit mr_20 fs_16" @click="onSubmit"
        >确认提交</el-button
      >
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
const forms = reactive({
  tableData: [
    { realname: "张三1", idcard: "5111231231231", mobile: "18483221518" },
    { realname: "张三2", idcard: "5111231231231", mobile: "18483221518" },
    { realname: "张三3", idcard: "5111231231231", mobile: "18483221518" },
  ],
});
const rules = {
  realname: [{ required: true, message: "请输入" }],
  idcard: [{ required: true, message: "请输入" }],
  mobile: [{ required: true, message: "请输入" }],
};
function onSubmit() {}
</script>
<style lang="scss" scoped></style>
