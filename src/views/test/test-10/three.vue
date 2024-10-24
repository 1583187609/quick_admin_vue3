<template>
  <div>
    <div>
      <el-radio-group v-model="size" aria-label="size control">
        <el-radio-button value="large">large</el-radio-button>
        <el-radio-button value="default">default</el-radio-button>
        <el-radio-button value="small">small</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="labelPosition" aria-label="position control">
        <el-radio-button value="left">Left</el-radio-button>
        <el-radio-button value="right">Right</el-radio-button>
        <el-radio-button value="top">Top</el-radio-button>
      </el-radio-group>
    </div>
    <br />
    <el-form ref="ruleFormRef" :model="sizeForm" label-width="auto" :label-position="labelPosition" :size="size">
      <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名' }]" required>
        <el-input v-model="sizeForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <!-- 不嵌套对象校验 -->
      <el-form-item label="计费" required>
        每
        <el-form-item prop="hour" required :rules="[{ required: true, message: '请输入小时' }]">
          <el-input v-model="sizeForm.hour" placeholder="请输入小时" />
        </el-form-item>
        花
        <el-form-item prop="money" required :rules="[{ required: true, message: '请输入金额' }]">
          <el-input v-model="sizeForm.money" placeholder="请输入金额" />
        </el-form-item>
        元
      </el-form-item>
      <!-- 嵌套对象校验 -->
      <el-form-item label="花费" prop="cost" required>
        每
        <el-form-item prop="cost.hour" required :rules="[{ required: true, message: '请输入小时' }]">
          <!-- <template #label></template> -->
          <el-input v-model="sizeForm.cost.hour" placeholder="请输入小时" />
        </el-form-item>
        花
        <el-form-item prop="cost.money" required :rules="[{ required: true, message: '请输入金额' }]">
          <el-input v-model="sizeForm.cost.money" placeholder="请输入金额" />
        </el-form-item>
        元
      </el-form-item>
      <!-- 循环嵌套校验 -->
      <el-form-item label="列表" prop="list" required :rules="[{ required: true, message: '请输入列表' }]">
        <el-form-item style="margin-bottom: 18px" v-for="(item, ind) in sizeForm.list" :key="ind">
          <el-form-item :prop="'list.' + ind + '.hour'" required :rules="[{ required: true, message: '请输入小时' }]">
            <el-input v-model="sizeForm.list[ind].hour" placeholder="请输入小时" clearable />
          </el-form-item>
          <el-form-item
            class="ml-h"
            :prop="'list.' + ind + '.money'"
            required
            :rules="[{ required: true, message: '请输入小时' }]"
          >
            <el-input v-model="sizeForm.list[ind].money" placeholder="请输入金额" />
          </el-form-item>
          <el-form-item
            class="ml-h"
            :prop="'list.' + ind + '.money'"
            required
            :rules="[{ required: true, message: '请选择类型' }]"
          >
            <el-select
              v-model="sizeForm.list[ind].type"
              style="min-width: 120px"
              placeholder="请选择类型"
              :options="[
                { label: '类型1', value: 1 },
                { label: '类型2', value: 2 },
                { label: '类型3', value: 3 },
              ]"
            />
          </el-form-item>
          <el-button
            class="ml-h"
            type="primary"
            @click="handleAddDel(ind === sizeForm.list.length - 1 ? 'add' : 'del', true)"
            :icon="ind === sizeForm.list.length - 1 ? CirclePlus : Remove"
            circle
          ></el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
        <el-button @click="handleReset(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="sendFetch">发送请求</el-button>
      <el-button type="primary" @click="sendFetchTest">发送请求测试</el-button>
      <el-button type="primary" @click="abortFetch">取消请求</el-button>
    </div>
    <div class="f-sb-c">
      <template>{{ undefined }}</template>
      <template>{{ null }}</template>
    </div>
    <div>
      <el-input placeholder="请输入">
        <template #prefix>
          <BaseRender :data="VBaseIcon" />
        </template>
        <template #append>
          <BaseRender :data="VBaseIcon" />
        </template>
      </el-input>
    </div>
    <div>
      <el-popconfirm confirm-button-text="确认删除" cancel-button-text="取消">
        <template #reference>
          <el-button>点击打开弹窗</el-button>
        </template>
        <span>这是自定义内容</span>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isVNode, reactive, ref, h } from "vue";
import type { ComponentSize, FormProps, FormInstance } from "element-plus";
import { CirclePlus, Remove } from "@element-plus/icons-vue";
import { PostMockCommon, GetMockCommonList } from "@/api-mock";
import { CommonObj } from "@/vite-env";
import BaseIcon from "@/components/BaseIcon.vue";
import { cancelHttp } from "@/services/http";

const size = ref<ComponentSize>("default");
const labelPosition = ref<FormProps["labelPosition"]>("right");
const ruleFormRef = ref<FormInstance>();

const VBaseIcon = h(BaseIcon, { name: "Lock" });
const sizeForm = reactive({
  name: "",
  hour: 1,
  money: 2,
  cost: {
    hour: 2,
    money: 4,
  },
  list: [{ hour: undefined, money: undefined, type: undefined }],
});

function handleAddDel(type: "add" | "del", required = false) {
  if (type === "add") {
    if (required && true) {
      sizeForm.list.push({ hour: undefined, money: undefined, type: undefined });
    } else {
    }
  }
}
function onSubmit(formEl?: FormInstance) {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
}
function handleReset(formEl?: FormInstance) {
  if (!formEl) return;
  formEl.resetFields();
}
function sendFetch() {
  console.log("点击了发送请求按钮");
  PostMockCommon({})
    .then((res: CommonObj) => {
      console.log(res, "请求成功---------------------");
    })
    .catch(err => {
      console.log(err, "取消请求catch----------");
    });
}
function sendFetchTest() {
  console.log("点击了发送请求按钮");
  GetMockCommonList({})
    .then((res: CommonObj) => {
      console.log(res, "请求成功---------------------");
    })
    .catch(err => {
      console.log(err, "取消请求catch----------");
    });
}
function abortFetch() {
  console.log("点击了取消请求按钮");
  cancelHttp();
}
</script>

<style lang="scss" scoped></style>
