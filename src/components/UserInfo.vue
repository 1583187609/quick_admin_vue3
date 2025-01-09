<!-- 组件 - 用户信息 -->
<!-- :style="{ width: (simple ? 210 : 420) + 'px' }" -->
<template>
  <div class="user-info f-sb-s" v-if="data">
    <template v-if="simple">
      <BaseAvatar class="avatar simple f-0 mr-8" :src="data.avatar" :gender="data.gender" />
      <div class="f-1 f-sb-s-c">
        <b @click="toUserDetail" class="nickname q-line-1">{{ data.nickname || "-" }}</b>
        <div class="f-fs-c">
          <div class="f-0 mr-o">
            ID：<BaseCopy maxLine="1">{{ data.id }}</BaseCopy>
          </div>
          <BaseTag class="f-0 gender" name="D_Gender" :value="data.gender" size="small" pureText />
        </div>
        <div class="f-sb-c">
          <BaseTag class="f-0" name="D_AccountStatus" :value="data.account_status" size="small" />
          <BaseTag class="f-0" name="D_AuthCase" :value="getAuthStatus(data)" size="small" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="avatar-box f-0 mr-8">
        <el-popover :show-after="200" :hide-after="0" trigger="hover" v-if="data.company_status === 0">
          <template #reference>
            <BaseTag class="company" name="D_AuthCase" value="3">公司</BaseTag>
          </template>
          <div>{{ data.company_name }}</div>
        </el-popover>
        <BaseAvatar class="avatar" :src="data.avatar" :gender="data.gender" />
        <el-popover :show-after="200" :hide-after="0" trigger="hover" v-if="data.school_status === 0">
          <template #reference>
            <BaseTag class="education" name="D_AuthCase" value="2">学历</BaseTag>
          </template>
          <div>
            {{ getText("D_EducationType", data.school_certificate_level ?? 0) || "-" }}
          </div>
        </el-popover>
      </div>
      <div class="f-1 f-sb-s-c">
        <div class="f-sb-c">
          <b @click="toUserDetail" class="nickname q-line-1">{{ data.nickname || "-" }}</b>
          <BaseTag class="f-0 gender" name="D_Gender" :value="data.gender" size="small" pureText />
          <span class="f-0 age">{{ data.age || "0" }}岁</span>
          <BaseTag class="f-0 ml-h mr-a" name="D_MatrimonyStatus" :value="data.single_type" size="small" pureText />
          <BaseTag class="f-0" name="D_AccountStatus" :value="data.account_status" size="small" />
        </div>
        <div class="f-sb-c">
          <div class="f-0 item">
            ID：<BaseCopy maxLine="1">{{ data.id }}</BaseCopy>
          </div>
          <div class="f-0 item">
            学号：<BaseCopy maxLine="1">{{ data.user_code }}</BaseCopy>
          </div>
        </div>
        <div class="f-fs-c">
          <div class="item f-0">
            学历：<b>{{ getText("D_EducationType", data.school_certificate_level ?? 0) || "-" }}</b>
          </div>
          <div class="item f-0">
            学校：<b>{{ data.school_name || "-" }}</b>
          </div>
        </div>
        <div class="f-fs-fs">
          <div class="item f-0">
            职业：<b>{{ data.job_name || "-" }}</b>
          </div>
          <div class="item f-0">
            收入：<b>{{ data.income_type_name || "-" }}</b>
          </div>
        </div>
        <div class="f-fs-c">
          <div class="item f-0">
            现居地：<b>{{ getText("C_Region", data.live_city ?? 0) || "-" }}</b>
          </div>
          <div class="item f-0">
            家乡：<b>{{ getText("C_Region", data.city ?? 0) || "-" }}</b>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { useRouter } from "vue-router";
import { useDict } from "@/hooks";

const router = useRouter();
const { getText } = useDict();
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    simple?: boolean;
  }>(),
  {
    data: () => ({}),
  }
);
function getAuthStatus(data) {
  const { company_status, school_status } = data;
  let status = 0;
  if (company_status === 0 && school_status === 0) {
    status = 4;
  } else {
    if (company_status === 0) {
      status = 3;
    } else if (school_status === 0) {
      status = 2;
    } else {
      status = 1;
    }
  }
  return status;
}
function toUserDetail() {
  router.push({ name: "systemUserDetail", query: { id: props.data.id } });
}
</script>
<style lang="scss" scoped>
.user-info {
  text-align: left;
}
.avatar-box {
  position: relative;
  .el-tag {
    position: absolute;
    top: 0;
    z-index: 1;
    opacity: 0.6;
    &.company {
      left: 0;
    }
    &.education {
      right: 0;
    }
  }
}
.avatar {
  height: 120px;
  width: 120px;
  border-radius: $radius-light;
  &.simple {
    height: 70px;
    width: 70px;
  }
}
.nickname {
  font-size: 15px;
  &:hover {
    cursor: pointer;
    color: $color-primary;
    text-decoration: underline;
  }
}
.gender {
  margin: 0 $gap-half;
}
.age {
  font-size: 13px;
}
.item {
  &:not(:last-child) {
    margin-right: 1em;
  }
}
</style>
