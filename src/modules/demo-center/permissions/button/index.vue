<!-- 按钮权限示例 -->
<template>
  <div>
    <BaseSection title="角色字典说明">
      <div v-for="(opt, ind) in roleOpts" :key="ind">
        <span>{{ opt.value }}：</span>
        <span>{{ opt.label }}</span>
      </div>
    </BaseSection>
    <BaseSection title="当前按钮权限配置">
      <template v-if="baseBtns">
        <div v-for="(item, key) in baseBtns" :key="key">
          <span :class="`color-${defaultBtns[key]?.attrs?.type ?? 'info'}`">{{ defaultBtns[key].text }} ({{ key }})：</span>
          <span>{{ JSON.stringify(item) }}</span>
        </div>
      </template>
      <template v-else>未配置权限</template>
    </BaseSection>
    <BaseSection title="当前用户信息" bodyClass="f-fs-fs">
      <div class="mr-t">姓名：{{ userInfo?.name }}</div>
      <div class="mr-t">角色名称：{{ getText("D_RoleType", userInfo?.role) }}</div>
      <div>角色code：{{ userInfo?.role }}</div>
    </BaseSection>
    <BaseSection title="可见按钮" v-if="baseBtns">
      <BaseBtn
        :auth="baseBtns[key].auth"
        :tpl="key"
        :type="defaultBtns[key]?.attrs?.type ?? 'info'"
        v-for="(item, key) in baseBtns"
        :key="key"
      />
    </BaseSection>
  </div>
</template>
<script lang="ts" setup>
import config from "@/config";
import { CommonObj, OptionItem } from "@/core/_types";
import { defaultBtns } from "@/core/components/BaseBtn";
import { useDict } from "@/hooks";
import { getUserInfo } from "@/utils";

const { getOpts, getText } = useDict();
const { baseBtns } = config.tpls ?? {};
const roleOpts = getOpts("D_RoleType") as OptionItem[];
const userInfo = getUserInfo();
</script>
<style lang="scss" scoped></style>
